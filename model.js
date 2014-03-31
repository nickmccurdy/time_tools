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
    var result = Timer.prototype.result.call(this);
    if (moment().isAfter(this.get('time'))) {
      result = '<span class="text-danger">' + result + ' late</span>';
    }
    return result;
  }
});

CountUpTimer = Timer.extend({});

TimerCollection = Backbone.Collection.extend({
  model: Timer
});
