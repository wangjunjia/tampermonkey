// ==UserScript==
// @name         swagger-ui.copy.js
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  click method copy api url
// @author       You
// @match        *://**/swagger-ui.html // swagger-ui 地址
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var styleDom = document.createElement('style')
    styleDom.textContent = `
      .__swagger-ui-copy-input {
        position: fixed;
        left: -100%;
      }
      .__swagger-ui-copy-success {
        color: #67C23A !important;
      }
    `
    document.body.appendChild(styleDom)

    document.body.addEventListener('click', function(event) {
      if (event.srcElement.classList.contains('opblock-summary-method')) {
        event.stopPropagation()
        event.preventDefault()

        var urlDom = event.srcElement.parentElement.querySelector('.opblock-summary-path')

        var copyDom = document.createElement('input')
        copyDom.classList.add('__swagger-ui-copy-input')
        copyDom.setAttribute('value', urlDom.textContent.trim())
        document.body.appendChild(copyDom)
        copyDom.select()
        document.execCommand('copy')
        setTimeout(function() {
          document.body.removeChild(copyDom)
        })

        urlDom.classList.add('__swagger-ui-copy-success')
        setTimeout(function() {
          urlDom.classList.remove('__swagger-ui-copy-success')
        }, 600)
      }
    }, false)
})();
