import React from "react";

import "../styles/components/_numpad.scss";

const Numpad = () => {
  return (
    <div class="numpad   halffade default-blue">
      <ul class="numpad-row  ">
        <li class="numpad-item " id="digit-1">
          <span class="badge badge-light numpad-item--badge count-1">0</span>1
        </li>
        <li class="numpad-item " id="digit-2">
          <span class="badge badge-light numpad-item--badge count-2">0</span>2
        </li>
        <li class="numpad-item " id="digit-3">
          <span class="badge badge-light numpad-item--badge count-3">0</span>3
        </li>
        <li class="numpad-item " id="digit-4">
          <span class="badge badge-light numpad-item--badge count-4">0</span>4
        </li>
        <li class="numpad-item " id="digit-5">
          <span class="badge badge-light numpad-item--badge count-5">0</span>5
        </li>
        <li class="numpad-item " id="digit-6">
          <span class="badge badge-light numpad-item--badge count-6">0</span>6
        </li>
      </ul>
      <ul class="numpad-row  ">
        <li class="numpad-item " id="digit-7">
          <span class="badge badge-light numpad-item--badge count-7">0</span>7
        </li>
        <li class="numpad-item " id="digit-8">
          <span class="badge badge-light numpad-item--badge count-8">0</span>8
        </li>
        <li class="numpad-item " id="digit-9">
          <span class="badge badge-light numpad-item--badge count-9">0</span>9
        </li>
        <li class="numpad-item " id="numpad-draft">
          <span class="fa-stack ">
            <i class="fas fa-edit fa-stack-1x"></i>
            <i class="fas fa-ban fa-stack-2x" style={{ color: "Tomato" }}></i>
          </span>
        </li>
        <li class="numpad-item " id="numpad-color">
          <i class="fas fa-palette"></i>
        </li>
        <li class="numpad-item " id="numpad-clear">
          <i class="fas fa-backspace"></i>
        </li>
      </ul>
    </div>
  );
};

export default Numpad;
