import React from "react";

const Cell = ({
  cell,
  values,
  isEditable,
  highlightPeers,
  highlightSameCells,
  isPeer,
  isActive,
  isDuplicate,
  isSameValue,
  isAltBlock,
  color,
  isWrongInput,
}) => {
  /**
   * * when a cell is clicked,
   ** call highlightPeers fn from parent
   *
   */
  const handleClick = (e) => {
    highlightPeers(cell);
    highlightSameCells(cell);
  };

  const classes = `${isEditable ? "editable" : "non-editable"}
   ${isPeer ? "highlight-peers" : " "}
   ${isActive ? "highlight-clicked" : " "}
   ${isDuplicate ? "highlight-duplicates" : " "}
   ${isSameValue ? "highlight-same-squares" : " "}
   ${isAltBlock ? "highlight-alt-block" : " "}
   ${isWrongInput ? "highlight-wrong-input" : " "}
   ${color}`;
  return (
    <td id={cell} className={classes} onClick={handleClick}>
      {values.map((val) => val)}
    </td>
  );
};

export default Cell;
