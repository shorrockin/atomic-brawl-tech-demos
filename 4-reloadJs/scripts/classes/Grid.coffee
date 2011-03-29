define ->
  # class used to store a single hex element in the grid
  # math based on: http://blog.ruslans.com/2011/02/hexagonal-grid-math.html
  class Grid
    constructor: (@board, @horizontalIndex, @verticalIndex) ->
      @state      = @board.state
      @graphics   = @state.graphics
      @enabled    = true
      @x          = @horizontalIndex * @board.side
      @y          = @board.height * (2 * @verticalIndex + (@horizontalIndex % 2)) / 2
      @numCorners = 6
      @centerX    = @x + @board.radius
      @centerY    = @y + (@board.height / 2)

      @cornersX   = [ @board.radius / 2, @board.side, @board.width, @board.side, @board.radius / 2, 0 ]
      @cornersX   = for value in @cornersX
        value + @x

      @cornersY   = [ 0, 0, @board.height / 2, @board.height, @board.height, @board.height / 2]
      @cornersY   = for value in @cornersY
        value + @y

    toggle: -> @enabled = !@enabled

    draw: ->
      context = state.context
      offsetX = state.offsetX
      offsetY = state.offsetY
      context.drawImage(@graphics.main, @x + offsetX, @y + offsetY) if @enabled
      context.drawImage(@graphics.bottom, @x + offsetX, @y + offsetY + state.graphics.main.height) if @enabled

      if @board.selected == this
        context.beginPath()
        context.moveTo @cornersX[0] + offsetX, @cornersY[0] + offsetY
        for index in [1...@numCorners]
          context.lineTo @cornersX[index] + offsetX,  @cornersY[index] + offsetY
        context.lineTo @cornersX[0] + offsetX, @cornersY[0] + offsetY

        context.font = "bold 25px sans-serif"
        context.fillStyle="rgba(35,89,42,0.2)"
        context.fill()
        context.fillStyle="rgba(255,255,255,0.2)"
        context.fillText("#{@board.selected.horizontalIndex},#{@board.selected.verticalIndex}", (@board.selected.centerX - 20 + offsetX), (@board.selected.centerY + 8 + offsetY))

        #context.lineWidth=3
        #context.strokeStyle="rgba(255,255,255,0.2)"
        #context.stroke()
        context.closePath()