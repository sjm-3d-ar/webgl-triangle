/* eslint-disable no-param-reassign */
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    //
  },
});

const Canvas = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <p>Hello.</p>
    </div>
  );
};

export default Canvas;
