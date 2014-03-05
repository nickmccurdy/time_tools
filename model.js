Timer = Backbone.Model.extend({
  defaults: {
    type: 'countup',
    time: moment()
  }
}, {
  elapsedTime: function (end_time) {
    var startMoment = moment();
    var hours = Math.abs(startMoment.diff(end_time, 'hours'));
    var minutes = Math.abs(startMoment.diff(end_time, 'minutes'));
    var seconds = Math.abs(startMoment.diff(end_time, 'seconds', true));

    return hours + ':' + minutes + ':' + seconds;
  }
});

CountDownTimer = Timer.extend({
  result: function () {
    var elapsed = Timer.elapsedTime(this.get('time'));
    if (moment().isAfter(this.get('time'))) {
      return '<span class="text-danger">' + elapsed + ' late</span>';
    } else {
      return elapsed;
    }
  }
});

CountUpTimer = Timer.extend({
  result: function () {
    return Timer.elapsedTime(this.get('time'));
  }
});

TimerCollection = Backbone.Collection.extend({
  model: Timer
});
