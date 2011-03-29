# formalizes x/y coordinates into a position object
define ['utils/listeners', 'log'], (listeners, log) ->
  class Position
    constructor: (@x, @y) ->
      @changeListeners = null

    addChangeListener: (fn) ->
      @changeListeners = @changeListeners or []
      @changeListeners.push(fn)

    fireChanged: (event) ->
      if @changeListeners
        fn(event) for fn in @changeListeners

    clone: -> new Position(@x, @y)

    move: (x, y) ->
      @set(@x + x, @y + (if y then y else 0))

    # updates the x,y,z values firing a change listener when this occurs
    set: (mx, my) ->
      if mx != @x or my != @y
        original = { x: @x, y: @y }
        @x = mx if mx
        @y = my if my
        @fireChanged({from: original, to: this})

    toString: => "Position[x: #{@x}, y: #{@y}]"
