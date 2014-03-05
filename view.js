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
    var newTimer = new Timer({ type: type, time: time });
    var column;
    if(type=='countdown') {
      column = '#countdown-column ul';
    }
    else if(type=='countup') {
      column = '#countup-column ul';
    }
    $(column).append(_.template($("#timer-template").html(), { uid: uid }));
    $('.delete-button').click(function() {
      var uid = $(this).parent('.timer').attr('id');
      App.destroyTimer(uid);
    });
    this.timers[uid] = newTimer;
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
      var uid = $(this).attr('id');
      App.updateTimer(uid);
    });
  }
});

$(document).ready(function() {
  App = new AppView();
  setInterval(function() {
    App.update();
  }, 1000);
});
