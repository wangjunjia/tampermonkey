// ==UserScript==
// @name         华理去除自动暂停
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  去除鼠标自动暂停
// @author       You
// @match        https://mooc1.s.ecust.edu.cn/mycourse/studentstudy?*
// @noframes
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
  'use strict';

  // 去掉自动暂停
  const oldAddEventListener = window.addEventListener
  window.addEventListener = function(eventName, handle, options) {
    if (eventName == 'mouseout') {
      return
    }
    oldAddEventListener.call(this, eventName, handle, options)
  }
})();
