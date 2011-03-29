define ["classes/Board", "logging"], (Board, log)  ->
  class State
    constructor: (@canvas, @boardWidth, @boardHeight, @graphics) ->
      @context       = @canvas.getContext "2d"
      @dragging      = false
      @offsetX       = 0
      @offsetY       = 0
      @supportsTouch = `("createTouch" in document)`
      @board         = new Board @boardWidth, @boardHeight, this
