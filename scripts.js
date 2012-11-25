Timer = Backbone.Model.extend({

	defaults: {
		type: 'countup',
		time: Date.now()
	},

	result: function() {
		var start_time, end_time;
		if(this.get('type') === 'countdown') {
			start_time = Date.now();
			end_time = this.get('time');
		}
		else if(this.get('type') === 'countup') {
			start_time = this.get('time');
			end_time = Date.now();
		}
		var elapsed = Timer.elapsedTime(Date.now(), this.get('time'));
		if(this.get('type') === 'countdown' && elapsed.complete) {
			elapsed.str = '<span class="text-error">'+elapsed.str+' late</span>';
		}
		return elapsed.str;
	}

},{
	elapsedTime: function(start_time, end_time) {
		// Calculate the elapsed time and break it down into different units
		var complete = start_time > end_time;
		var milliseconds = complete ? start_time-end_time : end_time-start_time;
		var seconds, minutes, hours, days;
		seconds = minutes = hours = days = 0;
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
		return {
			'str': days+':'+hours+':'+minutes+':'+seconds+':'+milliseconds,
			'complete': complete
		};
	}
});

TimerCollection = Backbone.Collection.extend({
	model: Timer
});

AppView = Backbone.View.extend({
	timers: new TimerCollection(),

	timerHTML: '<div class="timer well well-small"> <span class="display"></span> <button class="btn btn-small delete-button pull-right"><i class="icon-remove"></i> Delete</button> </div>',

	createUID: function() {
		return Math.random().toString(36).substr(2,9);
	},

	createTimer: function(type, time) {
		var uid = this.createUID();
		var newTimer = new Timer({ type: type, time: time });
		var column;
		if(type=='countdown') {
			column = '#countdown-column';
		}
		else if(type=='countup') {
			column = '#countup-column';
		}
		$(this.timerHTML).attr('id', uid).appendTo(column);
		$('.delete-button').click(function() {
			var uid = $(this).parent('.timer').attr('id');
			App.destroyTimer(uid);
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
			var uid = $(this).attr('id');
			App.updateTimer(uid);
		});
	}
});

$(document).ready(function() {
	App = new AppView();
	setInterval(function() {
		App.update();
	}, 1000);
	$('#countdown-column .new-button').click(function() {
		App.createTimer('countdown', Date.now().add({seconds: 5}));
	});
	$('#countup-column .new-button').click(function() {
		App.createTimer('countup', Date.now());
	});
});
