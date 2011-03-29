(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  define(function() {
    var Logger;
    Logger = (function() {
      function Logger() {
        this.error = __bind(this.error, this);;
        this.warn = __bind(this.warn, this);;
        this.info = __bind(this.info, this);;
        this.debug = __bind(this.debug, this);;
        this.log = __bind(this.log, this);;        this.level = 0;
        this.consoleEnabled = (typeof console != "undefined" && console !== null ? console.log : void 0) != null;
      }
      Logger.prototype.loggable = function(logLevel) {
        return (this.level <= logLevel) && ((typeof console != "undefined" && console !== null ? console.log : void 0) != null);
      };
      Logger.prototype.log = function(logLevel, message) {
        if ((this.loggable(logLevel) != null) && this.consoleEnabled) {
          return console.log(message);
        }
      };
      Logger.prototype.debug = function(message) {
        return this.log(0, "" + (new Date()) + " [DEBUG] " + message);
      };
      Logger.prototype.info = function(message) {
        return this.log(1, "" + (new Date()) + "  [INFO] " + message);
      };
      Logger.prototype.warn = function(message) {
        return this.log(2, "" + (new Date()) + "  [WARN] " + message);
      };
      Logger.prototype.error = function(message) {
        return this.log(3, "" + (new Date()) + " [ERROR] " + message);
      };
      return Logger;
    })();
    return new Logger();
  });
}).call(this);
