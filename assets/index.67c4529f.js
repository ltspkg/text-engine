var c=Object.defineProperty;var d=(o,e,t)=>e in o?c(o,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[e]=t;var a=(o,e,t)=>(d(o,typeof e!="symbol"?e+"":e,t),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerpolicy&&(s.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?s.credentials="include":r.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();class f{constructor(e,t){a(this,"_option");a(this,"_defaultRenderFn",e=>String(e));a(this,"_defaultTransferFn",e=>e);this._option=e;const{transfer:n,render:r}=t||{};n&&(this._defaultTransferFn=n),r&&(this._defaultRenderFn=r)}_getTransferedResult(e,t){const n=t.split(",");let r=e;return n.forEach(s=>{var l,u;r=((u=(l=this._option)==null?void 0:l.transfers[s])!=null?u:this._defaultTransferFn)(r)}),r}_getRenderedResult(e,t){var r,s;return((s=(r=this._option)==null?void 0:r.renders[t])!=null?s:this._defaultRenderFn)(e)}getOption(){var e;return(e=this._option)!=null?e:null}parse(e){let t=e,n=null;do if(n=/#([A-z\d-_]+)?{(.+)}([,?[A-z\d-_]*]*)?#/.exec(t),n){const[s,i="",l="",u=""]=n;t=t.replace(s,this._getRenderedResult(this._getTransferedResult(l,u),i))}while(n!=null);return t}setOption(e){this._option=e}destroy(){this._option=null}}function p(o,e){let t=new f(o,e);return{parse(n){return t?t.parse(n):n},updateOption(n){t&&t.setOption(n)},getOption(){var n;return(n=t==null?void 0:t.getOption())!=null?n:null},destroy(){t==null||t.destroy(),t=null}}}const h=p({renders:{a1(o){return`<div style="color: red">${o}</div>`}},transfers:{b1(o){return Number(o)},b2(o){return Math.floor(o/1e3)+""}}});function g(o){const e=t=>{const n=h.parse("hahaha#a1{36000}b1,b2#");window.console.log(n),o.innerHTML=n};o.addEventListener("click",()=>e())}document.querySelector("#app").innerHTML=`
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`;g(document.querySelector("#counter"));
