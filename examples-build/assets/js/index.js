/*
────────╔╗───     ───────────╔═╗─────────
╔═╦╗╔═╗╔╝║╔═╗     ╔══╗╔═╗─╔╦╗║╬║╔╦╗╔═╗╔═╗
║║║║║╬║║╬║║╩╣     ║║║║║╬╚╗║╔╝╚╗║║║║║╩╣║╩╣
╚╩═╝╚═╝╚═╝╚═╝     ╚╩╩╝╚══╝╚╝──╚╝╚═╝╚═╝╚═╝

GitHub Repository: https://github.com/antonbobrov/node-marquee

Powered by Anthony Bobrov | https://github.com/antonbobrov
*/
(()=>{var e={473:()=>{},379:e=>{"use strict";var t=[];function n(e){for(var n=-1,r=0;r<t.length;r++)if(t[r].identifier===e){n=r;break}return n}function r(e,r){for(var o={},a=[],s=0;s<e.length;s++){var c=e[s],u=r.base?c[0]+r.base:c[0],l=o[u]||0,d="".concat(u," ").concat(l);o[u]=l+1;var f=n(d),p={css:c[1],media:c[2],sourceMap:c[3],supports:c[4],layer:c[5]};if(-1!==f)t[f].references++,t[f].updater(p);else{var m=i(p,r);r.byIndex=s,t.splice(s,0,{identifier:d,updater:m,references:1})}a.push(d)}return a}function i(e,t){var n=t.domAPI(t);n.update(e);return function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap&&t.supports===e.supports&&t.layer===e.layer)return;n.update(e=t)}else n.remove()}}e.exports=function(e,i){var o=r(e=e||[],i=i||{});return function(e){e=e||[];for(var a=0;a<o.length;a++){var s=n(o[a]);t[s].references--}for(var c=r(e,i),u=0;u<o.length;u++){var l=n(o[u]);0===t[l].references&&(t[l].updater(),t.splice(l,1))}o=c}}},569:e=>{"use strict";var t={};e.exports=function(e,n){var r=function(e){if(void 0===t[e]){var n=document.querySelector(e);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(r){n=null}t[e]=n}return t[e]}(e);if(!r)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");r.appendChild(n)}},216:e=>{"use strict";e.exports=function(e){var t=document.createElement("style");return e.setAttributes(t,e.attributes),e.insert(t,e.options),t}},565:(e,t,n)=>{"use strict";e.exports=function(e){var t=n.nc;t&&e.setAttribute("nonce",t)}},795:e=>{"use strict";e.exports=function(e){var t=e.insertStyleElement(e);return{update:function(n){!function(e,t,n){var r="";n.supports&&(r+="@supports (".concat(n.supports,") {")),n.media&&(r+="@media ".concat(n.media," {"));var i=void 0!==n.layer;i&&(r+="@layer".concat(n.layer.length>0?" ".concat(n.layer):""," {")),r+=n.css,i&&(r+="}"),n.media&&(r+="}"),n.supports&&(r+="}");var o=n.sourceMap;o&&"undefined"!=typeof btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(o))))," */")),t.styleTagTransform(r,e,t.options)}(t,e,n)},remove:function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(t)}}}},589:e=>{"use strict";e.exports=function(e,t){if(t.styleSheet)t.styleSheet.cssText=e;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(e))}}}},t={};function n(r){var i=t[r];if(void 0!==i)return i.exports;var o=t[r]={exports:{}};return e[r](o,o.exports,n),o.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";var e=n(379),t=n.n(e),r=n(795),i=n.n(r),o=n(569),a=n.n(o),s=n(565),c=n.n(s),u=n(216),l=n.n(u),d=n(589),f=n.n(d),p=n(473),m=n.n(p),v={};v.styleTagTransform=f(),v.setAttributes=c(),v.insert=a().bind(null,"head"),v.domAPI=i(),v.insertStyleElement=l();t()(m(),v);m()&&m().locals&&m().locals;function h(e,t){if(e instanceof Window)return e;if(function(e){return e instanceof HTMLElement||e instanceof Element}(e))return e;if(void 0!==t){const n=h(t);if(n)return n.querySelector(e)}return document.querySelector(e)}function y(e,t,n){const r=t.split(" ");for(let i=0;i<r.length;i++)void 0===n?e.classList.toggle(r[i]):n?e.classList.add(r[i]):e.classList.remove(r[i])}function b(e,t={}){const n=document.createElement(e);if(t.class&&function(e,t){if(e instanceof Element)y(e,t,!0);else for(let n=0;n<e.length;n++)y(e[n],t,!0)}(n,t.class),t.id&&n.setAttribute("id",t.id),t.attr)for(let r=0,i=t.attr.length;r<i;r++){const e=t.attr[r];n.setAttribute(e[0],e[1])}if(t.parent&&t.parent.appendChild(n),t.html&&(n.innerHTML=t.html),t.children)for(let r=0,i=t.children.length;r<i;r++)n.appendChild(t.children[r]);return n}const g=[];function w(e,t,n,r){if(void 0!==r){const i={passive:!1,once:!1};r.once&&(i.once=!0),r.passive&&(i.passive=!0),e.addEventListener(t,n,i)}else e.addEventListener(t,n);const i=`${Math.random()}-${+new Date}`;return g.push({id:i,el:e,target:t,callback:n}),{id:i,remove:M.bind(this,i)}}function M(e){const t=[];for(let n=0,r=g.length;n<r;n++){const r=g[n];r.id===e?r.el.removeEventListener(r.target,r.callback):t.push(r)}}function T(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=function(e,t){if(!e)return;if("string"==typeof e)return E(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return E(e,t)}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var r=0,i=function(){};return{s:i,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,a=!0,s=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return a=e.done,e},e:function(e){s=!0,o=e},f:function(){try{a||null==n.return||n.return()}finally{if(s)throw o}}}}function E(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function L(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t={parent:"#node-marquee",speed:1,minQuantity:4,autoplay:!0,pauseOnHover:!1,useParentStyles:!0,prependWhitespace:!0},n=Object.assign(t,e),r="node-marquee",i=h(n.parent);if(!(i instanceof HTMLElement))return!1;i.classList.add(r);var o,a=!1,s=!1,c=0,u=!1,l=i.innerHTML,d=0,f=[],p=0,m=[w(window,"resize",v),w(i,"mouseenter",g),w(i,"mouseleave",M)];function v(){L(),d=0,f=[],i.innerHTML="",n.useParentStyles&&(i.style.position="relative",i.style.width="100%",i.style.overflow="hidden",i.style.whiteSpace="nowrap");var e=y();(p=e.clientWidth)<=0&&(p=window.innerWidth),p<i.clientWidth&&(d=Math.ceil((i.clientWidth+p)/p)),d<n.minQuantity&&(d=n.minQuantity);for(var t=1;t<d;t+=1)y(!0);A(),E(),setTimeout((function(){x()}),500)}function y(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=b("div",{class:"".concat(r,"__el"),html:"".concat(n.prependWhitespace?"&nbsp;":"").concat(l)});return e&&(t.style.position="absolute",t.style.top="0",t.style.left="0"),t.style.display="inline-block",i.appendChild(t),f.push(t),t}function g(){n.pauseOnHover&&C()}function M(){n.pauseOnHover&&q()}function E(){if(!o){(o=new MutationObserver((function(e){var t,n=T(e);try{for(n.s();!(t=n.n()).done;){"childList"===t.value.type&&(l=i.innerHTML,v())}}catch(r){n.e(r)}finally{n.f()}}))).observe(i,{childList:!0})}}function L(){o&&(o.disconnect(),o=void 0)}function x(){if(!a){for(var e=[],t=0;t<d;t+=1)e.push(f[t].clientWidth);p=Math.max.apply(Math,e)}}function S(){s&&(u=window.requestAnimationFrame(S)),A()}function A(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:n.speed;c-=e;for(var t=p*(d-1),r=0;r<d;r+=1){var i=f[r],o=H(-p,t,c+p*r);i.style.transform="matrix3d(1,0,0.00,0,0.00,1,0.00,0,0,0,1,0, ".concat(o,", 0, 0,1)")}}function H(e,t,n){var r=t-e;return I(n,(function(t){return(r+(t-e)%r)%r+e}))}function I(e,t){return e||0===e?t(e):t}function q(){u||(s=!0,u=window.requestAnimationFrame(S))}function C(){s=!1,u&&(window.cancelAnimationFrame(u),u=!1)}function O(){a=!0,C(),L(),m.forEach((function(e){e.remove()})),i.innerHTML=l}return v(),n.autoplay&&q(),{play:q,pause:C,isPlaying:function(){return s},render:A,recreate:v,updateSizes:x,destroy:O}}var x=document.getElementById("marquee-simple");x&&L({parent:x});var S=document.getElementById("marquee-pause");S&&L({parent:S,pauseOnHover:!0});var A=document.getElementById("marquee-reverse");A&&L({parent:A,speed:-1});var H=document.getElementById("marquee-mutation");H&&(L({parent:H,speed:-1}),setTimeout((function(){H.innerHTML="The text is changed -"}),5e3));var I=document.getElementById("marquee-destroy");if(I){var q=L({parent:I,speed:-1});setTimeout((function(){q&&q.destroy()}),5e3)}})()})();