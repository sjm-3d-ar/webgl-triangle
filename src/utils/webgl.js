export const getGLContext = (canvas, bgColor) => {
  const defaultBgColor = [1, 1, 1, 1];
  const gl = canvas.getContext("webgl2"); // WebGL 2.0

  gl.clearColor(...(bgColor || defaultBgColor)); // r,g,b,a as 0-1
  gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);

  return gl;
};

export const getShader = (gl, shaderSource, shaderType) => {
  const shader = gl.createShader(shaderType);

  gl.shaderSource(shader, shaderSource);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader));
  }

  return shader;
};

export const getProgram = (gl, vs, fs) => {
  const program = gl.createProgram();

  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  gl.useProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error(gl.getProgramInfoLog(program));
  }

  return program;
};

export const createAndBindBuffer = (gl, bufferType, typeOfDrawing, data) => {
  const buffer = gl.createBuffer();

  gl.bindBuffer(bufferType, buffer);
  gl.bufferData(bufferType, data, typeOfDrawing);
  gl.bindBuffer(bufferType, null);

  return buffer;
};

export const linkGPUAndCPU = (
  gl,
  { program, gpuVariable, channel, buffer, dims, dataType, normalize, stride, offset },
) => {
  const position = gl.getAttribLocation(program, gpuVariable);
  gl.enableVertexAttribArray(position);
  gl.bindBuffer(channel, buffer);
  gl.vertexAttribPointer(position, dims, dataType, normalize, stride, offset);
};
