(function() {
  define([], function() {
    var HashMap;
    return HashMap = (function() {
      function HashMap() {}
      HashMap.prototype.add = function(key, value) {
        return this[key] = value;
      };
      HashMap.prototype.exists = function(key) {
        return this.hasOwnProperty(key);
      };
      HashMap.prototype.get = function(key) {
        return this[key];
      };
      HashMap.prototype.remove = function(key) {
        return delete this[key];
      };
      return HashMap;
    })();
  });
}).call(this);
