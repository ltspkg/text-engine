# 背景

对于跨业务或者跨端来说，前端针对外部服务提供的数据（此处特指字符串文本）有自己的处理逻辑以及展示效果，如颜色、字体大小等等，外部服务关注的是提供的数据是否正确而对于前端需求方如何处理数据、如何展示并不是他们关注的重要内容。为此，可通过定义数据规则使得外部服务减少不必要的数据展示关注也让前端需求方能灵活的处理数据以及展示数据。

## 介绍

> text-engine 是一个将字符串中匹配的片段，按照自定义的配置规则解析为目标字符串的文本引擎

**匹配模式：`#x{content}y1[,y2]#`**。

解析的过程为：1）将文本内容经右侧配置函数依次处理，其中右侧`y1`、`y2`为配置的文本内容`content`处理函数，可无或多个（多个之间用逗号分割，不能有空格）；2）将经过处理的最终结果通过识别左侧`x`配置的渲染函数转为字符串。

## 安装

```bash
npm install @ltspkgorg/text-engine --save
```

## 使用

#### 步骤一：创建文本引擎

```typescript
import { textEngineFactory } from "@ltspkgorg/text-engine";

const textEngine = textEngineFactory({
  renders: {
    a1: (val: unknown) => `<div>${val}</div>`,
    a2: (val: unknown) => `<span style="color:red">${val}</span>`,
  },
  transfers: {
    b1: (val: unknown) => Number(val) * 1000,
    b2: (val: unknown) => (Number(val) / 1000).toFixed(2) + "k",
  },
});
```

#### 步骤二：解析文本字符串

```typescript
const result = textEngine.parse("这是#a1{100.0345}#万元");

console.log(result);
// 这是<div>100.0345</div>万元
```

## 示例

#### 示例一

输出纯文本内容

```typescript
const result = textEngine.parse("这是#{100.0345}#万元");
console.log(result);
// 这是100.0345万元
```

#### 示例二

转换的文本中含有左侧规则符号

```typescript
const result = textEngine.parse(
  "含有多个左侧规则符号的文本#a1{测试左侧（{#、#a{）规则}#符号"
);
console.log(result);
// 含有多个左侧规则符号的文本<div>测试左侧（{#、#a{）规则</div>符号
```

#### 示例三

转换的文本中含有右侧规则符号

```typescript
const result = textEngine.parse(
  "含有多个右侧规则符号的文本#a1{测试右侧（}#、}a,b#）规则}#符号"
);
console.log(result);
// 含有多个右侧规则符号的文本<div>测试右侧（}#、}a,b#）规则</div>符号
```

#### 示例四

转换的文本中含有空格（开头、中间、结尾）

```typescript
const result = textEngine.parse(`文本含有空格符的文本#a1{ 测试左侧 规则  }#`);

console.log(result);
// 文本含有空格符的文本<div> 测试左侧 规则  </div>
```

## 变更记录

[CHANGELOG](./CHANGELOG.md)

## 协议

MIT
