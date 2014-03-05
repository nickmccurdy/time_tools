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
    var $column = $('#' + type + '-column ul');
    $column.append(this.template({ uid: uid }));
    $('.delete-button').click(function () {
      that.destroyTimer($(this).parent('.timer').attr('id'));
    });
    this.timers[uid] = new Timer({ type: type, time: time });
    this.renderTimer(uid);
  },

  destroyTimer: function (uid) {
    $('#' + uid).remove();
    delete this.timers[uid];
  },

  renderTimer: function (uid) {
    $('.timer#' + uid + ' .display').html(this.timers[uid].result());
  },

  render: function () {
    $('.timer').each(function () {
      App.renderTimer($(this).attr('id'));
    });
  }
});

App = new AppView();
setInterval(App.render, 1000);
