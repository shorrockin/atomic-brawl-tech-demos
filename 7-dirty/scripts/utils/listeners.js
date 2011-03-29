(function() {
  define(['log', 'ext/string'], function(log) {
    return {
      add: function(object, name) {
        log.debug("inside add: " + this);
        object["" + name + "Listeners"] = [];
        object["add" + (name.capitalize()) + "Listener"] = function(fn) {
          return object["" + name + "Listeners"].push(fn);
        };
        return object["fire" + (name.capitalize()) + "Event"] = function(event) {
          var fn, _i, _len, _ref, _results;
          _ref = object["" + (name.capitalize())];
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            fn = _ref[_i];
            _results.push(fn(event));
          }
          return _results;
        };
      }
    };
  });
}).call(this);
