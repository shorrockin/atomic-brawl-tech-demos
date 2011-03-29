# a class responsible for maintaining a certain framerate, and dispathing
# events to inform other objects that they require animating.
define ['jquery', 'constants', 'logging', 'views/canvas'], ($, constants, log, canvas) ->
  class Animator
    constructor: ->
      @lockFPS        = true
      @running        = true
      @last           = new Date().getTime()
      @animatedFrames = 0
      @timeSpent      = 0

      $("#lock_fps").change (event) =>
        @lockFPS = $("#lock_fps").attr("checked")
        log.debug "lock fps now set to: #{@lockFPS}"
      $("#run_animation").change (event) =>
        @running = $("#run_animation").attr("checked")
        log.debug "animator running state now: #{@running}"
        @start() if @running

    framerate: Math.round(1000 / constants.framesPerSecond)

    listeners: []

    addListener: (fn) => @listeners.push(fn)

    removeListener: (fn) =>
      for index in [0..@listeners.length]
        if @listeners[index] == fn
          @listeners.splice(index, 1)

    start: => @performLoop()

    updateFPS: (value) ->
      $("#current_fps").text(value)

    performLoop: =>
      if @running
        start = new Date().getTime()

        l(start - @list) for l in @listeners
        canvas.redraw()

        @last = new Date().getTime()
        duration = @last - start

        # if we measured a duration - add it to our stats, then
        # report and clear if we've collected N samples
        if duration != 0
          @animatedFrames = @animatedFrames + 1
          @timeSpent = @timeSpent + duration
          if @animatedFrames == 10
            @updateFPS(Math.round(1000 / (@timeSpent / @animatedFrames)))
            @animatedFrames = 0
            @timeSpent = 0

        if @lockFPS
          next = @framerate - duration
          next = 0 if next <= 0
        else
          next = 0

        setTimeout(@performLoop, next) unless !@running


  return new Animator()
