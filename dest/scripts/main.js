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