import { it, expect } from "vitest";
import { textEngineFactory } from "../factory";

const textEngine = textEngineFactory({
  renders: {
    a1: (val: unknown) => `<div>${val}</div>`,
    a2: (val: unknown) => `<span style="color:red">${val}</span>`,
    a3: () => `<span>noting todo</span>`
  },
  transfers: {
    b1: (val: unknown) => Number(val) * 1000,
    b2: (val: unknown) => (Number(val) / 1000).toFixed(2) + "k",
  },
});

it("原本输出文本内容", () => {
  const result = textEngine.parse("这是#{100.0345}#万元");

  expect("这是100.0345万元").toEqual(result);
});

it("将转换的文本内容数值*1000再除以1000并保留两位小数加“k”，最后文本标红", () => {
  const result = textEngine.parse("这是#a2{100.0365}b1,b2#万元");

  expect(`这是<span style="color:red">100.04k</span>万元`).toEqual(result);
});

it("转换的文本中含有左侧规则符号", () => {
  const result = textEngine.parse(
    "含有左侧规则符号的文本#a1{测试左侧（#{）规则}#符号"
  );
  expect(`含有左侧规则符号的文本<div>测试左侧（#{）规则</div>符号`).toEqual(
    result
  );

  const result1 = textEngine.parse(
    "含有多个左侧规则符号的文本#a1{测试左侧（{#、#a{）规则}#符号"
  );
  expect(
    `含有多个左侧规则符号的文本<div>测试左侧（{#、#a{）规则</div>符号`
  ).toEqual(result1);
});

it("销毁后的引擎解析无效", () => {
  const option = textEngine.getOption();

  if (option) {
    const textEngine2 = textEngineFactory(option);
    textEngine2.destroy();
    expect("销毁后的#{文本}#内容").toBe(
      textEngine2.parse("销毁后的#{文本}#内容")
    );
  }
});

it("不需要解析值", () => {
  const option = textEngine.getOption();

  if (option) {
    const textEngine2 = textEngineFactory(option);
    expect("销毁后的<span>noting todo</span>内容").toBe(
      textEngine2.parse("销毁后的#a3{}#内容")
    );
  }
});
