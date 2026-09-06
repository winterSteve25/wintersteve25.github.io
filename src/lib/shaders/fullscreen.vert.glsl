#version 300 es

void main() {
	int id = gl_VertexID;
	vec2 p = vec2(float((id << 1) & 2), float(id & 2));
	gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}
