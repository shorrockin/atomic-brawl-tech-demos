# defines a layer object which binds it's offsets and other size properties
# to match that of another layer.
define ['views/Layer', 'logging'], (Layer, log) ->
  class BoundLayer extends Layer
    constructor: (@name, @opacity, @boundLayer, @z) ->
      super(@name, @opacity, @boundLayer.width, @boundLayer.height, @z)
      @boundLayer.addOffsetChangedListener (x, y) =>
        @offsetX = x
        @offsetY = y
        @redraw()