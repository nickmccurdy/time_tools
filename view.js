$.fx.speeds._default = 50;

AppView = Backbone.View.extend({
  el: $('#ui'),

  timers: new TimerCollection(),

  events: {
    'click #countdown-column .new-button': 'createCountdown',
    'click #countup-column .new-button': 'createCountup'
  },

  createUID: function () {
    return Math.random().toString(36).substr(2, 9);
  },

  template: _.template($("#timer-template").html()),

  createCountdown: function () {
    this.createTimer('countdown', moment().add('seconds', 5));
  },

  createCountup: function () {
    this.createTimer('countup', moment());
  },

  createTimer: function (type, time) {
    var that = this;
    var uid = this.createUID();
    var column = '#' + type + '-column ul';
    $(this.template({ uid: uid })).hide().appendTo(column).slideDown();
    $('.delete-button').click(function () {
      that.destroyTimer($(this).parent('.timer').attr('id'));
    });
    switch (type) {
    case 'countup':
      this.timers[uid] = new CountUpTimer({ time: time });
      break;
    case 'countdown':
      this.timers[uid] = new CountDownTimer({ time: time });
      break;
    }
    this.renderTimer(uid);
  },

  destroyTimer: function (uid) {
    $('#' + uid).slideUp(function () { $(this).remove(); });
    delete this.timers[uid];
  },

  renderTimer: function (uid) {
    var result = this.timers[uid].result();
    var resultString = result.hours + ':' + result.minutes + ':' + result.seconds;
    if (result.late) {
      resultString = '<span class="text-danger">' + resultString + ' late</span>';
    }
    $('.timer#' + uid + ' .display').html(resultString);
  },

  render: function () {
    $('.timer').each(function () {
      App.renderTimer($(this).attr('id'));
    });
  }
});

App = new AppView();
setInterval(App.render, 1000);
