"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[7338],{7338:(k,p,u)=>{u.r(p),u.d(p,{startTapClick:()=>w});var d=u(4878),C=u(1656);const w=n=>{if(void 0===d.d)return;let t,o,a,s=0;const P=n.getBoolean("animated",!0)&&n.getBoolean("rippleEffect",!0),l=new WeakMap,m=()=>{a&&clearTimeout(a),a=void 0,t&&(h(!1),t=void 0)},T=(e,i)=>{if(e&&e===t)return;a&&clearTimeout(a),a=void 0;const{x:r,y:c}=(0,C.p)(i);if(t){if(l.has(t))throw new Error("internal error");t.classList.contains(f)||A(t,r,c),h(!0)}if(e){const L=l.get(e);L&&(clearTimeout(L),l.delete(e)),e.classList.remove(f);const R=()=>{A(e,r,c),a=void 0};E(e)?R():a=setTimeout(R,b)}t=e},A=(e,i,r)=>{if(s=Date.now(),e.classList.add(f),!P)return;const c=I(e);null!==c&&(D(),o=c.addRipple(i,r))},D=()=>{void 0!==o&&(o.then(e=>e()),o=void 0)},h=e=>{D();const i=t;if(!i)return;const r=v-Date.now()+s;if(e&&r>0&&!E(i)){const c=setTimeout(()=>{i.classList.remove(f),l.delete(i)},v);l.set(i,c)}else i.classList.remove(f)};d.d.addEventListener("ionGestureCaptured",m),d.d.addEventListener("pointerdown",e=>{t||2===e.button||T(g(e),e)},!0),d.d.addEventListener("pointerup",e=>{T(void 0,e)},!0),d.d.addEventListener("pointercancel",m,!0)},g=n=>{if(void 0===n.composedPath)return n.target.closest(".ion-activatable");{const s=n.composedPath();for(let t=0;t<s.length-2;t++){const o=s[t];if(!(o instanceof ShadowRoot)&&o.classList.contains("ion-activatable"))return o}}},E=n=>n.classList.contains("ion-activatable-instant"),I=n=>{if(n.shadowRoot){const s=n.shadowRoot.querySelector("ion-ripple-effect");if(s)return s}return n.querySelector("ion-ripple-effect")},f="ion-activated",b=100,v=150}}]);