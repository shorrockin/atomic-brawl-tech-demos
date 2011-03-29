define ['jquery', 'constants', 'canvas', 'context', 'log', 'ui/Layer'], ($, constants, canvas, context, log, Layer) ->
  class DirtyLayer extends Layer
    constructor: ->
      super("dirty_rectangles")
      @dimensions.set(canvas.width, canvas.height, 9999)

      @checked = $("#enable_dirty").attr("checked")
      $("#enable_dirty").change (event) =>
        @checked = $("#enable_dirty").attr("checked")

    enabled: => @checked

    redraw: =>
      context.lineWidth = 1

      context.strokeStyle = constants.dirtyStrokeStyle
      canvas.dirty.each (rectangle) ->
        context.strokeRect(rectangle.x1, rectangle.y1, rectangle.width, rectangle.height)




