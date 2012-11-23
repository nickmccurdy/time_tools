function elapsedTime(start_time, end_time) {
	// Calculate the elapsed time and break it down into different units
	var milliseconds = Math.floor(end_time - start_time);
	var seconds = 0;
	var minutes = 0;
	var hours = 0;
	var days = 0;
	if(Math.abs(milliseconds) >= 1000) {
		seconds = Math.floor(milliseconds / 1000);
		milliseconds = milliseconds % 1000;
		if(Math.abs(seconds) >= 60) {
			minutes = Math.floor(seconds / 60);
			seconds = seconds % 60;
			if(Math.abs(minutes) >= 60) {
				hours = Math.floor(minutes / 60);
				minutes = minutes % 60;
				if(Math.abs(hours) >= 24) {
					days = Math.floor(hours / 24);
					hours = hours % 24;
				}
			}
		}
	}
	// Return a string of the formatted elapsed time
	return days+':'+hours+':'+minutes+':'+seconds+':'+milliseconds;
}

function Countdown(end_time) {
	this.end_time = end_time;

	this.result = function() {
		return elapsedTime(Date.now(), end_time);
	};
}

function Countup(start_time) {
	this.start_time = start_time;

	this.result = function() {
		return elapsedTime(start_time, Date.now());
	};
}

function createUID() {
	return Math.random().toString(36).substr(2,9);
}

var UI = {
	timers: {},

	timerHTML: '<div class="timer"> \
		<div class="display"></div> \
	</div>',

	createTimer: function(type, time) {
		var uid = createUID();
		var newTimer;
		switch(type) {
			case 'countdown':
				newTimer = new Countdown(time);
				break;
			case 'countup':
				newTimer = new Countup(time);
				break;
		}
		$(this.timerHTML).attr('id', uid).appendTo('#column');
		this.timers[uid] = newTimer;
		this.updateTimer(uid);
	},

	updateTimer: function(uid) {
		$('.timer#'+uid+' .display').html(this.timers[uid].result());
	},

	update: function() {
		$('.timer').each(function() {
			UI.updateTimer($(this).attr('id'));
		});
	}
};

function mockSetup() {
	UI.createTimer('countdown', Date.now().add({seconds: 5}));
}

$(document).ready(function() {
	mockSetup();
	setInterval(function() {
		UI.update();
	}, 1);
});
