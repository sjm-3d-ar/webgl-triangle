/* eslint-disable no-param-reassign */
import React, { useRef, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import {
  createAndBindBuffer,
  getGLContext,
  getProgram,
  getShader,
  linkGPUAndCPU,
} from "_utils";

const useStyles = makeStyles({
  root: {
    width: "100vw",
    height: "100vh",
  },
});

const coordinates = [-1, -1, 0, 1, 1, -1];

const vertexShader = `#version 300 es
  precision mediump float;
  in vec2 position;

  void main() {
    gl_Position = vec4(position.x, position.y, 0.0, 1.0); // x, y, z, w
  }
`;

const fragmentShader = `#version 300 es
  precision mediump float;
  out vec4 color;

  void main() {
    color = vec4(0.7, 0.89, 0.98, 1.0); // r, g, b, a
  }
`;

const Triangle = () => {
  const classes = useStyles();

  const canvas = useRef();

  useEffect(() => {
    const gl = getGLContext(canvas.current, [0.47, 0.7, 0.78, 1]);
    const vs = getShader(gl, vertexShader, gl.VERTEX_SHADER);
    const fs = getShader(gl, fragmentShader, gl.FRAGMENT_SHADER);
    const program = getProgram(gl, vs, fs);
    const buffer = createAndBindBuffer(
      gl,
      gl.ARRAY_BUFFER,
      gl.STATIC_DRAW,
      new Float32Array(coordinates),
    );

    linkGPUAndCPU(gl, {
      program,
      gpuVariable: "position",
      channel: gl.ARRAY_BUFFER,
      buffer,
      dims: 2,
      dataType: gl.FLOAT,
      normalize: gl.FALSE,
      stride: 0,
      offset: 0,
    });

    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }, []);

  return <canvas className={classes.root} ref={canvas} />;
};

export default Triangle;
