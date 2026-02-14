/* eslint-disable  no-unused-vars */
(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(i){if(i.ep)return;i.ep=!0;const r=t(i);fetch(i.href,r)}})();const Kl="modulepreload",Yl=function(n){return"/fullstack-path-scrimba/courses/09-apis-and-async-js/02-blog-space/solo-project-color-generator/dist/"+n},ir={},En=function(e,t,s){let i=Promise.resolve();if(t&&t.length>0){document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),a=(o==null?void 0:o.nonce)||(o==null?void 0:o.getAttribute("nonce"));i=Promise.allSettled(t.map(l=>{if(l=Yl(l),l in ir)return;ir[l]=!0;const c=l.endsWith(".css"),h=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${h}`))return;const u=document.createElement("link");if(u.rel=c?"stylesheet":Kl,c||(u.as="script"),u.crossOrigin="",u.href=l,a&&u.setAttribute("nonce",a),document.head.appendChild(u),c)return new Promise((d,f)=>{u.addEventListener("load",d),u.addEventListener("error",()=>f(new Error(`Unable to preload CSS for ${l}`)))})}))}function r(o){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=o,window.dispatchEvent(a),!a.defaultPrevented)throw o}return i.then(o=>{for(const a of o||[])a.status==="rejected"&&r(a.reason);return e().catch(r)})},Ql="https://www.thecolorapi.com";async function Jl(n,e="monochrome",t=5){const s=n.replace("#",""),i=`${Ql}/scheme?hex=${s}&mode=${e}&count=${t}`;try{const r=await fetch(i);if(!r.ok)throw new Error(`API request failed: ${r.status} ${r.statusText}`);return await r.json()}catch(r){throw console.error("Error fetching color scheme:",r),new Error(`Failed to fetch color scheme: ${r.message}`)}}function Xl(n){return!n||!n.colors?[]:n.colors.map(e=>({hex:e.hex.value,rgb:{r:e.rgb.r,g:e.rgb.g,b:e.rgb.b,value:e.rgb.value},hsl:{h:e.hsl.h,s:e.hsl.s,l:e.hsl.l,value:e.hsl.value},name:e.name.value,_raw:e}))}function Zl(n){return/^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(n)}function ec(){const n="0123456789ABCDEF";let e="#";for(let t=0;t<6;t++)e+=n[Math.floor(Math.random()*16)];return e}function tc(n){const e=n.replace("#","");let t=e;e.length===3&&(t=e.split("").map(o=>o+o).join(""));const s=parseInt(t.substring(0,2),16),i=parseInt(t.substring(2,4),16),r=parseInt(t.substring(4,6),16);return{r:s,g:i,b:r}}function Eo(n,e,t){const s=i=>{const r=Math.round(i).toString(16);return r.length===1?"0"+r:r};return`#${s(n)}${s(e)}${s(t)}`.toUpperCase()}function gn(n,e){var t,s,i;switch(e.toLowerCase()){case"hex":return n.hex;case"rgb":return n.rgb.value||`rgb(${n.rgb.r}, ${n.rgb.g}, ${n.rgb.b})`;case"hsl":return n.hsl.value||`hsl(${n.hsl.h}, ${n.hsl.s}%, ${n.hsl.l}%)`;case"cmyk":return((t=n.cmyk)==null?void 0:t.value)||((i=(s=n._raw)==null?void 0:s.cmyk)==null?void 0:i.value)||"N/A";default:return n.hex}}function nc(n){var e,t,s;return{hex:n.hex,rgb:n.rgb.value||`rgb(${n.rgb.r}, ${n.rgb.g}, ${n.rgb.b})`,hsl:n.hsl.value||`hsl(${n.hsl.h}, ${n.hsl.s}%, ${n.hsl.l}%)`,cmyk:((e=n.cmyk)==null?void 0:e.value)||((s=(t=n._raw)==null?void 0:t.cmyk)==null?void 0:s.value)||"N/A"}}function sc(n,e,t){const[s,i,r]=[n,e,t].map(o=>(o=o/255,o<=.03928?o/12.92:Math.pow((o+.055)/1.055,2.4)));return .2126*s+.7152*i+.0722*r}function ic(n){const e=tc(n);return sc(e.r,e.g,e.b)>.5?"#000000":"#FFFFFF"}let ds=null;function g(n,e="success",t=3e3){const s=document.getElementById("toast"),i=document.getElementById("toast-message");if(!s||!i){console.warn("Toast elements not found in DOM");return}ds&&clearTimeout(ds),i.textContent=n,s.className=`toast toast--${e}`,requestAnimationFrame(()=>{s.classList.add("toast--show")}),ds=setTimeout(()=>{rc()},t)}function rc(){const n=document.getElementById("toast");n&&n.classList.remove("toast--show")}async function Ks(n,e="Copied to clipboard!"){try{if(navigator.clipboard&&navigator.clipboard.writeText)return await navigator.clipboard.writeText(n),g(e),!0;const t=document.createElement("textarea");t.value=n,t.style.position="fixed",t.style.left="-999999px",t.style.top="-999999px",document.body.appendChild(t),t.focus(),t.select();const s=document.execCommand("copy");if(document.body.removeChild(t),s)return g(e),!0;throw new Error("Copy command failed")}catch(t){const s=(t==null?void 0:t.message)||"";return s.includes("message channel closed")||s.includes("Extension context invalidated")?(g(e),!0):(s.includes("message channel closed")||console.error("Failed to copy to clipboard:",t),g("Failed to copy. Please try again.","error"),!1)}}async function Co(n,e=null,t="HEX"){const s=`Copied ${t}: ${n}`,i=await Ks(n,s);return i&&e&&(e.classList.add("color-card__swatch--copied"),setTimeout(()=>{e.classList.remove("color-card__swatch--copied")},600)),i}function oc(n,e,t=null){const s=new URL(window.location.href);s.searchParams.delete("seed"),s.searchParams.delete("scheme");const i=n.replace("#","");return s.searchParams.set("seed",i),s.searchParams.set("scheme",e),s.toString()}function ac(){const n=new URL(window.location.href),e=n.searchParams.get("seed"),t=n.searchParams.get("scheme");return!e||!t?null:{seed:e.startsWith("#")?e:`#${e}`,scheme:t}}function bo(n,e){const t=oc(n,e);window.history.pushState({seed:n,scheme:e},"",t)}function lc(n){const{onGenerate:e,onCopy:t,onRandom:s,onReset:i,onFormatSwitch:r}=n;document.addEventListener("keydown",o=>{var a;try{const l=o.target.matches("input, textarea, select");if(o.key==="Enter"&&!l&&(o.preventDefault(),e==null||e()),o.key.toLowerCase()==="c"&&!l&&!o.ctrlKey&&!o.metaKey&&(o.preventDefault(),t==null||t()),o.key.toLowerCase()==="r"&&!l&&(o.preventDefault(),s==null||s()),o.key==="Escape"&&!l&&(o.preventDefault(),i==null||i()),["1","2","3","4"].includes(o.key)&&!l){o.preventDefault();const c=["hex","rgb","hsl","cmyk"],h=parseInt(o.key)-1;r==null||r(c[h])}}catch(l){(a=l.message)!=null&&a.includes("message channel closed")||console.error("Keyboard shortcut error:",l)}})}function Io(){const n=document.activeElement;return n&&n.classList.contains("color-card")?n:null}function cc(n){const e=document.querySelectorAll(".color-card");e[n]&&e[n].focus()}function dc(){document.addEventListener("keydown",n=>{const e=Io();if(!e)return;const t=Array.from(document.querySelectorAll(".color-card")),s=t.indexOf(e);let i=s;switch(n.key){case"ArrowRight":case"ArrowDown":n.preventDefault(),i=(s+1)%t.length;break;case"ArrowLeft":case"ArrowUp":n.preventDefault(),i=(s-1+t.length)%t.length;break;case"Home":n.preventDefault(),i=0;break;case"End":n.preventDefault(),i=t.length-1;break}i!==s&&cc(i)})}const uc=()=>{};var rr={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const So={NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const p=function(n,e){if(!n)throw mt(e)},mt=function(n){return new Error("Firebase Database ("+So.SDK_VERSION+") INTERNAL ASSERT FAILED: "+n)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const To=function(n){const e=[];let t=0;for(let s=0;s<n.length;s++){let i=n.charCodeAt(s);i<128?e[t++]=i:i<2048?(e[t++]=i>>6|192,e[t++]=i&63|128):(i&64512)===55296&&s+1<n.length&&(n.charCodeAt(s+1)&64512)===56320?(i=65536+((i&1023)<<10)+(n.charCodeAt(++s)&1023),e[t++]=i>>18|240,e[t++]=i>>12&63|128,e[t++]=i>>6&63|128,e[t++]=i&63|128):(e[t++]=i>>12|224,e[t++]=i>>6&63|128,e[t++]=i&63|128)}return e},hc=function(n){const e=[];let t=0,s=0;for(;t<n.length;){const i=n[t++];if(i<128)e[s++]=String.fromCharCode(i);else if(i>191&&i<224){const r=n[t++];e[s++]=String.fromCharCode((i&31)<<6|r&63)}else if(i>239&&i<365){const r=n[t++],o=n[t++],a=n[t++],l=((i&7)<<18|(r&63)<<12|(o&63)<<6|a&63)-65536;e[s++]=String.fromCharCode(55296+(l>>10)),e[s++]=String.fromCharCode(56320+(l&1023))}else{const r=n[t++],o=n[t++];e[s++]=String.fromCharCode((i&15)<<12|(r&63)<<6|o&63)}}return e.join("")},Ys={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,s=[];for(let i=0;i<n.length;i+=3){const r=n[i],o=i+1<n.length,a=o?n[i+1]:0,l=i+2<n.length,c=l?n[i+2]:0,h=r>>2,u=(r&3)<<4|a>>4;let d=(a&15)<<2|c>>6,f=c&63;l||(f=64,o||(d=64)),s.push(t[h],t[u],t[d],t[f])}return s.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(To(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):hc(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,s=[];for(let i=0;i<n.length;){const r=t[n.charAt(i++)],a=i<n.length?t[n.charAt(i)]:0;++i;const c=i<n.length?t[n.charAt(i)]:64;++i;const u=i<n.length?t[n.charAt(i)]:64;if(++i,r==null||a==null||c==null||u==null)throw new fc;const d=r<<2|a>>4;if(s.push(d),c!==64){const f=a<<4&240|c>>2;if(s.push(f),u!==64){const m=c<<6&192|u;s.push(m)}}}return s},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class fc extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const ko=function(n){const e=To(n);return Ys.encodeByteArray(e,!0)},Cn=function(n){return ko(n).replace(/\./g,"")},bn=function(n){try{return Ys.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pc(n){return Ao(void 0,n)}function Ao(n,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const t=e;return new Date(t.getTime());case Object:n===void 0&&(n={});break;case Array:n=[];break;default:return e}for(const t in e)!e.hasOwnProperty(t)||!gc(t)||(n[t]=Ao(n[t],e[t]));return n}function gc(n){return n!=="__proto__"}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mc(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _c=()=>mc().__FIREBASE_DEFAULTS__,vc=()=>{if(typeof process>"u"||typeof rr>"u")return;const n=rr.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},yc=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&bn(n[1]);return e&&JSON.parse(e)},Qs=()=>{try{return uc()||_c()||vc()||yc()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},Ro=n=>{var e,t;return(t=(e=Qs())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[n]},wc=n=>{const e=Ro(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const s=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),s]:[e.substring(0,t),s]},Po=()=>{var n;return(n=Qs())===null||n===void 0?void 0:n.config},No=n=>{var e;return(e=Qs())===null||e===void 0?void 0:e[`_${n}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jt{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,s)=>{t?this.reject(t):this.resolve(s),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,s))}}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _t(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function Oo(n){return(await fetch(n,{credentials:"include"})).ok}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ec(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},s=e||"demo-project",i=n.iat||0,r=n.sub||n.user_id;if(!r)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o=Object.assign({iss:`https://securetoken.google.com/${s}`,aud:s,iat:i,exp:i+3600,auth_time:i,sub:r,user_id:r,firebase:{sign_in_provider:"custom",identities:{}}},n);return[Cn(JSON.stringify(t)),Cn(JSON.stringify(o)),""].join(".")}const Rt={};function Cc(){const n={prod:[],emulator:[]};for(const e of Object.keys(Rt))Rt[e]?n.emulator.push(e):n.prod.push(e);return n}function bc(n){let e=document.getElementById(n),t=!1;return e||(e=document.createElement("div"),e.setAttribute("id",n),t=!0),{created:t,element:e}}let or=!1;function Mo(n,e){if(typeof window>"u"||typeof document>"u"||!_t(window.location.host)||Rt[n]===e||Rt[n]||or)return;Rt[n]=e;function t(d){return`__firebase__banner__${d}`}const s="__firebase__banner",r=Cc().prod.length>0;function o(){const d=document.getElementById(s);d&&d.remove()}function a(d){d.style.display="flex",d.style.background="#7faaf0",d.style.position="fixed",d.style.bottom="5px",d.style.left="5px",d.style.padding=".5em",d.style.borderRadius="5px",d.style.alignItems="center"}function l(d,f){d.setAttribute("width","24"),d.setAttribute("id",f),d.setAttribute("height","24"),d.setAttribute("viewBox","0 0 24 24"),d.setAttribute("fill","none"),d.style.marginLeft="-6px"}function c(){const d=document.createElement("span");return d.style.cursor="pointer",d.style.marginLeft="16px",d.style.fontSize="24px",d.innerHTML=" &times;",d.onclick=()=>{or=!0,o()},d}function h(d,f){d.setAttribute("id",f),d.innerText="Learn more",d.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",d.setAttribute("target","__blank"),d.style.paddingLeft="5px",d.style.textDecoration="underline"}function u(){const d=bc(s),f=t("text"),m=document.getElementById(f)||document.createElement("span"),S=t("learnmore"),O=document.getElementById(S)||document.createElement("a"),q=t("preprendIcon"),z=document.getElementById(q)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(d.created){const Q=d.element;a(Q),h(O,S);const Je=c();l(z,q),Q.append(z,m,O,Je),document.body.appendChild(Q)}r?(m.innerText="Preview backend disconnected.",z.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(z.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,m.innerText="Preview backend running in this workspace."),m.setAttribute("id",f)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",u):u()}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function V(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Js(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(V())}function Ic(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Sc(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function Lo(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Tc(){const n=V();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function kc(){return So.NODE_ADMIN===!0}function Ac(){try{return typeof indexedDB=="object"}catch{return!1}}function Rc(){return new Promise((n,e)=>{try{let t=!0;const s="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(s);i.onsuccess=()=>{i.result.close(),t||self.indexedDB.deleteDatabase(s),n(!0)},i.onupgradeneeded=()=>{t=!1},i.onerror=()=>{var r;e(((r=i.error)===null||r===void 0?void 0:r.message)||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pc="FirebaseError";class Oe extends Error{constructor(e,t,s){super(t),this.code=e,this.customData=s,this.name=Pc,Object.setPrototypeOf(this,Oe.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Xt.prototype.create)}}class Xt{constructor(e,t,s){this.service=e,this.serviceName=t,this.errors=s}create(e,...t){const s=t[0]||{},i=`${this.service}/${e}`,r=this.errors[e],o=r?Nc(r,s):"Error",a=`${this.serviceName}: ${o} (${i}).`;return new Oe(i,a,s)}}function Nc(n,e){return n.replace(Oc,(t,s)=>{const i=e[s];return i!=null?String(i):`<${s}?>`})}const Oc=/\{\$([^}]+)}/g;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Dt(n){return JSON.parse(n)}function D(n){return JSON.stringify(n)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xo=function(n){let e={},t={},s={},i="";try{const r=n.split(".");e=Dt(bn(r[0])||""),t=Dt(bn(r[1])||""),i=r[2],s=t.d||{},delete t.d}catch{}return{header:e,claims:t,data:s,signature:i}},Mc=function(n){const e=xo(n),t=e.claims;return!!t&&typeof t=="object"&&t.hasOwnProperty("iat")},Lc=function(n){const e=xo(n).claims;return typeof e=="object"&&e.admin===!0};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function re(n,e){return Object.prototype.hasOwnProperty.call(n,e)}function ot(n,e){if(Object.prototype.hasOwnProperty.call(n,e))return n[e]}function Ts(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function In(n,e,t){const s={};for(const i in n)Object.prototype.hasOwnProperty.call(n,i)&&(s[i]=e.call(t,n[i],i,n));return s}function We(n,e){if(n===e)return!0;const t=Object.keys(n),s=Object.keys(e);for(const i of t){if(!s.includes(i))return!1;const r=n[i],o=e[i];if(ar(r)&&ar(o)){if(!We(r,o))return!1}else if(r!==o)return!1}for(const i of s)if(!t.includes(i))return!1;return!0}function ar(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vt(n){const e=[];for(const[t,s]of Object.entries(n))Array.isArray(s)?s.forEach(i=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(s));return e.length?"&"+e.join("&"):""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xc{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,t){t||(t=0);const s=this.W_;if(typeof e=="string")for(let u=0;u<16;u++)s[u]=e.charCodeAt(t)<<24|e.charCodeAt(t+1)<<16|e.charCodeAt(t+2)<<8|e.charCodeAt(t+3),t+=4;else for(let u=0;u<16;u++)s[u]=e[t]<<24|e[t+1]<<16|e[t+2]<<8|e[t+3],t+=4;for(let u=16;u<80;u++){const d=s[u-3]^s[u-8]^s[u-14]^s[u-16];s[u]=(d<<1|d>>>31)&4294967295}let i=this.chain_[0],r=this.chain_[1],o=this.chain_[2],a=this.chain_[3],l=this.chain_[4],c,h;for(let u=0;u<80;u++){u<40?u<20?(c=a^r&(o^a),h=1518500249):(c=r^o^a,h=1859775393):u<60?(c=r&o|a&(r|o),h=2400959708):(c=r^o^a,h=3395469782);const d=(i<<5|i>>>27)+c+l+h+s[u]&4294967295;l=a,a=o,o=(r<<30|r>>>2)&4294967295,r=i,i=d}this.chain_[0]=this.chain_[0]+i&4294967295,this.chain_[1]=this.chain_[1]+r&4294967295,this.chain_[2]=this.chain_[2]+o&4294967295,this.chain_[3]=this.chain_[3]+a&4294967295,this.chain_[4]=this.chain_[4]+l&4294967295}update(e,t){if(e==null)return;t===void 0&&(t=e.length);const s=t-this.blockSize;let i=0;const r=this.buf_;let o=this.inbuf_;for(;i<t;){if(o===0)for(;i<=s;)this.compress_(e,i),i+=this.blockSize;if(typeof e=="string"){for(;i<t;)if(r[o]=e.charCodeAt(i),++o,++i,o===this.blockSize){this.compress_(r),o=0;break}}else for(;i<t;)if(r[o]=e[i],++o,++i,o===this.blockSize){this.compress_(r),o=0;break}}this.inbuf_=o,this.total_+=t}digest(){const e=[];let t=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let i=this.blockSize-1;i>=56;i--)this.buf_[i]=t&255,t/=256;this.compress_(this.buf_);let s=0;for(let i=0;i<5;i++)for(let r=24;r>=0;r-=8)e[s]=this.chain_[i]>>r&255,++s;return e}}function Dc(n,e){const t=new Fc(n,e);return t.subscribe.bind(t)}class Fc{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(s=>{this.error(s)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,s){let i;if(e===void 0&&t===void 0&&s===void 0)throw new Error("Missing Observer.");Uc(e,["next","error","complete"])?i=e:i={next:e,error:t,complete:s},i.next===void 0&&(i.next=us),i.error===void 0&&(i.error=us),i.complete===void 0&&(i.complete=us);const r=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch{}}),this.observers.push(i),r}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(s){typeof console<"u"&&console.error&&console.error(s)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Uc(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function us(){}function qn(n,e){return`${n} failed: ${e} argument `}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bc=function(n){const e=[];let t=0;for(let s=0;s<n.length;s++){let i=n.charCodeAt(s);if(i>=55296&&i<=56319){const r=i-55296;s++,p(s<n.length,"Surrogate pair missing trail surrogate.");const o=n.charCodeAt(s)-56320;i=65536+(r<<10)+o}i<128?e[t++]=i:i<2048?(e[t++]=i>>6|192,e[t++]=i&63|128):i<65536?(e[t++]=i>>12|224,e[t++]=i>>6&63|128,e[t++]=i&63|128):(e[t++]=i>>18|240,e[t++]=i>>12&63|128,e[t++]=i>>6&63|128,e[t++]=i&63|128)}return e},zn=function(n){let e=0;for(let t=0;t<n.length;t++){const s=n.charCodeAt(t);s<128?e++:s<2048?e+=2:s>=55296&&s<=56319?(e+=4,t++):e+=3}return e};/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function G(n){return n&&n._delegate?n._delegate:n}class Ve{constructor(e,t,s){this.name=e,this.instanceFactory=t,this.type=s,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xe="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $c{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const s=new Jt;if(this.instancesDeferred.set(t,s),this.isInitialized(t)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:t});i&&s.resolve(i)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const s=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),i=(t=e==null?void 0:e.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(s)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:s})}catch(r){if(i)return null;throw r}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Wc(e))try{this.getOrInitializeService({instanceIdentifier:xe})}catch{}for(const[t,s]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(t);try{const r=this.getOrInitializeService({instanceIdentifier:i});s.resolve(r)}catch{}}}}clearInstance(e=xe){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=xe){return this.instances.has(e)}getOptions(e=xe){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,s=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(s))throw Error(`${this.name}(${s}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:s,options:t});for(const[r,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(r);s===a&&o.resolve(i)}return i}onInit(e,t){var s;const i=this.normalizeInstanceIdentifier(t),r=(s=this.onInitCallbacks.get(i))!==null&&s!==void 0?s:new Set;r.add(e),this.onInitCallbacks.set(i,r);const o=this.instances.get(i);return o&&e(o,i),()=>{r.delete(e)}}invokeOnInitCallbacks(e,t){const s=this.onInitCallbacks.get(t);if(s)for(const i of s)try{i(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let s=this.instances.get(e);if(!s&&this.component&&(s=this.component.instanceFactory(this.container,{instanceIdentifier:Hc(e),options:t}),this.instances.set(e,s),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(s,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,s)}catch{}return s||null}normalizeInstanceIdentifier(e=xe){return this.component?this.component.multipleInstances?e:xe:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Hc(n){return n===xe?void 0:n}function Wc(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vc{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new $c(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var A;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(A||(A={}));const Gc={debug:A.DEBUG,verbose:A.VERBOSE,info:A.INFO,warn:A.WARN,error:A.ERROR,silent:A.SILENT},jc=A.INFO,qc={[A.DEBUG]:"log",[A.VERBOSE]:"log",[A.INFO]:"info",[A.WARN]:"warn",[A.ERROR]:"error"},zc=(n,e,...t)=>{if(e<n.logLevel)return;const s=new Date().toISOString(),i=qc[e];if(i)console[i](`[${s}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Xs{constructor(e){this.name=e,this._logLevel=jc,this._logHandler=zc,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in A))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Gc[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,A.DEBUG,...e),this._logHandler(this,A.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,A.VERBOSE,...e),this._logHandler(this,A.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,A.INFO,...e),this._logHandler(this,A.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,A.WARN,...e),this._logHandler(this,A.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,A.ERROR,...e),this._logHandler(this,A.ERROR,...e)}}const Kc=(n,e)=>e.some(t=>n instanceof t);let lr,cr;function Yc(){return lr||(lr=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Qc(){return cr||(cr=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Do=new WeakMap,ks=new WeakMap,Fo=new WeakMap,hs=new WeakMap,Zs=new WeakMap;function Jc(n){const e=new Promise((t,s)=>{const i=()=>{n.removeEventListener("success",r),n.removeEventListener("error",o)},r=()=>{t(Ce(n.result)),i()},o=()=>{s(n.error),i()};n.addEventListener("success",r),n.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&Do.set(t,n)}).catch(()=>{}),Zs.set(e,n),e}function Xc(n){if(ks.has(n))return;const e=new Promise((t,s)=>{const i=()=>{n.removeEventListener("complete",r),n.removeEventListener("error",o),n.removeEventListener("abort",o)},r=()=>{t(),i()},o=()=>{s(n.error||new DOMException("AbortError","AbortError")),i()};n.addEventListener("complete",r),n.addEventListener("error",o),n.addEventListener("abort",o)});ks.set(n,e)}let As={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return ks.get(n);if(e==="objectStoreNames")return n.objectStoreNames||Fo.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return Ce(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function Zc(n){As=n(As)}function ed(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const s=n.call(fs(this),e,...t);return Fo.set(s,e.sort?e.sort():[e]),Ce(s)}:Qc().includes(n)?function(...e){return n.apply(fs(this),e),Ce(Do.get(this))}:function(...e){return Ce(n.apply(fs(this),e))}}function td(n){return typeof n=="function"?ed(n):(n instanceof IDBTransaction&&Xc(n),Kc(n,Yc())?new Proxy(n,As):n)}function Ce(n){if(n instanceof IDBRequest)return Jc(n);if(hs.has(n))return hs.get(n);const e=td(n);return e!==n&&(hs.set(n,e),Zs.set(e,n)),e}const fs=n=>Zs.get(n);function nd(n,e,{blocked:t,upgrade:s,blocking:i,terminated:r}={}){const o=indexedDB.open(n,e),a=Ce(o);return s&&o.addEventListener("upgradeneeded",l=>{s(Ce(o.result),l.oldVersion,l.newVersion,Ce(o.transaction),l)}),t&&o.addEventListener("blocked",l=>t(l.oldVersion,l.newVersion,l)),a.then(l=>{r&&l.addEventListener("close",()=>r()),i&&l.addEventListener("versionchange",c=>i(c.oldVersion,c.newVersion,c))}).catch(()=>{}),a}const sd=["get","getKey","getAll","getAllKeys","count"],id=["put","add","delete","clear"],ps=new Map;function dr(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(ps.get(e))return ps.get(e);const t=e.replace(/FromIndex$/,""),s=e!==t,i=id.includes(t);if(!(t in(s?IDBIndex:IDBObjectStore).prototype)||!(i||sd.includes(t)))return;const r=async function(o,...a){const l=this.transaction(o,i?"readwrite":"readonly");let c=l.store;return s&&(c=c.index(a.shift())),(await Promise.all([c[t](...a),i&&l.done]))[0]};return ps.set(e,r),r}Zc(n=>({...n,get:(e,t,s)=>dr(e,t)||n.get(e,t,s),has:(e,t)=>!!dr(e,t)||n.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rd{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(od(t)){const s=t.getImmediate();return`${s.library}/${s.version}`}else return null}).filter(t=>t).join(" ")}}function od(n){const e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Rs="@firebase/app",ur="0.13.2";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const he=new Xs("@firebase/app"),ad="@firebase/app-compat",ld="@firebase/analytics-compat",cd="@firebase/analytics",dd="@firebase/app-check-compat",ud="@firebase/app-check",hd="@firebase/auth",fd="@firebase/auth-compat",pd="@firebase/database",gd="@firebase/data-connect",md="@firebase/database-compat",_d="@firebase/functions",vd="@firebase/functions-compat",yd="@firebase/installations",wd="@firebase/installations-compat",Ed="@firebase/messaging",Cd="@firebase/messaging-compat",bd="@firebase/performance",Id="@firebase/performance-compat",Sd="@firebase/remote-config",Td="@firebase/remote-config-compat",kd="@firebase/storage",Ad="@firebase/storage-compat",Rd="@firebase/firestore",Pd="@firebase/ai",Nd="@firebase/firestore-compat",Od="firebase",Md="11.10.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ps="[DEFAULT]",Ld={[Rs]:"fire-core",[ad]:"fire-core-compat",[cd]:"fire-analytics",[ld]:"fire-analytics-compat",[ud]:"fire-app-check",[dd]:"fire-app-check-compat",[hd]:"fire-auth",[fd]:"fire-auth-compat",[pd]:"fire-rtdb",[gd]:"fire-data-connect",[md]:"fire-rtdb-compat",[_d]:"fire-fn",[vd]:"fire-fn-compat",[yd]:"fire-iid",[wd]:"fire-iid-compat",[Ed]:"fire-fcm",[Cd]:"fire-fcm-compat",[bd]:"fire-perf",[Id]:"fire-perf-compat",[Sd]:"fire-rc",[Td]:"fire-rc-compat",[kd]:"fire-gcs",[Ad]:"fire-gcs-compat",[Rd]:"fire-fst",[Nd]:"fire-fst-compat",[Pd]:"fire-vertex","fire-js":"fire-js",[Od]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sn=new Map,xd=new Map,Ns=new Map;function hr(n,e){try{n.container.addComponent(e)}catch(t){he.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function at(n){const e=n.name;if(Ns.has(e))return he.debug(`There were multiple attempts to register component ${e}.`),!1;Ns.set(e,n);for(const t of Sn.values())hr(t,n);for(const t of xd.values())hr(t,n);return!0}function ei(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function J(n){return n==null?!1:n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dd={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},be=new Xt("app","Firebase",Dd);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fd{constructor(e,t,s){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=s,this.container.addComponent(new Ve("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw be.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yt=Md;function Uo(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const s=Object.assign({name:Ps,automaticDataCollectionEnabled:!0},e),i=s.name;if(typeof i!="string"||!i)throw be.create("bad-app-name",{appName:String(i)});if(t||(t=Po()),!t)throw be.create("no-options");const r=Sn.get(i);if(r){if(We(t,r.options)&&We(s,r.config))return r;throw be.create("duplicate-app",{appName:i})}const o=new Vc(i);for(const l of Ns.values())o.addComponent(l);const a=new Fd(t,s,o);return Sn.set(i,a),a}function Bo(n=Ps){const e=Sn.get(n);if(!e&&n===Ps&&Po())return Uo();if(!e)throw be.create("no-app",{appName:n});return e}function Ie(n,e,t){var s;let i=(s=Ld[n])!==null&&s!==void 0?s:n;t&&(i+=`-${t}`);const r=i.match(/\s|\//),o=e.match(/\s|\//);if(r||o){const a=[`Unable to register library "${i}" with version "${e}":`];r&&a.push(`library name "${i}" contains illegal characters (whitespace or "/")`),r&&o&&a.push("and"),o&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),he.warn(a.join(" "));return}at(new Ve(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ud="firebase-heartbeat-database",Bd=1,Ft="firebase-heartbeat-store";let gs=null;function $o(){return gs||(gs=nd(Ud,Bd,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(Ft)}catch(t){console.warn(t)}}}}).catch(n=>{throw be.create("idb-open",{originalErrorMessage:n.message})})),gs}async function $d(n){try{const t=(await $o()).transaction(Ft),s=await t.objectStore(Ft).get(Ho(n));return await t.done,s}catch(e){if(e instanceof Oe)he.warn(e.message);else{const t=be.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});he.warn(t.message)}}}async function fr(n,e){try{const s=(await $o()).transaction(Ft,"readwrite");await s.objectStore(Ft).put(e,Ho(n)),await s.done}catch(t){if(t instanceof Oe)he.warn(t.message);else{const s=be.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});he.warn(s.message)}}}function Ho(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hd=1024,Wd=30;class Vd{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new jd(t),this._heartbeatsCachePromise=this._storage.read().then(s=>(this._heartbeatsCache=s,s))}async triggerHeartbeat(){var e,t;try{const i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=pr();if(((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(o=>o.date===r))return;if(this._heartbeatsCache.heartbeats.push({date:r,agent:i}),this._heartbeatsCache.heartbeats.length>Wd){const o=qd(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(o,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(s){he.warn(s)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=pr(),{heartbeatsToSend:s,unsentEntries:i}=Gd(this._heartbeatsCache.heartbeats),r=Cn(JSON.stringify({version:2,heartbeats:s}));return this._heartbeatsCache.lastSentHeartbeatDate=t,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),r}catch(t){return he.warn(t),""}}}function pr(){return new Date().toISOString().substring(0,10)}function Gd(n,e=Hd){const t=[];let s=n.slice();for(const i of n){const r=t.find(o=>o.agent===i.agent);if(r){if(r.dates.push(i.date),gr(t)>e){r.dates.pop();break}}else if(t.push({agent:i.agent,dates:[i.date]}),gr(t)>e){t.pop();break}s=s.slice(1)}return{heartbeatsToSend:t,unsentEntries:s}}class jd{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Ac()?Rc().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await $d(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const i=await this.read();return fr(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){const i=await this.read();return fr(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}}function gr(n){return Cn(JSON.stringify({version:2,heartbeats:n})).length}function qd(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let s=1;s<n.length;s++)n[s].date<t&&(t=n[s].date,e=s);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zd(n){at(new Ve("platform-logger",e=>new rd(e),"PRIVATE")),at(new Ve("heartbeat",e=>new Vd(e),"PRIVATE")),Ie(Rs,ur,n),Ie(Rs,ur,"esm2017"),Ie("fire-js","")}zd("");function ti(n,e){var t={};for(var s in n)Object.prototype.hasOwnProperty.call(n,s)&&e.indexOf(s)<0&&(t[s]=n[s]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,s=Object.getOwnPropertySymbols(n);i<s.length;i++)e.indexOf(s[i])<0&&Object.prototype.propertyIsEnumerable.call(n,s[i])&&(t[s[i]]=n[s[i]]);return t}function Wo(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const Kd=Wo,Vo=new Xt("auth","Firebase",Wo());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tn=new Xs("@firebase/auth");function Yd(n,...e){Tn.logLevel<=A.WARN&&Tn.warn(`Auth (${yt}): ${n}`,...e)}function mn(n,...e){Tn.logLevel<=A.ERROR&&Tn.error(`Auth (${yt}): ${n}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ie(n,...e){throw si(n,...e)}function te(n,...e){return si(n,...e)}function ni(n,e,t){const s=Object.assign(Object.assign({},Kd()),{[e]:t});return new Xt("auth","Firebase",s).create(e,{appName:n.name})}function $e(n){return ni(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Qd(n,e,t){const s=t;if(!(e instanceof s))throw s.name!==e.constructor.name&&ie(n,"argument-error"),ni(n,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function si(n,...e){if(typeof n!="string"){const t=e[0],s=[...e.slice(1)];return s[0]&&(s[0].appName=n.name),n._errorFactory.create(t,...s)}return Vo.create(n,...e)}function y(n,e,...t){if(!n)throw si(e,...t)}function le(n){const e="INTERNAL ASSERTION FAILED: "+n;throw mn(e),new Error(e)}function fe(n,e){n||le(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Os(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.href)||""}function Jd(){return mr()==="http:"||mr()==="https:"}function mr(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xd(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Jd()||Sc()||"connection"in navigator)?navigator.onLine:!0}function Zd(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zt{constructor(e,t){this.shortDelay=e,this.longDelay=t,fe(t>e,"Short delay should be less than long delay!"),this.isMobile=Js()||Lo()}get(){return Xd()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ii(n,e){fe(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Go{static initialize(e,t,s){this.fetchImpl=e,t&&(this.headersImpl=t),s&&(this.responseImpl=s)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;le("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;le("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;le("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const eu={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tu=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],nu=new Zt(3e4,6e4);function ri(n,e){return n.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:n.tenantId}):e}async function wt(n,e,t,s,i={}){return jo(n,i,async()=>{let r={},o={};s&&(e==="GET"?o=s:r={body:JSON.stringify(s)});const a=vt(Object.assign({key:n.config.apiKey},o)).slice(1),l=await n._getAdditionalHeaders();l["Content-Type"]="application/json",n.languageCode&&(l["X-Firebase-Locale"]=n.languageCode);const c=Object.assign({method:e,headers:l},r);return Ic()||(c.referrerPolicy="no-referrer"),n.emulatorConfig&&_t(n.emulatorConfig.host)&&(c.credentials="include"),Go.fetch()(await qo(n,n.config.apiHost,t,a),c)})}async function jo(n,e,t){n._canInitEmulator=!1;const s=Object.assign(Object.assign({},eu),e);try{const i=new iu(n),r=await Promise.race([t(),i.promise]);i.clearNetworkTimeout();const o=await r.json();if("needConfirmation"in o)throw un(n,"account-exists-with-different-credential",o);if(r.ok&&!("errorMessage"in o))return o;{const a=r.ok?o.errorMessage:o.error.message,[l,c]=a.split(" : ");if(l==="FEDERATED_USER_ID_ALREADY_LINKED")throw un(n,"credential-already-in-use",o);if(l==="EMAIL_EXISTS")throw un(n,"email-already-in-use",o);if(l==="USER_DISABLED")throw un(n,"user-disabled",o);const h=s[l]||l.toLowerCase().replace(/[_\s]+/g,"-");if(c)throw ni(n,h,c);ie(n,h)}}catch(i){if(i instanceof Oe)throw i;ie(n,"network-request-failed",{message:String(i)})}}async function su(n,e,t,s,i={}){const r=await wt(n,e,t,s,i);return"mfaPendingCredential"in r&&ie(n,"multi-factor-auth-required",{_serverResponse:r}),r}async function qo(n,e,t,s){const i=`${e}${t}?${s}`,r=n,o=r.config.emulator?ii(n.config,i):`${n.config.apiScheme}://${i}`;return tu.includes(t)&&(await r._persistenceManagerAvailable,r._getPersistenceType()==="COOKIE")?r._getPersistence()._getFinalTarget(o).toString():o}class iu{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,s)=>{this.timer=setTimeout(()=>s(te(this.auth,"network-request-failed")),nu.get())})}}function un(n,e,t){const s={appName:n.name};t.email&&(s.email=t.email),t.phoneNumber&&(s.phoneNumber=t.phoneNumber);const i=te(n,e,s);return i.customData._tokenResponse=t,i}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ru(n,e){return wt(n,"POST","/v1/accounts:delete",e)}async function kn(n,e){return wt(n,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pt(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function ou(n,e=!1){const t=G(n),s=await t.getIdToken(e),i=oi(s);y(i&&i.exp&&i.auth_time&&i.iat,t.auth,"internal-error");const r=typeof i.firebase=="object"?i.firebase:void 0,o=r==null?void 0:r.sign_in_provider;return{claims:i,token:s,authTime:Pt(ms(i.auth_time)),issuedAtTime:Pt(ms(i.iat)),expirationTime:Pt(ms(i.exp)),signInProvider:o||null,signInSecondFactor:(r==null?void 0:r.sign_in_second_factor)||null}}function ms(n){return Number(n)*1e3}function oi(n){const[e,t,s]=n.split(".");if(e===void 0||t===void 0||s===void 0)return mn("JWT malformed, contained fewer than 3 sections"),null;try{const i=bn(t);return i?JSON.parse(i):(mn("Failed to decode base64 JWT payload"),null)}catch(i){return mn("Caught error parsing JWT payload as JSON",i==null?void 0:i.toString()),null}}function _r(n){const e=oi(n);return y(e,"internal-error"),y(typeof e.exp<"u","internal-error"),y(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ut(n,e,t=!1){if(t)return e;try{return await e}catch(s){throw s instanceof Oe&&au(s)&&n.auth.currentUser===n&&await n.auth.signOut(),s}}function au({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lu{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){const s=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),s}else{this.errorBackoff=3e4;const i=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,i)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ms{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Pt(this.lastLoginAt),this.creationTime=Pt(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function An(n){var e;const t=n.auth,s=await n.getIdToken(),i=await Ut(n,kn(t,{idToken:s}));y(i==null?void 0:i.users.length,t,"internal-error");const r=i.users[0];n._notifyReloadListener(r);const o=!((e=r.providerUserInfo)===null||e===void 0)&&e.length?zo(r.providerUserInfo):[],a=du(n.providerData,o),l=n.isAnonymous,c=!(n.email&&r.passwordHash)&&!(a!=null&&a.length),h=l?c:!1,u={uid:r.localId,displayName:r.displayName||null,photoURL:r.photoUrl||null,email:r.email||null,emailVerified:r.emailVerified||!1,phoneNumber:r.phoneNumber||null,tenantId:r.tenantId||null,providerData:a,metadata:new Ms(r.createdAt,r.lastLoginAt),isAnonymous:h};Object.assign(n,u)}async function cu(n){const e=G(n);await An(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function du(n,e){return[...n.filter(s=>!e.some(i=>i.providerId===s.providerId)),...e]}function zo(n){return n.map(e=>{var{providerId:t}=e,s=ti(e,["providerId"]);return{providerId:t,uid:s.rawId||"",displayName:s.displayName||null,email:s.email||null,phoneNumber:s.phoneNumber||null,photoURL:s.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function uu(n,e){const t=await jo(n,{},async()=>{const s=vt({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:r}=n.config,o=await qo(n,i,"/v1/token",`key=${r}`),a=await n._getAdditionalHeaders();a["Content-Type"]="application/x-www-form-urlencoded";const l={method:"POST",headers:a,body:s};return n.emulatorConfig&&_t(n.emulatorConfig.host)&&(l.credentials="include"),Go.fetch()(o,l)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function hu(n,e){return wt(n,"POST","/v2/accounts:revokeToken",ri(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class et{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){y(e.idToken,"internal-error"),y(typeof e.idToken<"u","internal-error"),y(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):_r(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){y(e.length!==0,"internal-error");const t=_r(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(y(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:s,refreshToken:i,expiresIn:r}=await uu(e,t);this.updateTokensAndExpiration(s,i,Number(r))}updateTokensAndExpiration(e,t,s){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+s*1e3}static fromJSON(e,t){const{refreshToken:s,accessToken:i,expirationTime:r}=t,o=new et;return s&&(y(typeof s=="string","internal-error",{appName:e}),o.refreshToken=s),i&&(y(typeof i=="string","internal-error",{appName:e}),o.accessToken=i),r&&(y(typeof r=="number","internal-error",{appName:e}),o.expirationTime=r),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new et,this.toJSON())}_performRefresh(){return le("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _e(n,e){y(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class Z{constructor(e){var{uid:t,auth:s,stsTokenManager:i}=e,r=ti(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new lu(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=s,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=r.displayName||null,this.email=r.email||null,this.emailVerified=r.emailVerified||!1,this.phoneNumber=r.phoneNumber||null,this.photoURL=r.photoURL||null,this.isAnonymous=r.isAnonymous||!1,this.tenantId=r.tenantId||null,this.providerData=r.providerData?[...r.providerData]:[],this.metadata=new Ms(r.createdAt||void 0,r.lastLoginAt||void 0)}async getIdToken(e){const t=await Ut(this,this.stsTokenManager.getToken(this.auth,e));return y(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return ou(this,e)}reload(){return cu(this)}_assign(e){this!==e&&(y(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new Z(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){y(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let s=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),s=!0),t&&await An(this),await this.auth._persistUserIfCurrent(this),s&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(J(this.auth.app))return Promise.reject($e(this.auth));const e=await this.getIdToken();return await Ut(this,ru(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var s,i,r,o,a,l,c,h;const u=(s=t.displayName)!==null&&s!==void 0?s:void 0,d=(i=t.email)!==null&&i!==void 0?i:void 0,f=(r=t.phoneNumber)!==null&&r!==void 0?r:void 0,m=(o=t.photoURL)!==null&&o!==void 0?o:void 0,S=(a=t.tenantId)!==null&&a!==void 0?a:void 0,O=(l=t._redirectEventId)!==null&&l!==void 0?l:void 0,q=(c=t.createdAt)!==null&&c!==void 0?c:void 0,z=(h=t.lastLoginAt)!==null&&h!==void 0?h:void 0,{uid:Q,emailVerified:Je,isAnonymous:nr,providerData:ls,stsTokenManager:sr}=t;y(Q&&sr,e,"internal-error");const ql=et.fromJSON(this.name,sr);y(typeof Q=="string",e,"internal-error"),_e(u,e.name),_e(d,e.name),y(typeof Je=="boolean",e,"internal-error"),y(typeof nr=="boolean",e,"internal-error"),_e(f,e.name),_e(m,e.name),_e(S,e.name),_e(O,e.name),_e(q,e.name),_e(z,e.name);const cs=new Z({uid:Q,auth:e,email:d,emailVerified:Je,displayName:u,isAnonymous:nr,photoURL:m,phoneNumber:f,tenantId:S,stsTokenManager:ql,createdAt:q,lastLoginAt:z});return ls&&Array.isArray(ls)&&(cs.providerData=ls.map(zl=>Object.assign({},zl))),O&&(cs._redirectEventId=O),cs}static async _fromIdTokenResponse(e,t,s=!1){const i=new et;i.updateFromServerResponse(t);const r=new Z({uid:t.localId,auth:e,stsTokenManager:i,isAnonymous:s});return await An(r),r}static async _fromGetAccountInfoResponse(e,t,s){const i=t.users[0];y(i.localId!==void 0,"internal-error");const r=i.providerUserInfo!==void 0?zo(i.providerUserInfo):[],o=!(i.email&&i.passwordHash)&&!(r!=null&&r.length),a=new et;a.updateFromIdToken(s);const l=new Z({uid:i.localId,auth:e,stsTokenManager:a,isAnonymous:o}),c={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:r,metadata:new Ms(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash)&&!(r!=null&&r.length)};return Object.assign(l,c),l}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vr=new Map;function ce(n){fe(n instanceof Function,"Expected a class definition");let e=vr.get(n);return e?(fe(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,vr.set(n,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ko{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}Ko.type="NONE";const yr=Ko;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _n(n,e,t){return`firebase:${n}:${e}:${t}`}class tt{constructor(e,t,s){this.persistence=e,this.auth=t,this.userKey=s;const{config:i,name:r}=this.auth;this.fullUserKey=_n(this.userKey,i.apiKey,r),this.fullPersistenceKey=_n("persistence",i.apiKey,r),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await kn(this.auth,{idToken:e}).catch(()=>{});return t?Z._fromGetAccountInfoResponse(this.auth,t,e):null}return Z._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,s="authUser"){if(!t.length)return new tt(ce(yr),e,s);const i=(await Promise.all(t.map(async c=>{if(await c._isAvailable())return c}))).filter(c=>c);let r=i[0]||ce(yr);const o=_n(s,e.config.apiKey,e.name);let a=null;for(const c of t)try{const h=await c._get(o);if(h){let u;if(typeof h=="string"){const d=await kn(e,{idToken:h}).catch(()=>{});if(!d)break;u=await Z._fromGetAccountInfoResponse(e,d,h)}else u=Z._fromJSON(e,h);c!==r&&(a=u),r=c;break}}catch{}const l=i.filter(c=>c._shouldAllowMigration);return!r._shouldAllowMigration||!l.length?new tt(r,e,s):(r=l[0],a&&await r._set(o,a.toJSON()),await Promise.all(t.map(async c=>{if(c!==r)try{await c._remove(o)}catch{}})),new tt(r,e,s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wr(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Xo(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Yo(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(ea(e))return"Blackberry";if(ta(e))return"Webos";if(Qo(e))return"Safari";if((e.includes("chrome/")||Jo(e))&&!e.includes("edge/"))return"Chrome";if(Zo(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,s=n.match(t);if((s==null?void 0:s.length)===2)return s[1]}return"Other"}function Yo(n=V()){return/firefox\//i.test(n)}function Qo(n=V()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Jo(n=V()){return/crios\//i.test(n)}function Xo(n=V()){return/iemobile/i.test(n)}function Zo(n=V()){return/android/i.test(n)}function ea(n=V()){return/blackberry/i.test(n)}function ta(n=V()){return/webos/i.test(n)}function ai(n=V()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function fu(n=V()){var e;return ai(n)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function pu(){return Tc()&&document.documentMode===10}function na(n=V()){return ai(n)||Zo(n)||ta(n)||ea(n)||/windows phone/i.test(n)||Xo(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sa(n,e=[]){let t;switch(n){case"Browser":t=wr(V());break;case"Worker":t=`${wr(V())}-${n}`;break;default:t=n}const s=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${yt}/${s}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gu{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const s=r=>new Promise((o,a)=>{try{const l=e(r);o(l)}catch(l){a(l)}});s.onAbort=t,this.queue.push(s);const i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const s of this.queue)await s(e),s.onAbort&&t.push(s.onAbort)}catch(s){t.reverse();for(const i of t)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:s==null?void 0:s.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function mu(n,e={}){return wt(n,"GET","/v2/passwordPolicy",ri(n,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _u=6;class vu{constructor(e){var t,s,i,r;const o=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(t=o.minPasswordLength)!==null&&t!==void 0?t:_u,o.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=o.maxPasswordLength),o.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=o.containsLowercaseCharacter),o.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=o.containsUppercaseCharacter),o.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=o.containsNumericCharacter),o.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=o.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(i=(s=e.allowedNonAlphanumericCharacters)===null||s===void 0?void 0:s.join(""))!==null&&i!==void 0?i:"",this.forceUpgradeOnSignin=(r=e.forceUpgradeOnSignin)!==null&&r!==void 0?r:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,s,i,r,o,a;const l={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,l),this.validatePasswordCharacterOptions(e,l),l.isValid&&(l.isValid=(t=l.meetsMinPasswordLength)!==null&&t!==void 0?t:!0),l.isValid&&(l.isValid=(s=l.meetsMaxPasswordLength)!==null&&s!==void 0?s:!0),l.isValid&&(l.isValid=(i=l.containsLowercaseLetter)!==null&&i!==void 0?i:!0),l.isValid&&(l.isValid=(r=l.containsUppercaseLetter)!==null&&r!==void 0?r:!0),l.isValid&&(l.isValid=(o=l.containsNumericCharacter)!==null&&o!==void 0?o:!0),l.isValid&&(l.isValid=(a=l.containsNonAlphanumericCharacter)!==null&&a!==void 0?a:!0),l}validatePasswordLengthOptions(e,t){const s=this.customStrengthOptions.minPasswordLength,i=this.customStrengthOptions.maxPasswordLength;s&&(t.meetsMinPasswordLength=e.length>=s),i&&(t.meetsMaxPasswordLength=e.length<=i)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let s;for(let i=0;i<e.length;i++)s=e.charAt(i),this.updatePasswordCharacterOptionsStatuses(t,s>="a"&&s<="z",s>="A"&&s<="Z",s>="0"&&s<="9",this.allowedNonAlphanumericCharacters.includes(s))}updatePasswordCharacterOptionsStatuses(e,t,s,i,r){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=s)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=i)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yu{constructor(e,t,s,i){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=s,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Er(this),this.idTokenSubscription=new Er(this),this.beforeStateQueue=new gu(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Vo,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion,this._persistenceManagerAvailable=new Promise(r=>this._resolvePersistenceManagerAvailable=r)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=ce(t)),this._initializationPromise=this.queue(async()=>{var s,i,r;if(!this._deleted&&(this.persistenceManager=await tt.create(this,e),(s=this._resolvePersistenceManagerAvailable)===null||s===void 0||s.call(this),!this._deleted)){if(!((i=this._popupRedirectResolver)===null||i===void 0)&&i._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((r=this.currentUser)===null||r===void 0?void 0:r.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await kn(this,{idToken:e}),s=await Z._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(s)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(J(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(a=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(a,a))}):this.directlySetCurrentUser(null)}const s=await this.assertedPersistence.getCurrentUser();let i=s,r=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,a=i==null?void 0:i._redirectEventId,l=await this.tryRedirectSignIn(e);(!o||o===a)&&(l!=null&&l.user)&&(i=l.user,r=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(r)try{await this.beforeStateQueue.runMiddleware(i)}catch(o){i=s,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return y(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await An(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=Zd()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(J(this.app))return Promise.reject($e(this));const t=e?G(e):null;return t&&y(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&y(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return J(this.app)?Promise.reject($e(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return J(this.app)?Promise.reject($e(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(ce(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await mu(this),t=new vu(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new Xt("auth","Firebase",e())}onAuthStateChanged(e,t,s){return this.registerStateListener(this.authStateSubscription,e,t,s)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,s){return this.registerStateListener(this.idTokenSubscription,e,t,s)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const s=this.onAuthStateChanged(()=>{s(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),s={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(s.tenantId=this.tenantId),await hu(this,s)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){const s=await this.getOrInitRedirectPersistenceManager(t);return e===null?s.removeCurrentUser():s.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&ce(e)||this._popupRedirectResolver;y(t,this,"argument-error"),this.redirectPersistenceManager=await tt.create(this,[ce(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,s;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((s=this.redirectUser)===null||s===void 0?void 0:s._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const s=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==s&&(this.lastNotifiedUid=s,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,s,i){if(this._deleted)return()=>{};const r=typeof t=="function"?t:t.next.bind(t);let o=!1;const a=this._isInitialized?Promise.resolve():this._initializationPromise;if(y(a,this,"internal-error"),a.then(()=>{o||r(this.currentUser)}),typeof t=="function"){const l=e.addObserver(t,s,i);return()=>{o=!0,l()}}else{const l=e.addObserver(t);return()=>{o=!0,l()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return y(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=sa(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const s=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());s&&(t["X-Firebase-Client"]=s);const i=await this._getAppCheckToken();return i&&(t["X-Firebase-AppCheck"]=i),t}async _getAppCheckToken(){var e;if(J(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return t!=null&&t.error&&Yd(`Error while retrieving App Check token: ${t.error}`),t==null?void 0:t.token}}function Kn(n){return G(n)}class Er{constructor(e){this.auth=e,this.observer=null,this.addObserver=Dc(t=>this.observer=t)}get next(){return y(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let li={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function wu(n){li=n}function Eu(n){return li.loadJS(n)}function Cu(){return li.gapiScript}function bu(n){return`__${n}${Math.floor(Math.random()*1e6)}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Iu(n,e){const t=ei(n,"auth");if(t.isInitialized()){const i=t.getImmediate(),r=t.getOptions();if(We(r,e??{}))return i;ie(i,"already-initialized")}return t.initialize({options:e})}function Su(n,e){const t=(e==null?void 0:e.persistence)||[],s=(Array.isArray(t)?t:[t]).map(ce);e!=null&&e.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(s,e==null?void 0:e.popupRedirectResolver)}function Tu(n,e,t){const s=Kn(n);y(/^https?:\/\//.test(e),s,"invalid-emulator-scheme");const i=!1,r=ia(e),{host:o,port:a}=ku(e),l=a===null?"":`:${a}`,c={url:`${r}//${o}${l}/`},h=Object.freeze({host:o,port:a,protocol:r.replace(":",""),options:Object.freeze({disableWarnings:i})});if(!s._canInitEmulator){y(s.config.emulator&&s.emulatorConfig,s,"emulator-config-failed"),y(We(c,s.config.emulator)&&We(h,s.emulatorConfig),s,"emulator-config-failed");return}s.config.emulator=c,s.emulatorConfig=h,s.settings.appVerificationDisabledForTesting=!0,_t(o)?(Oo(`${r}//${o}${l}`),Mo("Auth",!0)):Au()}function ia(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function ku(n){const e=ia(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const s=t[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(s);if(i){const r=i[1];return{host:r,port:Cr(s.substr(r.length+1))}}else{const[r,o]=s.split(":");return{host:r,port:Cr(o)}}}function Cr(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function Au(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ra{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return le("not implemented")}_getIdTokenResponse(e){return le("not implemented")}_linkToIdToken(e,t){return le("not implemented")}_getReauthenticationResolver(e){return le("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function nt(n,e){return su(n,"POST","/v1/accounts:signInWithIdp",ri(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ru="http://localhost";class Ge extends ra{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new Ge(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):ie("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:s,signInMethod:i}=t,r=ti(t,["providerId","signInMethod"]);if(!s||!i)return null;const o=new Ge(s,i);return o.idToken=r.idToken||void 0,o.accessToken=r.accessToken||void 0,o.secret=r.secret,o.nonce=r.nonce,o.pendingToken=r.pendingToken||null,o}_getIdTokenResponse(e){const t=this.buildRequest();return nt(e,t)}_linkToIdToken(e,t){const s=this.buildRequest();return s.idToken=t,nt(e,s)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,nt(e,t)}buildRequest(){const e={requestUri:Ru,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=vt(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ci{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class en extends ci{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ve extends en{constructor(){super("facebook.com")}static credential(e){return Ge._fromParams({providerId:ve.PROVIDER_ID,signInMethod:ve.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return ve.credentialFromTaggedObject(e)}static credentialFromError(e){return ve.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return ve.credential(e.oauthAccessToken)}catch{return null}}}ve.FACEBOOK_SIGN_IN_METHOD="facebook.com";ve.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oe extends en{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return Ge._fromParams({providerId:oe.PROVIDER_ID,signInMethod:oe.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return oe.credentialFromTaggedObject(e)}static credentialFromError(e){return oe.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:s}=e;if(!t&&!s)return null;try{return oe.credential(t,s)}catch{return null}}}oe.GOOGLE_SIGN_IN_METHOD="google.com";oe.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ye extends en{constructor(){super("github.com")}static credential(e){return Ge._fromParams({providerId:ye.PROVIDER_ID,signInMethod:ye.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return ye.credentialFromTaggedObject(e)}static credentialFromError(e){return ye.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return ye.credential(e.oauthAccessToken)}catch{return null}}}ye.GITHUB_SIGN_IN_METHOD="github.com";ye.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class we extends en{constructor(){super("twitter.com")}static credential(e,t){return Ge._fromParams({providerId:we.PROVIDER_ID,signInMethod:we.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return we.credentialFromTaggedObject(e)}static credentialFromError(e){return we.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:s}=e;if(!t||!s)return null;try{return we.credential(t,s)}catch{return null}}}we.TWITTER_SIGN_IN_METHOD="twitter.com";we.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lt{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,s,i=!1){const r=await Z._fromIdTokenResponse(e,s,i),o=br(s);return new lt({user:r,providerId:o,_tokenResponse:s,operationType:t})}static async _forOperation(e,t,s){await e._updateTokensIfNecessary(s,!0);const i=br(s);return new lt({user:e,providerId:i,_tokenResponse:s,operationType:t})}}function br(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rn extends Oe{constructor(e,t,s,i){var r;super(t.code,t.message),this.operationType=s,this.user=i,Object.setPrototypeOf(this,Rn.prototype),this.customData={appName:e.name,tenantId:(r=e.tenantId)!==null&&r!==void 0?r:void 0,_serverResponse:t.customData._serverResponse,operationType:s}}static _fromErrorAndOperation(e,t,s,i){return new Rn(e,t,s,i)}}function oa(n,e,t,s){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(r=>{throw r.code==="auth/multi-factor-auth-required"?Rn._fromErrorAndOperation(n,r,e,s):r})}async function Pu(n,e,t=!1){const s=await Ut(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return lt._forOperation(n,"link",s)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Nu(n,e,t=!1){const{auth:s}=n;if(J(s.app))return Promise.reject($e(s));const i="reauthenticate";try{const r=await Ut(n,oa(s,i,e,n),t);y(r.idToken,s,"internal-error");const o=oi(r.idToken);y(o,s,"internal-error");const{sub:a}=o;return y(n.uid===a,s,"user-mismatch"),lt._forOperation(n,i,r)}catch(r){throw(r==null?void 0:r.code)==="auth/user-not-found"&&ie(s,"user-mismatch"),r}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ou(n,e,t=!1){if(J(n.app))return Promise.reject($e(n));const s="signIn",i=await oa(n,s,e),r=await lt._fromIdTokenResponse(n,s,i);return t||await n._updateCurrentUser(r.user),r}function Mu(n,e,t,s){return G(n).onIdTokenChanged(e,t,s)}function Lu(n,e,t){return G(n).beforeAuthStateChanged(e,t)}function xu(n,e,t,s){return G(n).onAuthStateChanged(e,t,s)}function Du(n){return G(n).signOut()}const Pn="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aa{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Pn,"1"),this.storage.removeItem(Pn),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fu=1e3,Uu=10;class la extends aa{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=na(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const s=this.storage.getItem(t),i=this.localCache[t];s!==i&&e(t,i,s)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((o,a,l)=>{this.notifyListeners(o,l)});return}const s=e.key;t?this.detachListener():this.stopPolling();const i=()=>{const o=this.storage.getItem(s);!t&&this.localCache[s]===o||this.notifyListeners(s,o)},r=this.storage.getItem(s);pu()&&r!==e.newValue&&e.newValue!==e.oldValue?setTimeout(i,Uu):i()}notifyListeners(e,t){this.localCache[e]=t;const s=this.listeners[e];if(s)for(const i of Array.from(s))i(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,s)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:s}),!0)})},Fu)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}la.type="LOCAL";const Bu=la;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ca extends aa{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}ca.type="SESSION";const da=ca;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $u(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yn{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(i=>i.isListeningto(e));if(t)return t;const s=new Yn(e);return this.receivers.push(s),s}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:s,eventType:i,data:r}=t.data,o=this.handlersMap[i];if(!(o!=null&&o.size))return;t.ports[0].postMessage({status:"ack",eventId:s,eventType:i});const a=Array.from(o).map(async c=>c(t.origin,r)),l=await $u(a);t.ports[0].postMessage({status:"done",eventId:s,eventType:i,response:l})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Yn.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function di(n="",e=10){let t="";for(let s=0;s<e;s++)t+=Math.floor(Math.random()*10);return n+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hu{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,s=50){const i=typeof MessageChannel<"u"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let r,o;return new Promise((a,l)=>{const c=di("",20);i.port1.start();const h=setTimeout(()=>{l(new Error("unsupported_event"))},s);o={messageChannel:i,onMessage(u){const d=u;if(d.data.eventId===c)switch(d.data.status){case"ack":clearTimeout(h),r=setTimeout(()=>{l(new Error("timeout"))},3e3);break;case"done":clearTimeout(r),a(d.data.response);break;default:clearTimeout(h),clearTimeout(r),l(new Error("invalid_response"));break}}},this.handlers.add(o),i.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:c,data:t},[i.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function se(){return window}function Wu(n){se().location.href=n}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ua(){return typeof se().WorkerGlobalScope<"u"&&typeof se().importScripts=="function"}async function Vu(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function Gu(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)===null||n===void 0?void 0:n.controller)||null}function ju(){return ua()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ha="firebaseLocalStorageDb",qu=1,Nn="firebaseLocalStorage",fa="fbase_key";class tn{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function Qn(n,e){return n.transaction([Nn],e?"readwrite":"readonly").objectStore(Nn)}function zu(){const n=indexedDB.deleteDatabase(ha);return new tn(n).toPromise()}function Ls(){const n=indexedDB.open(ha,qu);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const s=n.result;try{s.createObjectStore(Nn,{keyPath:fa})}catch(i){t(i)}}),n.addEventListener("success",async()=>{const s=n.result;s.objectStoreNames.contains(Nn)?e(s):(s.close(),await zu(),e(await Ls()))})})}async function Ir(n,e,t){const s=Qn(n,!0).put({[fa]:e,value:t});return new tn(s).toPromise()}async function Ku(n,e){const t=Qn(n,!1).get(e),s=await new tn(t).toPromise();return s===void 0?null:s.value}function Sr(n,e){const t=Qn(n,!0).delete(e);return new tn(t).toPromise()}const Yu=800,Qu=3;class pa{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Ls(),this.db)}async _withRetries(e){let t=0;for(;;)try{const s=await this._openDb();return await e(s)}catch(s){if(t++>Qu)throw s;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return ua()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Yn._getInstance(ju()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await Vu(),!this.activeServiceWorker)return;this.sender=new Hu(this.activeServiceWorker);const s=await this.sender._send("ping",{},800);s&&!((e=s[0])===null||e===void 0)&&e.fulfilled&&!((t=s[0])===null||t===void 0)&&t.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||Gu()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Ls();return await Ir(e,Pn,"1"),await Sr(e,Pn),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(s=>Ir(s,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(s=>Ku(s,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>Sr(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(i=>{const r=Qn(i,!1).getAll();return new tn(r).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],s=new Set;if(e.length!==0)for(const{fbase_key:i,value:r}of e)s.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(r)&&(this.notifyListeners(i,r),t.push(i));for(const i of Object.keys(this.localCache))this.localCache[i]&&!s.has(i)&&(this.notifyListeners(i,null),t.push(i));return t}notifyListeners(e,t){this.localCache[e]=t;const s=this.listeners[e];if(s)for(const i of Array.from(s))i(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Yu)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}pa.type="LOCAL";const Ju=pa;new Zt(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ga(n,e){return e?ce(e):(y(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ui extends ra{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return nt(e,this._buildIdpRequest())}_linkToIdToken(e,t){return nt(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return nt(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function Xu(n){return Ou(n.auth,new ui(n),n.bypassAuthState)}function Zu(n){const{auth:e,user:t}=n;return y(t,e,"internal-error"),Nu(t,new ui(n),n.bypassAuthState)}async function eh(n){const{auth:e,user:t}=n;return y(t,e,"internal-error"),Pu(t,new ui(n),n.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ma{constructor(e,t,s,i,r=!1){this.auth=e,this.resolver=s,this.user=i,this.bypassAuthState=r,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(s){this.reject(s)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:s,postBody:i,tenantId:r,error:o,type:a}=e;if(o){this.reject(o);return}const l={auth:this.auth,requestUri:t,sessionId:s,tenantId:r||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(l))}catch(c){this.reject(c)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return Xu;case"linkViaPopup":case"linkViaRedirect":return eh;case"reauthViaPopup":case"reauthViaRedirect":return Zu;default:ie(this.auth,"internal-error")}}resolve(e){fe(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){fe(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const th=new Zt(2e3,1e4);async function nh(n,e,t){if(J(n.app))return Promise.reject(te(n,"operation-not-supported-in-this-environment"));const s=Kn(n);Qd(n,e,ci);const i=ga(s,t);return new Fe(s,"signInViaPopup",e,i).executeNotNull()}class Fe extends ma{constructor(e,t,s,i,r){super(e,t,i,r),this.provider=s,this.authWindow=null,this.pollId=null,Fe.currentPopupAction&&Fe.currentPopupAction.cancel(),Fe.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return y(e,this.auth,"internal-error"),e}async onExecution(){fe(this.filter.length===1,"Popup operations only handle one event");const e=di();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(te(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(te(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Fe.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,s;if(!((s=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||s===void 0)&&s.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(te(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,th.get())};e()}}Fe.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sh="pendingRedirect",vn=new Map;class ih extends ma{constructor(e,t,s=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,s),this.eventId=null}async execute(){let e=vn.get(this.auth._key());if(!e){try{const s=await rh(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(s)}catch(t){e=()=>Promise.reject(t)}vn.set(this.auth._key(),e)}return this.bypassAuthState||vn.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function rh(n,e){const t=lh(e),s=ah(n);if(!await s._isAvailable())return!1;const i=await s._get(t)==="true";return await s._remove(t),i}function oh(n,e){vn.set(n._key(),e)}function ah(n){return ce(n._redirectPersistence)}function lh(n){return _n(sh,n.config.apiKey,n.name)}async function ch(n,e,t=!1){if(J(n.app))return Promise.reject($e(n));const s=Kn(n),i=ga(s,e),o=await new ih(s,i,t).execute();return o&&!t&&(delete o.user._redirectEventId,await s._persistUserIfCurrent(o.user),await s._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dh=10*60*1e3;class uh{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(s=>{this.isEventForConsumer(e,s)&&(t=!0,this.sendToConsumer(e,s),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!hh(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var s;if(e.error&&!_a(e)){const i=((s=e.error.code)===null||s===void 0?void 0:s.split("auth/")[1])||"internal-error";t.onError(te(this.auth,i))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const s=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&s}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=dh&&this.cachedEventUids.clear(),this.cachedEventUids.has(Tr(e))}saveEventToCache(e){this.cachedEventUids.add(Tr(e)),this.lastProcessedEventTime=Date.now()}}function Tr(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function _a({type:n,error:e}){return n==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function hh(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return _a(n);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function fh(n,e={}){return wt(n,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ph=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,gh=/^https?/;async function mh(n){if(n.config.emulator)return;const{authorizedDomains:e}=await fh(n);for(const t of e)try{if(_h(t))return}catch{}ie(n,"unauthorized-domain")}function _h(n){const e=Os(),{protocol:t,hostname:s}=new URL(e);if(n.startsWith("chrome-extension://")){const o=new URL(n);return o.hostname===""&&s===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&o.hostname===s}if(!gh.test(t))return!1;if(ph.test(n))return s===n;const i=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(s)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vh=new Zt(3e4,6e4);function kr(){const n=se().___jsl;if(n!=null&&n.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function yh(n){return new Promise((e,t)=>{var s,i,r;function o(){kr(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{kr(),t(te(n,"network-request-failed"))},timeout:vh.get()})}if(!((i=(s=se().gapi)===null||s===void 0?void 0:s.iframes)===null||i===void 0)&&i.Iframe)e(gapi.iframes.getContext());else if(!((r=se().gapi)===null||r===void 0)&&r.load)o();else{const a=bu("iframefcb");return se()[a]=()=>{gapi.load?o():t(te(n,"network-request-failed"))},Eu(`${Cu()}?onload=${a}`).catch(l=>t(l))}}).catch(e=>{throw yn=null,e})}let yn=null;function wh(n){return yn=yn||yh(n),yn}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Eh=new Zt(5e3,15e3),Ch="__/auth/iframe",bh="emulator/auth/iframe",Ih={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Sh=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Th(n){const e=n.config;y(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?ii(e,bh):`https://${n.config.authDomain}/${Ch}`,s={apiKey:e.apiKey,appName:n.name,v:yt},i=Sh.get(n.config.apiHost);i&&(s.eid=i);const r=n._getFrameworks();return r.length&&(s.fw=r.join(",")),`${t}?${vt(s).slice(1)}`}async function kh(n){const e=await wh(n),t=se().gapi;return y(t,n,"internal-error"),e.open({where:document.body,url:Th(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Ih,dontclear:!0},s=>new Promise(async(i,r)=>{await s.restyle({setHideOnLeave:!1});const o=te(n,"network-request-failed"),a=se().setTimeout(()=>{r(o)},Eh.get());function l(){se().clearTimeout(a),i(s)}s.ping(l).then(l,()=>{r(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ah={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Rh=500,Ph=600,Nh="_blank",Oh="http://localhost";class Ar{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function Mh(n,e,t,s=Rh,i=Ph){const r=Math.max((window.screen.availHeight-i)/2,0).toString(),o=Math.max((window.screen.availWidth-s)/2,0).toString();let a="";const l=Object.assign(Object.assign({},Ah),{width:s.toString(),height:i.toString(),top:r,left:o}),c=V().toLowerCase();t&&(a=Jo(c)?Nh:t),Yo(c)&&(e=e||Oh,l.scrollbars="yes");const h=Object.entries(l).reduce((d,[f,m])=>`${d}${f}=${m},`,"");if(fu(c)&&a!=="_self")return Lh(e||"",a),new Ar(null);const u=window.open(e||"",a,h);y(u,n,"popup-blocked");try{u.focus()}catch{}return new Ar(u)}function Lh(n,e){const t=document.createElement("a");t.href=n,t.target=e;const s=document.createEvent("MouseEvent");s.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(s)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xh="__/auth/handler",Dh="emulator/auth/handler",Fh=encodeURIComponent("fac");async function Rr(n,e,t,s,i,r){y(n.config.authDomain,n,"auth-domain-config-required"),y(n.config.apiKey,n,"invalid-api-key");const o={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:s,v:yt,eventId:i};if(e instanceof ci){e.setDefaultLanguage(n.languageCode),o.providerId=e.providerId||"",Ts(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[h,u]of Object.entries({}))o[h]=u}if(e instanceof en){const h=e.getScopes().filter(u=>u!=="");h.length>0&&(o.scopes=h.join(","))}n.tenantId&&(o.tid=n.tenantId);const a=o;for(const h of Object.keys(a))a[h]===void 0&&delete a[h];const l=await n._getAppCheckToken(),c=l?`#${Fh}=${encodeURIComponent(l)}`:"";return`${Uh(n)}?${vt(a).slice(1)}${c}`}function Uh({config:n}){return n.emulator?ii(n,Dh):`https://${n.authDomain}/${xh}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _s="webStorageSupport";class Bh{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=da,this._completeRedirectFn=ch,this._overrideRedirectResult=oh}async _openPopup(e,t,s,i){var r;fe((r=this.eventManagers[e._key()])===null||r===void 0?void 0:r.manager,"_initialize() not called before _openPopup()");const o=await Rr(e,t,s,Os(),i);return Mh(e,o,di())}async _openRedirect(e,t,s,i){await this._originValidation(e);const r=await Rr(e,t,s,Os(),i);return Wu(r),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:i,promise:r}=this.eventManagers[t];return i?Promise.resolve(i):(fe(r,"If manager is not set, promise should be"),r)}const s=this.initAndGetManager(e);return this.eventManagers[t]={promise:s},s.catch(()=>{delete this.eventManagers[t]}),s}async initAndGetManager(e){const t=await kh(e),s=new uh(e);return t.register("authEvent",i=>(y(i==null?void 0:i.authEvent,e,"invalid-auth-event"),{status:s.onEvent(i.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:s},this.iframes[e._key()]=t,s}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(_s,{type:_s},i=>{var r;const o=(r=i==null?void 0:i[0])===null||r===void 0?void 0:r[_s];o!==void 0&&t(!!o),ie(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=mh(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return na()||Qo()||ai()}}const $h=Bh;var Pr="@firebase/auth",Nr="1.10.8";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hh{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(s=>{e((s==null?void 0:s.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){y(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wh(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function Vh(n){at(new Ve("auth",(e,{options:t})=>{const s=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),r=e.getProvider("app-check-internal"),{apiKey:o,authDomain:a}=s.options;y(o&&!o.includes(":"),"invalid-api-key",{appName:s.name});const l={apiKey:o,authDomain:a,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:sa(n)},c=new yu(s,i,r,l);return Su(c,t),c},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,s)=>{e.getProvider("auth-internal").initialize()})),at(new Ve("auth-internal",e=>{const t=Kn(e.getProvider("auth").getImmediate());return(s=>new Hh(s))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),Ie(Pr,Nr,Wh(n)),Ie(Pr,Nr,"esm2017")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gh=5*60,jh=No("authIdTokenMaxAge")||Gh;let Or=null;const qh=n=>async e=>{const t=e&&await e.getIdTokenResult(),s=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(s&&s>jh)return;const i=t==null?void 0:t.token;Or!==i&&(Or=i,await fetch(n,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function zh(n=Bo()){const e=ei(n,"auth");if(e.isInitialized())return e.getImmediate();const t=Iu(n,{popupRedirectResolver:$h,persistence:[Ju,Bu,da]}),s=No("authTokenSyncURL");if(s&&typeof isSecureContext=="boolean"&&isSecureContext){const r=new URL(s,location.origin);if(location.origin===r.origin){const o=qh(r.toString());Lu(t,o,()=>o(t.currentUser)),Mu(t,a=>o(a))}}const i=Ro("auth");return i&&Tu(t,`http://${i}`),t}function Kh(){var n,e;return(e=(n=document.getElementsByTagName("head"))===null||n===void 0?void 0:n[0])!==null&&e!==void 0?e:document}wu({loadJS(n){return new Promise((e,t)=>{const s=document.createElement("script");s.setAttribute("src",n),s.onload=e,s.onerror=i=>{const r=te("internal-error");r.customData=i,t(r)},s.type="text/javascript",s.charset="UTF-8",Kh().appendChild(s)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});Vh("Browser");var Yh="firebase",Qh="11.10.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Ie(Yh,Qh,"app");var Mr={};const Lr="@firebase/database",xr="1.0.20";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let va="";function Jh(n){va=n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xh{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,t){t==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),D(t))}get(e){const t=this.domStorage_.getItem(this.prefixedName_(e));return t==null?null:Dt(t)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zh{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,t){t==null?delete this.cache_[e]:this.cache_[e]=t}get(e){return re(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ya=function(n){try{if(typeof window<"u"&&typeof window[n]<"u"){const e=window[n];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new Xh(e)}}catch{}return new Zh},Ue=ya("localStorage"),ef=ya("sessionStorage");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const st=new Xs("@firebase/database"),tf=function(){let n=1;return function(){return n++}}(),wa=function(n){const e=Bc(n),t=new xc;t.update(e);const s=t.digest();return Ys.encodeByteArray(s)},nn=function(...n){let e="";for(let t=0;t<n.length;t++){const s=n[t];Array.isArray(s)||s&&typeof s=="object"&&typeof s.length=="number"?e+=nn.apply(null,s):typeof s=="object"?e+=D(s):e+=s,e+=" "}return e};let Nt=null,Dr=!0;const nf=function(n,e){p(!0,"Can't turn on custom loggers persistently."),st.logLevel=A.VERBOSE,Nt=st.log.bind(st)},B=function(...n){if(Dr===!0&&(Dr=!1,Nt===null&&ef.get("logging_enabled")===!0&&nf()),Nt){const e=nn.apply(null,n);Nt(e)}},sn=function(n){return function(...e){B(n,...e)}},xs=function(...n){const e="FIREBASE INTERNAL ERROR: "+nn(...n);st.error(e)},pe=function(...n){const e=`FIREBASE FATAL ERROR: ${nn(...n)}`;throw st.error(e),new Error(e)},W=function(...n){const e="FIREBASE WARNING: "+nn(...n);st.warn(e)},sf=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&W("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},hi=function(n){return typeof n=="number"&&(n!==n||n===Number.POSITIVE_INFINITY||n===Number.NEGATIVE_INFINITY)},rf=function(n){if(document.readyState==="complete")n();else{let e=!1;const t=function(){if(!document.body){setTimeout(t,Math.floor(10));return}e||(e=!0,n())};document.addEventListener?(document.addEventListener("DOMContentLoaded",t,!1),window.addEventListener("load",t,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&t()}),window.attachEvent("onload",t))}},ct="[MIN_NAME]",je="[MAX_NAME]",Ke=function(n,e){if(n===e)return 0;if(n===ct||e===je)return-1;if(e===ct||n===je)return 1;{const t=Fr(n),s=Fr(e);return t!==null?s!==null?t-s===0?n.length-e.length:t-s:-1:s!==null?1:n<e?-1:1}},of=function(n,e){return n===e?0:n<e?-1:1},St=function(n,e){if(e&&n in e)return e[n];throw new Error("Missing required key ("+n+") in object: "+D(e))},fi=function(n){if(typeof n!="object"||n===null)return D(n);const e=[];for(const s in n)e.push(s);e.sort();let t="{";for(let s=0;s<e.length;s++)s!==0&&(t+=","),t+=D(e[s]),t+=":",t+=fi(n[e[s]]);return t+="}",t},Ea=function(n,e){const t=n.length;if(t<=e)return[n];const s=[];for(let i=0;i<t;i+=e)i+e>t?s.push(n.substring(i,t)):s.push(n.substring(i,i+e));return s};function $(n,e){for(const t in n)n.hasOwnProperty(t)&&e(t,n[t])}const Ca=function(n){p(!hi(n),"Invalid JSON number");const e=11,t=52,s=(1<<e-1)-1;let i,r,o,a,l;n===0?(r=0,o=0,i=1/n===-1/0?1:0):(i=n<0,n=Math.abs(n),n>=Math.pow(2,1-s)?(a=Math.min(Math.floor(Math.log(n)/Math.LN2),s),r=a+s,o=Math.round(n*Math.pow(2,t-a)-Math.pow(2,t))):(r=0,o=Math.round(n/Math.pow(2,1-s-t))));const c=[];for(l=t;l;l-=1)c.push(o%2?1:0),o=Math.floor(o/2);for(l=e;l;l-=1)c.push(r%2?1:0),r=Math.floor(r/2);c.push(i?1:0),c.reverse();const h=c.join("");let u="";for(l=0;l<64;l+=8){let d=parseInt(h.substr(l,8),2).toString(16);d.length===1&&(d="0"+d),u=u+d}return u.toLowerCase()},af=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},lf=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function cf(n,e){let t="Unknown Error";n==="too_big"?t="The data requested exceeds the maximum size that can be accessed with a single request.":n==="permission_denied"?t="Client doesn't have permission to access the desired data.":n==="unavailable"&&(t="The service is unavailable");const s=new Error(n+" at "+e._path.toString()+": "+t);return s.code=n.toUpperCase(),s}const df=new RegExp("^-?(0*)\\d{1,10}$"),uf=-2147483648,hf=2147483647,Fr=function(n){if(df.test(n)){const e=Number(n);if(e>=uf&&e<=hf)return e}return null},Et=function(n){try{n()}catch(e){setTimeout(()=>{const t=e.stack||"";throw W("Exception was thrown by user callback.",t),e},Math.floor(0))}},ff=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},Ot=function(n,e){const t=setTimeout(n,e);return typeof t=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(t):typeof t=="object"&&t.unref&&t.unref(),t};/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pf{constructor(e,t){this.appCheckProvider=t,this.appName=e.name,J(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.appCheck=t==null?void 0:t.getImmediate({optional:!0}),this.appCheck||t==null||t.get().then(s=>this.appCheck=s)}getToken(e){if(this.serverAppAppCheckToken){if(e)throw new Error("Attempted reuse of `FirebaseServerApp.appCheckToken` after previous usage failed.");return Promise.resolve({token:this.serverAppAppCheckToken})}return this.appCheck?this.appCheck.getToken(e):new Promise((t,s)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(t,s):t(null)},0)})}addTokenChangeListener(e){var t;(t=this.appCheckProvider)===null||t===void 0||t.get().then(s=>s.addTokenListener(e))}notifyForInvalidToken(){W(`Provided AppCheck credentials for the app named "${this.appName}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gf{constructor(e,t,s){this.appName_=e,this.firebaseOptions_=t,this.authProvider_=s,this.auth_=null,this.auth_=s.getImmediate({optional:!0}),this.auth_||s.onInit(i=>this.auth_=i)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(t=>t&&t.code==="auth/token-not-initialized"?(B("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(t)):new Promise((t,s)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(t,s):t(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(t=>t.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(t=>t.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',W(e)}}class wn{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}wn.OWNER="owner";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pi="5",ba="v",Ia="s",Sa="r",Ta="f",ka=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,Aa="ls",Ra="p",Ds="ac",Pa="websocket",Na="long_polling";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oa{constructor(e,t,s,i,r=!1,o="",a=!1,l=!1,c=null){this.secure=t,this.namespace=s,this.webSocketOnly=i,this.nodeAdmin=r,this.persistenceKey=o,this.includeNamespaceInQueryParams=a,this.isUsingEmulator=l,this.emulatorOptions=c,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=Ue.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&Ue.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",t=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${t}`}}function mf(n){return n.host!==n.internalHost||n.isCustomHost()||n.includeNamespaceInQueryParams}function Ma(n,e,t){p(typeof e=="string","typeof type must == string"),p(typeof t=="object","typeof params must == object");let s;if(e===Pa)s=(n.secure?"wss://":"ws://")+n.internalHost+"/.ws?";else if(e===Na)s=(n.secure?"https://":"http://")+n.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);mf(n)&&(t.ns=n.namespace);const i=[];return $(t,(r,o)=>{i.push(r+"="+o)}),s+i.join("&")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _f{constructor(){this.counters_={}}incrementCounter(e,t=1){re(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=t}get(){return pc(this.counters_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vs={},ys={};function gi(n){const e=n.toString();return vs[e]||(vs[e]=new _f),vs[e]}function vf(n,e){const t=n.toString();return ys[t]||(ys[t]=e()),ys[t]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yf{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,t){this.closeAfterResponse=e,this.onClose=t,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,t){for(this.pendingResponses[e]=t;this.pendingResponses[this.currentResponseNum];){const s=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let i=0;i<s.length;++i)s[i]&&Et(()=>{this.onMessage_(s[i])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ur="start",wf="close",Ef="pLPCommand",Cf="pRTLPCB",La="id",xa="pw",Da="ser",bf="cb",If="seg",Sf="ts",Tf="d",kf="dframe",Fa=1870,Ua=30,Af=Fa-Ua,Rf=25e3,Pf=3e4;class Ze{constructor(e,t,s,i,r,o,a){this.connId=e,this.repoInfo=t,this.applicationId=s,this.appCheckToken=i,this.authToken=r,this.transportSessionId=o,this.lastSessionId=a,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=sn(e),this.stats_=gi(t),this.urlFn=l=>(this.appCheckToken&&(l[Ds]=this.appCheckToken),Ma(t,Na,l))}open(e,t){this.curSegmentNum=0,this.onDisconnect_=t,this.myPacketOrderer=new yf(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(Pf)),rf(()=>{if(this.isClosed_)return;this.scriptTagHolder=new mi((...r)=>{const[o,a,l,c,h]=r;if(this.incrementIncomingBytes_(r),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===Ur)this.id=a,this.password=l;else if(o===wf)a?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(a,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+o)},(...r)=>{const[o,a]=r;this.incrementIncomingBytes_(r),this.myPacketOrderer.handleResponse(o,a)},()=>{this.onClosed_()},this.urlFn);const s={};s[Ur]="t",s[Da]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(s[bf]=this.scriptTagHolder.uniqueCallbackIdentifier),s[ba]=pi,this.transportSessionId&&(s[Ia]=this.transportSessionId),this.lastSessionId&&(s[Aa]=this.lastSessionId),this.applicationId&&(s[Ra]=this.applicationId),this.appCheckToken&&(s[Ds]=this.appCheckToken),typeof location<"u"&&location.hostname&&ka.test(location.hostname)&&(s[Sa]=Ta);const i=this.urlFn(s);this.log_("Connecting via long-poll to "+i),this.scriptTagHolder.addTag(i,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){Ze.forceAllow_=!0}static forceDisallow(){Ze.forceDisallow_=!0}static isAvailable(){return Ze.forceAllow_?!0:!Ze.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!af()&&!lf()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const t=D(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const s=ko(t),i=Ea(s,Af);for(let r=0;r<i.length;r++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,i.length,i[r]),this.curSegmentNum++}addDisconnectPingFrame(e,t){this.myDisconnFrame=document.createElement("iframe");const s={};s[kf]="t",s[La]=e,s[xa]=t,this.myDisconnFrame.src=this.urlFn(s),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const t=D(e).length;this.bytesReceived+=t,this.stats_.incrementCounter("bytes_received",t)}}class mi{constructor(e,t,s,i){this.onDisconnect=s,this.urlFn=i,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=tf(),window[Ef+this.uniqueCallbackIdentifier]=e,window[Cf+this.uniqueCallbackIdentifier]=t,this.myIFrame=mi.createIFrame_();let r="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(r='<script>document.domain="'+document.domain+'";<\/script>');const o="<html><body>"+r+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(a){B("frame writing exception"),a.stack&&B(a.stack),B(a)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||B("No IE domain setting required")}catch{const s=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+s+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,t){for(this.myID=e,this.myPW=t,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[La]=this.myID,e[xa]=this.myPW,e[Da]=this.currentSerial;let t=this.urlFn(e),s="",i=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+Ua+s.length<=Fa;){const o=this.pendingSegs.shift();s=s+"&"+If+i+"="+o.seg+"&"+Sf+i+"="+o.ts+"&"+Tf+i+"="+o.d,i++}return t=t+s,this.addLongPollTag_(t,this.currentSerial),!0}else return!1}enqueueSegment(e,t,s){this.pendingSegs.push({seg:e,ts:t,d:s}),this.alive&&this.newRequest_()}addLongPollTag_(e,t){this.outstandingRequests.add(t);const s=()=>{this.outstandingRequests.delete(t),this.newRequest_()},i=setTimeout(s,Math.floor(Rf)),r=()=>{clearTimeout(i),s()};this.addTag(e,r)}addTag(e,t){setTimeout(()=>{try{if(!this.sendNewPolls)return;const s=this.myIFrame.doc.createElement("script");s.type="text/javascript",s.async=!0,s.src=e,s.onload=s.onreadystatechange=function(){const i=s.readyState;(!i||i==="loaded"||i==="complete")&&(s.onload=s.onreadystatechange=null,s.parentNode&&s.parentNode.removeChild(s),t())},s.onerror=()=>{B("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(s)}catch{}},Math.floor(1))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nf=16384,Of=45e3;let On=null;typeof MozWebSocket<"u"?On=MozWebSocket:typeof WebSocket<"u"&&(On=WebSocket);class X{constructor(e,t,s,i,r,o,a){this.connId=e,this.applicationId=s,this.appCheckToken=i,this.authToken=r,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=sn(this.connId),this.stats_=gi(t),this.connURL=X.connectionURL_(t,o,a,i,s),this.nodeAdmin=t.nodeAdmin}static connectionURL_(e,t,s,i,r){const o={};return o[ba]=pi,typeof location<"u"&&location.hostname&&ka.test(location.hostname)&&(o[Sa]=Ta),t&&(o[Ia]=t),s&&(o[Aa]=s),i&&(o[Ds]=i),r&&(o[Ra]=r),Ma(e,Pa,o)}open(e,t){this.onDisconnect=t,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,Ue.set("previous_websocket_failure",!0);try{let s;kc(),this.mySock=new On(this.connURL,[],s)}catch(s){this.log_("Error instantiating WebSocket.");const i=s.message||s.data;i&&this.log_(i),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=s=>{this.handleIncomingFrame(s)},this.mySock.onerror=s=>{this.log_("WebSocket error.  Closing connection.");const i=s.message||s.data;i&&this.log_(i),this.onClosed_()}}start(){}static forceDisallow(){X.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const t=/Android ([0-9]{0,}\.[0-9]{0,})/,s=navigator.userAgent.match(t);s&&s.length>1&&parseFloat(s[1])<4.4&&(e=!0)}return!e&&On!==null&&!X.forceDisallow_}static previouslyFailed(){return Ue.isInMemoryStorage||Ue.get("previous_websocket_failure")===!0}markConnectionHealthy(){Ue.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const t=this.frames.join("");this.frames=null;const s=Dt(t);this.onMessage(s)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(p(this.frames===null,"We already have a frame buffer"),e.length<=6){const t=Number(e);if(!isNaN(t))return this.handleNewFrameCount_(t),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const t=e.data;if(this.bytesReceived+=t.length,this.stats_.incrementCounter("bytes_received",t.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(t);else{const s=this.extractFrameCount_(t);s!==null&&this.appendFrame_(s)}}send(e){this.resetKeepAlive();const t=D(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const s=Ea(t,Nf);s.length>1&&this.sendString_(String(s.length));for(let i=0;i<s.length;i++)this.sendString_(s[i])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(Of))}sendString_(e){try{this.mySock.send(e)}catch(t){this.log_("Exception thrown from WebSocket.send():",t.message||t.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}X.responsesRequiredToBeHealthy=2;X.healthyTimeout=3e4;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bt{static get ALL_TRANSPORTS(){return[Ze,X]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}constructor(e){this.initTransports_(e)}initTransports_(e){const t=X&&X.isAvailable();let s=t&&!X.previouslyFailed();if(e.webSocketOnly&&(t||W("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),s=!0),s)this.transports_=[X];else{const i=this.transports_=[];for(const r of Bt.ALL_TRANSPORTS)r&&r.isAvailable()&&i.push(r);Bt.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}Bt.globalTransportInitialized_=!1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mf=6e4,Lf=5e3,xf=10*1024,Df=100*1024,ws="t",Br="d",Ff="s",$r="r",Uf="e",Hr="o",Wr="a",Vr="n",Gr="p",Bf="h";class $f{constructor(e,t,s,i,r,o,a,l,c,h){this.id=e,this.repoInfo_=t,this.applicationId_=s,this.appCheckToken_=i,this.authToken_=r,this.onMessage_=o,this.onReady_=a,this.onDisconnect_=l,this.onKill_=c,this.lastSessionId=h,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=sn("c:"+this.id+":"),this.transportManager_=new Bt(t),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.conn_),s=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(t,s)},Math.floor(0));const i=e.healthyTimeout||0;i>0&&(this.healthyTimeout_=Ot(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>Df?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>xf?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(i)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return t=>{e===this.conn_?this.onConnectionLost_(t):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return t=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(t):e===this.secondaryConn_?this.onSecondaryMessageReceived_(t):this.log_("message on old connection"))}}sendRequest(e){const t={t:"d",d:e};this.sendData_(t)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(ws in e){const t=e[ws];t===Wr?this.upgradeIfSecondaryHealthy_():t===$r?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):t===Hr&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const t=St("t",e),s=St("d",e);if(t==="c")this.onSecondaryControl_(s);else if(t==="d")this.pendingDataMessages.push(s);else throw new Error("Unknown protocol layer: "+t)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:Gr,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:Wr,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:Vr,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const t=St("t",e),s=St("d",e);t==="c"?this.onControl_(s):t==="d"&&this.onDataMessage_(s)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const t=St(ws,e);if(Br in e){const s=e[Br];if(t===Bf){const i=Object.assign({},s);this.repoInfo_.isUsingEmulator&&(i.h=this.repoInfo_.host),this.onHandshake_(i)}else if(t===Vr){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let i=0;i<this.pendingDataMessages.length;++i)this.onDataMessage_(this.pendingDataMessages[i]);this.pendingDataMessages=[],this.tryCleanupConnection()}else t===Ff?this.onConnectionShutdown_(s):t===$r?this.onReset_(s):t===Uf?xs("Server Error: "+s):t===Hr?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):xs("Unknown control packet command: "+t)}}onHandshake_(e){const t=e.ts,s=e.v,i=e.h;this.sessionId=e.s,this.repoInfo_.host=i,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,t),pi!==s&&W("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.secondaryConn_),s=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(t,s),Ot(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(Mf))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,t){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(t,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):Ot(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(Lf))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:Gr,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(Ue.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ba{put(e,t,s,i){}merge(e,t,s,i){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,t,s){}onDisconnectMerge(e,t,s){}onDisconnectCancel(e,t){}reportStats(e){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $a{constructor(e){this.allowedEvents_=e,this.listeners_={},p(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...t){if(Array.isArray(this.listeners_[e])){const s=[...this.listeners_[e]];for(let i=0;i<s.length;i++)s[i].callback.apply(s[i].context,t)}}on(e,t,s){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:t,context:s});const i=this.getInitialEvent(e);i&&t.apply(s,i)}off(e,t,s){this.validateEventType_(e);const i=this.listeners_[e]||[];for(let r=0;r<i.length;r++)if(i[r].callback===t&&(!s||s===i[r].context)){i.splice(r,1);return}}validateEventType_(e){p(this.allowedEvents_.find(t=>t===e),"Unknown event: "+e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mn extends $a{static getInstance(){return new Mn}constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!Js()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}getInitialEvent(e){return p(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jr=32,qr=768;class R{constructor(e,t){if(t===void 0){this.pieces_=e.split("/");let s=0;for(let i=0;i<this.pieces_.length;i++)this.pieces_[i].length>0&&(this.pieces_[s]=this.pieces_[i],s++);this.pieces_.length=s,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=t}toString(){let e="";for(let t=this.pieceNum_;t<this.pieces_.length;t++)this.pieces_[t]!==""&&(e+="/"+this.pieces_[t]);return e||"/"}}function k(){return new R("")}function b(n){return n.pieceNum_>=n.pieces_.length?null:n.pieces_[n.pieceNum_]}function Ae(n){return n.pieces_.length-n.pieceNum_}function N(n){let e=n.pieceNum_;return e<n.pieces_.length&&e++,new R(n.pieces_,e)}function _i(n){return n.pieceNum_<n.pieces_.length?n.pieces_[n.pieces_.length-1]:null}function Hf(n){let e="";for(let t=n.pieceNum_;t<n.pieces_.length;t++)n.pieces_[t]!==""&&(e+="/"+encodeURIComponent(String(n.pieces_[t])));return e||"/"}function $t(n,e=0){return n.pieces_.slice(n.pieceNum_+e)}function Ha(n){if(n.pieceNum_>=n.pieces_.length)return null;const e=[];for(let t=n.pieceNum_;t<n.pieces_.length-1;t++)e.push(n.pieces_[t]);return new R(e,0)}function M(n,e){const t=[];for(let s=n.pieceNum_;s<n.pieces_.length;s++)t.push(n.pieces_[s]);if(e instanceof R)for(let s=e.pieceNum_;s<e.pieces_.length;s++)t.push(e.pieces_[s]);else{const s=e.split("/");for(let i=0;i<s.length;i++)s[i].length>0&&t.push(s[i])}return new R(t,0)}function C(n){return n.pieceNum_>=n.pieces_.length}function H(n,e){const t=b(n),s=b(e);if(t===null)return e;if(t===s)return H(N(n),N(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+n+")")}function Wf(n,e){const t=$t(n,0),s=$t(e,0);for(let i=0;i<t.length&&i<s.length;i++){const r=Ke(t[i],s[i]);if(r!==0)return r}return t.length===s.length?0:t.length<s.length?-1:1}function Wa(n,e){if(Ae(n)!==Ae(e))return!1;for(let t=n.pieceNum_,s=e.pieceNum_;t<=n.pieces_.length;t++,s++)if(n.pieces_[t]!==e.pieces_[s])return!1;return!0}function K(n,e){let t=n.pieceNum_,s=e.pieceNum_;if(Ae(n)>Ae(e))return!1;for(;t<n.pieces_.length;){if(n.pieces_[t]!==e.pieces_[s])return!1;++t,++s}return!0}class Vf{constructor(e,t){this.errorPrefix_=t,this.parts_=$t(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let s=0;s<this.parts_.length;s++)this.byteLength_+=zn(this.parts_[s]);Va(this)}}function Gf(n,e){n.parts_.length>0&&(n.byteLength_+=1),n.parts_.push(e),n.byteLength_+=zn(e),Va(n)}function jf(n){const e=n.parts_.pop();n.byteLength_-=zn(e),n.parts_.length>0&&(n.byteLength_-=1)}function Va(n){if(n.byteLength_>qr)throw new Error(n.errorPrefix_+"has a key path longer than "+qr+" bytes ("+n.byteLength_+").");if(n.parts_.length>jr)throw new Error(n.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+jr+") or object contains a cycle "+De(n))}function De(n){return n.parts_.length===0?"":"in property '"+n.parts_.join(".")+"'"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vi extends $a{static getInstance(){return new vi}constructor(){super(["visible"]);let e,t;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(t="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(t="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(t="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(t="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,t&&document.addEventListener(t,()=>{const s=!document[e];s!==this.visible_&&(this.visible_=s,this.trigger("visible",s))},!1)}getInitialEvent(e){return p(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Tt=1e3,qf=60*5*1e3,zr=30*1e3,zf=1.3,Kf=3e4,Yf="server_kill",Kr=3;class ue extends Ba{constructor(e,t,s,i,r,o,a,l){if(super(),this.repoInfo_=e,this.applicationId_=t,this.onDataUpdate_=s,this.onConnectStatus_=i,this.onServerInfoUpdate_=r,this.authTokenProvider_=o,this.appCheckTokenProvider_=a,this.authOverride_=l,this.id=ue.nextPersistentConnectionId_++,this.log_=sn("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=Tt,this.maxReconnectDelay_=qf,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,l)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");vi.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&Mn.getInstance().on("online",this.onOnline_,this)}sendRequest(e,t,s){const i=++this.requestNumber_,r={r:i,a:e,b:t};this.log_(D(r)),p(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(r),s&&(this.requestCBHash_[i]=s)}get(e){this.initConnection_();const t=new Jt,i={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:o=>{const a=o.d;o.s==="ok"?t.resolve(a):t.reject(a)}};this.outstandingGets_.push(i),this.outstandingGetCount_++;const r=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(r),t.promise}listen(e,t,s,i){this.initConnection_();const r=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+r),this.listens.has(o)||this.listens.set(o,new Map),p(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),p(!this.listens.get(o).has(r),"listen() called twice for same path/queryId.");const a={onComplete:i,hashFn:t,query:e,tag:s};this.listens.get(o).set(r,a),this.connected_&&this.sendListen_(a)}sendGet_(e){const t=this.outstandingGets_[e];this.sendRequest("g",t.request,s=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),t.onComplete&&t.onComplete(s)})}sendListen_(e){const t=e.query,s=t._path.toString(),i=t._queryIdentifier;this.log_("Listen on "+s+" for "+i);const r={p:s},o="q";e.tag&&(r.q=t._queryObject,r.t=e.tag),r.h=e.hashFn(),this.sendRequest(o,r,a=>{const l=a.d,c=a.s;ue.warnOnListenWarnings_(l,t),(this.listens.get(s)&&this.listens.get(s).get(i))===e&&(this.log_("listen response",a),c!=="ok"&&this.removeListen_(s,i),e.onComplete&&e.onComplete(c,l))})}static warnOnListenWarnings_(e,t){if(e&&typeof e=="object"&&re(e,"w")){const s=ot(e,"w");if(Array.isArray(s)&&~s.indexOf("no_index")){const i='".indexOn": "'+t._queryParams.getIndex().toString()+'"',r=t._path.toString();W(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${i} at ${r} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||Lc(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=zr)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,t=Mc(e)?"auth":"gauth",s={cred:e};this.authOverride_===null?s.noauth=!0:typeof this.authOverride_=="object"&&(s.authvar=this.authOverride_),this.sendRequest(t,s,i=>{const r=i.s,o=i.d||"error";this.authToken_===e&&(r==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(r,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const t=e.s,s=e.d||"error";t==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(t,s)})}unlisten(e,t){const s=e._path.toString(),i=e._queryIdentifier;this.log_("Unlisten called for "+s+" "+i),p(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(s,i)&&this.connected_&&this.sendUnlisten_(s,i,e._queryObject,t)}sendUnlisten_(e,t,s,i){this.log_("Unlisten on "+e+" for "+t);const r={p:e},o="n";i&&(r.q=s,r.t=i),this.sendRequest(o,r)}onDisconnectPut(e,t,s){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,t,s):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:t,onComplete:s})}onDisconnectMerge(e,t,s){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,t,s):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:t,onComplete:s})}onDisconnectCancel(e,t){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,t):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:t})}sendOnDisconnect_(e,t,s,i){const r={p:t,d:s};this.log_("onDisconnect "+e,r),this.sendRequest(e,r,o=>{i&&setTimeout(()=>{i(o.s,o.d)},Math.floor(0))})}put(e,t,s,i){this.putInternal("p",e,t,s,i)}merge(e,t,s,i){this.putInternal("m",e,t,s,i)}putInternal(e,t,s,i,r){this.initConnection_();const o={p:t,d:s};r!==void 0&&(o.h=r),this.outstandingPuts_.push({action:e,request:o,onComplete:i}),this.outstandingPutCount_++;const a=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(a):this.log_("Buffering put: "+t)}sendPut_(e){const t=this.outstandingPuts_[e].action,s=this.outstandingPuts_[e].request,i=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(t,s,r=>{this.log_(t+" response",r),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),i&&i(r.s,r.d)})}reportStats(e){if(this.connected_){const t={c:e};this.log_("reportStats",t),this.sendRequest("s",t,s=>{if(s.s!=="ok"){const r=s.d;this.log_("reportStats","Error sending stats: "+r)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+D(e));const t=e.r,s=this.requestCBHash_[t];s&&(delete this.requestCBHash_[t],s(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,t){this.log_("handleServerMessage",e,t),e==="d"?this.onDataUpdate_(t.p,t.d,!1,t.t):e==="m"?this.onDataUpdate_(t.p,t.d,!0,t.t):e==="c"?this.onListenRevoked_(t.p,t.q):e==="ac"?this.onAuthRevoked_(t.s,t.d):e==="apc"?this.onAppCheckRevoked_(t.s,t.d):e==="sd"?this.onSecurityDebugPacket_(t):xs("Unrecognized action received from server: "+D(e)+`
Are you using the latest client?`)}onReady_(e,t){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=t,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){p(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=Tt,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=Tt,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>Kf&&(this.reconnectDelay_=Tt),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=Math.max(0,new Date().getTime()-this.lastConnectionAttemptTime_);let t=Math.max(0,this.reconnectDelay_-e);t=Math.random()*t,this.log_("Trying to reconnect in "+t+"ms"),this.scheduleConnect_(t),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*zf)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),t=this.onReady_.bind(this),s=this.onRealtimeDisconnect_.bind(this),i=this.id+":"+ue.nextConnectionId_++,r=this.lastSessionId;let o=!1,a=null;const l=function(){a?a.close():(o=!0,s())},c=function(u){p(a,"sendRequest call when we're not connected not allowed."),a.sendRequest(u)};this.realtime_={close:l,sendRequest:c};const h=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[u,d]=await Promise.all([this.authTokenProvider_.getToken(h),this.appCheckTokenProvider_.getToken(h)]);o?B("getToken() completed but was canceled"):(B("getToken() completed. Creating connection."),this.authToken_=u&&u.accessToken,this.appCheckToken_=d&&d.token,a=new $f(i,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,t,s,f=>{W(f+" ("+this.repoInfo_.toString()+")"),this.interrupt(Yf)},r))}catch(u){this.log_("Failed to get token: "+u),o||(this.repoInfo_.nodeAdmin&&W(u),l())}}}interrupt(e){B("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){B("Resuming connection for reason: "+e),delete this.interruptReasons_[e],Ts(this.interruptReasons_)&&(this.reconnectDelay_=Tt,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const t=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:t})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const t=this.outstandingPuts_[e];t&&"h"in t.request&&t.queued&&(t.onComplete&&t.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,t){let s;t?s=t.map(r=>fi(r)).join("$"):s="default";const i=this.removeListen_(e,s);i&&i.onComplete&&i.onComplete("permission_denied")}removeListen_(e,t){const s=new R(e).toString();let i;if(this.listens.has(s)){const r=this.listens.get(s);i=r.get(t),r.delete(t),r.size===0&&this.listens.delete(s)}else i=void 0;return i}onAuthRevoked_(e,t){B("Auth token revoked: "+e+"/"+t),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=Kr&&(this.reconnectDelay_=zr,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,t){B("App check token revoked: "+e+"/"+t),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=Kr&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const t of e.values())this.sendListen_(t);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let t="js";e["sdk."+t+"."+va.replace(/\./g,"-")]=1,Js()?e["framework.cordova"]=1:Lo()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=Mn.getInstance().currentlyOnline();return Ts(this.interruptReasons_)&&e}}ue.nextPersistentConnectionId_=0;ue.nextConnectionId_=0;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class E{constructor(e,t){this.name=e,this.node=t}static Wrap(e,t){return new E(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jn{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,t){const s=new E(ct,e),i=new E(ct,t);return this.compare(s,i)!==0}minPost(){return E.MIN}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let hn;class Ga extends Jn{static get __EMPTY_NODE(){return hn}static set __EMPTY_NODE(e){hn=e}compare(e,t){return Ke(e.name,t.name)}isDefinedOn(e){throw mt("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,t){return!1}minPost(){return E.MIN}maxPost(){return new E(je,hn)}makePost(e,t){return p(typeof e=="string","KeyIndex indexValue must always be a string."),new E(e,hn)}toString(){return".key"}}const it=new Ga;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fn{constructor(e,t,s,i,r=null){this.isReverse_=i,this.resultGenerator_=r,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(e=e,o=t?s(e.key,t):1,i&&(o*=-1),o<0)this.isReverse_?e=e.left:e=e.right;else if(o===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),t;if(this.resultGenerator_?t=this.resultGenerator_(e.key,e.value):t={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return t}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class U{constructor(e,t,s,i,r){this.key=e,this.value=t,this.color=s??U.RED,this.left=i??j.EMPTY_NODE,this.right=r??j.EMPTY_NODE}copy(e,t,s,i,r){return new U(e??this.key,t??this.value,s??this.color,i??this.left,r??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,s){let i=this;const r=s(e,i.key);return r<0?i=i.copy(null,null,null,i.left.insert(e,t,s),null):r===0?i=i.copy(null,t,null,null,null):i=i.copy(null,null,null,null,i.right.insert(e,t,s)),i.fixUp_()}removeMin_(){if(this.left.isEmpty())return j.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,t){let s,i;if(s=this,t(e,s.key)<0)!s.left.isEmpty()&&!s.left.isRed_()&&!s.left.left.isRed_()&&(s=s.moveRedLeft_()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed_()&&(s=s.rotateRight_()),!s.right.isEmpty()&&!s.right.isRed_()&&!s.right.left.isRed_()&&(s=s.moveRedRight_()),t(e,s.key)===0){if(s.right.isEmpty())return j.EMPTY_NODE;i=s.right.min_(),s=s.copy(i.key,i.value,null,null,s.right.removeMin_())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,U.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,U.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}U.RED=!0;U.BLACK=!1;class Qf{copy(e,t,s,i,r){return this}insert(e,t,s){return new U(e,t,null)}remove(e,t){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class j{constructor(e,t=j.EMPTY_NODE){this.comparator_=e,this.root_=t}insert(e,t){return new j(this.comparator_,this.root_.insert(e,t,this.comparator_).copy(null,null,U.BLACK,null,null))}remove(e){return new j(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,U.BLACK,null,null))}get(e){let t,s=this.root_;for(;!s.isEmpty();){if(t=this.comparator_(e,s.key),t===0)return s.value;t<0?s=s.left:t>0&&(s=s.right)}return null}getPredecessorKey(e){let t,s=this.root_,i=null;for(;!s.isEmpty();)if(t=this.comparator_(e,s.key),t===0){if(s.left.isEmpty())return i?i.key:null;for(s=s.left;!s.right.isEmpty();)s=s.right;return s.key}else t<0?s=s.left:t>0&&(i=s,s=s.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new fn(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,t){return new fn(this.root_,e,this.comparator_,!1,t)}getReverseIteratorFrom(e,t){return new fn(this.root_,e,this.comparator_,!0,t)}getReverseIterator(e){return new fn(this.root_,null,this.comparator_,!0,e)}}j.EMPTY_NODE=new Qf;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jf(n,e){return Ke(n.name,e.name)}function yi(n,e){return Ke(n,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Fs;function Xf(n){Fs=n}const ja=function(n){return typeof n=="number"?"number:"+Ca(n):"string:"+n},qa=function(n){if(n.isLeafNode()){const e=n.val();p(typeof e=="string"||typeof e=="number"||typeof e=="object"&&re(e,".sv"),"Priority must be a string or number.")}else p(n===Fs||n.isEmpty(),"priority of unexpected type.");p(n===Fs||n.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Yr;class F{static set __childrenNodeConstructor(e){Yr=e}static get __childrenNodeConstructor(){return Yr}constructor(e,t=F.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=t,this.lazyHash_=null,p(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),qa(this.priorityNode_)}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new F(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:F.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return C(e)?this:b(e)===".priority"?this.priorityNode_:F.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,t){return null}updateImmediateChild(e,t){return e===".priority"?this.updatePriority(t):t.isEmpty()&&e!==".priority"?this:F.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,t).updatePriority(this.priorityNode_)}updateChild(e,t){const s=b(e);return s===null?t:t.isEmpty()&&s!==".priority"?this:(p(s!==".priority"||Ae(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(s,F.__childrenNodeConstructor.EMPTY_NODE.updateChild(N(e),t)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,t){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+ja(this.priorityNode_.val())+":");const t=typeof this.value_;e+=t+":",t==="number"?e+=Ca(this.value_):e+=this.value_,this.lazyHash_=wa(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===F.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof F.__childrenNodeConstructor?-1:(p(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const t=typeof e.value_,s=typeof this.value_,i=F.VALUE_TYPE_ORDER.indexOf(t),r=F.VALUE_TYPE_ORDER.indexOf(s);return p(i>=0,"Unknown leaf type: "+t),p(r>=0,"Unknown leaf type: "+s),i===r?s==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:r-i}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const t=e;return this.value_===t.value_&&this.priorityNode_.equals(t.priorityNode_)}else return!1}}F.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let za,Ka;function Zf(n){za=n}function ep(n){Ka=n}class tp extends Jn{compare(e,t){const s=e.node.getPriority(),i=t.node.getPriority(),r=s.compareTo(i);return r===0?Ke(e.name,t.name):r}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,t){return!e.getPriority().equals(t.getPriority())}minPost(){return E.MIN}maxPost(){return new E(je,new F("[PRIORITY-POST]",Ka))}makePost(e,t){const s=za(e);return new E(t,new F("[PRIORITY-POST]",s))}toString(){return".priority"}}const L=new tp;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const np=Math.log(2);class sp{constructor(e){const t=r=>parseInt(Math.log(r)/np,10),s=r=>parseInt(Array(r+1).join("1"),2);this.count=t(e+1),this.current_=this.count-1;const i=s(this.count);this.bits_=e+1&i}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const Ln=function(n,e,t,s){n.sort(e);const i=function(l,c){const h=c-l;let u,d;if(h===0)return null;if(h===1)return u=n[l],d=t?t(u):u,new U(d,u.node,U.BLACK,null,null);{const f=parseInt(h/2,10)+l,m=i(l,f),S=i(f+1,c);return u=n[f],d=t?t(u):u,new U(d,u.node,U.BLACK,m,S)}},r=function(l){let c=null,h=null,u=n.length;const d=function(m,S){const O=u-m,q=u;u-=m;const z=i(O+1,q),Q=n[O],Je=t?t(Q):Q;f(new U(Je,Q.node,S,null,z))},f=function(m){c?(c.left=m,c=m):(h=m,c=m)};for(let m=0;m<l.count;++m){const S=l.nextBitIsOne(),O=Math.pow(2,l.count-(m+1));S?d(O,U.BLACK):(d(O,U.BLACK),d(O,U.RED))}return h},o=new sp(n.length),a=r(o);return new j(s||e,a)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Es;const Xe={};class de{static get Default(){return p(Xe&&L,"ChildrenNode.ts has not been loaded"),Es=Es||new de({".priority":Xe},{".priority":L}),Es}constructor(e,t){this.indexes_=e,this.indexSet_=t}get(e){const t=ot(this.indexes_,e);if(!t)throw new Error("No index defined for "+e);return t instanceof j?t:null}hasIndex(e){return re(this.indexSet_,e.toString())}addIndex(e,t){p(e!==it,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const s=[];let i=!1;const r=t.getIterator(E.Wrap);let o=r.getNext();for(;o;)i=i||e.isDefinedOn(o.node),s.push(o),o=r.getNext();let a;i?a=Ln(s,e.getCompare()):a=Xe;const l=e.toString(),c=Object.assign({},this.indexSet_);c[l]=e;const h=Object.assign({},this.indexes_);return h[l]=a,new de(h,c)}addToIndexes(e,t){const s=In(this.indexes_,(i,r)=>{const o=ot(this.indexSet_,r);if(p(o,"Missing index implementation for "+r),i===Xe)if(o.isDefinedOn(e.node)){const a=[],l=t.getIterator(E.Wrap);let c=l.getNext();for(;c;)c.name!==e.name&&a.push(c),c=l.getNext();return a.push(e),Ln(a,o.getCompare())}else return Xe;else{const a=t.get(e.name);let l=i;return a&&(l=l.remove(new E(e.name,a))),l.insert(e,e.node)}});return new de(s,this.indexSet_)}removeFromIndexes(e,t){const s=In(this.indexes_,i=>{if(i===Xe)return i;{const r=t.get(e.name);return r?i.remove(new E(e.name,r)):i}});return new de(s,this.indexSet_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let kt;class v{static get EMPTY_NODE(){return kt||(kt=new v(new j(yi),null,de.Default))}constructor(e,t,s){this.children_=e,this.priorityNode_=t,this.indexMap_=s,this.lazyHash_=null,this.priorityNode_&&qa(this.priorityNode_),this.children_.isEmpty()&&p(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}isLeafNode(){return!1}getPriority(){return this.priorityNode_||kt}updatePriority(e){return this.children_.isEmpty()?this:new v(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const t=this.children_.get(e);return t===null?kt:t}}getChild(e){const t=b(e);return t===null?this:this.getImmediateChild(t).getChild(N(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,t){if(p(t,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(t);{const s=new E(e,t);let i,r;t.isEmpty()?(i=this.children_.remove(e),r=this.indexMap_.removeFromIndexes(s,this.children_)):(i=this.children_.insert(e,t),r=this.indexMap_.addToIndexes(s,this.children_));const o=i.isEmpty()?kt:this.priorityNode_;return new v(i,o,r)}}updateChild(e,t){const s=b(e);if(s===null)return t;{p(b(e)!==".priority"||Ae(e)===1,".priority must be the last token in a path");const i=this.getImmediateChild(s).updateChild(N(e),t);return this.updateImmediateChild(s,i)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const t={};let s=0,i=0,r=!0;if(this.forEachChild(L,(o,a)=>{t[o]=a.val(e),s++,r&&v.INTEGER_REGEXP_.test(o)?i=Math.max(i,Number(o)):r=!1}),!e&&r&&i<2*s){const o=[];for(const a in t)o[a]=t[a];return o}else return e&&!this.getPriority().isEmpty()&&(t[".priority"]=this.getPriority().val()),t}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+ja(this.getPriority().val())+":"),this.forEachChild(L,(t,s)=>{const i=s.hash();i!==""&&(e+=":"+t+":"+i)}),this.lazyHash_=e===""?"":wa(e)}return this.lazyHash_}getPredecessorChildName(e,t,s){const i=this.resolveIndex_(s);if(i){const r=i.getPredecessorKey(new E(e,t));return r?r.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const t=this.resolveIndex_(e);if(t){const s=t.minKey();return s&&s.name}else return this.children_.minKey()}getFirstChild(e){const t=this.getFirstChildName(e);return t?new E(t,this.children_.get(t)):null}getLastChildName(e){const t=this.resolveIndex_(e);if(t){const s=t.maxKey();return s&&s.name}else return this.children_.maxKey()}getLastChild(e){const t=this.getLastChildName(e);return t?new E(t,this.children_.get(t)):null}forEachChild(e,t){const s=this.resolveIndex_(e);return s?s.inorderTraversal(i=>t(i.name,i.node)):this.children_.inorderTraversal(t)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,t){const s=this.resolveIndex_(t);if(s)return s.getIteratorFrom(e,i=>i);{const i=this.children_.getIteratorFrom(e.name,E.Wrap);let r=i.peek();for(;r!=null&&t.compare(r,e)<0;)i.getNext(),r=i.peek();return i}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,t){const s=this.resolveIndex_(t);if(s)return s.getReverseIteratorFrom(e,i=>i);{const i=this.children_.getReverseIteratorFrom(e.name,E.Wrap);let r=i.peek();for(;r!=null&&t.compare(r,e)>0;)i.getNext(),r=i.peek();return i}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===rn?-1:0}withIndex(e){if(e===it||this.indexMap_.hasIndex(e))return this;{const t=this.indexMap_.addIndex(e,this.children_);return new v(this.children_,this.priorityNode_,t)}}isIndexed(e){return e===it||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const t=e;if(this.getPriority().equals(t.getPriority()))if(this.children_.count()===t.children_.count()){const s=this.getIterator(L),i=t.getIterator(L);let r=s.getNext(),o=i.getNext();for(;r&&o;){if(r.name!==o.name||!r.node.equals(o.node))return!1;r=s.getNext(),o=i.getNext()}return r===null&&o===null}else return!1;else return!1}}resolveIndex_(e){return e===it?null:this.indexMap_.get(e.toString())}}v.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class ip extends v{constructor(){super(new j(yi),v.EMPTY_NODE,de.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return v.EMPTY_NODE}isEmpty(){return!1}}const rn=new ip;Object.defineProperties(E,{MIN:{value:new E(ct,v.EMPTY_NODE)},MAX:{value:new E(je,rn)}});Ga.__EMPTY_NODE=v.EMPTY_NODE;F.__childrenNodeConstructor=v;Xf(rn);ep(rn);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rp=!0;function x(n,e=null){if(n===null)return v.EMPTY_NODE;if(typeof n=="object"&&".priority"in n&&(e=n[".priority"]),p(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof n=="object"&&".value"in n&&n[".value"]!==null&&(n=n[".value"]),typeof n!="object"||".sv"in n){const t=n;return new F(t,x(e))}if(!(n instanceof Array)&&rp){const t=[];let s=!1;if($(n,(o,a)=>{if(o.substring(0,1)!=="."){const l=x(a);l.isEmpty()||(s=s||!l.getPriority().isEmpty(),t.push(new E(o,l)))}}),t.length===0)return v.EMPTY_NODE;const r=Ln(t,Jf,o=>o.name,yi);if(s){const o=Ln(t,L.getCompare());return new v(r,x(e),new de({".priority":o},{".priority":L}))}else return new v(r,x(e),de.Default)}else{let t=v.EMPTY_NODE;return $(n,(s,i)=>{if(re(n,s)&&s.substring(0,1)!=="."){const r=x(i);(r.isLeafNode()||!r.isEmpty())&&(t=t.updateImmediateChild(s,r))}}),t.updatePriority(x(e))}}Zf(x);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class op extends Jn{constructor(e){super(),this.indexPath_=e,p(!C(e)&&b(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,t){const s=this.extractChild(e.node),i=this.extractChild(t.node),r=s.compareTo(i);return r===0?Ke(e.name,t.name):r}makePost(e,t){const s=x(e),i=v.EMPTY_NODE.updateChild(this.indexPath_,s);return new E(t,i)}maxPost(){const e=v.EMPTY_NODE.updateChild(this.indexPath_,rn);return new E(je,e)}toString(){return $t(this.indexPath_,0).join("/")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ap extends Jn{compare(e,t){const s=e.node.compareTo(t.node);return s===0?Ke(e.name,t.name):s}isDefinedOn(e){return!0}indexedValueChanged(e,t){return!e.equals(t)}minPost(){return E.MIN}maxPost(){return E.MAX}makePost(e,t){const s=x(e);return new E(t,s)}toString(){return".value"}}const lp=new ap;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ya(n){return{type:"value",snapshotNode:n}}function dt(n,e){return{type:"child_added",snapshotNode:e,childName:n}}function Ht(n,e){return{type:"child_removed",snapshotNode:e,childName:n}}function Wt(n,e,t){return{type:"child_changed",snapshotNode:e,childName:n,oldSnap:t}}function cp(n,e){return{type:"child_moved",snapshotNode:e,childName:n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wi{constructor(e){this.index_=e}updateChild(e,t,s,i,r,o){p(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const a=e.getImmediateChild(t);return a.getChild(i).equals(s.getChild(i))&&a.isEmpty()===s.isEmpty()||(o!=null&&(s.isEmpty()?e.hasChild(t)?o.trackChildChange(Ht(t,a)):p(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):a.isEmpty()?o.trackChildChange(dt(t,s)):o.trackChildChange(Wt(t,s,a))),e.isLeafNode()&&s.isEmpty())?e:e.updateImmediateChild(t,s).withIndex(this.index_)}updateFullNode(e,t,s){return s!=null&&(e.isLeafNode()||e.forEachChild(L,(i,r)=>{t.hasChild(i)||s.trackChildChange(Ht(i,r))}),t.isLeafNode()||t.forEachChild(L,(i,r)=>{if(e.hasChild(i)){const o=e.getImmediateChild(i);o.equals(r)||s.trackChildChange(Wt(i,r,o))}else s.trackChildChange(dt(i,r))})),t.withIndex(this.index_)}updatePriority(e,t){return e.isEmpty()?v.EMPTY_NODE:e.updatePriority(t)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vt{constructor(e){this.indexedFilter_=new wi(e.getIndex()),this.index_=e.getIndex(),this.startPost_=Vt.getStartPost_(e),this.endPost_=Vt.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const t=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,s=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return t&&s}updateChild(e,t,s,i,r,o){return this.matches(new E(t,s))||(s=v.EMPTY_NODE),this.indexedFilter_.updateChild(e,t,s,i,r,o)}updateFullNode(e,t,s){t.isLeafNode()&&(t=v.EMPTY_NODE);let i=t.withIndex(this.index_);i=i.updatePriority(v.EMPTY_NODE);const r=this;return t.forEachChild(L,(o,a)=>{r.matches(new E(o,a))||(i=i.updateImmediateChild(o,v.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,i,s)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const t=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),t)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const t=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),t)}else return e.getIndex().maxPost()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dp{constructor(e){this.withinDirectionalStart=t=>this.reverse_?this.withinEndPost(t):this.withinStartPost(t),this.withinDirectionalEnd=t=>this.reverse_?this.withinStartPost(t):this.withinEndPost(t),this.withinStartPost=t=>{const s=this.index_.compare(this.rangedFilter_.getStartPost(),t);return this.startIsInclusive_?s<=0:s<0},this.withinEndPost=t=>{const s=this.index_.compare(t,this.rangedFilter_.getEndPost());return this.endIsInclusive_?s<=0:s<0},this.rangedFilter_=new Vt(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,t,s,i,r,o){return this.rangedFilter_.matches(new E(t,s))||(s=v.EMPTY_NODE),e.getImmediateChild(t).equals(s)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,t,s,i,r,o):this.fullLimitUpdateChild_(e,t,s,r,o)}updateFullNode(e,t,s){let i;if(t.isLeafNode()||t.isEmpty())i=v.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<t.numChildren()&&t.isIndexed(this.index_)){i=v.EMPTY_NODE.withIndex(this.index_);let r;this.reverse_?r=t.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):r=t.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let o=0;for(;r.hasNext()&&o<this.limit_;){const a=r.getNext();if(this.withinDirectionalStart(a))if(this.withinDirectionalEnd(a))i=i.updateImmediateChild(a.name,a.node),o++;else break;else continue}}else{i=t.withIndex(this.index_),i=i.updatePriority(v.EMPTY_NODE);let r;this.reverse_?r=i.getReverseIterator(this.index_):r=i.getIterator(this.index_);let o=0;for(;r.hasNext();){const a=r.getNext();o<this.limit_&&this.withinDirectionalStart(a)&&this.withinDirectionalEnd(a)?o++:i=i.updateImmediateChild(a.name,v.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,i,s)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,t,s,i,r){let o;if(this.reverse_){const u=this.index_.getCompare();o=(d,f)=>u(f,d)}else o=this.index_.getCompare();const a=e;p(a.numChildren()===this.limit_,"");const l=new E(t,s),c=this.reverse_?a.getFirstChild(this.index_):a.getLastChild(this.index_),h=this.rangedFilter_.matches(l);if(a.hasChild(t)){const u=a.getImmediateChild(t);let d=i.getChildAfterChild(this.index_,c,this.reverse_);for(;d!=null&&(d.name===t||a.hasChild(d.name));)d=i.getChildAfterChild(this.index_,d,this.reverse_);const f=d==null?1:o(d,l);if(h&&!s.isEmpty()&&f>=0)return r!=null&&r.trackChildChange(Wt(t,s,u)),a.updateImmediateChild(t,s);{r!=null&&r.trackChildChange(Ht(t,u));const S=a.updateImmediateChild(t,v.EMPTY_NODE);return d!=null&&this.rangedFilter_.matches(d)?(r!=null&&r.trackChildChange(dt(d.name,d.node)),S.updateImmediateChild(d.name,d.node)):S}}else return s.isEmpty()?e:h&&o(c,l)>=0?(r!=null&&(r.trackChildChange(Ht(c.name,c.node)),r.trackChildChange(dt(t,s))),a.updateImmediateChild(t,s).updateImmediateChild(c.name,v.EMPTY_NODE)):e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ei{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=L}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return p(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return p(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:ct}hasEnd(){return this.endSet_}getIndexEndValue(){return p(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return p(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:je}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return p(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===L}copy(){const e=new Ei;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function up(n){return n.loadsAllData()?new wi(n.getIndex()):n.hasLimit()?new dp(n):new Vt(n)}function Qr(n){const e={};if(n.isDefault())return e;let t;if(n.index_===L?t="$priority":n.index_===lp?t="$value":n.index_===it?t="$key":(p(n.index_ instanceof op,"Unrecognized index type!"),t=n.index_.toString()),e.orderBy=D(t),n.startSet_){const s=n.startAfterSet_?"startAfter":"startAt";e[s]=D(n.indexStartValue_),n.startNameSet_&&(e[s]+=","+D(n.indexStartName_))}if(n.endSet_){const s=n.endBeforeSet_?"endBefore":"endAt";e[s]=D(n.indexEndValue_),n.endNameSet_&&(e[s]+=","+D(n.indexEndName_))}return n.limitSet_&&(n.isViewFromLeft()?e.limitToFirst=n.limit_:e.limitToLast=n.limit_),e}function Jr(n){const e={};if(n.startSet_&&(e.sp=n.indexStartValue_,n.startNameSet_&&(e.sn=n.indexStartName_),e.sin=!n.startAfterSet_),n.endSet_&&(e.ep=n.indexEndValue_,n.endNameSet_&&(e.en=n.indexEndName_),e.ein=!n.endBeforeSet_),n.limitSet_){e.l=n.limit_;let t=n.viewFrom_;t===""&&(n.isViewFromLeft()?t="l":t="r"),e.vf=t}return n.index_!==L&&(e.i=n.index_.toString()),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xn extends Ba{reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,t){return t!==void 0?"tag$"+t:(p(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}constructor(e,t,s,i){super(),this.repoInfo_=e,this.onDataUpdate_=t,this.authTokenProvider_=s,this.appCheckTokenProvider_=i,this.log_=sn("p:rest:"),this.listens_={}}listen(e,t,s,i){const r=e._path.toString();this.log_("Listen called for "+r+" "+e._queryIdentifier);const o=xn.getListenId_(e,s),a={};this.listens_[o]=a;const l=Qr(e._queryParams);this.restRequest_(r+".json",l,(c,h)=>{let u=h;if(c===404&&(u=null,c=null),c===null&&this.onDataUpdate_(r,u,!1,s),ot(this.listens_,o)===a){let d;c?c===401?d="permission_denied":d="rest_error:"+c:d="ok",i(d,null)}})}unlisten(e,t){const s=xn.getListenId_(e,t);delete this.listens_[s]}get(e){const t=Qr(e._queryParams),s=e._path.toString(),i=new Jt;return this.restRequest_(s+".json",t,(r,o)=>{let a=o;r===404&&(a=null,r=null),r===null?(this.onDataUpdate_(s,a,!1,null),i.resolve(a)):i.reject(new Error(a))}),i.promise}refreshAuthToken(e){}restRequest_(e,t={},s){return t.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([i,r])=>{i&&i.accessToken&&(t.auth=i.accessToken),r&&r.token&&(t.ac=r.token);const o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+vt(t);this.log_("Sending REST request for "+o);const a=new XMLHttpRequest;a.onreadystatechange=()=>{if(s&&a.readyState===4){this.log_("REST Response for "+o+" received. status:",a.status,"response:",a.responseText);let l=null;if(a.status>=200&&a.status<300){try{l=Dt(a.responseText)}catch{W("Failed to parse JSON response for "+o+": "+a.responseText)}s(null,l)}else a.status!==401&&a.status!==404&&W("Got unsuccessful REST response for "+o+" Status: "+a.status),s(a.status);s=null}},a.open("GET",o,!0),a.send()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hp{constructor(){this.rootNode_=v.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,t){this.rootNode_=this.rootNode_.updateChild(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Dn(){return{value:null,children:new Map}}function Qa(n,e,t){if(C(e))n.value=t,n.children.clear();else if(n.value!==null)n.value=n.value.updateChild(e,t);else{const s=b(e);n.children.has(s)||n.children.set(s,Dn());const i=n.children.get(s);e=N(e),Qa(i,e,t)}}function Us(n,e,t){n.value!==null?t(e,n.value):fp(n,(s,i)=>{const r=new R(e.toString()+"/"+s);Us(i,r,t)})}function fp(n,e){n.children.forEach((t,s)=>{e(s,t)})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pp{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),t=Object.assign({},e);return this.last_&&$(this.last_,(s,i)=>{t[s]=t[s]-i}),this.last_=e,t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xr=10*1e3,gp=30*1e3,mp=5*60*1e3;class _p{constructor(e,t){this.server_=t,this.statsToReport_={},this.statsListener_=new pp(e);const s=Xr+(gp-Xr)*Math.random();Ot(this.reportStats_.bind(this),Math.floor(s))}reportStats_(){const e=this.statsListener_.get(),t={};let s=!1;$(e,(i,r)=>{r>0&&re(this.statsToReport_,i)&&(t[i]=r,s=!0)}),s&&this.server_.reportStats(t),Ot(this.reportStats_.bind(this),Math.floor(Math.random()*2*mp))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ee;(function(n){n[n.OVERWRITE=0]="OVERWRITE",n[n.MERGE=1]="MERGE",n[n.ACK_USER_WRITE=2]="ACK_USER_WRITE",n[n.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(ee||(ee={}));function Ci(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function bi(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function Ii(n){return{fromUser:!1,fromServer:!0,queryId:n,tagged:!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fn{constructor(e,t,s){this.path=e,this.affectedTree=t,this.revert=s,this.type=ee.ACK_USER_WRITE,this.source=Ci()}operationForChild(e){if(C(this.path)){if(this.affectedTree.value!=null)return p(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const t=this.affectedTree.subtree(new R(e));return new Fn(k(),t,this.revert)}}else return p(b(this.path)===e,"operationForChild called for unrelated child."),new Fn(N(this.path),this.affectedTree,this.revert)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gt{constructor(e,t){this.source=e,this.path=t,this.type=ee.LISTEN_COMPLETE}operationForChild(e){return C(this.path)?new Gt(this.source,k()):new Gt(this.source,N(this.path))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qe{constructor(e,t,s){this.source=e,this.path=t,this.snap=s,this.type=ee.OVERWRITE}operationForChild(e){return C(this.path)?new qe(this.source,k(),this.snap.getImmediateChild(e)):new qe(this.source,N(this.path),this.snap)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ut{constructor(e,t,s){this.source=e,this.path=t,this.children=s,this.type=ee.MERGE}operationForChild(e){if(C(this.path)){const t=this.children.subtree(new R(e));return t.isEmpty()?null:t.value?new qe(this.source,k(),t.value):new ut(this.source,k(),t)}else return p(b(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new ut(this.source,N(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Re{constructor(e,t,s){this.node_=e,this.fullyInitialized_=t,this.filtered_=s}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(C(e))return this.isFullyInitialized()&&!this.filtered_;const t=b(e);return this.isCompleteForChild(t)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vp{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function yp(n,e,t,s){const i=[],r=[];return e.forEach(o=>{o.type==="child_changed"&&n.index_.indexedValueChanged(o.oldSnap,o.snapshotNode)&&r.push(cp(o.childName,o.snapshotNode))}),At(n,i,"child_removed",e,s,t),At(n,i,"child_added",e,s,t),At(n,i,"child_moved",r,s,t),At(n,i,"child_changed",e,s,t),At(n,i,"value",e,s,t),i}function At(n,e,t,s,i,r){const o=s.filter(a=>a.type===t);o.sort((a,l)=>Ep(n,a,l)),o.forEach(a=>{const l=wp(n,a,r);i.forEach(c=>{c.respondsTo(a.type)&&e.push(c.createEvent(l,n.query_))})})}function wp(n,e,t){return e.type==="value"||e.type==="child_removed"||(e.prevName=t.getPredecessorChildName(e.childName,e.snapshotNode,n.index_)),e}function Ep(n,e,t){if(e.childName==null||t.childName==null)throw mt("Should only compare child_ events.");const s=new E(e.childName,e.snapshotNode),i=new E(t.childName,t.snapshotNode);return n.index_.compare(s,i)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xn(n,e){return{eventCache:n,serverCache:e}}function Mt(n,e,t,s){return Xn(new Re(e,t,s),n.serverCache)}function Ja(n,e,t,s){return Xn(n.eventCache,new Re(e,t,s))}function Un(n){return n.eventCache.isFullyInitialized()?n.eventCache.getNode():null}function ze(n){return n.serverCache.isFullyInitialized()?n.serverCache.getNode():null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Cs;const Cp=()=>(Cs||(Cs=new j(of)),Cs);class P{static fromObject(e){let t=new P(null);return $(e,(s,i)=>{t=t.set(new R(s),i)}),t}constructor(e,t=Cp()){this.value=e,this.children=t}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,t){if(this.value!=null&&t(this.value))return{path:k(),value:this.value};if(C(e))return null;{const s=b(e),i=this.children.get(s);if(i!==null){const r=i.findRootMostMatchingPathAndValue(N(e),t);return r!=null?{path:M(new R(s),r.path),value:r.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(C(e))return this;{const t=b(e),s=this.children.get(t);return s!==null?s.subtree(N(e)):new P(null)}}set(e,t){if(C(e))return new P(t,this.children);{const s=b(e),r=(this.children.get(s)||new P(null)).set(N(e),t),o=this.children.insert(s,r);return new P(this.value,o)}}remove(e){if(C(e))return this.children.isEmpty()?new P(null):new P(null,this.children);{const t=b(e),s=this.children.get(t);if(s){const i=s.remove(N(e));let r;return i.isEmpty()?r=this.children.remove(t):r=this.children.insert(t,i),this.value===null&&r.isEmpty()?new P(null):new P(this.value,r)}else return this}}get(e){if(C(e))return this.value;{const t=b(e),s=this.children.get(t);return s?s.get(N(e)):null}}setTree(e,t){if(C(e))return t;{const s=b(e),r=(this.children.get(s)||new P(null)).setTree(N(e),t);let o;return r.isEmpty()?o=this.children.remove(s):o=this.children.insert(s,r),new P(this.value,o)}}fold(e){return this.fold_(k(),e)}fold_(e,t){const s={};return this.children.inorderTraversal((i,r)=>{s[i]=r.fold_(M(e,i),t)}),t(e,this.value,s)}findOnPath(e,t){return this.findOnPath_(e,k(),t)}findOnPath_(e,t,s){const i=this.value?s(t,this.value):!1;if(i)return i;if(C(e))return null;{const r=b(e),o=this.children.get(r);return o?o.findOnPath_(N(e),M(t,r),s):null}}foreachOnPath(e,t){return this.foreachOnPath_(e,k(),t)}foreachOnPath_(e,t,s){if(C(e))return this;{this.value&&s(t,this.value);const i=b(e),r=this.children.get(i);return r?r.foreachOnPath_(N(e),M(t,i),s):new P(null)}}foreach(e){this.foreach_(k(),e)}foreach_(e,t){this.children.inorderTraversal((s,i)=>{i.foreach_(M(e,s),t)}),this.value&&t(e,this.value)}foreachChild(e){this.children.inorderTraversal((t,s)=>{s.value&&e(t,s.value)})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ne{constructor(e){this.writeTree_=e}static empty(){return new ne(new P(null))}}function Lt(n,e,t){if(C(e))return new ne(new P(t));{const s=n.writeTree_.findRootMostValueAndPath(e);if(s!=null){const i=s.path;let r=s.value;const o=H(i,e);return r=r.updateChild(o,t),new ne(n.writeTree_.set(i,r))}else{const i=new P(t),r=n.writeTree_.setTree(e,i);return new ne(r)}}}function Bs(n,e,t){let s=n;return $(t,(i,r)=>{s=Lt(s,M(e,i),r)}),s}function Zr(n,e){if(C(e))return ne.empty();{const t=n.writeTree_.setTree(e,new P(null));return new ne(t)}}function $s(n,e){return Ye(n,e)!=null}function Ye(n,e){const t=n.writeTree_.findRootMostValueAndPath(e);return t!=null?n.writeTree_.get(t.path).getChild(H(t.path,e)):null}function eo(n){const e=[],t=n.writeTree_.value;return t!=null?t.isLeafNode()||t.forEachChild(L,(s,i)=>{e.push(new E(s,i))}):n.writeTree_.children.inorderTraversal((s,i)=>{i.value!=null&&e.push(new E(s,i.value))}),e}function Se(n,e){if(C(e))return n;{const t=Ye(n,e);return t!=null?new ne(new P(t)):new ne(n.writeTree_.subtree(e))}}function Hs(n){return n.writeTree_.isEmpty()}function ht(n,e){return Xa(k(),n.writeTree_,e)}function Xa(n,e,t){if(e.value!=null)return t.updateChild(n,e.value);{let s=null;return e.children.inorderTraversal((i,r)=>{i===".priority"?(p(r.value!==null,"Priority writes must always be leaf nodes"),s=r.value):t=Xa(M(n,i),r,t)}),!t.getChild(n).isEmpty()&&s!==null&&(t=t.updateChild(M(n,".priority"),s)),t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zn(n,e){return nl(e,n)}function bp(n,e,t,s,i){p(s>n.lastWriteId,"Stacking an older write on top of newer ones"),i===void 0&&(i=!0),n.allWrites.push({path:e,snap:t,writeId:s,visible:i}),i&&(n.visibleWrites=Lt(n.visibleWrites,e,t)),n.lastWriteId=s}function Ip(n,e,t,s){p(s>n.lastWriteId,"Stacking an older merge on top of newer ones"),n.allWrites.push({path:e,children:t,writeId:s,visible:!0}),n.visibleWrites=Bs(n.visibleWrites,e,t),n.lastWriteId=s}function Sp(n,e){for(let t=0;t<n.allWrites.length;t++){const s=n.allWrites[t];if(s.writeId===e)return s}return null}function Tp(n,e){const t=n.allWrites.findIndex(a=>a.writeId===e);p(t>=0,"removeWrite called with nonexistent writeId.");const s=n.allWrites[t];n.allWrites.splice(t,1);let i=s.visible,r=!1,o=n.allWrites.length-1;for(;i&&o>=0;){const a=n.allWrites[o];a.visible&&(o>=t&&kp(a,s.path)?i=!1:K(s.path,a.path)&&(r=!0)),o--}if(i){if(r)return Ap(n),!0;if(s.snap)n.visibleWrites=Zr(n.visibleWrites,s.path);else{const a=s.children;$(a,l=>{n.visibleWrites=Zr(n.visibleWrites,M(s.path,l))})}return!0}else return!1}function kp(n,e){if(n.snap)return K(n.path,e);for(const t in n.children)if(n.children.hasOwnProperty(t)&&K(M(n.path,t),e))return!0;return!1}function Ap(n){n.visibleWrites=Za(n.allWrites,Rp,k()),n.allWrites.length>0?n.lastWriteId=n.allWrites[n.allWrites.length-1].writeId:n.lastWriteId=-1}function Rp(n){return n.visible}function Za(n,e,t){let s=ne.empty();for(let i=0;i<n.length;++i){const r=n[i];if(e(r)){const o=r.path;let a;if(r.snap)K(t,o)?(a=H(t,o),s=Lt(s,a,r.snap)):K(o,t)&&(a=H(o,t),s=Lt(s,k(),r.snap.getChild(a)));else if(r.children){if(K(t,o))a=H(t,o),s=Bs(s,a,r.children);else if(K(o,t))if(a=H(o,t),C(a))s=Bs(s,k(),r.children);else{const l=ot(r.children,b(a));if(l){const c=l.getChild(N(a));s=Lt(s,k(),c)}}}else throw mt("WriteRecord should have .snap or .children")}}return s}function el(n,e,t,s,i){if(!s&&!i){const r=Ye(n.visibleWrites,e);if(r!=null)return r;{const o=Se(n.visibleWrites,e);if(Hs(o))return t;if(t==null&&!$s(o,k()))return null;{const a=t||v.EMPTY_NODE;return ht(o,a)}}}else{const r=Se(n.visibleWrites,e);if(!i&&Hs(r))return t;if(!i&&t==null&&!$s(r,k()))return null;{const o=function(c){return(c.visible||i)&&(!s||!~s.indexOf(c.writeId))&&(K(c.path,e)||K(e,c.path))},a=Za(n.allWrites,o,e),l=t||v.EMPTY_NODE;return ht(a,l)}}}function Pp(n,e,t){let s=v.EMPTY_NODE;const i=Ye(n.visibleWrites,e);if(i)return i.isLeafNode()||i.forEachChild(L,(r,o)=>{s=s.updateImmediateChild(r,o)}),s;if(t){const r=Se(n.visibleWrites,e);return t.forEachChild(L,(o,a)=>{const l=ht(Se(r,new R(o)),a);s=s.updateImmediateChild(o,l)}),eo(r).forEach(o=>{s=s.updateImmediateChild(o.name,o.node)}),s}else{const r=Se(n.visibleWrites,e);return eo(r).forEach(o=>{s=s.updateImmediateChild(o.name,o.node)}),s}}function Np(n,e,t,s,i){p(s||i,"Either existingEventSnap or existingServerSnap must exist");const r=M(e,t);if($s(n.visibleWrites,r))return null;{const o=Se(n.visibleWrites,r);return Hs(o)?i.getChild(t):ht(o,i.getChild(t))}}function Op(n,e,t,s){const i=M(e,t),r=Ye(n.visibleWrites,i);if(r!=null)return r;if(s.isCompleteForChild(t)){const o=Se(n.visibleWrites,i);return ht(o,s.getNode().getImmediateChild(t))}else return null}function Mp(n,e){return Ye(n.visibleWrites,e)}function Lp(n,e,t,s,i,r,o){let a;const l=Se(n.visibleWrites,e),c=Ye(l,k());if(c!=null)a=c;else if(t!=null)a=ht(l,t);else return[];if(a=a.withIndex(o),!a.isEmpty()&&!a.isLeafNode()){const h=[],u=o.getCompare(),d=r?a.getReverseIteratorFrom(s,o):a.getIteratorFrom(s,o);let f=d.getNext();for(;f&&h.length<i;)u(f,s)!==0&&h.push(f),f=d.getNext();return h}else return[]}function xp(){return{visibleWrites:ne.empty(),allWrites:[],lastWriteId:-1}}function Bn(n,e,t,s){return el(n.writeTree,n.treePath,e,t,s)}function Si(n,e){return Pp(n.writeTree,n.treePath,e)}function to(n,e,t,s){return Np(n.writeTree,n.treePath,e,t,s)}function $n(n,e){return Mp(n.writeTree,M(n.treePath,e))}function Dp(n,e,t,s,i,r){return Lp(n.writeTree,n.treePath,e,t,s,i,r)}function Ti(n,e,t){return Op(n.writeTree,n.treePath,e,t)}function tl(n,e){return nl(M(n.treePath,e),n.writeTree)}function nl(n,e){return{treePath:n,writeTree:e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fp{constructor(){this.changeMap=new Map}trackChildChange(e){const t=e.type,s=e.childName;p(t==="child_added"||t==="child_changed"||t==="child_removed","Only child changes supported for tracking"),p(s!==".priority","Only non-priority child changes can be tracked.");const i=this.changeMap.get(s);if(i){const r=i.type;if(t==="child_added"&&r==="child_removed")this.changeMap.set(s,Wt(s,e.snapshotNode,i.snapshotNode));else if(t==="child_removed"&&r==="child_added")this.changeMap.delete(s);else if(t==="child_removed"&&r==="child_changed")this.changeMap.set(s,Ht(s,i.oldSnap));else if(t==="child_changed"&&r==="child_added")this.changeMap.set(s,dt(s,e.snapshotNode));else if(t==="child_changed"&&r==="child_changed")this.changeMap.set(s,Wt(s,e.snapshotNode,i.oldSnap));else throw mt("Illegal combination of changes: "+e+" occurred after "+i)}else this.changeMap.set(s,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Up{getCompleteChild(e){return null}getChildAfterChild(e,t,s){return null}}const sl=new Up;class ki{constructor(e,t,s=null){this.writes_=e,this.viewCache_=t,this.optCompleteServerCache_=s}getCompleteChild(e){const t=this.viewCache_.eventCache;if(t.isCompleteForChild(e))return t.getNode().getImmediateChild(e);{const s=this.optCompleteServerCache_!=null?new Re(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return Ti(this.writes_,e,s)}}getChildAfterChild(e,t,s){const i=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:ze(this.viewCache_),r=Dp(this.writes_,i,t,1,s,e);return r.length===0?null:r[0]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bp(n){return{filter:n}}function $p(n,e){p(e.eventCache.getNode().isIndexed(n.filter.getIndex()),"Event snap not indexed"),p(e.serverCache.getNode().isIndexed(n.filter.getIndex()),"Server snap not indexed")}function Hp(n,e,t,s,i){const r=new Fp;let o,a;if(t.type===ee.OVERWRITE){const c=t;c.source.fromUser?o=Ws(n,e,c.path,c.snap,s,i,r):(p(c.source.fromServer,"Unknown source."),a=c.source.tagged||e.serverCache.isFiltered()&&!C(c.path),o=Hn(n,e,c.path,c.snap,s,i,a,r))}else if(t.type===ee.MERGE){const c=t;c.source.fromUser?o=Vp(n,e,c.path,c.children,s,i,r):(p(c.source.fromServer,"Unknown source."),a=c.source.tagged||e.serverCache.isFiltered(),o=Vs(n,e,c.path,c.children,s,i,a,r))}else if(t.type===ee.ACK_USER_WRITE){const c=t;c.revert?o=qp(n,e,c.path,s,i,r):o=Gp(n,e,c.path,c.affectedTree,s,i,r)}else if(t.type===ee.LISTEN_COMPLETE)o=jp(n,e,t.path,s,r);else throw mt("Unknown operation type: "+t.type);const l=r.getChanges();return Wp(e,o,l),{viewCache:o,changes:l}}function Wp(n,e,t){const s=e.eventCache;if(s.isFullyInitialized()){const i=s.getNode().isLeafNode()||s.getNode().isEmpty(),r=Un(n);(t.length>0||!n.eventCache.isFullyInitialized()||i&&!s.getNode().equals(r)||!s.getNode().getPriority().equals(r.getPriority()))&&t.push(Ya(Un(e)))}}function il(n,e,t,s,i,r){const o=e.eventCache;if($n(s,t)!=null)return e;{let a,l;if(C(t))if(p(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const c=ze(e),h=c instanceof v?c:v.EMPTY_NODE,u=Si(s,h);a=n.filter.updateFullNode(e.eventCache.getNode(),u,r)}else{const c=Bn(s,ze(e));a=n.filter.updateFullNode(e.eventCache.getNode(),c,r)}else{const c=b(t);if(c===".priority"){p(Ae(t)===1,"Can't have a priority with additional path components");const h=o.getNode();l=e.serverCache.getNode();const u=to(s,t,h,l);u!=null?a=n.filter.updatePriority(h,u):a=o.getNode()}else{const h=N(t);let u;if(o.isCompleteForChild(c)){l=e.serverCache.getNode();const d=to(s,t,o.getNode(),l);d!=null?u=o.getNode().getImmediateChild(c).updateChild(h,d):u=o.getNode().getImmediateChild(c)}else u=Ti(s,c,e.serverCache);u!=null?a=n.filter.updateChild(o.getNode(),c,u,h,i,r):a=o.getNode()}}return Mt(e,a,o.isFullyInitialized()||C(t),n.filter.filtersNodes())}}function Hn(n,e,t,s,i,r,o,a){const l=e.serverCache;let c;const h=o?n.filter:n.filter.getIndexedFilter();if(C(t))c=h.updateFullNode(l.getNode(),s,null);else if(h.filtersNodes()&&!l.isFiltered()){const f=l.getNode().updateChild(t,s);c=h.updateFullNode(l.getNode(),f,null)}else{const f=b(t);if(!l.isCompleteForPath(t)&&Ae(t)>1)return e;const m=N(t),O=l.getNode().getImmediateChild(f).updateChild(m,s);f===".priority"?c=h.updatePriority(l.getNode(),O):c=h.updateChild(l.getNode(),f,O,m,sl,null)}const u=Ja(e,c,l.isFullyInitialized()||C(t),h.filtersNodes()),d=new ki(i,u,r);return il(n,u,t,i,d,a)}function Ws(n,e,t,s,i,r,o){const a=e.eventCache;let l,c;const h=new ki(i,e,r);if(C(t))c=n.filter.updateFullNode(e.eventCache.getNode(),s,o),l=Mt(e,c,!0,n.filter.filtersNodes());else{const u=b(t);if(u===".priority")c=n.filter.updatePriority(e.eventCache.getNode(),s),l=Mt(e,c,a.isFullyInitialized(),a.isFiltered());else{const d=N(t),f=a.getNode().getImmediateChild(u);let m;if(C(d))m=s;else{const S=h.getCompleteChild(u);S!=null?_i(d)===".priority"&&S.getChild(Ha(d)).isEmpty()?m=S:m=S.updateChild(d,s):m=v.EMPTY_NODE}if(f.equals(m))l=e;else{const S=n.filter.updateChild(a.getNode(),u,m,d,h,o);l=Mt(e,S,a.isFullyInitialized(),n.filter.filtersNodes())}}}return l}function no(n,e){return n.eventCache.isCompleteForChild(e)}function Vp(n,e,t,s,i,r,o){let a=e;return s.foreach((l,c)=>{const h=M(t,l);no(e,b(h))&&(a=Ws(n,a,h,c,i,r,o))}),s.foreach((l,c)=>{const h=M(t,l);no(e,b(h))||(a=Ws(n,a,h,c,i,r,o))}),a}function so(n,e,t){return t.foreach((s,i)=>{e=e.updateChild(s,i)}),e}function Vs(n,e,t,s,i,r,o,a){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let l=e,c;C(t)?c=s:c=new P(null).setTree(t,s);const h=e.serverCache.getNode();return c.children.inorderTraversal((u,d)=>{if(h.hasChild(u)){const f=e.serverCache.getNode().getImmediateChild(u),m=so(n,f,d);l=Hn(n,l,new R(u),m,i,r,o,a)}}),c.children.inorderTraversal((u,d)=>{const f=!e.serverCache.isCompleteForChild(u)&&d.value===null;if(!h.hasChild(u)&&!f){const m=e.serverCache.getNode().getImmediateChild(u),S=so(n,m,d);l=Hn(n,l,new R(u),S,i,r,o,a)}}),l}function Gp(n,e,t,s,i,r,o){if($n(i,t)!=null)return e;const a=e.serverCache.isFiltered(),l=e.serverCache;if(s.value!=null){if(C(t)&&l.isFullyInitialized()||l.isCompleteForPath(t))return Hn(n,e,t,l.getNode().getChild(t),i,r,a,o);if(C(t)){let c=new P(null);return l.getNode().forEachChild(it,(h,u)=>{c=c.set(new R(h),u)}),Vs(n,e,t,c,i,r,a,o)}else return e}else{let c=new P(null);return s.foreach((h,u)=>{const d=M(t,h);l.isCompleteForPath(d)&&(c=c.set(h,l.getNode().getChild(d)))}),Vs(n,e,t,c,i,r,a,o)}}function jp(n,e,t,s,i){const r=e.serverCache,o=Ja(e,r.getNode(),r.isFullyInitialized()||C(t),r.isFiltered());return il(n,o,t,s,sl,i)}function qp(n,e,t,s,i,r){let o;if($n(s,t)!=null)return e;{const a=new ki(s,e,i),l=e.eventCache.getNode();let c;if(C(t)||b(t)===".priority"){let h;if(e.serverCache.isFullyInitialized())h=Bn(s,ze(e));else{const u=e.serverCache.getNode();p(u instanceof v,"serverChildren would be complete if leaf node"),h=Si(s,u)}h=h,c=n.filter.updateFullNode(l,h,r)}else{const h=b(t);let u=Ti(s,h,e.serverCache);u==null&&e.serverCache.isCompleteForChild(h)&&(u=l.getImmediateChild(h)),u!=null?c=n.filter.updateChild(l,h,u,N(t),a,r):e.eventCache.getNode().hasChild(h)?c=n.filter.updateChild(l,h,v.EMPTY_NODE,N(t),a,r):c=l,c.isEmpty()&&e.serverCache.isFullyInitialized()&&(o=Bn(s,ze(e)),o.isLeafNode()&&(c=n.filter.updateFullNode(c,o,r)))}return o=e.serverCache.isFullyInitialized()||$n(s,k())!=null,Mt(e,c,o,n.filter.filtersNodes())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zp{constructor(e,t){this.query_=e,this.eventRegistrations_=[];const s=this.query_._queryParams,i=new wi(s.getIndex()),r=up(s);this.processor_=Bp(r);const o=t.serverCache,a=t.eventCache,l=i.updateFullNode(v.EMPTY_NODE,o.getNode(),null),c=r.updateFullNode(v.EMPTY_NODE,a.getNode(),null),h=new Re(l,o.isFullyInitialized(),i.filtersNodes()),u=new Re(c,a.isFullyInitialized(),r.filtersNodes());this.viewCache_=Xn(u,h),this.eventGenerator_=new vp(this.query_)}get query(){return this.query_}}function Kp(n){return n.viewCache_.serverCache.getNode()}function Yp(n){return Un(n.viewCache_)}function Qp(n,e){const t=ze(n.viewCache_);return t&&(n.query._queryParams.loadsAllData()||!C(e)&&!t.getImmediateChild(b(e)).isEmpty())?t.getChild(e):null}function io(n){return n.eventRegistrations_.length===0}function Jp(n,e){n.eventRegistrations_.push(e)}function ro(n,e,t){const s=[];if(t){p(e==null,"A cancel should cancel all event registrations.");const i=n.query._path;n.eventRegistrations_.forEach(r=>{const o=r.createCancelEvent(t,i);o&&s.push(o)})}if(e){let i=[];for(let r=0;r<n.eventRegistrations_.length;++r){const o=n.eventRegistrations_[r];if(!o.matches(e))i.push(o);else if(e.hasAnyCallback()){i=i.concat(n.eventRegistrations_.slice(r+1));break}}n.eventRegistrations_=i}else n.eventRegistrations_=[];return s}function oo(n,e,t,s){e.type===ee.MERGE&&e.source.queryId!==null&&(p(ze(n.viewCache_),"We should always have a full cache before handling merges"),p(Un(n.viewCache_),"Missing event cache, even though we have a server cache"));const i=n.viewCache_,r=Hp(n.processor_,i,e,t,s);return $p(n.processor_,r.viewCache),p(r.viewCache.serverCache.isFullyInitialized()||!i.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),n.viewCache_=r.viewCache,rl(n,r.changes,r.viewCache.eventCache.getNode(),null)}function Xp(n,e){const t=n.viewCache_.eventCache,s=[];return t.getNode().isLeafNode()||t.getNode().forEachChild(L,(r,o)=>{s.push(dt(r,o))}),t.isFullyInitialized()&&s.push(Ya(t.getNode())),rl(n,s,t.getNode(),e)}function rl(n,e,t,s){const i=s?[s]:n.eventRegistrations_;return yp(n.eventGenerator_,e,t,i)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Wn;class ol{constructor(){this.views=new Map}}function Zp(n){p(!Wn,"__referenceConstructor has already been defined"),Wn=n}function eg(){return p(Wn,"Reference.ts has not been loaded"),Wn}function tg(n){return n.views.size===0}function Ai(n,e,t,s){const i=e.source.queryId;if(i!==null){const r=n.views.get(i);return p(r!=null,"SyncTree gave us an op for an invalid query."),oo(r,e,t,s)}else{let r=[];for(const o of n.views.values())r=r.concat(oo(o,e,t,s));return r}}function al(n,e,t,s,i){const r=e._queryIdentifier,o=n.views.get(r);if(!o){let a=Bn(t,i?s:null),l=!1;a?l=!0:s instanceof v?(a=Si(t,s),l=!1):(a=v.EMPTY_NODE,l=!1);const c=Xn(new Re(a,l,!1),new Re(s,i,!1));return new zp(e,c)}return o}function ng(n,e,t,s,i,r){const o=al(n,e,s,i,r);return n.views.has(e._queryIdentifier)||n.views.set(e._queryIdentifier,o),Jp(o,t),Xp(o,t)}function sg(n,e,t,s){const i=e._queryIdentifier,r=[];let o=[];const a=Pe(n);if(i==="default")for(const[l,c]of n.views.entries())o=o.concat(ro(c,t,s)),io(c)&&(n.views.delete(l),c.query._queryParams.loadsAllData()||r.push(c.query));else{const l=n.views.get(i);l&&(o=o.concat(ro(l,t,s)),io(l)&&(n.views.delete(i),l.query._queryParams.loadsAllData()||r.push(l.query)))}return a&&!Pe(n)&&r.push(new(eg())(e._repo,e._path)),{removed:r,events:o}}function ll(n){const e=[];for(const t of n.views.values())t.query._queryParams.loadsAllData()||e.push(t);return e}function Te(n,e){let t=null;for(const s of n.views.values())t=t||Qp(s,e);return t}function cl(n,e){if(e._queryParams.loadsAllData())return es(n);{const s=e._queryIdentifier;return n.views.get(s)}}function dl(n,e){return cl(n,e)!=null}function Pe(n){return es(n)!=null}function es(n){for(const e of n.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Vn;function ig(n){p(!Vn,"__referenceConstructor has already been defined"),Vn=n}function rg(){return p(Vn,"Reference.ts has not been loaded"),Vn}let og=1;class ao{constructor(e){this.listenProvider_=e,this.syncPointTree_=new P(null),this.pendingWriteTree_=xp(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function ul(n,e,t,s,i){return bp(n.pendingWriteTree_,e,t,s,i),i?Ct(n,new qe(Ci(),e,t)):[]}function ag(n,e,t,s){Ip(n.pendingWriteTree_,e,t,s);const i=P.fromObject(t);return Ct(n,new ut(Ci(),e,i))}function Ee(n,e,t=!1){const s=Sp(n.pendingWriteTree_,e);if(Tp(n.pendingWriteTree_,e)){let r=new P(null);return s.snap!=null?r=r.set(k(),!0):$(s.children,o=>{r=r.set(new R(o),!0)}),Ct(n,new Fn(s.path,r,t))}else return[]}function on(n,e,t){return Ct(n,new qe(bi(),e,t))}function lg(n,e,t){const s=P.fromObject(t);return Ct(n,new ut(bi(),e,s))}function cg(n,e){return Ct(n,new Gt(bi(),e))}function dg(n,e,t){const s=Pi(n,t);if(s){const i=Ni(s),r=i.path,o=i.queryId,a=H(r,e),l=new Gt(Ii(o),a);return Oi(n,r,l)}else return[]}function hl(n,e,t,s,i=!1){const r=e._path,o=n.syncPointTree_.get(r);let a=[];if(o&&(e._queryIdentifier==="default"||dl(o,e))){const l=sg(o,e,t,s);tg(o)&&(n.syncPointTree_=n.syncPointTree_.remove(r));const c=l.removed;if(a=l.events,!i){const h=c.findIndex(d=>d._queryParams.loadsAllData())!==-1,u=n.syncPointTree_.findOnPath(r,(d,f)=>Pe(f));if(h&&!u){const d=n.syncPointTree_.subtree(r);if(!d.isEmpty()){const f=pg(d);for(let m=0;m<f.length;++m){const S=f[m],O=S.query,q=ml(n,S);n.listenProvider_.startListening(xt(O),jt(n,O),q.hashFn,q.onComplete)}}}!u&&c.length>0&&!s&&(h?n.listenProvider_.stopListening(xt(e),null):c.forEach(d=>{const f=n.queryToTagMap.get(ts(d));n.listenProvider_.stopListening(xt(d),f)}))}gg(n,c)}return a}function fl(n,e,t,s){const i=Pi(n,s);if(i!=null){const r=Ni(i),o=r.path,a=r.queryId,l=H(o,e),c=new qe(Ii(a),l,t);return Oi(n,o,c)}else return[]}function ug(n,e,t,s){const i=Pi(n,s);if(i){const r=Ni(i),o=r.path,a=r.queryId,l=H(o,e),c=P.fromObject(t),h=new ut(Ii(a),l,c);return Oi(n,o,h)}else return[]}function hg(n,e,t,s=!1){const i=e._path;let r=null,o=!1;n.syncPointTree_.foreachOnPath(i,(d,f)=>{const m=H(d,i);r=r||Te(f,m),o=o||Pe(f)});let a=n.syncPointTree_.get(i);a?(o=o||Pe(a),r=r||Te(a,k())):(a=new ol,n.syncPointTree_=n.syncPointTree_.set(i,a));let l;r!=null?l=!0:(l=!1,r=v.EMPTY_NODE,n.syncPointTree_.subtree(i).foreachChild((f,m)=>{const S=Te(m,k());S&&(r=r.updateImmediateChild(f,S))}));const c=dl(a,e);if(!c&&!e._queryParams.loadsAllData()){const d=ts(e);p(!n.queryToTagMap.has(d),"View does not exist, but we have a tag");const f=mg();n.queryToTagMap.set(d,f),n.tagToQueryMap.set(f,d)}const h=Zn(n.pendingWriteTree_,i);let u=ng(a,e,t,h,r,l);if(!c&&!o&&!s){const d=cl(a,e);u=u.concat(_g(n,e,d))}return u}function Ri(n,e,t){const i=n.pendingWriteTree_,r=n.syncPointTree_.findOnPath(e,(o,a)=>{const l=H(o,e),c=Te(a,l);if(c)return c});return el(i,e,r,t,!0)}function fg(n,e){const t=e._path;let s=null;n.syncPointTree_.foreachOnPath(t,(c,h)=>{const u=H(c,t);s=s||Te(h,u)});let i=n.syncPointTree_.get(t);i?s=s||Te(i,k()):(i=new ol,n.syncPointTree_=n.syncPointTree_.set(t,i));const r=s!=null,o=r?new Re(s,!0,!1):null,a=Zn(n.pendingWriteTree_,e._path),l=al(i,e,a,r?o.getNode():v.EMPTY_NODE,r);return Yp(l)}function Ct(n,e){return pl(e,n.syncPointTree_,null,Zn(n.pendingWriteTree_,k()))}function pl(n,e,t,s){if(C(n.path))return gl(n,e,t,s);{const i=e.get(k());t==null&&i!=null&&(t=Te(i,k()));let r=[];const o=b(n.path),a=n.operationForChild(o),l=e.children.get(o);if(l&&a){const c=t?t.getImmediateChild(o):null,h=tl(s,o);r=r.concat(pl(a,l,c,h))}return i&&(r=r.concat(Ai(i,n,s,t))),r}}function gl(n,e,t,s){const i=e.get(k());t==null&&i!=null&&(t=Te(i,k()));let r=[];return e.children.inorderTraversal((o,a)=>{const l=t?t.getImmediateChild(o):null,c=tl(s,o),h=n.operationForChild(o);h&&(r=r.concat(gl(h,a,l,c)))}),i&&(r=r.concat(Ai(i,n,s,t))),r}function ml(n,e){const t=e.query,s=jt(n,t);return{hashFn:()=>(Kp(e)||v.EMPTY_NODE).hash(),onComplete:i=>{if(i==="ok")return s?dg(n,t._path,s):cg(n,t._path);{const r=cf(i,t);return hl(n,t,null,r)}}}}function jt(n,e){const t=ts(e);return n.queryToTagMap.get(t)}function ts(n){return n._path.toString()+"$"+n._queryIdentifier}function Pi(n,e){return n.tagToQueryMap.get(e)}function Ni(n){const e=n.indexOf("$");return p(e!==-1&&e<n.length-1,"Bad queryKey."),{queryId:n.substr(e+1),path:new R(n.substr(0,e))}}function Oi(n,e,t){const s=n.syncPointTree_.get(e);p(s,"Missing sync point for query tag that we're tracking");const i=Zn(n.pendingWriteTree_,e);return Ai(s,t,i,null)}function pg(n){return n.fold((e,t,s)=>{if(t&&Pe(t))return[es(t)];{let i=[];return t&&(i=ll(t)),$(s,(r,o)=>{i=i.concat(o)}),i}})}function xt(n){return n._queryParams.loadsAllData()&&!n._queryParams.isDefault()?new(rg())(n._repo,n._path):n}function gg(n,e){for(let t=0;t<e.length;++t){const s=e[t];if(!s._queryParams.loadsAllData()){const i=ts(s),r=n.queryToTagMap.get(i);n.queryToTagMap.delete(i),n.tagToQueryMap.delete(r)}}}function mg(){return og++}function _g(n,e,t){const s=e._path,i=jt(n,e),r=ml(n,t),o=n.listenProvider_.startListening(xt(e),i,r.hashFn,r.onComplete),a=n.syncPointTree_.subtree(s);if(i)p(!Pe(a.value),"If we're adding a query, it shouldn't be shadowed");else{const l=a.fold((c,h,u)=>{if(!C(c)&&h&&Pe(h))return[es(h).query];{let d=[];return h&&(d=d.concat(ll(h).map(f=>f.query))),$(u,(f,m)=>{d=d.concat(m)}),d}});for(let c=0;c<l.length;++c){const h=l[c];n.listenProvider_.stopListening(xt(h),jt(n,h))}}return o}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mi{constructor(e){this.node_=e}getImmediateChild(e){const t=this.node_.getImmediateChild(e);return new Mi(t)}node(){return this.node_}}class Li{constructor(e,t){this.syncTree_=e,this.path_=t}getImmediateChild(e){const t=M(this.path_,e);return new Li(this.syncTree_,t)}node(){return Ri(this.syncTree_,this.path_)}}const vg=function(n){return n=n||{},n.timestamp=n.timestamp||new Date().getTime(),n},lo=function(n,e,t){if(!n||typeof n!="object")return n;if(p(".sv"in n,"Unexpected leaf node or priority contents"),typeof n[".sv"]=="string")return yg(n[".sv"],e,t);if(typeof n[".sv"]=="object")return wg(n[".sv"],e);p(!1,"Unexpected server value: "+JSON.stringify(n,null,2))},yg=function(n,e,t){switch(n){case"timestamp":return t.timestamp;default:p(!1,"Unexpected server value: "+n)}},wg=function(n,e,t){n.hasOwnProperty("increment")||p(!1,"Unexpected server value: "+JSON.stringify(n,null,2));const s=n.increment;typeof s!="number"&&p(!1,"Unexpected increment value: "+s);const i=e.node();if(p(i!==null&&typeof i<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!i.isLeafNode())return s;const o=i.getValue();return typeof o!="number"?s:o+s},_l=function(n,e,t,s){return xi(e,new Li(t,n),s)},vl=function(n,e,t){return xi(n,new Mi(e),t)};function xi(n,e,t){const s=n.getPriority().val(),i=lo(s,e.getImmediateChild(".priority"),t);let r;if(n.isLeafNode()){const o=n,a=lo(o.getValue(),e,t);return a!==o.getValue()||i!==o.getPriority().val()?new F(a,x(i)):n}else{const o=n;return r=o,i!==o.getPriority().val()&&(r=r.updatePriority(new F(i))),o.forEachChild(L,(a,l)=>{const c=xi(l,e.getImmediateChild(a),t);c!==l&&(r=r.updateImmediateChild(a,c))}),r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Di{constructor(e="",t=null,s={children:{},childCount:0}){this.name=e,this.parent=t,this.node=s}}function Fi(n,e){let t=e instanceof R?e:new R(e),s=n,i=b(t);for(;i!==null;){const r=ot(s.node.children,i)||{children:{},childCount:0};s=new Di(i,s,r),t=N(t),i=b(t)}return s}function bt(n){return n.node.value}function yl(n,e){n.node.value=e,Gs(n)}function wl(n){return n.node.childCount>0}function Eg(n){return bt(n)===void 0&&!wl(n)}function ns(n,e){$(n.node.children,(t,s)=>{e(new Di(t,n,s))})}function El(n,e,t,s){t&&e(n),ns(n,i=>{El(i,e,!0)})}function Cg(n,e,t){let s=n.parent;for(;s!==null;){if(e(s))return!0;s=s.parent}return!1}function an(n){return new R(n.parent===null?n.name:an(n.parent)+"/"+n.name)}function Gs(n){n.parent!==null&&bg(n.parent,n.name,n)}function bg(n,e,t){const s=Eg(t),i=re(n.node.children,e);s&&i?(delete n.node.children[e],n.node.childCount--,Gs(n)):!s&&!i&&(n.node.children[e]=t.node,n.node.childCount++,Gs(n))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ig=/[\[\].#$\/\u0000-\u001F\u007F]/,Sg=/[\[\].#$\u0000-\u001F\u007F]/,bs=10*1024*1024,Ui=function(n){return typeof n=="string"&&n.length!==0&&!Ig.test(n)},Cl=function(n){return typeof n=="string"&&n.length!==0&&!Sg.test(n)},Tg=function(n){return n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),Cl(n)},kg=function(n){return n===null||typeof n=="string"||typeof n=="number"&&!hi(n)||n&&typeof n=="object"&&re(n,".sv")},bl=function(n,e,t,s){s&&e===void 0||ss(qn(n,"value"),e,t)},ss=function(n,e,t){const s=t instanceof R?new Vf(t,n):t;if(e===void 0)throw new Error(n+"contains undefined "+De(s));if(typeof e=="function")throw new Error(n+"contains a function "+De(s)+" with contents = "+e.toString());if(hi(e))throw new Error(n+"contains "+e.toString()+" "+De(s));if(typeof e=="string"&&e.length>bs/3&&zn(e)>bs)throw new Error(n+"contains a string greater than "+bs+" utf8 bytes "+De(s)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let i=!1,r=!1;if($(e,(o,a)=>{if(o===".value")i=!0;else if(o!==".priority"&&o!==".sv"&&(r=!0,!Ui(o)))throw new Error(n+" contains an invalid key ("+o+") "+De(s)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);Gf(s,o),ss(n,a,s),jf(s)}),i&&r)throw new Error(n+' contains ".value" child '+De(s)+" in addition to actual children.")}},Ag=function(n,e){let t,s;for(t=0;t<e.length;t++){s=e[t];const r=$t(s);for(let o=0;o<r.length;o++)if(!(r[o]===".priority"&&o===r.length-1)){if(!Ui(r[o]))throw new Error(n+"contains an invalid key ("+r[o]+") in path "+s.toString()+`. Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`)}}e.sort(Wf);let i=null;for(t=0;t<e.length;t++){if(s=e[t],i!==null&&K(i,s))throw new Error(n+"contains a path "+i.toString()+" that is ancestor of another path "+s.toString());i=s}},Rg=function(n,e,t,s){const i=qn(n,"values");if(!(e&&typeof e=="object")||Array.isArray(e))throw new Error(i+" must be an object containing the children to replace.");const r=[];$(e,(o,a)=>{const l=new R(o);if(ss(i,a,M(t,l)),_i(l)===".priority"&&!kg(a))throw new Error(i+"contains an invalid value for '"+l.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");r.push(l)}),Ag(i,r)},Il=function(n,e,t,s){if(!Cl(t))throw new Error(qn(n,e)+'was an invalid path = "'+t+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},Pg=function(n,e,t,s){t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),Il(n,e,t)},Bi=function(n,e){if(b(e)===".info")throw new Error(n+" failed = Can't modify data under /.info/")},Ng=function(n,e){const t=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!Ui(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||t.length!==0&&!Tg(t))throw new Error(qn(n,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Og{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function $i(n,e){let t=null;for(let s=0;s<e.length;s++){const i=e[s],r=i.getPath();t!==null&&!Wa(r,t.path)&&(n.eventLists_.push(t),t=null),t===null&&(t={events:[],path:r}),t.events.push(i)}t&&n.eventLists_.push(t)}function Y(n,e,t){$i(n,t),Mg(n,s=>K(s,e)||K(e,s))}function Mg(n,e){n.recursionDepth_++;let t=!0;for(let s=0;s<n.eventLists_.length;s++){const i=n.eventLists_[s];if(i){const r=i.path;e(r)?(Lg(n.eventLists_[s]),n.eventLists_[s]=null):t=!1}}t&&(n.eventLists_=[]),n.recursionDepth_--}function Lg(n){for(let e=0;e<n.events.length;e++){const t=n.events[e];if(t!==null){n.events[e]=null;const s=t.getEventRunner();Nt&&B("event: "+t.toString()),Et(s)}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xg="repo_interrupt",Dg=25;class Fg{constructor(e,t,s,i){this.repoInfo_=e,this.forceRestClient_=t,this.authTokenProvider_=s,this.appCheckProvider_=i,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new Og,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=Dn(),this.transactionQueueTree_=new Di,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function Ug(n,e,t){if(n.stats_=gi(n.repoInfo_),n.forceRestClient_||ff())n.server_=new xn(n.repoInfo_,(s,i,r,o)=>{co(n,s,i,r,o)},n.authTokenProvider_,n.appCheckProvider_),setTimeout(()=>uo(n,!0),0);else{if(typeof t<"u"&&t!==null){if(typeof t!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{D(t)}catch(s){throw new Error("Invalid authOverride provided: "+s)}}n.persistentConnection_=new ue(n.repoInfo_,e,(s,i,r,o)=>{co(n,s,i,r,o)},s=>{uo(n,s)},s=>{Bg(n,s)},n.authTokenProvider_,n.appCheckProvider_,t),n.server_=n.persistentConnection_}n.authTokenProvider_.addTokenChangeListener(s=>{n.server_.refreshAuthToken(s)}),n.appCheckProvider_.addTokenChangeListener(s=>{n.server_.refreshAppCheckToken(s.token)}),n.statsReporter_=vf(n.repoInfo_,()=>new _p(n.stats_,n.server_)),n.infoData_=new hp,n.infoSyncTree_=new ao({startListening:(s,i,r,o)=>{let a=[];const l=n.infoData_.getNode(s._path);return l.isEmpty()||(a=on(n.infoSyncTree_,s._path,l),setTimeout(()=>{o("ok")},0)),a},stopListening:()=>{}}),Hi(n,"connected",!1),n.serverSyncTree_=new ao({startListening:(s,i,r,o)=>(n.server_.listen(s,r,i,(a,l)=>{const c=o(a,l);Y(n.eventQueue_,s._path,c)}),[]),stopListening:(s,i)=>{n.server_.unlisten(s,i)}})}function Sl(n){const t=n.infoData_.getNode(new R(".info/serverTimeOffset")).val()||0;return new Date().getTime()+t}function is(n){return vg({timestamp:Sl(n)})}function co(n,e,t,s,i){n.dataUpdateCount++;const r=new R(e);t=n.interceptServerDataCallback_?n.interceptServerDataCallback_(e,t):t;let o=[];if(i)if(s){const l=In(t,c=>x(c));o=ug(n.serverSyncTree_,r,l,i)}else{const l=x(t);o=fl(n.serverSyncTree_,r,l,i)}else if(s){const l=In(t,c=>x(c));o=lg(n.serverSyncTree_,r,l)}else{const l=x(t);o=on(n.serverSyncTree_,r,l)}let a=r;o.length>0&&(a=ft(n,r)),Y(n.eventQueue_,a,o)}function uo(n,e){Hi(n,"connected",e),e===!1&&Vg(n)}function Bg(n,e){$(e,(t,s)=>{Hi(n,t,s)})}function Hi(n,e,t){const s=new R("/.info/"+e),i=x(t);n.infoData_.updateSnapshot(s,i);const r=on(n.infoSyncTree_,s,i);Y(n.eventQueue_,s,r)}function Wi(n){return n.nextWriteId_++}function $g(n,e,t){const s=fg(n.serverSyncTree_,e);return s!=null?Promise.resolve(s):n.server_.get(e).then(i=>{const r=x(i).withIndex(e._queryParams.getIndex());hg(n.serverSyncTree_,e,t,!0);let o;if(e._queryParams.loadsAllData())o=on(n.serverSyncTree_,e._path,r);else{const a=jt(n.serverSyncTree_,e);o=fl(n.serverSyncTree_,e._path,r,a)}return Y(n.eventQueue_,e._path,o),hl(n.serverSyncTree_,e,t,null,!0),r},i=>(ln(n,"get for query "+D(e)+" failed: "+i),Promise.reject(new Error(i))))}function Hg(n,e,t,s,i){ln(n,"set",{path:e.toString(),value:t,priority:s});const r=is(n),o=x(t,s),a=Ri(n.serverSyncTree_,e),l=vl(o,a,r),c=Wi(n),h=ul(n.serverSyncTree_,e,l,c,!0);$i(n.eventQueue_,h),n.server_.put(e.toString(),o.val(!0),(d,f)=>{const m=d==="ok";m||W("set at "+e+" failed: "+d);const S=Ee(n.serverSyncTree_,c,!m);Y(n.eventQueue_,e,S),js(n,i,d,f)});const u=Gi(n,e);ft(n,u),Y(n.eventQueue_,u,[])}function Wg(n,e,t,s){ln(n,"update",{path:e.toString(),value:t});let i=!0;const r=is(n),o={};if($(t,(a,l)=>{i=!1,o[a]=_l(M(e,a),x(l),n.serverSyncTree_,r)}),i)B("update() called with empty data.  Don't do anything."),js(n,s,"ok",void 0);else{const a=Wi(n),l=ag(n.serverSyncTree_,e,o,a);$i(n.eventQueue_,l),n.server_.merge(e.toString(),t,(c,h)=>{const u=c==="ok";u||W("update at "+e+" failed: "+c);const d=Ee(n.serverSyncTree_,a,!u),f=d.length>0?ft(n,e):e;Y(n.eventQueue_,f,d),js(n,s,c,h)}),$(t,c=>{const h=Gi(n,M(e,c));ft(n,h)}),Y(n.eventQueue_,e,[])}}function Vg(n){ln(n,"onDisconnectEvents");const e=is(n),t=Dn();Us(n.onDisconnect_,k(),(i,r)=>{const o=_l(i,r,n.serverSyncTree_,e);Qa(t,i,o)});let s=[];Us(t,k(),(i,r)=>{s=s.concat(on(n.serverSyncTree_,i,r));const o=Gi(n,i);ft(n,o)}),n.onDisconnect_=Dn(),Y(n.eventQueue_,k(),s)}function Gg(n){n.persistentConnection_&&n.persistentConnection_.interrupt(xg)}function ln(n,...e){let t="";n.persistentConnection_&&(t=n.persistentConnection_.id+":"),B(t,...e)}function js(n,e,t,s){e&&Et(()=>{if(t==="ok")e(null);else{const i=(t||"error").toUpperCase();let r=i;s&&(r+=": "+s);const o=new Error(r);o.code=i,e(o)}})}function Tl(n,e,t){return Ri(n.serverSyncTree_,e,t)||v.EMPTY_NODE}function Vi(n,e=n.transactionQueueTree_){if(e||rs(n,e),bt(e)){const t=Al(n,e);p(t.length>0,"Sending zero length transaction queue"),t.every(i=>i.status===0)&&jg(n,an(e),t)}else wl(e)&&ns(e,t=>{Vi(n,t)})}function jg(n,e,t){const s=t.map(c=>c.currentWriteId),i=Tl(n,e,s);let r=i;const o=i.hash();for(let c=0;c<t.length;c++){const h=t[c];p(h.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),h.status=1,h.retryCount++;const u=H(e,h.path);r=r.updateChild(u,h.currentOutputSnapshotRaw)}const a=r.val(!0),l=e;n.server_.put(l.toString(),a,c=>{ln(n,"transaction put response",{path:l.toString(),status:c});let h=[];if(c==="ok"){const u=[];for(let d=0;d<t.length;d++)t[d].status=2,h=h.concat(Ee(n.serverSyncTree_,t[d].currentWriteId)),t[d].onComplete&&u.push(()=>t[d].onComplete(null,!0,t[d].currentOutputSnapshotResolved)),t[d].unwatcher();rs(n,Fi(n.transactionQueueTree_,e)),Vi(n,n.transactionQueueTree_),Y(n.eventQueue_,e,h);for(let d=0;d<u.length;d++)Et(u[d])}else{if(c==="datastale")for(let u=0;u<t.length;u++)t[u].status===3?t[u].status=4:t[u].status=0;else{W("transaction at "+l.toString()+" failed: "+c);for(let u=0;u<t.length;u++)t[u].status=4,t[u].abortReason=c}ft(n,e)}},o)}function ft(n,e){const t=kl(n,e),s=an(t),i=Al(n,t);return qg(n,i,s),s}function qg(n,e,t){if(e.length===0)return;const s=[];let i=[];const o=e.filter(a=>a.status===0).map(a=>a.currentWriteId);for(let a=0;a<e.length;a++){const l=e[a],c=H(t,l.path);let h=!1,u;if(p(c!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),l.status===4)h=!0,u=l.abortReason,i=i.concat(Ee(n.serverSyncTree_,l.currentWriteId,!0));else if(l.status===0)if(l.retryCount>=Dg)h=!0,u="maxretry",i=i.concat(Ee(n.serverSyncTree_,l.currentWriteId,!0));else{const d=Tl(n,l.path,o);l.currentInputSnapshot=d;const f=e[a].update(d.val());if(f!==void 0){ss("transaction failed: Data returned ",f,l.path);let m=x(f);typeof f=="object"&&f!=null&&re(f,".priority")||(m=m.updatePriority(d.getPriority()));const O=l.currentWriteId,q=is(n),z=vl(m,d,q);l.currentOutputSnapshotRaw=m,l.currentOutputSnapshotResolved=z,l.currentWriteId=Wi(n),o.splice(o.indexOf(O),1),i=i.concat(ul(n.serverSyncTree_,l.path,z,l.currentWriteId,l.applyLocally)),i=i.concat(Ee(n.serverSyncTree_,O,!0))}else h=!0,u="nodata",i=i.concat(Ee(n.serverSyncTree_,l.currentWriteId,!0))}Y(n.eventQueue_,t,i),i=[],h&&(e[a].status=2,function(d){setTimeout(d,Math.floor(0))}(e[a].unwatcher),e[a].onComplete&&(u==="nodata"?s.push(()=>e[a].onComplete(null,!1,e[a].currentInputSnapshot)):s.push(()=>e[a].onComplete(new Error(u),!1,null))))}rs(n,n.transactionQueueTree_);for(let a=0;a<s.length;a++)Et(s[a]);Vi(n,n.transactionQueueTree_)}function kl(n,e){let t,s=n.transactionQueueTree_;for(t=b(e);t!==null&&bt(s)===void 0;)s=Fi(s,t),e=N(e),t=b(e);return s}function Al(n,e){const t=[];return Rl(n,e,t),t.sort((s,i)=>s.order-i.order),t}function Rl(n,e,t){const s=bt(e);if(s)for(let i=0;i<s.length;i++)t.push(s[i]);ns(e,i=>{Rl(n,i,t)})}function rs(n,e){const t=bt(e);if(t){let s=0;for(let i=0;i<t.length;i++)t[i].status!==2&&(t[s]=t[i],s++);t.length=s,yl(e,t.length>0?t:void 0)}ns(e,s=>{rs(n,s)})}function Gi(n,e){const t=an(kl(n,e)),s=Fi(n.transactionQueueTree_,e);return Cg(s,i=>{Is(n,i)}),Is(n,s),El(s,i=>{Is(n,i)}),t}function Is(n,e){const t=bt(e);if(t){const s=[];let i=[],r=-1;for(let o=0;o<t.length;o++)t[o].status===3||(t[o].status===1?(p(r===o-1,"All SENT items should be at beginning of queue."),r=o,t[o].status=3,t[o].abortReason="set"):(p(t[o].status===0,"Unexpected transaction status in abort"),t[o].unwatcher(),i=i.concat(Ee(n.serverSyncTree_,t[o].currentWriteId,!0)),t[o].onComplete&&s.push(t[o].onComplete.bind(null,new Error("set"),!1,null))));r===-1?yl(e,void 0):t.length=r+1,Y(n.eventQueue_,an(e),i);for(let o=0;o<s.length;o++)Et(s[o])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zg(n){let e="";const t=n.split("/");for(let s=0;s<t.length;s++)if(t[s].length>0){let i=t[s];try{i=decodeURIComponent(i.replace(/\+/g," "))}catch{}e+="/"+i}return e}function Kg(n){const e={};n.charAt(0)==="?"&&(n=n.substring(1));for(const t of n.split("&")){if(t.length===0)continue;const s=t.split("=");s.length===2?e[decodeURIComponent(s[0])]=decodeURIComponent(s[1]):W(`Invalid query segment '${t}' in query '${n}'`)}return e}const ho=function(n,e){const t=Yg(n),s=t.namespace;t.domain==="firebase.com"&&pe(t.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!s||s==="undefined")&&t.domain!=="localhost"&&pe("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),t.secure||sf();const i=t.scheme==="ws"||t.scheme==="wss";return{repoInfo:new Oa(t.host,t.secure,s,i,e,"",s!==t.subdomain),path:new R(t.pathString)}},Yg=function(n){let e="",t="",s="",i="",r="",o=!0,a="https",l=443;if(typeof n=="string"){let c=n.indexOf("//");c>=0&&(a=n.substring(0,c-1),n=n.substring(c+2));let h=n.indexOf("/");h===-1&&(h=n.length);let u=n.indexOf("?");u===-1&&(u=n.length),e=n.substring(0,Math.min(h,u)),h<u&&(i=zg(n.substring(h,u)));const d=Kg(n.substring(Math.min(n.length,u)));c=e.indexOf(":"),c>=0?(o=a==="https"||a==="wss",l=parseInt(e.substring(c+1),10)):c=e.length;const f=e.slice(0,c);if(f.toLowerCase()==="localhost")t="localhost";else if(f.split(".").length<=2)t=f;else{const m=e.indexOf(".");s=e.substring(0,m).toLowerCase(),t=e.substring(m+1),r=s}"ns"in d&&(r=d.ns)}return{host:e,port:l,domain:t,subdomain:s,secure:o,scheme:a,pathString:i,namespace:r}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fo="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz",Qg=function(){let n=0;const e=[];return function(t){const s=t===n;n=t;let i;const r=new Array(8);for(i=7;i>=0;i--)r[i]=fo.charAt(t%64),t=Math.floor(t/64);p(t===0,"Cannot push at time == 0");let o=r.join("");if(s){for(i=11;i>=0&&e[i]===63;i--)e[i]=0;e[i]++}else for(i=0;i<12;i++)e[i]=Math.floor(Math.random()*64);for(i=0;i<12;i++)o+=fo.charAt(e[i]);return p(o.length===20,"nextPushId: Length should be 20."),o}}();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jg{constructor(e,t,s,i){this.eventType=e,this.eventRegistration=t,this.snapshot=s,this.prevName=i}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+D(this.snapshot.exportVal())}}class Xg{constructor(e,t,s){this.eventRegistration=e,this.error=t,this.path=s}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zg{constructor(e,t){this.snapshotCallback=e,this.cancelCallback=t}onValue(e,t){this.snapshotCallback.call(null,e,t)}onCancel(e){return p(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ji{constructor(e,t,s,i){this._repo=e,this._path=t,this._queryParams=s,this._orderByCalled=i}get key(){return C(this._path)?null:_i(this._path)}get ref(){return new ge(this._repo,this._path)}get _queryIdentifier(){const e=Jr(this._queryParams),t=fi(e);return t==="{}"?"default":t}get _queryObject(){return Jr(this._queryParams)}isEqual(e){if(e=G(e),!(e instanceof ji))return!1;const t=this._repo===e._repo,s=Wa(this._path,e._path),i=this._queryIdentifier===e._queryIdentifier;return t&&s&&i}toJSON(){return this.toString()}toString(){return this._repo.toString()+Hf(this._path)}}class ge extends ji{constructor(e,t){super(e,t,new Ei,!1)}get parent(){const e=Ha(this._path);return e===null?null:new ge(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}class qt{constructor(e,t,s){this._node=e,this.ref=t,this._index=s}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const t=new R(e),s=zt(this.ref,e);return new qt(this._node.getChild(t),s,L)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(s,i)=>e(new qt(i,zt(this.ref,s),L)))}hasChild(e){const t=new R(e);return!this._node.getChild(t).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function Me(n,e){return n=G(n),n._checkNotDeleted("ref"),e!==void 0?zt(n._root,e):n._root}function zt(n,e){return n=G(n),b(n._path)===null?Pg("child","path",e):Il("child","path",e),new ge(n._repo,M(n._path,e))}function Pl(n,e){n=G(n),Bi("push",n._path),bl("push",e,n._path,!0);const t=Sl(n._repo),s=Qg(t),i=zt(n,s),r=zt(n,s);let o;return o=Promise.resolve(r),i.then=o.then.bind(o),i.catch=o.then.bind(o,void 0),i}function Nl(n){return Bi("remove",n._path),qi(n,null)}function qi(n,e){n=G(n),Bi("set",n._path),bl("set",e,n._path,!1);const t=new Jt;return Hg(n._repo,n._path,e,null,t.wrapCallback(()=>{})),t.promise}function Ol(n,e){Rg("update",e,n._path);const t=new Jt;return Wg(n._repo,n._path,e,t.wrapCallback(()=>{})),t.promise}function Ml(n){n=G(n);const e=new Zg(()=>{}),t=new zi(e);return $g(n._repo,n,t).then(s=>new qt(s,new ge(n._repo,n._path),n._queryParams.getIndex()))}class zi{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,t){const s=t._queryParams.getIndex();return new Jg("value",this,new qt(e.snapshotNode,new ge(t._repo,t._path),s))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,t){return this.callbackContext.hasCancelCallback?new Xg(this,e,t):null}matches(e){return e instanceof zi?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}Zp(ge);ig(ge);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const em="FIREBASE_DATABASE_EMULATOR_HOST",qs={};let tm=!1;function nm(n,e,t,s){const i=e.lastIndexOf(":"),r=e.substring(0,i),o=_t(r);n.repoInfo_=new Oa(e,o,n.repoInfo_.namespace,n.repoInfo_.webSocketOnly,n.repoInfo_.nodeAdmin,n.repoInfo_.persistenceKey,n.repoInfo_.includeNamespaceInQueryParams,!0,t),s&&(n.authTokenProvider_=s)}function sm(n,e,t,s,i){let r=s||n.options.databaseURL;r===void 0&&(n.options.projectId||pe("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),B("Using default host for project ",n.options.projectId),r=`${n.options.projectId}-default-rtdb.firebaseio.com`);let o=ho(r,i),a=o.repoInfo,l;typeof process<"u"&&Mr&&(l=Mr[em]),l?(r=`http://${l}?ns=${a.namespace}`,o=ho(r,i),a=o.repoInfo):o.repoInfo.secure;const c=new gf(n.name,n.options,e);Ng("Invalid Firebase Database URL",o),C(o.path)||pe("Database URL must point to the root of a Firebase Database (not including a child path).");const h=rm(a,n,c,new pf(n,t));return new om(h,n)}function im(n,e){const t=qs[e];(!t||t[n.key]!==n)&&pe(`Database ${e}(${n.repoInfo_}) has already been deleted.`),Gg(n),delete t[n.key]}function rm(n,e,t,s){let i=qs[e.name];i||(i={},qs[e.name]=i);let r=i[n.toURLString()];return r&&pe("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),r=new Fg(n,tm,t,s),i[n.toURLString()]=r,r}class om{constructor(e,t){this._repoInternal=e,this.app=t,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(Ug(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new ge(this._repo,k())),this._rootInternal}_delete(){return this._rootInternal!==null&&(im(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&pe("Cannot call "+e+" on a deleted database.")}}function am(n=Bo(),e){const t=ei(n,"database").getImmediate({identifier:e});if(!t._instanceStarted){const s=wc("database");s&&lm(t,...s)}return t}function lm(n,e,t,s={}){n=G(n),n._checkNotDeleted("useEmulator");const i=`${e}:${t}`,r=n._repoInternal;if(n._instanceStarted){if(i===n._repoInternal.repoInfo_.host&&We(s,r.repoInfo_.emulatorOptions))return;pe("connectDatabaseEmulator() cannot initialize or alter the emulator configuration after the database instance has started.")}let o;if(r.repoInfo_.nodeAdmin)s.mockUserToken&&pe('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),o=new wn(wn.OWNER);else if(s.mockUserToken){const a=typeof s.mockUserToken=="string"?s.mockUserToken:Ec(s.mockUserToken,n.app.options.projectId);o=new wn(a)}_t(e)&&(Oo(e),Mo("Database",!0)),nm(r,i,s,o)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cm(n){Jh(yt),at(new Ve("database",(e,{instanceIdentifier:t})=>{const s=e.getProvider("app").getImmediate(),i=e.getProvider("auth-internal"),r=e.getProvider("app-check-internal");return sm(s,i,r,t)},"PUBLIC").setMultipleInstances(!0)),Ie(Lr,xr,n),Ie(Lr,xr,"esm2017")}ue.prototype.simpleListen=function(n,e){this.sendRequest("q",{p:n},e)};ue.prototype.echo=function(n,e){this.sendRequest("echo",{d:n},e)};cm();const dm={apiKey:"AIzaSyDCeeENjcUhpNo5ysdtWWYKPBn4CU1ZJBA",authDomain:"sobhy-color-generator-app.firebaseapp.com",databaseURL:"https://sobhy-color-generator-app-default-rtdb.firebaseio.com",projectId:"sobhy-color-generator-app",storageBucket:"sobhy-color-generator-app.firebasestorage.app",messagingSenderId:"145130207254",appId:"1:145130207254:web:5d65ac8827830fd7dc9d37",measurementId:"G-R45QD6TEHK"},Ll=Uo(dm),Le=am(Ll),cn=zh(Ll),um=new oe;async function hm(){try{const e=(await nh(cn,um)).user;return g(`Welcome, ${e.displayName}! 👋`,"success"),{uid:e.uid,email:e.email,displayName:e.displayName,photoURL:e.photoURL}}catch(n){throw console.error("Error signing in with Google:",n),n.code==="auth/popup-closed-by-user"?g("Sign-in cancelled","info"):n.code==="auth/popup-blocked"?g("Please allow popups for this site","error"):g("Failed to sign in. Please try again.","error"),n}}async function fm(){try{await Du(cn),g("Signed out successfully","success")}catch(n){throw console.error("Error signing out:",n),g("Failed to sign out","error"),n}}function me(){const n=cn.currentUser;return n?{uid:n.uid,email:n.email,displayName:n.displayName,photoURL:n.photoURL}:null}function pm(){return me()}function gm(n){return xu(cn,e=>{n(e?{uid:e.uid,email:e.email,displayName:e.displayName,photoURL:e.photoURL,isSignedIn:!0}:{isSignedIn:!1})})}function mm(n){return gm(n)}function xl(){return!!cn.currentUser}async function _m(n){const e=me();if(!e)throw g("Please sign in to save palettes","error"),new Error("User not authenticated");try{const t=Me(Le,`users/${e.uid}/palettes`),s=Pl(t),i={name:n.name||"Untitled Palette",colors:n.colors||[],scheme:n.scheme||"monochrome",seedColor:n.seedColor||"#000000",tags:Array.isArray(n.tags)?n.tags.join(", "):n.tags||"",notes:n.notes||"",createdAt:Date.now(),updatedAt:Date.now()};return await qi(s,i),g("Palette saved successfully! 🎨","success"),s.key}catch(t){throw console.error("Error saving palette:",t),g("Failed to save palette","error"),t}}async function vm(){const n=me();if(!n)return[];try{const e=Me(Le,`users/${n.uid}/palettes`),t=await Ml(e);if(t.exists()){const s=t.val();return Object.keys(s).map(i=>({id:i,...s[i],tags:typeof s[i].tags=="string"&&s[i].tags?s[i].tags.split(",").map(r=>r.trim()):[]}))}return[]}catch(e){return console.error("Error fetching palettes:",e),g("Failed to load palettes","error"),[]}}async function ym(n,e){const t=me();if(!t)throw g("Please sign in to update palettes","error"),new Error("User not authenticated");try{const s=Me(Le,`users/${t.uid}/palettes/${n}`),i={...e,updatedAt:Date.now()};e.tags&&Array.isArray(e.tags)&&(i.tags=e.tags.join(", ")),await Ol(s,i),g("Palette updated successfully!","success")}catch(s){throw console.error("Error updating palette:",s),g("Failed to update palette","error"),s}}async function wm(n){const e=me();if(!e)throw g("Please sign in to delete palettes","error"),new Error("User not authenticated");try{const t=Me(Le,`users/${e.uid}/palettes/${n}`);await Nl(t),g("Palette deleted","success")}catch(t){throw console.error("Error deleting palette:",t),g("Failed to delete palette","error"),t}}async function Em(n){const e=me();if(!e)throw g("Please sign in to save gradients","error"),new Error("User not authenticated");try{const t=Me(Le,`users/${e.uid}/gradients`),s=Pl(t),i={name:n.name||"Untitled Gradient",type:n.type||"linear",angle:n.angle||90,stops:n.stops||[],tags:Array.isArray(n.tags)?n.tags.join(", "):n.tags||"",notes:n.notes||"",createdAt:Date.now(),updatedAt:Date.now()};return await qi(s,i),g("Gradient saved successfully! 🌈","success"),s.key}catch(t){throw console.error("Error saving gradient:",t),g("Failed to save gradient","error"),t}}async function Cm(){const n=me();if(!n)return[];try{const e=Me(Le,`users/${n.uid}/gradients`),t=await Ml(e);if(t.exists()){const s=t.val();return Object.keys(s).map(i=>({id:i,...s[i],tags:typeof s[i].tags=="string"&&s[i].tags?s[i].tags.split(",").map(r=>r.trim()):[]}))}return[]}catch(e){return console.error("Error fetching gradients:",e),g("Failed to load gradients","error"),[]}}async function bm(n,e){const t=me();if(!t)throw g("Please sign in to update gradients","error"),new Error("User not authenticated");try{const s=Me(Le,`users/${t.uid}/gradients/${n}`),i={...e,updatedAt:Date.now()};e.tags&&Array.isArray(e.tags)&&(i.tags=e.tags.join(", ")),await Ol(s,i),g("Gradient updated successfully!","success")}catch(s){throw console.error("Error updating gradient:",s),g("Failed to update gradient","error"),s}}async function Im(n){const e=me();if(!e)throw g("Please sign in to delete gradients","error"),new Error("User not authenticated");try{const t=Me(Le,`users/${e.uid}/gradients/${n}`);await Nl(t),g("Gradient deleted","success")}catch(t){throw console.error("Error deleting gradient:",t),g("Failed to delete gradient","error"),t}}function Ki({title:n,content:e,buttons:t=[],onClose:s}){Sm();const i=document.createElement("div");i.className="modal-overlay",i.setAttribute("role","dialog"),i.setAttribute("aria-modal","true"),i.setAttribute("aria-labelledby","modal-title");const r=document.createElement("div");r.className="modal",r.innerHTML=`
        <div class="modal__header">
            <h2 class="modal__title" id="modal-title">${n}</h2>
            <button class="modal__close" aria-label="Close modal">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
        </div>
        <div class="modal__body">
            ${e}
        </div>
        <div class="modal__footer">
            <!-- Buttons will be inserted here -->
        </div>
    `;const o=r.querySelector(".modal__footer");t.forEach(c=>{const h=document.createElement("button");h.className=`btn ${c.className||"btn--secondary"}`,h.textContent=c.text,h.onclick=()=>{c.onClick&&c.onClick(),c.closeOnClick!==!1&&Be(i)},o.appendChild(h)});const a=r.querySelector(".modal__close");a.onclick=()=>Be(i),i.onclick=c=>{c.target===i&&Be(i)};const l=c=>{c.key==="Escape"&&Be(i)};return document.addEventListener("keydown",l),i.dataset.cleanup="true",i._cleanup=()=>{document.removeEventListener("keydown",l),s&&s()},i.appendChild(r),document.body.appendChild(i),requestAnimationFrame(()=>{const c=o.querySelector("button");c&&c.focus()}),i}function Be(n){n&&(n._cleanup&&n._cleanup(),n.classList.add("modal-overlay--closing"),setTimeout(()=>{n.parentNode&&n.parentNode.removeChild(n)},200))}function Sm(){document.querySelectorAll(".modal-overlay").forEach(e=>Be(e))}function Dl(n,e,t="Confirm",s="Cancel"){return new Promise(i=>{Ki({title:n,content:`<p class="modal__message">${e}</p>`,buttons:[{text:s,className:"btn--secondary",onClick:()=>{i(!1)}},{text:t,className:"btn--primary btn--danger",onClick:()=>{i(!0)}}],onClose:()=>{i(!1)}})})}function Fl(n=[],e="monochrome",t="#000000",s=null){var a;if(!xl()){g("Please sign in to save palettes","error");return}if(!Array.isArray(n)){console.error("Colors parameter must be an array, got:",typeof n),g("Invalid color data","error");return}const i=!!s;({...s||{}});const r=`
        <form id="save-palette-form" class="palette-form">
            <div class="form-group">
                <label for="palette-name" class="form-label">Palette Name *</label>
                <input 
                    type="text" 
                    id="palette-name" 
                    class="form-input"
                    placeholder="e.g., Ocean Breeze"
                    required
                    autocomplete="off"
                    value="${(s==null?void 0:s.name)||""}"
                >
            </div>
            
            <div class="form-group">
                <label for="palette-tags" class="form-label">Tags</label>
                <input 
                    type="text" 
                    id="palette-tags" 
                    class="form-input"
                    placeholder="e.g., blue, nature, calm (comma-separated)"
                    autocomplete="off"
                    value="${((a=s==null?void 0:s.tags)==null?void 0:a.join(", "))||""}"
                >
                <small class="form-hint">Separate tags with commas</small>
            </div>
            
            <div class="form-group">
                <label for="palette-notes" class="form-label">Notes</label>
                <textarea 
                    id="palette-notes" 
                    class="form-textarea"
                    rows="3"
                    placeholder="Add notes about this palette..."
                >${(s==null?void 0:s.notes)||""}</textarea>
            </div>
            
            <div class="palette-preview">
                <div class="palette-preview__label">Colors:</div>
                <div class="palette-preview__colors">
                    ${n.map(l=>`
                        <div class="palette-preview__swatch" style="background-color: ${l.hex}" title="${l.name}"></div>
                    `).join("")}
                </div>
            </div>
        </form>
    `,o=Ki({title:i?"✏️ Edit Palette":"💾 Save Palette",content:r,buttons:[{text:"Cancel",className:"btn--secondary"},{text:i?"Update Palette":"Save Palette",className:"btn--primary",closeOnClick:!1,onClick:async()=>{const l=document.getElementById("save-palette-form");if(!l.checkValidity()){l.reportValidity();return}const c=document.getElementById("palette-name").value.trim(),h=document.getElementById("palette-tags").value.trim(),u=document.getElementById("palette-notes").value.trim(),d=h?h.split(",").map(f=>f.trim()).filter(f=>f):[];try{const f={name:c,colors:n,scheme:e,seedColor:t,tags:d,notes:u};i&&s.id?await ym(s.id,f):await _m(f),Be(o),document.dispatchEvent(new CustomEvent("paletteSaved"))}catch(f){console.error("Failed to save palette:",f)}}}]});setTimeout(()=>{const l=document.getElementById("palette-name");l&&l.focus()},100)}function dn(n,e,t){const i=[...t].sort((r,o)=>r.position-o.position).map(r=>`${r.color} ${r.position}%`).join(", ");return n==="linear"?`linear-gradient(${e}deg, ${i})`:n==="radial"?`radial-gradient(circle, ${i})`:""}function Ul(){const n=Math.floor(Math.random()*4)+2,e=[];for(let i=0;i<n;i++){const r=Math.round(i/(n-1)*100),o=Bl();e.push({color:o,position:r})}const t=Math.floor(Math.random()*361);return{type:Math.random()>.5?"linear":"radial",angle:t,stops:e}}function Bl(){const n=Math.floor(Math.random()*256),e=Math.floor(Math.random()*256),t=Math.floor(Math.random()*256);return Eo(n,e,t)}function $l(){const n=Math.floor(Math.random()*360),e=Math.floor(Math.random()*30)+60,t=Math.floor(Math.random()*30)+40;return Hl(n,e,t)}function Hl(n,e,t){e/=100,t/=100;const s=(1-Math.abs(2*t-1))*e,i=s*(1-Math.abs(n/60%2-1)),r=t-s/2;let o=0,a=0,l=0;n>=0&&n<60?(o=s,a=i,l=0):n>=60&&n<120?(o=i,a=s,l=0):n>=120&&n<180?(o=0,a=s,l=i):n>=180&&n<240?(o=0,a=i,l=s):n>=240&&n<300?(o=i,a=0,l=s):n>=300&&n<360&&(o=s,a=0,l=i);const c=Math.round((o+r)*255),h=Math.round((a+r)*255),u=Math.round((l+r)*255);return Eo(c,h,u)}function Yi(n){return/^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(n)}function Qi(n){return n.startsWith("#")?n:`#${n}`}const po=Object.freeze(Object.defineProperty({__proto__:null,ensureHashPrefix:Qi,generateGradientCSS:dn,generateRandomGradient:Ul,generateRandomHexColor:Bl,generateRandomPleasantColor:$l,hslToHex:Hl,isValidHex:Yi},Symbol.toStringTag,{value:"Module"}));function Wl(n,e=null){var o;if(!xl()){g("Please sign in to save gradients","error");return}if(!n||!n.stops||n.stops.length<2){console.error("Invalid gradient data:",n),g("Invalid gradient data","error");return}const t=!!e;({...n,...e||{}});const s=dn(n.type,n.angle,n.stops),i=`
        <form id="save-gradient-form" class="gradient-form">
            <div class="form-group">
                <label for="gradient-name" class="form-label">Gradient Name *</label>
                <input 
                    type="text" 
                    id="gradient-name" 
                    class="form-input"
                    placeholder="e.g., Sunset Vibes"
                    required
                    autocomplete="off"
                    value="${(e==null?void 0:e.name)||""}"
                >
            </div>
            
            <div class="form-group">
                <label for="gradient-tags" class="form-label">Tags</label>
                <input 
                    type="text" 
                    id="gradient-tags" 
                    class="form-input"
                    placeholder="e.g., warm, vibrant, hero (comma-separated)"
                    autocomplete="off"
                    value="${((o=e==null?void 0:e.tags)==null?void 0:o.join(", "))||""}"
                >
                <small class="form-hint">Separate tags with commas</small>
            </div>
            
            <div class="form-group">
                <label for="gradient-notes" class="form-label">Notes</label>
                <textarea 
                    id="gradient-notes" 
                    class="form-textarea"
                    rows="3"
                    placeholder="Add notes about this gradient..."
                >${(e==null?void 0:e.notes)||""}</textarea>
            </div>
            
            <div class="gradient-preview-modal">
                <div class="gradient-preview-modal__label">Preview:</div>
                <div class="gradient-preview-modal__box" style="background: ${s}"></div>
                <div class="gradient-preview-modal__info">
                    <span>${n.type==="linear"?`${n.angle}°`:"Radial"}</span>
                    <span>${n.stops.length} stops</span>
                </div>
            </div>
        </form>
    `,r=Ki({title:t?"✏️ Edit Gradient":"💾 Save Gradient",content:i,buttons:[{text:"Cancel",className:"btn--secondary"},{text:t?"Update Gradient":"Save Gradient",className:"btn--primary",closeOnClick:!1,onClick:async()=>{const a=document.getElementById("save-gradient-form");if(!a.checkValidity()){a.reportValidity();return}const l=document.getElementById("gradient-name").value.trim(),c=document.getElementById("gradient-tags").value.trim(),h=document.getElementById("gradient-notes").value.trim(),u=c?c.split(",").map(d=>d.trim()).filter(d=>d):[];try{const d={name:l,tags:u,notes:h,type:n.type,angle:n.angle,stops:n.stops,css:s};t&&(e!=null&&e.id)?(await bm(e.id,d),g(`Gradient "${l}" updated successfully!`,"success")):(await Em(d),g(`Gradient "${l}" saved successfully!`,"success")),Be(r),window.dispatchEvent(new CustomEvent("gradientSaved"))}catch(d){console.error("Error saving gradient:",d),g(`Failed to save gradient: ${d.message}`,"error")}}}]});setTimeout(()=>{const a=document.getElementById("gradient-name");a&&a.focus()},100)}function Tm(n,e="Palette"){const t=`:root {
  /* ${e} */
`,s=n.map((i,r)=>`  ${`--color-${r+1}`}: ${i.hex};`).join(`
`);return t+s+`
}`}function km(n){const e={name:n.name||"Untitled Palette",scheme:n.scheme,seedColor:n.seedColor,colors:n.colors.map(t=>({name:t.name,hex:t.hex,rgb:t.rgb,hsl:t.hsl})),tags:n.tags||[],notes:"",exportedAt:new Date().toISOString()};return JSON.stringify(e,null,2)}function Am(n,e="Palette"){const t="mode-1",s="collection-1",i={};n.forEach((o,a)=>{const l=`var-${a+1}`,c=o.name||`Color ${a+1}`;i[l]={name:c,type:"COLOR",valuesByMode:{[t]:{r:o.rgb.r/255,g:o.rgb.g/255,b:o.rgb.b/255,a:1}}}});const r={collections:{[s]:{name:e,modes:{[t]:{name:"Default"}},variables:i}}};return JSON.stringify(r,null,2)}async function Rm(n,e="Palette"){const t=document.createElement("canvas"),s=t.getContext("2d"),i=200,r=300,o=20,a=80;return t.width=i*n.length+o*(n.length+1),t.height=r+a+o*2,s.fillStyle="#FFFFFF",s.fillRect(0,0,t.width,t.height),s.fillStyle="#1F2937",s.font="bold 28px Inter, sans-serif",s.textAlign="center",s.fillText(e,t.width/2,o+35),n.forEach((l,c)=>{const h=o+c*(i+o),u=a+o;s.fillStyle=l.hex,s.fillRect(h,u,i,r-100),s.fillStyle="#F9FAFB",s.fillRect(h,u+r-100,i,100),s.fillStyle="#374151",s.font="14px Inter, sans-serif",s.textAlign="center",s.fillText(l.name.length>20?l.name.substring(0,17)+"...":l.name,h+i/2,u+r-70),s.fillStyle="#1F2937",s.font="bold 16px Monaco, monospace",s.fillText(l.hex,h+i/2,u+r-45),s.fillStyle="#6B7280",s.font="12px Monaco, monospace",s.fillText(l.rgb.value,h+i/2,u+r-25)}),new Promise(l=>{t.toBlob(c=>{l(c)},"image/png")})}function pn(n,e,t="text/plain"){const s=n instanceof Blob?n:new Blob([n],{type:t}),i=URL.createObjectURL(s),r=document.createElement("a");r.href=i,r.download=e,document.body.appendChild(r),r.click(),document.body.removeChild(r),URL.revokeObjectURL(i)}async function Pm(n,e){const t=(e.name||"palette").replace(/[^a-z0-9]/gi,"-").toLowerCase();switch(n){case"css":{const s=Tm(e.colors,e.name);pn(s,`${t}.css`,"text/css"),g("CSS file downloaded!","success");break}case"json":{const s=km(e);pn(s,`${t}.json`,"application/json"),g("JSON file downloaded!","success");break}case"figma":{const s=Am(e.colors,e.name);pn(s,`${t}-figma.json`,"application/json"),g("Figma JSON downloaded!","success");break}case"png":{const s=await Rm(e.colors,e.name);pn(s,`${t}.png`,"image/png"),g("PNG image downloaded!","success");break}default:throw new Error("Invalid export format")}}function Nm(n){var e;try{const t=JSON.parse(n);if(t.stops&&Array.isArray(t.stops))return{type:"gradient",data:{name:t.name||"Imported Gradient",type:t.type||"linear",angle:t.angle||90,stops:t.stops,tags:t.tags||[],notes:t.notes||"Imported gradient"}};if(t.colors&&Array.isArray(t.colors))return{type:"palette",data:{name:t.name||"Imported Palette",scheme:t.scheme||"monochrome",seedColor:t.seedColor||((e=t.colors[0])==null?void 0:e.hex)||"#000000",colors:t.colors,tags:t.tags||[],notes:t.notes||"Imported palette"}};throw new Error("Invalid format: missing colors array or stops array")}catch(t){throw console.error("Error importing:",t),g("Invalid JSON format","error"),t}}let Om=[],Mm=[],pt=[],ke=[],Gn="recent";function Lm(){const n=document.getElementById("library-search"),e=document.getElementById("library-sort");n&&n.addEventListener("input",Fm),e&&e.addEventListener("change",Um)}async function Kt(){try{const[n,e]=await Promise.all([vm(),Cm()]);Om=n,Mm=e,pt=[...n.map(t=>({...t,itemType:"palette"})),...e.map(t=>({...t,itemType:"gradient"}))],ke=[...pt],Xi(Gn),Ji()}catch(n){console.error("Error loading library:",n),g("Failed to load library","error")}}function Ji(){const n=document.getElementById("library-grid"),e=document.getElementById("library-section");if(!(!n||!e)){if(e.hidden=!1,n.innerHTML="",ke.length===0){const t=pt.length===0?"No saved items yet":"No items match your search";n.innerHTML=`
            <div class="library-empty">
                <svg class="empty-icon" width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 8h48v48H8z" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" opacity="0.3"/>
                    <path d="M24 32h16M32 24v16" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>
                </svg>
                <p>${t}</p>
                ${pt.length===0?'<p class="empty-hint">Generate a palette or gradient and click "Save Palette" to start your library</p>':'<p class="empty-hint">Try adjusting your search terms</p>'}
            </div>
        `;return}ke.forEach(t=>{const s=t.itemType==="gradient"?Dm(t):xm(t);n.appendChild(s)})}}function xm(n){const e=document.createElement("article");e.className="palette-card",e.dataset.paletteId=n.id;const s=new Date(n.createdAt).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"}),i=n.colors.map(d=>`<div class="palette-card__color" style="background-color: ${d.hex};" title="${d.hex}"></div>`).join("");let r=[];n.tags&&(Array.isArray(n.tags)?r=n.tags:typeof n.tags=="string"&&(r=n.tags.split(",").map(d=>d.trim()).filter(d=>d)));const o=r.length>0?r.map(d=>`<span class="palette-tag">${rt(d)}</span>`).join(""):"",a=n.notes?`<p class="palette-card__notes">${rt(n.notes)}</p>`:"";e.innerHTML=`
        <div class="palette-card__colors">
            ${i}
        </div>
        <div class="palette-card__info">
            <h3 class="palette-card__name">${rt(n.name)}</h3>
            <div class="palette-card__meta">
                <span class="palette-card__date">${s}</span>
                <span class="palette-card__scheme">${zm(n.scheme||n.schemeMode)}</span>
            </div>
            ${o?`<div class="palette-card__tags">${o}</div>`:""}
            ${a}
            <div class="palette-card__actions">
                <button class="palette-card__btn" data-action="load" title="Load this palette">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 1v6m0 0L4 4m3 3l3-3M13 10v2a1 1 0 01-1 1H2a1 1 0 01-1-1v-2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    Load
                </button>
                <button class="palette-card__btn" data-action="edit" title="Edit palette details">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.417 2.333H2.333A1.167 1.167 0 001.167 3.5v9.167A1.167 1.167 0 002.333 13.833h9.167a1.167 1.167 0 001.167-1.166V8.583M11.667 1.167a1.237 1.237 0 011.75 1.75L7 9.333l-2.333.584.583-2.334 6.417-6.416z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    Edit
                </button>
                <button class="palette-card__btn palette-card__btn--danger" data-action="delete" title="Delete palette">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.75 3.5h10.5M11.667 3.5v8.167a1.167 1.167 0 01-1.167 1.166H3.5a1.167 1.167 0 01-1.167-1.166V3.5m1.75 0V2.333A1.167 1.167 0 015.25 1.167h3.5a1.167 1.167 0 011.167 1.166V3.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    Delete
                </button>
                <button class="palette-card__btn" data-action="share" title="Share this palette">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.5 4.667a1.75 1.75 0 100-3.5 1.75 1.75 0 000 3.5zM3.5 8.75a1.75 1.75 0 100-3.5 1.75 1.75 0 000 3.5zM10.5 12.833a1.75 1.75 0 100-3.5 1.75 1.75 0 000 3.5z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M5.011 7.928l3.988 2.345M8.989 4.928l-3.978 2.345" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    Share
                </button>
            </div>
        </div>
    `;const l=e.querySelector('[data-action="load"]'),c=e.querySelector('[data-action="edit"]'),h=e.querySelector('[data-action="delete"]'),u=e.querySelector('[data-action="share"]');return l==null||l.addEventListener("click",async d=>{d.stopPropagation();const{switchTab:f}=await En(async()=>{const{switchTab:m}=await Promise.resolve().then(()=>Gl);return{switchTab:m}},void 0);f("generator"),Wm(n)}),c==null||c.addEventListener("click",d=>{d.stopPropagation(),Vm(n)}),h==null||h.addEventListener("click",d=>{d.stopPropagation(),Gm(n.id,n.name)}),u==null||u.addEventListener("click",d=>{d.stopPropagation(),jm(n)}),e}function Dm(n){const e=document.createElement("article");e.className="palette-card gradient-card",e.dataset.gradientId=n.id;const s=new Date(n.createdAt).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"}),i=n.css||dn(n.type,n.angle,n.stops);let r=[];n.tags&&(Array.isArray(n.tags)?r=n.tags:typeof n.tags=="string"&&(r=n.tags.split(",").map(d=>d.trim()).filter(d=>d)));const o=r.length>0?r.map(d=>`<span class="palette-tag">${rt(d)}</span>`).join(""):"",a=n.notes?`<p class="palette-card__notes">${rt(n.notes)}</p>`:"";e.innerHTML=`
        <div class="palette-card__gradient" style="background: ${i}">
        </div>
        <div class="palette-card__info">
            <h3 class="palette-card__name">${rt(n.name)}</h3>
            <div class="palette-card__meta">
                <span class="palette-card__date">${s}</span>
                <span class="palette-card__scheme">${n.stops.length} stops</span>
            </div>
            ${o?`<div class="palette-card__tags">${o}</div>`:""}
            ${a}
            <div class="palette-card__actions">
                <button class="palette-card__btn" data-action="load" title="Load this gradient">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 1v6m0 0L4 4m3 3l3-3M13 10v2a1 1 0 01-1 1H2a1 1 0 01-1-1v-2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    Load
                </button>
                <button class="palette-card__btn" data-action="edit" title="Edit gradient details">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.417 2.333H2.333A1.167 1.167 0 001.167 3.5v9.167A1.167 1.167 0 002.333 13.833h9.167a1.167 1.167 0 001.167-1.166V8.583M11.667 1.167a1.237 1.237 0 011.75 1.75L7 9.333l-2.333.584.583-2.334 6.417-6.416z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    Edit
                </button>
                <button class="palette-card__btn palette-card__btn--danger" data-action="delete" title="Delete gradient">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.75 3.5h10.5M11.667 3.5v8.167a1.167 1.167 0 01-1.167 1.166H3.5a1.167 1.167 0 01-1.167-1.166V3.5m1.75 0V2.333A1.167 1.167 0 015.25 1.167h3.5a1.167 1.167 0 011.167 1.166V3.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    Delete
                </button>
                <button class="palette-card__btn" data-action="share" title="Share this gradient">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.5 4.667a1.75 1.75 0 100-3.5 1.75 1.75 0 000 3.5zM3.5 8.75a1.75 1.75 0 100-3.5 1.75 1.75 0 000 3.5zM10.5 12.833a1.75 1.75 0 100-3.5 1.75 1.75 0 000 3.5z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M5.011 7.928l3.988 2.345M8.989 4.928l-3.978 2.345" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    Share
                </button>
            </div>
        </div>
    `;const l=e.querySelector('[data-action="load"]'),c=e.querySelector('[data-action="edit"]'),h=e.querySelector('[data-action="delete"]'),u=e.querySelector('[data-action="share"]');return l==null||l.addEventListener("click",async d=>{d.stopPropagation();const{switchTab:f}=await En(async()=>{const{switchTab:m}=await Promise.resolve().then(()=>Gl);return{switchTab:m}},void 0);f("gradients"),Bm(n)}),c==null||c.addEventListener("click",d=>{d.stopPropagation(),$m(n)}),h==null||h.addEventListener("click",d=>{d.stopPropagation(),Hm(n.id,n.name)}),u==null||u.addEventListener("click",d=>{d.stopPropagation(),qm(n)}),e}async function Fm(n){const e=n.target.value.trim().toLowerCase();e===""?ke=[...pt]:ke=pt.filter(t=>{var o,a;const s=((o=t.name)==null?void 0:o.toLowerCase())||"",i=((a=t.notes)==null?void 0:a.toLowerCase())||"",r=Array.isArray(t.tags)?t.tags.join(" ").toLowerCase():(t.tags||"").toLowerCase();return s.includes(e)||i.includes(e)||r.includes(e)}),Xi(Gn),Ji()}function Um(n){Gn=n.target.value,Xi(Gn),Ji()}function Xi(n){switch(n){case"recent":ke.sort((e,t)=>t.createdAt-e.createdAt);break;case"oldest":ke.sort((e,t)=>e.createdAt-t.createdAt);break;case"name":ke.sort((e,t)=>e.name.localeCompare(t.name));break}}function Bm(n){const e=new CustomEvent("loadGradient",{detail:n});document.dispatchEvent(e);const t=document.querySelector('[data-tab="gradients"]');t&&t.click(),window.scrollTo({top:0,behavior:"smooth"}),g(`Loaded "${n.name}"`,"success")}function $m(n){const e=new CustomEvent("editGradient",{detail:n});document.dispatchEvent(e)}async function Hm(n,e){if(await Dl("Delete Gradient",`Are you sure you want to delete "${e}"? This action cannot be undone.`,"Delete","Cancel"))try{await Im(n),g("Gradient deleted successfully","success"),await Kt()}catch(s){console.error("Error deleting gradient:",s),g("Failed to delete gradient","error")}}function Wm(n){const e=new CustomEvent("loadPalette",{detail:n});document.dispatchEvent(e),window.scrollTo({top:0,behavior:"smooth"}),g(`Loaded "${n.name}"`,"success")}function Vm(n){const e=new CustomEvent("editPalette",{detail:n});document.dispatchEvent(e)}async function Gm(n,e){if(await Dl("Delete Palette",`Are you sure you want to delete "${e}"? This action cannot be undone.`,"Delete","Cancel"))try{await wm(n),g("Palette deleted successfully","success"),await Kt()}catch(s){console.error("Error deleting palette:",s),g("Failed to delete palette","error")}}function jm(n){const e=n.colors.map(s=>s.hex.replace("#","")).join(","),t=`${window.location.origin}${window.location.pathname}#share-palette=${e}&mode=${n.schemeMode}`;navigator.clipboard.writeText(t).then(()=>{g("Shareable link copied to clipboard!","success")}).catch(s=>{console.error("Failed to copy:",s),g("Failed to copy link","error")})}function qm(n){const e=n.stops.map(s=>`${s.color.replace("#","")}-${s.position}`).join(","),t=`${window.location.origin}${window.location.pathname}#share-gradient=${n.type}&angle=${n.angle||0}&stops=${e}`;navigator.clipboard.writeText(t).then(()=>{g("Shareable link copied to clipboard!","success")}).catch(s=>{console.error("Failed to copy:",s),g("Failed to copy link","error")})}function zm(n){return n&&{monochrome:"Monochrome","monochrome-dark":"Monochrome Dark","monochrome-light":"Monochrome Light",analogic:"Analogic",complement:"Complement","analogic-complement":"Analogic Complement",triad:"Triad",quad:"Quad"}[n]||"Custom"}function rt(n){const e=document.createElement("div");return e.textContent=n,e.innerHTML}function Km(){const n=document.getElementById("library-section");n&&(n.hidden=!0)}const zs="data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='UTF-8'?%3e%3c!--%20Uploaded%20to:%20SVG%20Repo,%20www.svgrepo.com,%20Generator:%20SVG%20Repo%20Mixer%20Tools%20--%3e%3csvg%20width='800px'%20height='800px'%20viewBox='0%200%2016%2016'%20xmlns='http://www.w3.org/2000/svg'%20fill='currentColor'%3e%3cpath%20d='m%208%201%20c%20-1.65625%200%20-3%201.34375%20-3%203%20s%201.34375%203%203%203%20s%203%20-1.34375%203%20-3%20s%20-1.34375%20-3%20-3%20-3%20z%20m%20-1.5%207%20c%20-2.492188%200%20-4.5%202.007812%20-4.5%204.5%20v%200.5%20c%200%201.109375%200.890625%202%202%202%20h%208%20c%201.109375%200%202%20-0.890625%202%20-2%20v%20-0.5%20c%200%20-2.492188%20-2.007812%20-4.5%20-4.5%20-4.5%20z%20m%200%200'%20fill='%23F9FAFB'/%3e%3c/svg%3e";let Zi=null,jn=null,gt=!1;function Ym(){const n=document.createElement("div");return n.id="profile-modal",n.className="profile-modal",n.innerHTML=`
        <!-- Sign In State (shown when not signed in) -->
        <div id="profile-signin" class="profile-signin">
            <p class="profile-signin__message">Sign in to save and manage your color palettes</p>
            <button id="profile-sign-in-btn" class="btn btn--google" type="button">
                <svg viewBox="0 0 24 24" width="20" height="20">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Sign in with Google
            </button>
        </div>
        
        <!-- User Info State (shown when signed in) -->
        <div id="profile-userinfo" class="profile-userinfo" hidden>
            <div class="profile-header">
                <img id="profile-user-avatar" class="profile-avatar-large" src="${zs}" alt="User avatar">
                <div class="profile-details">
                    <span id="profile-user-name" class="profile-name"></span>
                    <span id="profile-user-email" class="profile-email"></span>
                </div>
            </div>
            <div class="profile-actions">
                <button id="profile-sign-out-btn" class="profile-action-btn profile-action-btn--signout" type="button">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 14H3.333A1.333 1.333 0 012 12.667V3.333A1.333 1.333 0 013.333 2H6M10.667 11.333L14 8l-3.333-3.333M14 8H6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    Sign out
                </button>
            </div>
        </div>
    `,document.body.appendChild(n),n}function Qm(){const n=document.createElement("div");return n.id="profile-backdrop",n.className="profile-backdrop",document.body.appendChild(n),n}function Jm(){Zi=Ym(),jn=Qm();const n=document.getElementById("profile-btn");n&&n.addEventListener("click",Zm),jn.addEventListener("click",Yt),document.addEventListener("keydown",e=>{e.key==="Escape"&&gt&&Yt()})}function Xm(){gt||(gt=!0,Zi.classList.add("show"),jn.classList.add("show"),document.body.style.overflow="hidden")}function Yt(){gt&&(gt=!1,Zi.classList.remove("show"),jn.classList.remove("show"),document.body.style.overflow="")}function Zm(){gt?Yt():Xm()}function e_(n){const e=document.getElementById("profile-avatar"),t=document.getElementById("profile-signin"),s=document.getElementById("profile-userinfo"),i=document.getElementById("profile-user-avatar"),r=document.getElementById("profile-user-name"),o=document.getElementById("profile-user-email");n&&n.isSignedIn?(e&&n.photoURL&&(e.src=n.photoURL),t&&(t.hidden=!0),s&&(s.hidden=!1),i&&(i.src=n.photoURL||zs),r&&(r.textContent=n.displayName||n.email),o&&(o.textContent=n.email||"")):(e&&(e.src=zs),t&&(t.hidden=!1),s&&(s.hidden=!0))}function t_(){return document.getElementById("profile-sign-in-btn")}function n_(){return document.getElementById("profile-sign-out-btn")}const ae={currentTab:"generator",availableTabs:["generator","gradients","tints-shades","color-wheel","contrast"],disabledTabs:["tints-shades","color-wheel","contrast"]};function He(n){if(!ae.availableTabs.includes(n)){console.warn(`Tab "${n}" does not exist`);return}if(ae.disabledTabs.includes(n)){console.log(`Tab "${n}" is not yet available`);return}if(ae.currentTab===n)return;const e=ae.currentTab;ae.currentTab=n,s_(n),i_(n),r_(n),o_(n),window.dispatchEvent(new CustomEvent("tabChanged",{detail:{from:e,to:n}}));const t={generator:"Solids",gradients:"Gradients"},s=t[e]||e,i=t[n]||n;console.log(`Switched from "${s}" to "${i}"`)}function s_(n){document.querySelectorAll(".tab-button").forEach(t=>{const i=t.dataset.tab===n;t.classList.toggle("tab-button--active",i),t.setAttribute("aria-selected",i)})}function i_(n){document.querySelectorAll(".tab-content").forEach(t=>{t.id.replace("-tab","")===n?(t.classList.add("tab-content--active"),t.removeAttribute("hidden")):(t.classList.remove("tab-content--active"),t.setAttribute("hidden",""))})}function r_(n){n==="generator"?history.pushState(null,"",window.location.pathname):history.pushState(null,"",`#${n}`)}function o_(n){const e=document.querySelector(".tab-dropdown");e&&(e.value=n)}function go(){const n=window.location.hash.slice(1);n&&ae.availableTabs.includes(n)?He(n):n||He("generator")}function Vl(){document.querySelectorAll(".tab-button").forEach(t=>{t.addEventListener("click",s=>{const i=s.currentTarget.dataset.tab;He(i)})});const e=document.querySelector(".tab-dropdown");e&&e.addEventListener("change",t=>{const s=t.target.value;He(s)}),window.addEventListener("hashchange",go),go(),document.addEventListener("keydown",t=>{if(t.altKey&&t.key>="1"&&t.key<="5"){t.preventDefault();const s=parseInt(t.key)-1,i=ae.availableTabs[s];i&&!ae.disabledTabs.includes(i)&&He(i)}}),console.log("✅ Tab Manager initialized")}function Qe(){return ae.currentTab}const Gl=Object.freeze(Object.defineProperty({__proto__:null,getCurrentTab:Qe,initTabManager:Vl,switchTab:He},Symbol.toStringTag,{value:"Module"})),I={type:"linear",angle:90,stops:[{id:1,color:"#FF5733",position:0},{id:2,color:"#42B983",position:100}],nextStopId:3};let T={};function Ne(){const{type:n,angle:e,stops:t}=I,s=dn(n,e,t);T.gradientPreview&&(T.gradientPreview.style.background=s),T.gradientCssCode&&(T.gradientCssCode.textContent=`background: ${s};`)}function a_(){if(I.stops.length>=5){g("Maximum 5 color stops allowed","warning");return}const n=I.stops.map(r=>r.position).sort((r,o)=>r-o);let e=0,t=50;for(let r=0;r<n.length-1;r++){const o=n[r+1]-n[r];o>e&&(e=o,t=Math.round((n[r]+n[r+1])/2))}const s=$l(),i={id:I.nextStopId++,color:s,position:t};I.stops.push(i),It(),Ne()}function l_(n){if(I.stops.length<=2){g("Minimum 2 color stops required","warning");return}I.stops=I.stops.filter(e=>e.id!==n),It(),Ne()}function Ss(n,e,t){const s=I.stops.find(i=>i.id===n);if(s){if(e==="color"){const i=Qi(t);Yi(i)&&(s.color=i.toUpperCase())}else e==="position"&&(s.position=Math.max(0,Math.min(100,parseInt(t)||0)));It(),Ne()}}function c_(){const n=Ul();I.type=n.type,I.angle=n.angle,I.stops=n.stops.map((e,t)=>({id:I.nextStopId++,...e})),T.gradientType&&(T.gradientType.value=I.type),T.gradientAngle&&(T.gradientAngle.value=I.angle),T.gradientAngleValue&&(T.gradientAngleValue.textContent=I.angle),os(),It(),Ne(),g("Random gradient generated! 🎨")}function d_(){const{type:n,angle:e,stops:t}=I,i=`background: ${dn(n,e,t)};`;Ks(i),g("Gradient CSS copied! 📋")}function It(){if(!T.gradientStopsContainer)return;const n=[...I.stops].sort((e,t)=>e.position-t.position);T.gradientStopsContainer.innerHTML=n.map(e=>`
        <div class="gradient-stop" data-stop-id="${e.id}">
            <input 
                type="color" 
                name="stop-color"
                class="stop-color-input" 
                value="${e.color}"
                data-stop-id="${e.id}"
                aria-label="Color for stop at ${e.position}%"
            />
            <input 
                type="text" 
                name="stop-hex"
                class="stop-hex-input" 
                value="${e.color}"
                data-stop-id="${e.id}"
                aria-label="Hex color code"
            />
            <input 
                type="number" 
                name="stop-position"
                class="stop-position-input" 
                value="${e.position}"
                min="0"
                max="100"
                data-stop-id="${e.id}"
                aria-label="Position percentage"
            />
            <button 
                class="stop-remove-btn" 
                data-stop-id="${e.id}"
                aria-label="Remove color stop"
                type="button"
                ${I.stops.length<=2?"disabled":""}
            >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.5 4.5l9 9M13.5 4.5l-9 9" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
            </button>
        </div>
    `).join(""),u_()}function u_(){T.gradientStopsContainer.querySelectorAll(".stop-color-input").forEach(i=>{i.addEventListener("input",r=>{const o=parseInt(r.target.dataset.stopId);Ss(o,"color",r.target.value);const a=r.target.nextElementSibling;a&&(a.value=r.target.value.toUpperCase())})}),T.gradientStopsContainer.querySelectorAll(".stop-hex-input").forEach(i=>{i.addEventListener("change",r=>{const o=parseInt(r.target.dataset.stopId),a=Qi(r.target.value);if(Yi(a)){Ss(o,"color",a);const l=r.target.previousElementSibling;l&&(l.value=a)}else{g("Invalid hex color format","error");const l=I.stops.find(c=>c.id===o);l&&(r.target.value=l.color)}})}),T.gradientStopsContainer.querySelectorAll(".stop-position-input").forEach(i=>{i.addEventListener("change",r=>{const o=parseInt(r.target.dataset.stopId);Ss(o,"position",r.target.value)})}),T.gradientStopsContainer.querySelectorAll(".stop-remove-btn").forEach(i=>{i.addEventListener("click",r=>{const o=parseInt(r.target.closest(".stop-remove-btn").dataset.stopId);l_(o)})})}function os(){const n=document.getElementById("gradient-angle-group");n&&(n.style.display=I.type==="linear"?"block":"none")}function h_(){T.gradientType&&T.gradientType.addEventListener("change",n=>{I.type=n.target.value,os(),Ne()}),T.gradientAngle&&T.gradientAngle.addEventListener("input",n=>{I.angle=parseInt(n.target.value),T.gradientAngleValue&&(T.gradientAngleValue.textContent=I.angle),Ne()}),T.addStopBtn&&T.addStopBtn.addEventListener("click",a_),T.copyCssCode&&T.copyCssCode.addEventListener("click",d_)}function f_(){return T={gradientType:document.getElementById("gradient-type"),gradientAngle:document.getElementById("gradient-angle"),gradientAngleValue:document.getElementById("gradient-angle-value"),gradientStopsContainer:document.getElementById("gradient-stops-container"),addStopBtn:document.getElementById("add-stop-btn"),gradientPreview:document.getElementById("gradient-preview"),gradientCssCode:document.getElementById("gradient-css-code"),copyCssCode:document.getElementById("copy-css-code")},h_(),It(),Ne(),os(),console.log("✅ Gradient Generator initialized"),()=>{console.log("Gradient Generator cleaned up")}}function er(){return{type:I.type,angle:I.angle,stops:I.stops.map(n=>({...n}))}}function as(n){n&&(I.type=n.type||"linear",I.angle=n.angle||90,I.stops=n.stops||I.stops,T.gradientType&&(T.gradientType.value=I.type),T.gradientAngle&&(T.gradientAngle.value=I.angle),T.gradientAngleValue&&(T.gradientAngleValue.textContent=I.angle),os(),It(),Ne(),console.log("Gradient loaded:",n))}function p_(){c_()}const w={currentColors:[],currentFormat:"hex",seedColor:"#F55A5A",schemeMode:"monochrome",isLoading:!1},_={colorPicker:document.getElementById("color-picker"),seedColorDisplay:document.getElementById("seed-color-display"),schemeMode:document.getElementById("scheme-mode"),generateBtn:document.getElementById("generate-btn"),colorsContainer:document.getElementById("colors-container"),formatButtons:document.querySelectorAll(".format-btn"),randomBtn:document.getElementById("random-btn"),resetBtn:document.getElementById("reset-btn"),loadingState:document.getElementById("loading-state"),savePaletteBtn:document.getElementById("save-palette-btn"),exportBtn:document.getElementById("export-btn"),exportMenu:document.getElementById("export-menu")};function g_(n,e){const t=document.createElement("div");t.className="color-card fade-in",t.tabIndex=0,t.setAttribute("role","button"),t.setAttribute("aria-label",`Color: ${n.name}. Value: ${gn(n,w.currentFormat)}. Click to copy.`);const s=ic(n.hex),i=nc(n);return t.innerHTML=`
        <div class="color-card__swatch" style="background-color: ${n.hex};">
            <div class="color-card__copy-indicator" style="color: ${s};">
                Copied!
            </div>
        </div>
        <div class="color-card__info">
            <div class="color-card__name">${n.name}</div>
            <div class="color-card__value">${gn(n,w.currentFormat)}</div>
            <div class="color-card__formats">
                <div class="color-card__format-item">
                    <span class="color-card__format-label">HEX</span>
                    <span class="color-card__format-value">${i.hex}</span>
                </div>
                <div class="color-card__format-item">
                    <span class="color-card__format-label">RGB</span>
                    <span class="color-card__format-value">${i.rgb}</span>
                </div>
                <div class="color-card__format-item">
                    <span class="color-card__format-label">HSL</span>
                    <span class="color-card__format-value">${i.hsl}</span>
                </div>
            </div>
        </div>
    `,t.addEventListener("click",()=>{const r=gn(n,w.currentFormat),o=t.querySelector(".color-card__swatch");Co(r,o,w.currentFormat.toUpperCase())}),t.addEventListener("keydown",r=>{(r.key==="Enter"||r.key===" ")&&(r.preventDefault(),t.click())}),t}function tr(n){if(!n||n.length===0){_.colorsContainer.innerHTML=`
            <div class="loading-state">
                <p>No colors to display. Click "Get Color Scheme" to generate.</p>
            </div>
        `;return}_.colorsContainer.innerHTML="",n.forEach((e,t)=>{const s=g_(e);_.colorsContainer.appendChild(s)})}function m_(){w.isLoading=!0,_.generateBtn.disabled=!0,_.colorsContainer.innerHTML=`
        <div class="loading-container">
            <div class="spinner"></div>
            <p class="loading-text">Generating color scheme...</p>
        </div>
    `}function mo(){w.isLoading=!1,_.generateBtn.disabled=!1}function _o(n){w.currentFormat=n,_.formatButtons.forEach(e=>{e.dataset.format===n?e.classList.add("format-btn--active"):e.classList.remove("format-btn--active")}),w.currentColors.length>0&&tr(w.currentColors)}async function Qt(){if(!w.isLoading)try{m_();const n=w.seedColor,e=w.schemeMode;if(!Zl(n))throw new Error("Invalid hex color");const t=await Jl(n,e,5),s=Xl(t);w.currentColors=s,bo(n,e),tr(s),mo()}catch(n){console.error("Error generating color scheme:",n),g("Failed to generate color scheme. Please try again.","error"),_.colorsContainer.innerHTML=`
            <div class="loading-state">
                <p>❌ Error: ${n.message}</p>
                <button class="btn btn--primary" onclick="location.reload()">Retry</button>
            </div>
        `,mo()}}function vo(){try{if(Qe()==="gradients")p_();else{const e=ec();w.seedColor=e,_.colorPicker.value=e,_.seedColorDisplay.textContent=e,Qt()}}catch(n){console.error("Random color error:",n),g("Failed to randomize. Please try again.","error")}}function yo(){try{if(Qe()==="gradients")as({type:"linear",angle:90,stops:[{color:"#FF5733",position:0},{color:"#42B983",position:100}]}),g("Gradient reset to default","success");else{const e="#F55A5A",t="monochrome";w.seedColor=e,w.schemeMode=t,w.currentFormat="hex",_.colorPicker.value=e,_.seedColorDisplay.textContent=e,_.schemeMode.value=t,_.formatButtons.forEach(s=>{s.dataset.format==="hex"?s.classList.add("format-btn--active"):s.classList.remove("format-btn--active")}),w.currentColors=[],_.colorsContainer.innerHTML='<div class="loading-state" id="loading-state"><h4>How to Use?</h4><ol aria-label="Instructions for using the color scheme generator"><li>Select a seed color and choose your desired scheme</li><li>Pick your preferred format (HEX, RGB, HSL, or CMYK)</li><li>Click "Get Color Scheme" to generate your palette</li><li>Click any color card to copy it to your clipboard</li></ol></div>',g("Reset to default settings","success")}}catch(n){console.error("Reset error:",n),g("Failed to reset. Please try again.","error")}}function __(n){const e=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(n);return e?{r:parseInt(e[1],16)/255,g:parseInt(e[2],16)/255,b:parseInt(e[3],16)/255,a:1}:{r:0,g:0,b:0,a:1}}function v_(n){e_(n),n&&n.isSignedIn?(console.log("User signed in:",n.displayName),_.savePaletteBtn&&(_.savePaletteBtn.disabled=!1),_.exportBtn&&(_.exportBtn.disabled=!1),Kt()):(console.log("User signed out"),_.savePaletteBtn&&(_.savePaletteBtn.disabled=!0),_.exportBtn&&(_.exportBtn.disabled=!0),Km())}async function y_(){try{await hm(),g("Signed in successfully!","success")}catch(n){console.error("Error signing in:",n),g("Failed to sign in. Please try again.","error")}}Yt();async function w_(){try{await fm(),Yt(),g("Signed out successfully","success")}catch(n){console.error("Error signing out:",n),g("Failed to sign out","error")}}function E_(){if(!pm()){g("Please sign in to save palettes","error");return}if(Qe()==="gradients"){const t=er();if(!t||!t.stops||t.stops.length<2){g("Create a gradient first","error");return}Wl(t)}else{if(w.currentColors.length===0){g("Generate a color scheme first","error");return}Fl(w.currentColors,w.schemeMode,w.seedColor)}}function C_(){if(Qe()==="gradients"){const t=er();if(!t||!t.stops||t.stops.length<2){g("Create a gradient first","error");return}}else if(w.currentColors.length===0){g("Generate a color scheme first","error");return}const e=_.exportMenu;e&&(e.hidden=!e.hidden)}async function b_(n){const e=Qe();if(_.exportMenu&&(_.exportMenu.hidden=!0),n==="import"){I_();return}if(e==="gradients"){const t=er();if(!t||!t.stops||t.stops.length<2){g("Create a gradient first","error");return}try{const s={name:"Gradient",type:t.type,angle:t.angle,stops:t.stops,tags:[],notes:""};if(n==="css"){const{generateGradientCSS:i}=await En(async()=>{const{generateGradientCSS:h}=await Promise.resolve().then(()=>po);return{generateGradientCSS:h}},void 0),o=`:root {
  --gradient: ${i(t.type,t.angle,t.stops)};
}

.gradient {
  background: var(--gradient);
}`,a=new Blob([o],{type:"text/css"}),l=URL.createObjectURL(a),c=document.createElement("a");c.href=l,c.download="gradient.css",c.click(),URL.revokeObjectURL(l),g("Gradient exported as CSS","success")}else if(n==="json"){const i=JSON.stringify(s,null,2),r=new Blob([i],{type:"application/json"}),o=URL.createObjectURL(r),a=document.createElement("a");a.href=o,a.download="gradient.json",a.click(),URL.revokeObjectURL(o),g("Gradient exported as JSON","success")}else if(n==="png"){const{generateGradientCSS:i}=await En(async()=>{const{generateGradientCSS:c}=await Promise.resolve().then(()=>po);return{generateGradientCSS:c}},void 0),r=i(t.type,t.angle,t.stops),o=document.createElement("canvas");o.width=1200,o.height=600;const a=o.getContext("2d");let l;if(t.type==="linear"){const c=(t.angle-90)*Math.PI/180,h=o.width/2-Math.cos(c)*o.width/2,u=o.height/2-Math.sin(c)*o.height/2,d=o.width/2+Math.cos(c)*o.width/2,f=o.height/2+Math.sin(c)*o.height/2;l=a.createLinearGradient(h,u,d,f)}else l=a.createRadialGradient(o.width/2,o.height/2,0,o.width/2,o.height/2,Math.max(o.width,o.height)/2);t.stops.forEach(c=>{l.addColorStop(c.position/100,c.color)}),a.fillStyle=l,a.fillRect(0,0,o.width,o.height),o.toBlob(c=>{const h=URL.createObjectURL(c),u=document.createElement("a");u.href=h,u.download="gradient.png",u.click(),URL.revokeObjectURL(h),g("Gradient exported as PNG","success")})}else if(n==="figma"){const i={name:s.name,type:t.type==="linear"?"GRADIENT_LINEAR":"GRADIENT_RADIAL",gradientStops:t.stops.map(c=>({position:c.position/100,color:__(c.color)}))},r=JSON.stringify({gradients:[i]},null,2),o=new Blob([r],{type:"application/json"}),a=URL.createObjectURL(o),l=document.createElement("a");l.href=a,l.download="gradient-figma.json",l.click(),URL.revokeObjectURL(a),g("Gradient exported for Figma","success")}else g("This export format is not yet supported for gradients","info")}catch(s){console.error("Error exporting gradient:",s),g("Failed to export gradient","error")}}else{if(w.currentColors.length===0){g("Generate a color scheme first","error");return}try{const t={name:"Color Palette",colors:w.currentColors,scheme:w.schemeMode,seedColor:w.seedColor,tags:[],notes:""};await Pm(n,t)}catch(t){console.error("Error exporting palette:",t),g("Failed to export palette","error")}}}function I_(){const n=document.createElement("input");n.type="file",n.accept=".json",n.onchange=async e=>{const t=e.target.files[0];if(t)try{const s=await t.text(),i=Nm(s);if(i.type==="gradient"){as(i.data);const r=document.querySelector('[data-tab="gradients"]');r&&r.click(),g("Gradient imported successfully","success")}else i.type==="palette"&&(jl(i.data),g("Palette imported successfully","success"))}catch(s){console.error("Error importing:",s),g("Failed to import. Make sure it's a valid JSON file.","error")}},n.click()}function jl(n){n.seedColor&&(w.seedColor=n.seedColor,_.colorPicker.value=n.seedColor,_.seedColorDisplay.textContent=n.seedColor.toUpperCase()),(n.scheme||n.schemeMode)&&(w.schemeMode=n.scheme||n.schemeMode,_.schemeMode.value=w.schemeMode),n.colors&&n.colors.length>0&&(w.currentColors=n.colors,tr(n.colors),bo(w.seedColor,w.schemeMode))}function S_(n){const e=n.detail;jl(e)}function T_(n){const e=n.detail;Fl(e.colors,e.schemeMode,e.seedColor,e)}function k_(n){const e=n.detail;as(e)}function A_(n){const e=n.detail;Wl(e,e)}function R_(){_.colorPicker.addEventListener("input",n=>{w.seedColor=n.target.value,_.seedColorDisplay.textContent=n.target.value.toUpperCase()}),_.schemeMode.addEventListener("change",n=>{w.schemeMode=n.target.value}),_.generateBtn.addEventListener("click",Qt),_.formatButtons.forEach(n=>{n.addEventListener("click",()=>{_o(n.dataset.format)})}),_.randomBtn.addEventListener("click",vo),_.resetBtn.addEventListener("click",yo),_.savePaletteBtn&&_.savePaletteBtn.addEventListener("click",E_),_.exportBtn&&_.exportBtn.addEventListener("click",C_),_.exportMenu&&(document.addEventListener("click",e=>{var t,s;!((t=_.exportBtn)!=null&&t.contains(e.target))&&!((s=_.exportMenu)!=null&&s.contains(e.target))&&(_.exportMenu.hidden=!0)}),_.exportMenu.querySelectorAll(".dropdown-item").forEach(e=>{e.addEventListener("click",()=>{const t=e.dataset.exportFormat;b_(t)})})),document.addEventListener("loadPalette",S_),document.addEventListener("editPalette",T_),document.addEventListener("loadGradient",k_),document.addEventListener("editGradient",A_),document.addEventListener("paletteSaved",()=>{Kt()}),window.addEventListener("gradientSaved",()=>{Kt()}),lc({onGenerate:Qt,onCopy:async()=>{try{if(Qe()==="gradients"){const e=document.getElementById("gradient-css-code");e&&e.textContent&&await Ks(e.textContent,"Gradient CSS copied!")}else{const e=Io();if(e)e.click();else if(w.currentColors.length>0){const t=w.currentColors[0],s=gn(t,w.currentFormat);await Co(s,null,w.currentFormat.toUpperCase())}}}catch(n){n.message.includes("message channel closed")||console.error("Copy error:",n)}},onRandom:vo,onReset:yo,onFormatSwitch:_o}),dc()}async function wo(){console.log("🎨 Color Scheme Generator - Phase 3"),console.log("Initializing application..."),Jm();const n=t_(),e=n_();n&&n.addEventListener("click",y_),e&&e.addEventListener("click",w_),mm(v_),Lm(),Vl(),f_();const t=ac();t&&(console.log("Loading scheme from URL params:",t),w.seedColor=t.seed,w.schemeMode=t.scheme,_.colorPicker.value=t.seed,_.seedColorDisplay.textContent=t.seed.toUpperCase(),_.schemeMode.value=t.scheme,await Qt());const s=window.location.hash;if(s.includes("#share-palette=")){const i=s.match(/#share-palette=([^&]+)&mode=(.+)/);if(i){const r=i[1].split(",").map(a=>`#${a}`),o=i[2];console.log("Loading shared palette:",r,o),w.seedColor=r[0],w.schemeMode=o,_.colorPicker.value=r[0],_.seedColorDisplay.textContent=r[0].toUpperCase(),_.schemeMode.value=o,await Qt(),g("Shared palette loaded!","success")}}else if(s.includes("#share-gradient=")){const i=s.match(/#share-gradient=([^&]+)&angle=([^&]+)&stops=(.+)/);if(i){const r=i[1],o=parseInt(i[2]),a=i[3].split(",").map(c=>{const[h,u]=c.split("-");return{color:`#${h}`,position:parseInt(u)}});console.log("Loading shared gradient:",{type:r,angle:o,stops:a}),He("gradients"),as({type:r,angle:o,stops:a}),g("Shared gradient loaded!","success")}}R_(),console.log("✅ Application initialized successfully!"),console.log("Features:",{"Phase 1":"Color schemes, formats (HEX/RGB/HSL/CMYK), clipboard, URL sharing, keyboard shortcuts","Phase 2":"Firebase auth, save/load palettes, export (CSS/JSON/Figma/PNG)","Phase 3":"Tabbed interface with Gradient Generator","Keyboard shortcuts":{Enter:"Generate scheme",C:"Copy focused color",R:"Random color","1-4":"Switch format (HEX/RGB/HSL/CMYK)","Alt+1-5":"Switch tabs"}})}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",wo):wo();
//# sourceMappingURL=index-BFsPB2SQ.js.map
