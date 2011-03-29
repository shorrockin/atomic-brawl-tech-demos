(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  define(['jquery', 'constants', 'log', 'canvas'], function($, constants, log, canvas) {
    var Animator;
    Animator = (function() {
      function Animator() {
        this.performLoop = __bind(this.performLoop, this);;
        this.start = __bind(this.start, this);;
        this.removeListener = __bind(this.removeListener, this);;
        this.addListener = __bind(this.addListener, this);;        this.lockFPS = true;
        this.running = true;
        this.last = new Date().getTime();
        this.animatedFrames = 0;
        this.timeSpent = 0;
        $("#lock_fps").change(__bind(function(event) {
          this.lockFPS = $("#lock_fps").attr("checked");
          return log.debug("lock fps now set to: " + this.lockFPS);
        }, this));
        $("#run_animation").change(__bind(function(event) {
          this.running = $("#run_animation").attr("checked");
          log.debug("animator running state now: " + this.running);
          if (this.running) {
            return this.start();
          }
        }, this));
      }
      Animator.prototype.framerate = Math.round(1000 / constants.framesPerSecond);
      Animator.prototype.listeners = [];
      Animator.prototype.addListener = function(fn) {
        return this.listeners.push(fn);
      };
      Animator.prototype.removeListener = function(fn) {
        var index, _ref, _results;
        _results = [];
        for (index = 0, _ref = this.listeners.length; (0 <= _ref ? index <= _ref : index >= _ref); (0 <= _ref ? index += 1 : index -= 1)) {
          _results.push(this.listeners[index] === fn ? this.listeners.splice(index, 1) : void 0);
        }
        return _results;
      };
      Animator.prototype.start = function() {
        return this.performLoop();
      };
      Animator.prototype.updateFPS = function(value) {
        return $("#current_fps").text(value);
      };
      Animator.prototype.performLoop = function() {
        var duration, l, next, start, _i, _len, _ref;
        if (this.running) {
          start = new Date().getTime();
          _ref = this.listeners;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            l = _ref[_i];
            l(start - this.list);
          }
          canvas.redraw();
          this.last = new Date().getTime();
          duration = this.last - start;
          if (duration !== 0) {
            this.animatedFrames = this.animatedFrames + 1;
            this.timeSpent = this.timeSpent + duration;
            if (this.animatedFrames === 10) {
              this.updateFPS(Math.round(1000 / (this.timeSpent / this.animatedFrames)));
              this.animatedFrames = 0;
              this.timeSpent = 0;
            }
          }
          if (this.lockFPS) {
            next = this.framerate - duration;
            if (next <= 0) {
              next = 0;
            }
          } else {
            next = 0;
          }
          if (!!this.running) {
            return setTimeout(this.performLoop, next);
          }
        }
      };
      return Animator;
    })();
    return new Animator();
  });
}).call(this);
