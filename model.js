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
      elapsed.str = '<span class="text-danger">'+elapsed.str+' late</span>';
    }
    return elapsed.str;
  }

}, {
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
