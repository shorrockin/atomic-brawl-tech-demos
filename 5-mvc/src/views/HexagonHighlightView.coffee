define ['constants', 'models/images', 'logging'], (constants, images, log) ->
  class HexagonHighlightView
    constructor: (@hexagon) ->
      @selected = false
      @z        = 1
      @x        = @hexagon.x * images.main.side
      @y        = images.main.height * (2 * @hexagon.y + (@hexagon.x % 2)) / 2
      @centerX  = @x + images.main.radius
      @centerY  = @y + (images.main.height / 2)
      @cornersX = [images.main.radius / 2, images.main.side, images.main.width, images.main.side, images.main.radius / 2, 0]
      @cornersX = (value + @x for value in @cornersX) # adjust for x offset
      @cornersY = [0, 0, images.main.height / 2, images.main.height, images.main.height, images.main.height / 2]
      @cornersY = (value + @y for value in @cornersY) # adjust for y offset

    select: (value) -> @selected = value

    toString: -> "HexagonHighlightView(x: #{@hexagon.x}, y: #{@hexagon.y}, z: #{@z})"

    draw: (context) ->
      if @selected
        context.beginPath()
        context.moveTo @cornersX[0], @cornersY[0]
        for index in [1...6]
          context.lineTo @cornersX[index],  @cornersY[index]
        context.lineTo @cornersX[0], @cornersY[0]

        context.fillStyle = constants.gridFillColor
        context.fill()

        context.fillStyle = constants.gridFontColor
        context.font      = constants.gridFont
        context.fillText("#{@hexagon.x},#{@hexagon.y}", (@centerX + constants.gridTextOffsetX), (@centerY + constants.gridTextOffsetY))

        #context.lineWidth=3
        #context.strokeStyle="rgba(255,255,255,0.2)"
        #context.stroke()
        context.closePath()
