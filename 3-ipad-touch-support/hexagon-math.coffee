# class used to store the board
class @HexaBoard
  constructor: (@image, @width, @height, @radius) ->
    @grid        = []
    @pixelWidth  = @radius * 2
    @pixelHeight = Math.round(@radius * Math.sqrt(3) * 0.6)
    @side        = @radius * 3/2
    @selected    = null

    for x in [0...@width]
      @grid.push([])
      for y in [0...@height]
        @grid[x].push(new HexaGrid(this, @image, @radius, x, y))

  each: (fn) ->
    for y in [0...@height]
      for x in [0...@width] by 2
        fn this.at(x, y)
      for x in [1...@width] by 2
        fn this.at(x, y)


  toggle: (x, y) ->
    selected = this.at(x, y)
    selected.toggle() if selected?
    this

  toggleAtPoint: (x, y) ->
    selected = this.atPoint(x, y)
    selected.toggle() if selected?
    this

  at: (x, y) ->
    return if x >= @grid.length or y >= @grid[0].length or x < 0 or y < 0
    @grid[x][y]

  enableAtPoint: (x, y) ->
    @selected = this.atPoint(x, y)

  atPoint: (x, y) ->
    cellIndexX = Math.floor(x / @side)
    cellX      = x - @side * cellIndexX
    tileIndexY = y - (cellIndexX % 2) * @pixelHeight / 2
    cellIndexY = Math.floor(tileIndexY / @pixelHeight)
    cellY      = tileIndexY - @pixelHeight * cellIndexY

    if cellX > Math.abs(@radius / 2 - @radius * cellY / @pixelHeight)
      this.at(cellIndexX, cellIndexY)
    else
      this.at(cellIndexX - 1, cellIndexY + (cellIndexX % 2) - ((cellY < @pixelHeight / 2) ? 1 : 0))


# class used to store a single hex element in the grid
# math based on: http://blog.ruslans.com/2011/02/hexagonal-grid-math.html
class @HexaGrid
  constructor: (@board, @image, @radius, @horizontalIndex, @verticalIndex) ->
    @enabled    = true
    @x          = @horizontalIndex * @board.side
    @y          = @board.pixelHeight * (2 * @verticalIndex + (@horizontalIndex % 2)) / 2
    @numCorners = 6
    @centerX    = @x + @radius
    @centerY    = @y + (@board.pixelHeight / 2)

    @cornersX   = [ @radius / 2, @board.side, @board.pixelWidth, @board.side, @radius / 2, 0 ]
    @cornersX   = for value in @cornersX
      value + @x

    @cornersY   = [ 0, 0, @board.pixelHeight / 2, @board.pixelHeight, @board.pixelHeight, @board.pixelHeight / 2]
    @cornersY   = for value in @cornersY
      value + @y

  toggle: -> @enabled = !@enabled

  draw: (context, offsetX, offsetY) ->
    context.drawImage(@image, @x + offsetX, @y + offsetY) if @enabled

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

