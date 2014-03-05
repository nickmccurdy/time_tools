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
    if(this.get('type') === 'countdown' && Timer.isCompleted(start_time, end_time)) {
      elapsed = '<span class="text-danger">'+elapsed+' late</span>';
    }
    return elapsed;
  }

}, {
  isCompleted: function(start_time, end_time) {
    return moment(start_time).isAfter(end_time);
  },

  elapsedTime: function(start_time, end_time) {
    var startMoment = moment(start_time);
    var hours = Math.abs(startMoment.diff(end_time, 'hours'));
    var minutes = Math.abs(startMoment.diff(end_time, 'minutes'));
    var seconds = Math.abs(startMoment.diff(end_time, 'seconds', true));

    return hours + ':' + minutes + ':' + seconds;
  }
});

TimerCollection = Backbone.Collection.extend({
  model: Timer
});
