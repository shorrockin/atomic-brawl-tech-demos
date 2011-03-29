define ->
  class Logger
    constructor: ->
      @level = 0

    loggable: (logLevel) -> (@level <= logLevel) and console?.log?

    log: (logLevel, message) => console.log(message) if @loggable(logLevel)?

    debug: (message) => @log(0, "#{new Date()} [DEBUG] #{message}")
    info: (message)  => @log(1, "#{new Date()}  [INFO] #{message}")
    warn: (message)  => @log(2, "#{new Date()}  [WARN] #{message}")
    error: (message) => @log(3, "#{new Date()} [ERROR] #{message}")

  new Logger()


