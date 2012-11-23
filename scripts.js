function roundDown(n) {
	var result;
	if(n > 0) {
		result = Math.floor(n);
	}
	else if(n < 0) {
		result = Math.ceil(n);
	}
	else {
		result = n;
	}
	return result;
}

function elapsedTime(start_time, end_time) {
	// Calculate the elapsed time and break it down into different units
	var milliseconds = roundDown(end_time - start_time);
	var seconds = 0;
	var minutes = 0;
	var hours = 0;
	var days = 0;
	if(Math.abs(milliseconds) >= 1000) {
		seconds = roundDown(milliseconds / 1000);
		milliseconds = milliseconds % 1000;
		if(Math.abs(seconds) >= 60) {
			minutes = roundDown(seconds / 60);
			seconds = seconds % 60;
			if(Math.abs(minutes) >= 60) {
				hours = roundDown(minutes / 60);
				minutes = minutes % 60;
				if(Math.abs(hours) >= 24) {
					days = roundDown(hours / 24);
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

var UI = {
	timers: {},

	timerHTML: '<div class="timer"> \
		<div class="display"></div> \
	</div>',

	createUID: function() {
		return Math.random().toString(36).substr(2,9);
	},

	createTimer: function(type, time) {
		var uid = this.createUID();
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
	}, 1000);
});
