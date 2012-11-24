function elapsedTime(start_time, end_time) {
	// Calculate the elapsed time and break it down into different units
	var milliseconds;
	var complete;
	if(start_time <= end_time) {
		milliseconds = end_time - start_time;
		complete = false;
	}
	else {
		milliseconds = start_time - end_time;
		complete = true;
	}
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
	var str = days+':'+hours+':'+minutes+':'+seconds+':'+milliseconds;
	return { 'str': str, 'complete': complete };
}

function Countdown(end_time) {
	this.end_time = end_time;

	this.result = function() {
		elapsed = elapsedTime(Date.now(), end_time);
		if(elapsed.complete) {
			elapsed.str = '<span class="text-error">'+elapsed.str+' late</span>';
		}
		return elapsed.str;
	};
}

function Countup(start_time) {
	this.start_time = start_time;

	this.result = function() {
		return elapsedTime(start_time, Date.now()).str;
	};
}

var UI = {
	timers: {},

	timerHTML: '<div class="timer well well-small"> <span class="display"></span> <button class="btn delete-button pull-right"><i class="icon-remove"></i> Delete</button> </div>',

	createUID: function() {
		return Math.random().toString(36).substr(2,9);
	},

	createTimer: function(type, time) {
		var uid = this.createUID();
		var newTimer;
		var column;
		switch(type) {
			case 'countdown':
				newTimer = new Countdown(time);
				column = '#countdown-column';
				break;
			case 'countup':
				newTimer = new Countup(time);
				column = '#countup-column';
				break;
		}
		$(this.timerHTML).attr('id', uid).appendTo(column);
		$('.delete-button').click(function() {
			var uid = $(this).parent('.timer').attr('id');
			UI.destroyTimer(uid);
		});
		this.timers[uid] = newTimer;
		this.updateTimer(uid);
	},

	destroyTimer: function(uid) {
		$('#'+uid).remove();
		delete this.timers[uid];
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

$(document).ready(function() {
	setInterval(function() {
		UI.update();
	}, 1000);
	$('#countdown-column .new-button').click(function() {
		UI.createTimer('countdown', Date.now().add({seconds: 5}));
	});
	$('#countup-column .new-button').click(function() {
		UI.createTimer('countup', Date.now());
	});
});
