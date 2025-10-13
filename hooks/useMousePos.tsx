import { useState, useEffect, MutableRefObject } from "react";
import { number } from "zod";

export const useMousePosOnEle = (refEle: HTMLDivElement) => {
  const [pos, setPos] = useState({
    x: undefined as unknown as number,
    y: undefined as unknown as number,
  });
  refEle.addEventListener("mousemove", (e) => {
    setPos({
      x: e.clientX,
      y: e.clientY,
    });
  });
  return pos;
};
