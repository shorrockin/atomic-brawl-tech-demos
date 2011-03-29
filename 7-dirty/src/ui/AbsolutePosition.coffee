# formalizes x/y coordinates for an absolute position, always
# a funciton of a position and a parent position. takes in the
# current and parent layers as arguments
define ['ui/Position'], (Position) ->
  class AbsolutePosition extends Position
    constructor: (@owner, @parent) ->
      super(0, 0)
      @_update()
      @owner.position.addChangeListener(@_update)
      @parent.absPosition.addChangeListener(@_update) if @parent

    set: (mx, my, mz) ->
      throw "should not call set for an absolute position"

    clone: => new AbsolutePosition(@owner, @parent)

    _update: =>
      original = { x: @x, y: @y }
      @x = @owner.position.x
      @y = @owner.position.y
      if @parent
        @x = @x + @parent.absPosition.x
        @y = @y + @parent.absPosition.y
      @fireChanged({from: original, to: this})

    toString: => "AbsolutePosition[x: #{@x}, y: #{@y}]"
