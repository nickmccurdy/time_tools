Timer = Backbone.Model.extend({
  defaults: {
    time: moment()
  },

  result: function () {
    var startMoment = moment();
    var endTime = this.get('time');

    return {
      hours: Math.abs(startMoment.diff(endTime, 'hours')),
      minutes: Math.abs(startMoment.diff(endTime, 'minutes')),
      seconds: Math.abs(startMoment.diff(endTime, 'seconds', true)),
      late: false
    };
  }
});

CountDownTimer = Timer.extend({
  result: function () {
    var result = Timer.prototype.result.call(this);
    result.late = moment().isAfter(this.get('time'));
    return result;
  }
});

CountUpTimer = Timer.extend({});

TimerCollection = Backbone.Collection.extend({
  model: Timer
});
