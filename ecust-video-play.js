// ==UserScript==
// @name         华理网教自动刷视频
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  华理网教自动刷视频
// @author       You
// @match        https://mooc1.s.ecust.edu.cn/mycourse/studentstudy?*
// @noframes
// @grant        none
// @run-at       doc-end
// ==/UserScript==

(function(win, doc, undefined) {
  'use strict';

  // 模拟 浏览器的鼠标点击事件
  function simulateClick(el, ownerView) {
    const event = new MouseEvent('click', {
      view: ownerView || win,
      bubbles: true,
      cancelable: true
    })
    el.dispatchEvent(event)
  }

  let retryFindPlayButtonTime = 0
  function findPlayButton() {
    try {
      // 超过三次没有找到就再从头开始呗
      if (retryFindPlayButtonTime > 3) {
        retryFindPlayButtonTime = 0
        findUnLearnCourse()
        return
      }
      // 自动播放
      const btnPlay = doc.querySelector('iframe').contentDocument.querySelector('iframe').contentDocument.querySelector('.vjs-big-play-button')
      if (btnPlay) {
        simulateClick(btnPlay)
        // 播放完自动下一个
        doc.querySelector('iframe').contentDocument.querySelector('iframe').contentDocument.querySelector('video').onended = findUnLearnCourse
        // 声音，0-静音，1-最大
        doc.querySelector('iframe').contentDocument.querySelector('iframe').contentDocument.querySelector('video').volume = 0
        return
      }
      console.log('未找到播放按钮')
      // 再找一次
      retryFindPlayButtonTime += 1
      setTimeout(findPlayButton, 3000)
    } catch (err) {
      console.log('自动播放错误', err)
    }
  }

  // 找到未学的课程
  function findUnLearnCourse() {
    try {
      console.log('开始刷课')
      const firstCourse = doc.querySelector('.jobCount')
      if (!firstCourse) {
        console.log('所有课程已经学完了')
        return
      }
      simulateClick(firstCourse.nextElementSibling)
      setTimeout(findPlayButton, 10000)
    } catch (err) {
      console.log('查找未学课程出错了', err)
    }

  }
  setTimeout(findUnLearnCourse, 5000)
})(window, document);
