import { it, expect } from "vitest";

import { TextEngine } from "../engine";

const textEngine = new TextEngine({
  leftRender: {
    a1: (val: unknown) => `<div>${val}</div>`,
    a2: (val: unknown) => `<span style="color:red">${val}</span>`,
  },
  rightTransfer: {
    b1: (val: unknown) => Number(val) * 1000,
    b2: (val: unknown) => (Number(val) / 1000).toFixed(2) + "k",
  },
});
it("nothing to do", () => {
  const result = textEngine.parse("这是#{100.0345}#万元");

  expect("这是100.0345万元").toEqual(result);
});

it("num multi 1000 then format with k,finally render with color red", () => {
  const result = textEngine.parse("这是#a2{100.0365}b1,b2#万元");

  expect(`这是<span style="color:red">100.04k</span>万元`).toEqual(result);
});

it("text with parttern left mark", () => {
  const result = textEngine.parse("这是一段复杂的文本#{}#");

  expect(`这是<span style="color:red">100.04k</span>万元`).toEqual(result);
});
