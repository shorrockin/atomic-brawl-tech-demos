(function() {
  define(['log'], function(log) {
    return {
      isFunction: function(object) {
        return typeof object === 'function';
      },
      ok: function(test, message) {
        var result;
        if (this.isFunction(test)) {
          result = test();
          if (!result) {
            throw message || ("specified function did not evaluate to true, was: " + result);
          }
        } else {
          if (!test) {
            throw message || ("specified object was not true, was " + test);
          }
        }
      },
      fail: function(test, message) {
        var result;
        if (this.isFunction(test)) {
          result = test();
          if (result) {
            throw message || ("specified function did not evaluate to false, was: " + result);
          }
        } else {
          if (test) {
            throw message || ("specified object was not false, was " + test);
          }
        }
      }
    };
  });
}).call(this);
