#version 300 es

// Fullscreen triangle generated from gl_VertexID — no vertex buffers, no
// attributes, no VAO state to manage. Draw with drawArrays(TRIANGLES, 0, 3).
void main() {
	int id = gl_VertexID;
	vec2 p = vec2(float((id << 1) & 2), float(id & 2));
	gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}
