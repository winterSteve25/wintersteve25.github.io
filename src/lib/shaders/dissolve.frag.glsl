#version 300 es
precision highp float;

// A sigil that burns away along a noise front. Every intermediate the final
// composite is built from is exposed through u_layer so the breakdown UI can
// peel the effect apart one stage at a time.

uniform vec2  u_resolution;
uniform float u_time;
uniform float u_threshold;   // dissolve progress, 0 = intact, 1 = gone
uniform float u_edge;        // width of the emissive burn band
uniform float u_distort;     // how hard the noise pushes the UVs
uniform int   u_layer;       // 0 final, 1 noise, 2 mask, 3 edge, 4 uv, 5 shape

out vec4 fragColor;

const float TAU = 6.28318530718;

/* ---- value noise ------------------------------------------------------- */

float hash(vec2 p) {
	p = fract(p * vec2(123.34, 456.21));
	p += dot(p, p + 45.32);
	return fract(p.x * p.y);
}

float valueNoise(vec2 p) {
	vec2 i = floor(p);
	vec2 f = fract(p);
	vec2 u = f * f * (3.0 - 2.0 * f);          // smooth the interpolant
	float a = hash(i);
	float b = hash(i + vec2(1.0, 0.0));
	float c = hash(i + vec2(0.0, 1.0));
	float d = hash(i + vec2(1.0, 1.0));
	return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

// 5 octaves is the cheapest count that still reads as organic at this scale.
float fbm(vec2 p) {
	float sum = 0.0;
	float amp = 0.5;
	for (int i = 0; i < 5; i++) {
		sum += amp * valueNoise(p);
		p *= 2.02;                              // non-integer lacunarity avoids
		amp *= 0.5;                             // visible axis-aligned banding
	}
	return sum;
}

/* ---- shape ------------------------------------------------------------- */

// Concentric rings plus a segmented glyph band. Returns coverage in 0..1.
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
	// Aspect-correct coords, origin centred, shortest axis spans -1..1.
	vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution) / min(u_resolution.x, u_resolution.y);

	float n = fbm(uv * 3.2 + vec2(0.0, u_time * 0.08));

	// The same noise both erodes the shape and pushes its UVs. Reusing one
	// sample keeps the two motions correlated, which is what makes it read as
	// one material rather than two effects stacked.
	vec2 duv = uv + (n - 0.5) * u_distort * vec2(0.35, 0.5);

	float shape = sigil(duv, u_time);

	// Signed distance to the dissolve front, in noise space.
	float cut  = n - (1.0 - u_threshold);
	float mask = smoothstep(0.0, 0.045, cut) * shape;
	float band = (1.0 - smoothstep(0.0, max(u_edge, 1e-4), abs(cut))) * shape;

	vec3 body = mix(vec3(0.30, 0.18, 0.60), vec3(0.64, 0.44, 0.98), shape);
	vec3 hot  = mix(vec3(1.00, 0.42, 0.16), vec3(1.00, 0.94, 0.74), band);

	vec3 col;
	float alpha = 1.0;

	if (u_layer == 1) {                     // noise field only
		col = vec3(n);
	} else if (u_layer == 2) {               // thresholded coverage
		col = vec3(mask);
	} else if (u_layer == 3) {               // emissive band only
		col = vec3(band) * vec3(1.0, 0.55, 0.22);
	} else if (u_layer == 4) {               // distorted coordinate space
		col = vec3(fract(duv * 2.0 + 0.5), 0.35);
	} else if (u_layer == 5) {               // shape before any dissolve
		col = vec3(shape);
	} else {                                 // final composite
		col = body * mask + hot * band * 2.2;
		alpha = clamp(mask + band, 0.0, 1.0);
	}

	fragColor = vec4(col, alpha);
}
