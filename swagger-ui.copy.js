// ==UserScript==
// @name         swagger-ui.copy.js
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  click method  copy swagger-ui url
// @author       You
// @match        http://**/swagger-ui.html // swagger-ui 地址
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    document.body.addEventListener('click', function(event) {
      if (event.srcElement.classList.contains('opblock-summary-method')) {
        event.stopPropagation()
        event.preventDefault()
        var urlDom = event.srcElement.parentElement.querySelector('.opblock-summary-path')
        var input = document.createElement('input')
        input.setAttribute('value', urlDom.textContent.trim())
        document.body.appendChild(input)
        input.select()
        document.execCommand('copy')
        setTimeout(function() {
          document.body.removeChild(input)
        })
      }
    }, false)
})();
