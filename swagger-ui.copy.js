// ==UserScript==
// @name         swagger-ui.copy.js
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  click method to copy url
// @author       You
// @match        *://**/swagger-ui.html
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
      .__expand-all,
      .__collapse-all{
        position: fixed;
        right: 10px;
        top: 60px;
        width: 100px;
        height: 20px;
        padding-left: 30px;
        font-size: 16px;
        cursor: pointer;
        background-position: left center;
        background-size: 20px;
        background-repeat: no-repeat;
        background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAACdEAYAAAChi+uZAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAAASAAAAEgARslrPgAABn5JREFUeNrt3T9oldcDx+FzbhzaQYpQaOkiasFZbzRgi38gCELSJRQUqVPVCKYRREprh1Jwt8ElSwsWLKJFCIoURClihiT3TbXg/yp1Ku3SLraD5nRI7w9+pTbJm6sn773Ps4W7fJPlw3lvOG8MFVEfr4/Xx8fGwlAYCkP9/bn3ALRaGkgDaWB0tPi4+Lj4eHAw95651HIPAKCaBASAUgQEgFIEBIBSBASAUgQEgFIEBIBSBASAUgQEgFIEBIBSBASAUgQEgFIEBIBSBASAUgQEgFIEBIBSBASAUgQEgFKW5R4wb/fCvXDv2rWQQgrpzz9zzwFoubPhbDhbFLlnAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFBxPad6TvWceu213DsAmFXLPWC+ntx9cvfJ3ZGR7vPd57vP9/bm3gPQ6SoTkLA9bA/bX355ZsfMjpkdY2NCApBXdQLyt7gxbowbhQQgt8oFpElIAPJalnvAYv0vJBMzEzMTzZC8885U31TfVN+lS7n38d/Wja8bXzf+5pvxYDwYD77ySu49kFMMMcTw66+NolE0ikePcu+ZS+UD0iQk1RTvx/vx/shIjDHGuGNH7j2QUxpIA2lgdDQUoQjF4GDuPXOp7COsZ/FoC+DFaLuANAkJwPPVtgFpEhKA56PtA9IkJACt1TEBaRISgNbouIA0CQnA4nRsQJqEBKCcjg9Ik5AALIyA/IOQAMyPgDyDkAD8NwGZg5AA/DsBmSchAfh/ArJAQgIwS0BKEhKg0wnIIgkJ0KkEpEWEBOg0AtJiQgJ0CgF5ToQEaHdt80rbpcqrduf4+xyPx+PxL78Mw2E4DH/3Xe49kNWdcCfc+f773DPmK+YeMF/18fp4fXxsLAyFoTDU3597T1lpIk2kiT/+qF2sXaxdFBKgujzCesE82gLahYBkIiRA1QlIZkICVJWALBFCAlSNgCwxQgJUhYAsUUICLHUCssQJCbBUCUhFCAmw1AhIxQgJsFQISEUJCZCbgFSckAC5CEibEBLgRROQNvPPkNTr9Xq9vm1b7l1A+xGQdnU6nA6nr12rra6trq2+dSv3HKD9eB9Im0iTaTJNPnkSY4wxHjtWxCIW8bPPZj+dmcm9D2g/TiBVtylsCpt++ikdSAfSgc2bG7ERG/HTT2c/FA7g+XECqai0P+1P+7/55unep3uf7n3//evxerwef/st9y6gcwhIRTTfZBiuhCvhykcfFb1Fb9H7+edhX9gX9uVeB3QiAVnqNofNYfONG+lxepwe79w53TvdO93bPl+K12/Xb9dvf/FFWplWppVbtuTeA1kdCUfCka+/Lk4UJ4oTn3ySe85cBGSJSnvSnrTnq6/iyXgynhwcnF4+vXx6+ePHuXe1/PecSBNp4vXX4+64O+5evTr3HsgpDaSBNPDqq7l3zJeALCm//55upBvpxv79xXAxXAyfPp17EcCzCEhm6XK6nC5PTNSu1q7Wru7a1ehr9DX6HjzIvQtgLv6N90Wrh3qopzT7w8hI3Ba3xW1vvz3VN9U3JRxAhTiBvCiHwqFw6Jdf0q10K93as6doFI2i8e23uWcBlCUgz1k6nA6nw5cudZ3rOtd17r33Js9Mnpk88/PPuXcBLJaAtJgrRYBO4TuQVnGlCNBhnEAWyZUiQKcSkAVypQjALAGZr6PhaDh682bcEDfEDTt3NopG0Sh++CH3LIBcfAcyh+aVIuFYOBaObdggHACznED+lStFAOYiIH9zpQjAwnTuIyxXigAsSuedQFwpAtASHRMQV4oAtFbbBsSVIgDPV/sFJIUU0o8/dq3pWtO1ZteuyYeTDycfTk7mnsUz9ISe0HP/ftgatoatjUbuOZDVzXAz3Hz0KPeM+WqbgLhSpJqKtcXaYu0HH+TeASxcZQPiShGAvKoXEFeKALAQ9fX19fX17767JW1JW9JLL+XeAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAZ4m5B8xX94ruFd0r3norrUqr0qo33si9B6DVUkghhQcPiqIoiqLRyL1nLstyD5ivdCFdSBc+/DAMhaEw1N+few9Ayw2EgTAwOhqKUIQKBKSWewAA1SQgAJQiIACUIiAAlCIgAJQiIACUIiAAlCIgAJQiIACUIiAAlCIgAJQiIACUIiAAlCIgAJQiIACUIiAAlCIgAJQiIACU8hfkNowsRk9UcQAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMC0xMC0xOFQwOToxOTo0MSswODowMMDJ2vsAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjAtMTAtMThUMDk6MTk6NDErMDg6MDCxlGJHAAAASXRFWHRzdmc6YmFzZS11cmkAZmlsZTovLy9ob21lL2FkbWluL2ljb24tZm9udC90bXAvaWNvbl82cTB0Y2VtMHZxNC9leHBhbmQuc3ZnnNwGoQAAAABJRU5ErkJggg==');
      }

      .__collapse-all {
        background-image: url('data:image/png;base64,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');
      }
    `
    document.body.appendChild(styleDom)

    var isExpandAll = false
    var toggleExpandBtn = document.createElement('div')
    toggleExpandBtn.classList.add('__expand-all')
    toggleExpandBtn.innerText = '展开全部'
    document.body.appendChild(toggleExpandBtn)
    toggleExpandBtn.onclick = function() {
      toggleExpandBtn.classList.toggle('__collapse-all')
      isExpandAll = !isExpandAll
      if (isExpandAll) {
        toggleExpandBtn.innerText = '收起全部'
        document.querySelectorAll('.opblock-tag-section:not(is-open) .opblock-tag').forEach(it => it.click())
      } else {
        toggleExpandBtn.innerText = '展开全部'
        document.querySelectorAll('.opblock-tag-section.is-open .opblock-tag').forEach(it => it.click())
      }
    }

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
