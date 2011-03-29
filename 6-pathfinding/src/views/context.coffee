define ['views/canvas'], (canvas) ->
  context = canvas.getContext('2d')
  context.redraw = -> canvas.redraw()
  return context