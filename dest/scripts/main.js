"use strict";

function getTimeRemaining(endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor(t / 1000 % 60);
  var minutes = Math.floor(t / 1000 / 60 % 60);
  var hours = Math.floor(t / (1000 * 60 * 60) % 24);
  return {
    'total': t,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}
var initializeClock = function initializeClock(id, endtime) {
  //function initializeClock(id, endtime) {
  var clock = document.getElementById(id);
  var hoursSpan = clock.querySelector('.timer__hours');
  var minutesSpan = clock.querySelector('.timer__minutes');
  var secondsSpan = clock.querySelector('.timer__seconds');
  function updateClock() {
    var t = getTimeRemaining(endtime);
    hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
    if (t.total <= 0) {
      clearInterval(timeinterval);
    }
  }
  updateClock();
  var timeinterval = setInterval(updateClock, 1000);
};
var deadline = new Date(Date.parse(new Date()) + 15 * 60 * 1000);
document.addEventListener('DOMContentLoaded', function () {
  initializeClock('timer', deadline);
});

// modal
var dialogs = document.querySelectorAll('.dialog');
for (var i = 0; i < dialogs.length; i++) {
  dialog(dialogs[i]);
}
function dialog(elem) {
  var openingButtons = document.querySelectorAll('[data-dialog="' + elem.id + '"]');
  var closeButton = elem.querySelector('.dialog__close');
  for (var _i = 0; _i < openingButtons.length; _i++) {
    openingButtons[_i].addEventListener('click', opensModal);
  }
  closeButton.addEventListener('click', closesModal);
  elem.addEventListener('click', function (e) {
    if (elem == e.target) closesModal();
  });
  function opensModal() {
    elem.showModal();
    scrollLock();
  }
  function closesModal() {
    elem.close();
    scrollUnlock();
  }
  function scrollLock() {
    document.body.classList.add('scroll-lock');
    document.body.style.overflow = 'hidden';
  }
  function scrollUnlock() {
    document.body.classList.remove('scroll-lock');
    document.body.style.overflow = '';
  }
}

// полифил

var isBrowserNotSupportDialog = window.HTMLDialogElement === undefined;
if (isBrowserNotSupportDialog) {
  var script = document.createElement('script');
  script.src = 'scripts/dialog-polyfill.js';
  document.body.appendChild(script);
  var link = document.createElement('link');
  link.href = 'styles/dialog-polyfill.css';
  link.rel = 'stylesheet';
  document.head.appendChild(link);
  script.addEventListener('load', function () {
    var MyDialogs = document.querySelectorAll('dialog');
    for (var _i2 = 0; _i2 < MyDialogs.length; _i2++) {
      dialogPolyfill.registerDialog(MyDialogs[_i2]);
    }
  });
}
// spin
window.addEventListener('load', function () {
  var formBlock = document.querySelector('.form');
  var spinButton = document.querySelector('.form__spin-button');
  var formSpin = document.querySelector('.rotate');
  spinButton.addEventListener('click', function () {
    if (!formBlock.classList.contains('spin-end')) {
      formSpin.classList.add('rotation');
      setTimeout(function () {
        spinButton.disabled = true;
        formBlock.classList.add('spin-end');
        console.log($('.form__spin'));
        $('.form__spin').hide(150);
        $('.form__discount').hide(150);
        $('.form__content').show(150);
      }, 9000);
    }
  });
});