Timer = Backbone.Model.extend({
  defaults: {
    type: 'countup',
    time: moment()
  },

  result: function () {
    var startMoment = moment();
    var endTime = this.get('time');

    var hours = Math.abs(startMoment.diff(endTime, 'hours'));
    var minutes = Math.abs(startMoment.diff(endTime, 'minutes'));
    var seconds = Math.abs(startMoment.diff(endTime, 'seconds', true));

    return hours + ':' + minutes + ':' + seconds;
  }
});

CountDownTimer = Timer.extend({
  result: function () {
    var elapsed = Timer.prototype.result.call(this);
    if (moment().isAfter(this.get('time'))) {
      return '<span class="text-danger">' + elapsed + ' late</span>';
    } else {
      return elapsed;
    }
  }
});

CountUpTimer = Timer.extend({});

TimerCollection = Backbone.Collection.extend({
  model: Timer
});
