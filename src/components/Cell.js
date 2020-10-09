import React from "react";

const Cell = (props) => {
  const { i, j, el } = props;
  return <td id={`${i} ${j}`}>{el}</td>;
};

export default Cell;
