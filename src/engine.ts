/**
 * 文本引擎渲染函数类型
 */
export type TextEngineRenderFn<T = any> = (result: T) => string;

/** 文本引擎转换函数类型 */
export type TextEngineTransferFn<T = any, S = any> = (result: T) => S;

/** 文本引擎规则配置项 */
export interface TextEngineOption {
  /** 规则模式（#xx{XX}xx#）右侧的处理函数 */
  rightTransfer: Record<string, TextEngineTransferFn>;
  /** 规则模式（#xx{XX}xx#）左侧的渲染函数 */
  leftRender: Record<string, TextEngineRenderFn>;
}

/** 文本引擎规则默认配置项 */
export interface TextEngineDefaultOption {
  /** 规则模式（#xx{XX}xx#）右侧的处理函数 */
  rightTransfer?: TextEngineTransferFn;
  /** 规则模式（#xx{XX}xx#）左侧的渲染函数 */
  leftRender?: TextEngineRenderFn;
}

/**
 * 文本引擎，引擎按照配置规则（#标志符1{文本}标志符2#）
 * 将字符串进行解析（文本先按照右边的标志符处理函数进行处理，在用左边的进行渲染）替换为最终结果
 *
 * @example
 * 将行如字符串 "这是一段#{3600}1#内容,其中#1{文本}#是需要解析的,解析的结果是这样子为"
 * "这是一段3.6k内容,其中<span>文本<span>是需要解析的,解析的结果是这样子为"
 */
export class TextEngine {
  /**
   * 解析的配置规则内容
   */
  private _option: TextEngineOption | null;

  /** 默认渲染函数 */
  private _defaultRenderFn = (text: unknown): string => String(text);

  /** 默认转换函数 */
  private _defaultTransferFn = (text: unknown) => text;

  constructor(option: TextEngineOption, defaultConf?: TextEngineDefaultOption) {
    this._option = option;

    const { rightTransfer, leftRender } = defaultConf || {};

    if (rightTransfer) {
      this._defaultTransferFn = rightTransfer;
    }

    if (leftRender) {
      this._defaultRenderFn = leftRender;
    }
  }

  /**
   * 获取转换后的文本字符串结果
   * @param text 匹配上的文本字符串
   * @param transferLabel 转换标志符串
   * @returns
   */
  private _getTransferedResult(text: string, transferLabel: string): unknown {
    const transferLabels = transferLabel.split(",");

    let result: unknown = text;

    transferLabels.forEach((label) => {
      const fn = this._option?.rightTransfer[label] ?? this._defaultTransferFn;

      result = fn(result);
    });

    return result;
  }

  /**
   * 获取渲染后的文本字符串结果
   * @param textTransfered 转换后的文本内容
   * @param renderLabel 渲染标志符
   * @returns
   */
  private _getRenderedResult(
    textTransfered: unknown,
    renderLabel: string
  ): string {
    const fn = this._option?.leftRender[renderLabel] ?? this._defaultRenderFn;

    return fn(textTransfered);
  }

  /**
   * 解析源字符串
   * @param text
   */
  public parse(text: string): string {
    let textResult = text;
    let execReulst: null | RegExpExecArray = null;

    do {
      const reg = /#([A-z\d-_]+)?{(.+)}([,?[A-z\d-_]*]*)?#/;

      execReulst = reg.exec(textResult);

      if (execReulst) {
        const [matchedPara, left = "", text = "", right = ""] = execReulst;

        textResult = textResult.replace(
          matchedPara,
          this._getRenderedResult(this._getTransferedResult(text, right), left)
        );
      }
    } while (execReulst != null);

    return textResult;
  }

  /**
   * 更新解析的配置规则内容
   * @param option
   */
  public setOption(option: TextEngineOption): void {
    this._option = option;
  }

  /**
   * 销毁处理
   */
  public destroy(): void {
    this._option = null;
  }
}
