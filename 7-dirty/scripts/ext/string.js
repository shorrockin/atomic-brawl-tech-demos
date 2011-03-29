(function() {
  define([], function() {
    return String.prototype.capitalize = function() {
      if (this.length > 0) {
        return this.substring(0, 1).toUpperCase() + this.substring(1, this.length);
      }
      return this;
    };
  });
}).call(this);
