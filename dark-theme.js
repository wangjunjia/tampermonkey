// ==UserScript==
// @name         dark theme
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  dark theme
// @author       You
// @match        https://ustbhuangyi.github.io/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=learn.uno
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

  const s = document.createElement('style')
  s.innerText = `
  html, img {
    filter: invert(1) hue-rotate(180deg);
  }
  `
  document.head.appendChild(s)
})();
