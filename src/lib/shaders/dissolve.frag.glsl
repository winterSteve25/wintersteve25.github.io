#version 300 es
precision highp float;

uniform vec2  u_resolution;
uniform float u_time;
uniform float u_threshold;
uniform float u_edge;
uniform float u_distort;
uniform int   u_layer;

out vec4 fragColor;

const float TAU = 6.28318530718;

float hash(vec2 p) {
	p = fract(p * vec2(123.34, 456.21));
	p += dot(p, p + 45.32);
	return fract(p.x * p.y);
}

float valueNoise(vec2 p) {
	vec2 i = floor(p);
	vec2 f = fract(p);
	vec2 u = f * f * (3.0 - 2.0 * f);
	float a = hash(i);
	float b = hash(i + vec2(1.0, 0.0));
	float c = hash(i + vec2(0.0, 1.0));
	float d = hash(i + vec2(1.0, 1.0));
	return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 p) {
	float sum = 0.0;
	float amp = 0.5;
	for (int i = 0; i < 5; i++) {
		sum += amp * valueNoise(p);
		p *= 2.02;
		amp *= 0.5;
	}
	return sum;
}

float sigil(vec2 uv, float t) {
	float r = length(uv);
	float a = atan(uv.y, uv.x);

	float outer  = 1.0 - smoothstep(0.0, 0.012, abs(r - 0.62));
	float inner  = 1.0 - smoothstep(0.0, 0.006, abs(r - 0.55));
	float glyphs = (1.0 - smoothstep(0.0, 0.03, abs(r - 0.44)))
	             * step(0.35, fract(a * 6.0 / TAU + t * 0.03));
	float core   = 1.0 - smoothstep(0.02, 0.34, r);

	return clamp(outer + inner + glyphs + core * 0.85, 0.0, 1.0);
}

void main() {
	vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution) / min(u_resolution.x, u_resolution.y);

	float n = fbm(uv * 3.2 + vec2(0.0, u_time * 0.08));

	vec2 duv = uv + (n - 0.5) * u_distort * vec2(0.35, 0.5);

	float shape = sigil(duv, u_time);

	float cut  = n - (1.0 - u_threshold);
	float mask = smoothstep(0.0, 0.045, cut) * shape;
	float band = (1.0 - smoothstep(0.0, max(u_edge, 1e-4), abs(cut))) * shape;

	vec3 body = mix(vec3(0.30, 0.18, 0.60), vec3(0.64, 0.44, 0.98), shape);
	vec3 hot  = mix(vec3(1.00, 0.42, 0.16), vec3(1.00, 0.94, 0.74), band);

	vec3 col;
	float alpha = 1.0;

	if (u_layer == 1) {
		col = vec3(n);
	} else if (u_layer == 2) {
		col = vec3(mask);
	} else if (u_layer == 3) {
		col = vec3(band) * vec3(1.0, 0.55, 0.22);
	} else if (u_layer == 4) {
		col = vec3(fract(duv * 2.0 + 0.5), 0.35);
	} else if (u_layer == 5) {
		col = vec3(shape);
	} else {
		col = body * mask + hot * band * 2.2;
		alpha = clamp(mask + band, 0.0, 1.0);
	}

	fragColor = vec4(col, alpha);
}
