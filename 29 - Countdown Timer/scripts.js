let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTimeDisplay = document.querySelector('.display__end-time');
const timerButtons = document.querySelectorAll('[data-time]');

function timer (seconds) {
	clearInterval(countdown);
	const now = Date.now();
	const then = now + seconds * 1000;
	displayTimeLeft(seconds);
	displayEndTime(then);

	countdown = setInterval(() => {
		const secondsLeft = Math.round((then - Date.now()) / 1000);

		if(secondsLeft < 0) {
			clearInterval(countdown);
			return;
		}

		displayTimeLeft(secondsLeft);
	}, 1000);
}

function displayTimeLeft (seconds) {
	const remainingMinutes = Math.floor(seconds / 60);
	const remainingSeconds = seconds % 60;
	const display = `${remainingMinutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
	timerDisplay.textContent = display;
	document.title = display;
}

function displayEndTime (stamp) {
	const endTime = new Date(stamp);
	const hours = endTime.getHours();
	const adjustedHours = hours > 12 ? hours - 12 : hours;
	const minutes = endTime.getMinutes();
	const quant = hours > 12 ? 'PM' : 'AM';
	endTimeDisplay.textContent = `Hey! Be Back at ${adjustedHours}:${minutes < 10 ? '0' : ''}${minutes} ${quant}`;
}

function startTimer () {
	const seconds = parseInt(this.dataset.time);
	timer(seconds);
}

timerButtons.forEach( button => button.addEventListener('click', startTimer) );

document.customForm.addEventListener('submit', function(e) {
	e.preventDefault();
	const mins = this.minutes.value;
	console.log(mins);
	timer( mins * 60 );
	this.reset();
});