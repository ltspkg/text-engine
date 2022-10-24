import { textEngineFactory } from '../src'

const textEngine = textEngineFactory({
  leftRender: {
    a1(text) {
      return `<div style="color: red">${text}</div>`;
    }
  },
  rightTransfer: {
    b1(s1): number {
      return Number(s1);
    },
    b2(s2: number) {
      return Math.floor(s2 /1000) + ''
    }
  }
})

export function setupCounter(element: HTMLButtonElement) {
  let counter = 0
  const setCounter = (count: number) => {
    counter = count

    const result = textEngine.parse('hahaha#a1{36000}b1,b2#');

    window.console.log(result);
    element.innerHTML = result;
  }
  element.addEventListener('click', () => setCounter(++counter))
}
