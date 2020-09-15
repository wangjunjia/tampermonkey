// ==UserScript==
// @name         read_blog_article.js
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  read more blog article
// @author       You
// @match        https://xxoo521.com/*
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function() {
  'use strict';
  let container = document.querySelector('.content-container')
  container.removeChild(container.querySelector('.hide-article-box'))
  container.querySelector('.content').style.height = 'auto'
})();
