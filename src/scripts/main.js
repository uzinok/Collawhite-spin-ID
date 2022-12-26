function getTimeRemaining(endtime) {
	var t = Date.parse(endtime) - Date.parse(new Date());
	var seconds = Math.floor((t / 1000) % 60);
	var minutes = Math.floor((t / 1000 / 60) % 60);
	var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
	return {
		'total': t,
		'hours': hours,
		'minutes': minutes,
		'seconds': seconds
	};
}
var initializeClock = function(id, endtime) {
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
}
var deadline = new Date(Date.parse(new Date()) + 15 * 60 * 1000);
document.addEventListener('DOMContentLoaded', function() {
	initializeClock('timer', deadline);
});


// modal
const dialogs = document.querySelectorAll('.dialog');

for (let i = 0; i < dialogs.length; i++) {
	dialog(dialogs[i]);
}

function dialog(elem) {
	const openingButtons = document.querySelectorAll('[data-dialog="' + elem.id + '"]');
	const closeButton = elem.querySelector('.dialog__close');

	for (let i = 0; i < openingButtons.length; i++) {
		openingButtons[i].addEventListener('click', opensModal);
	}

	closeButton.addEventListener('click', closesModal);

	elem.addEventListener('click', e => {
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

const isBrowserNotSupportDialog = window.HTMLDialogElement === undefined;

if (isBrowserNotSupportDialog) {
	const script = document.createElement('script');
	script.src = 'scripts/dialog-polyfill.js';
	document.body.appendChild(script);

	let link = document.createElement('link');
	link.href = 'styles/dialog-polyfill.css';
	link.rel = 'stylesheet';
	document.head.appendChild(link);

	script.addEventListener('load', () => {
		var MyDialogs = document.querySelectorAll('dialog');

		for (let i = 0; i < MyDialogs.length; i++) {
			dialogPolyfill.registerDialog(MyDialogs[i]);
		}
	});
}
