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
    $(this.template({ uid: uid })).hide().appendTo('#' + type + '-column ul').slideDown();
    $('.delete-button').click(function () {
      that.destroyTimer($(this).parent('.timer').attr('id'));
    });
    var timerType = type === 'countup' ? CountUpTimer : CountDownTimer;
    this.timers[uid] = new timerType({ time: time });
    this.renderTimer(uid);
  },

  destroyTimer: function (uid) {
    $('#' + uid).slideUp(function () { $(this).remove(); });
    delete this.timers[uid];
  },

  renderTimer: function (uid) {
    var result = this.timers[uid].result();
    var resultString = result.hours + ':' + result.minutes + ':' + result.seconds;
    var $timer = $('.timer#' + uid);
    $timer.toggleClass('list-group-item-danger', result.late);
    $timer.find('.display').html(resultString);
  },

  render: function () {
    $('.timer').each(function () {
      App.renderTimer($(this).attr('id'));
    });
  }
});

App = new AppView();
setInterval(App.render, 1000);
