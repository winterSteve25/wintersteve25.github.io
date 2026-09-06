export interface ShaderRunnerOptions {
	vert: string;
	frag: string;
	dprCap?: number;
}

interface UniformInfo {
	location: WebGLUniformLocation;
	type: number;
}

function compile(gl: WebGL2RenderingContext, type: number, source: string): WebGLShader {
	const shader = gl.createShader(type);
	if (!shader) throw new Error('createShader failed');
	gl.shaderSource(shader, source);
	gl.compileShader(shader);

	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
		const log = gl.getShaderInfoLog(shader) ?? 'unknown error';
		gl.deleteShader(shader);
		const stage = type === gl.VERTEX_SHADER ? 'vertex' : 'fragment';
		throw new Error(`${stage} shader failed to compile:\n${log}`);
	}
	return shader;
}

export class ShaderRunner {
	error: string | null = null;

	#canvas: HTMLCanvasElement;
	#gl: WebGL2RenderingContext | null = null;
	#program: WebGLProgram | null = null;
	#uniforms = new Map<string, UniformInfo>();
	#values = new Map<string, number>();
	#dprCap: number;

	#raf = 0;
	#running = false;
	#elapsed = 0;
	#lastFrame = 0;

	#observer: ResizeObserver | null = null;
	#onContextLost: (e: Event) => void;

	constructor(canvas: HTMLCanvasElement, options: ShaderRunnerOptions) {
		this.#canvas = canvas;
		this.#dprCap = options.dprCap ?? 2;

		this.#onContextLost = (e) => {
			e.preventDefault();
			this.stop();
			this.error = 'WebGL context lost.';
		};
		canvas.addEventListener('webglcontextlost', this.#onContextLost);

		const gl = canvas.getContext('webgl2', {
			alpha: true,
			premultipliedAlpha: false,
			antialias: false,
			depth: false,
			stencil: false,
			powerPreference: 'low-power'
		});

		if (!gl) {
			this.error = 'WebGL2 is not available in this browser.';
			return;
		}
		this.#gl = gl;

		try {
			this.#program = this.#link(gl, options.vert, options.frag);
		} catch (err) {
			this.error = err instanceof Error ? err.message : String(err);
			return;
		}

		this.#collectUniforms(gl, this.#program);

		this.#observer = new ResizeObserver(() => this.#resize());
		this.#observer.observe(canvas);
		this.#resize();
	}

	#link(gl: WebGL2RenderingContext, vertSource: string, fragSource: string): WebGLProgram {
		const vert = compile(gl, gl.VERTEX_SHADER, vertSource);
		const frag = compile(gl, gl.FRAGMENT_SHADER, fragSource);
		const program = gl.createProgram();
		if (!program) throw new Error('createProgram failed');

		gl.attachShader(program, vert);
		gl.attachShader(program, frag);
		gl.linkProgram(program);
		gl.deleteShader(vert);
		gl.deleteShader(frag);

		if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
			const log = gl.getProgramInfoLog(program) ?? 'unknown error';
			gl.deleteProgram(program);
			throw new Error(`program failed to link:\n${log}`);
		}
		return program;
	}

	#collectUniforms(gl: WebGL2RenderingContext, program: WebGLProgram) {
		const count = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS) as number;
		for (let i = 0; i < count; i++) {
			const info = gl.getActiveUniform(program, i);
			if (!info) continue;
			const location = gl.getUniformLocation(program, info.name);
			if (!location) continue;
			this.#uniforms.set(info.name, { location, type: info.type });
		}
	}

	setUniform(name: string, value: number) {
		this.#values.set(name, value);
		if (!this.#running) this.renderOnce();
	}

	#resize() {
		const gl = this.#gl;
		if (!gl) return;

		const dpr = Math.min(window.devicePixelRatio || 1, this.#dprCap);
		const width = Math.max(1, Math.round(this.#canvas.clientWidth * dpr));
		const height = Math.max(1, Math.round(this.#canvas.clientHeight * dpr));

		if (this.#canvas.width !== width || this.#canvas.height !== height) {
			this.#canvas.width = width;
			this.#canvas.height = height;
			if (!this.#running) this.renderOnce();
		}
	}

	#draw() {
		const gl = this.#gl;
		const program = this.#program;
		if (!gl || !program || this.error) return;

		gl.viewport(0, 0, this.#canvas.width, this.#canvas.height);
		gl.clearColor(0, 0, 0, 0);
		gl.clear(gl.COLOR_BUFFER_BIT);
		gl.useProgram(program);

		const resolution = this.#uniforms.get('u_resolution');
		if (resolution) gl.uniform2f(resolution.location, this.#canvas.width, this.#canvas.height);

		const time = this.#uniforms.get('u_time');
		if (time) gl.uniform1f(time.location, this.#elapsed);

		for (const [name, value] of this.#values) {
			const uniform = this.#uniforms.get(name);
			if (!uniform) continue;
			if (uniform.type === gl.INT || uniform.type === gl.BOOL) {
				gl.uniform1i(uniform.location, value);
			} else {
				gl.uniform1f(uniform.location, value);
			}
		}

		gl.drawArrays(gl.TRIANGLES, 0, 3);
	}

	renderOnce() {
		this.#draw();
	}

	start() {
		if (this.#running || this.error) return;
		this.#running = true;
		this.#lastFrame = performance.now();

		const tick = (now: number) => {
			if (!this.#running) return;
			this.#elapsed += Math.min((now - this.#lastFrame) / 1000, 1 / 20);
			this.#lastFrame = now;
			this.#draw();
			this.#raf = requestAnimationFrame(tick);
		};
		this.#raf = requestAnimationFrame(tick);
	}

	stop() {
		this.#running = false;
		if (this.#raf) cancelAnimationFrame(this.#raf);
		this.#raf = 0;
	}

	dispose() {
		this.stop();
		this.#observer?.disconnect();
		this.#canvas.removeEventListener('webglcontextlost', this.#onContextLost);
		const gl = this.#gl;
		if (gl && this.#program) gl.deleteProgram(this.#program);
		gl?.getExtension('WEBGL_lose_context')?.loseContext();
		this.#gl = null;
		this.#program = null;
	}
}

export function prefersReducedMotion(): boolean {
	return (
		typeof window !== 'undefined' &&
		window.matchMedia('(prefers-reduced-motion: reduce)').matches
	);
}
