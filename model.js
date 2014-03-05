Timer = Backbone.Model.extend({
  defaults: {
    type: 'countup',
    time: moment()
  },

  result: function() {
    var start_time, end_time;
    if(this.get('type') === 'countdown') {
      start_time = moment();
      end_time = this.get('time');
    }
    else if(this.get('type') === 'countup') {
      start_time = this.get('time');
      end_time = moment();
    }
    var elapsed = Timer.elapsedTime(this.get('time'));
    if(this.get('type') === 'countdown' && start_time.isAfter(end_time)) {
      elapsed = '<span class="text-danger">'+elapsed+' late</span>';
    }
    return elapsed;
  }
}, {
  elapsedTime: function(end_time) {
    var startMoment = moment();
    var hours = Math.abs(startMoment.diff(end_time, 'hours'));
    var minutes = Math.abs(startMoment.diff(end_time, 'minutes'));
    var seconds = Math.abs(startMoment.diff(end_time, 'seconds', true));

    return hours + ':' + minutes + ':' + seconds;
  }
});

TimerCollection = Backbone.Collection.extend({
  model: Timer
});
