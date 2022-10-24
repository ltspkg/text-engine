import {
  TextEngineOption,
  TextEngine,
  TextEngineDefaultOption,
} from "./engine";

/**
 * 文本引擎解析工厂函数
 * @param option
 * @returns
 */
export function textEngineFactory(
  option: TextEngineOption,
  defaultOption?: TextEngineDefaultOption
) {
  let eng: TextEngine | null = new TextEngine(option, defaultOption);

  return {
    /** 解析字符串 */
    parse(text: string): string {
      return eng ? eng.parse(text) : text;
    },

    /** 更新解析规则配置项 */
    updateOption(option: TextEngineOption): void {
      eng && eng.setOption(option);
    },

    /** 销毁处理 */
    destroy(): void {
      eng?.destroy();

      eng = null;
    },
  };
}
