// ==UserScript==
// @name         编辑页面元素
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  document.body.contentEditable = true;
  document.designMode = 'on';
})();
