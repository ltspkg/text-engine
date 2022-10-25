import { it, expect } from "vitest";

import { TextEngine } from "../engine";

const textEngine = new TextEngine({
  renders: {
    a1: (val: unknown) => `<div>${val}</div>`,
    a2: (val: unknown) => `<span style="color:red">${val}</span>`,
  },
  transfers: {
    b1: (val: unknown) => Number(val) * 1000,
    b2: (val: unknown) => (Number(val) / 1000).toFixed(2) + "k",
  },
});
it("输出纯文本内容", () => {
  const result = textEngine.parse("这是#{100.0345}#万元");

  expect("这是100.0345万元").toEqual(result);
});

it("将转换的文本内容数值*1000再除以1000并保留两位小数加“k”，最后文本标红", () => {

  const result = textEngine.parse("这是#a2{100.0365}b1,b2#万元");

  expect(`这是<span style="color:red">100.04k</span>万元`).toEqual(result);

});

it("转换的文本中含有左侧规则符号", () => {
  const result = textEngine.parse("含有左侧规则符号的文本#a1{测试左侧（#{）规则}#符号");
  expect(`含有左侧规则符号的文本<div>测试左侧（#{）规则</div>符号`).toEqual(result);

  const result1 = textEngine.parse("含有多个左侧规则符号的文本#a1{测试左侧（{#、#a{）规则}#符号");
  expect(`含有多个左侧规则符号的文本<div>测试左侧（{#、#a{）规则</div>符号`).toEqual(result1);
});

it("转换的文本中含有右侧规则符号", () => {
  const result = textEngine.parse("含有右侧规则符号的文本#a1{测试右侧（}#）规则}#符号");
  expect(`含有右侧规则符号的文本<div>测试右侧（}#）规则</div>符号`).toEqual(result);

  const result1 = textEngine.parse("含有多个右侧规则符号的文本#a1{测试右侧（}#、}a,b#）规则}#符号");
  expect(`含有多个右侧规则符号的文本<div>测试右侧（}#、}a,b#）规则</div>符号`).toEqual(result1);
});


it("转换的文本中含有空格（开头、中间、结尾）", () => {
  const result = textEngine.parse(`文本含有空格符的文本#a1{ 测试左侧 规则  }#`);

  expect(`文本含有空格符的文本<div> 测试左侧 规则  </div>`).toEqual(result);
});

it("转换的文本中含有空格（开头、中间、结尾）以及换行符", () => {
  const result = textEngine.parse(`文本含有空格符的文本含有空格符的文本含有空格符的文
  文本含有空格符的文本含有空格符的文本含有空格符的文
  本含有空格符的文本含有空格符的文本含有空格符的文本
  本含有空格符的文本含有空格符的文本含有空格符的文本
  本含有空格符的文本含有空格符的文本含有空格符的文本
  本含有空格符的文本含有空格符的文本含有空格符的文本
  本含有空格符的文本含有空格符的文本含有空格符的文本
  含有空格符的文本#a1{ 测试左侧 规则  }#
  本含有空格符的文本含有空格符的文本含有空格符的文本
  本含有空格符的文本含有空格符的文本含有空格符的文本
  本含有空格符的文本含有空格符的文本含有空格符的文本
  本含有空格符的文本含有空格符的文本含有空格符的文本
  本含有空格符的文本含有空格符的文本含有空格符的文本
  本含有空格符的文本含有空格符的文本含有空格符的文本`);

  expect(`文本含有空格符的文本含有空格符的文本含有空格符的文
  文本含有空格符的文本含有空格符的文本含有空格符的文
  本含有空格符的文本含有空格符的文本含有空格符的文本
  本含有空格符的文本含有空格符的文本含有空格符的文本
  本含有空格符的文本含有空格符的文本含有空格符的文本
  本含有空格符的文本含有空格符的文本含有空格符的文本
  本含有空格符的文本含有空格符的文本含有空格符的文本
  含有空格符的文本<div> 测试左侧 规则  </div>
  本含有空格符的文本含有空格符的文本含有空格符的文本
  本含有空格符的文本含有空格符的文本含有空格符的文本
  本含有空格符的文本含有空格符的文本含有空格符的文本
  本含有空格符的文本含有空格符的文本含有空格符的文本
  本含有空格符的文本含有空格符的文本含有空格符的文本
  本含有空格符的文本含有空格符的文本含有空格符的文本`).toEqual(result);
});

