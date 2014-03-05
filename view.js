AppView = Backbone.View.extend({
  el: $('#ui'),

  timers: new TimerCollection(),

  events: {
    'click #countdown-column .new-button': 'createCountdown',
    'click #countup-column .new-button': 'createCountup'
  },

  createUID: function() {
    return Math.random().toString(36).substr(2,9);
  },

  createCountdown: function() {
    App.createTimer('countdown', moment().add('seconds', 5));
  },

  createCountup: function() {
    App.createTimer('countup', moment());
  },

  createTimer: function(type, time) {
    var uid = this.createUID();
    var $column = $('#' + type + '-column ul');
    $column.append(_.template($("#timer-template").html(), { uid: uid }));
    $('.delete-button').click(function() {
      App.destroyTimer($(this).parent('.timer').attr('id'));
    });
    this.timers[uid] = new Timer({ type: type, time: time });
    this.updateTimer(uid);
  },

  destroyTimer: function(uid) {
    $('#'+uid).remove();
    delete this.timers[uid];
  },

  updateTimer: function(uid) {
    $('.timer#'+uid+' .display').html(this.timers[uid].result());
  },

  update: function() {
    $('.timer').each(function() {
      App.updateTimer($(this).attr('id'));
    });
  }
});

App = new AppView();
setInterval(App.update, 1000);
