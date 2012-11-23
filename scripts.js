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

countdown = new Countdown(Date.now().add({seconds: 5}));
timers = { 'countdown': countdown };

function update(id) {
	$('#'+id+' .display').html(timers[id].result());
}

$(document).ready(function() {
	update('countdown');
	$('#countdown').click(function() {
		update('countdown');
	});
});
