# class used to store the board
class @HexaBoard
  constructor: (@width, @height, @radius) ->
    @grid     = []
    @selected = null
    for x in [0...@width]
      @grid.push([])
      for y in [0...@height]
        @grid[x].push(new HexaGrid(@radius, x, y))

  each: (fn) ->
    for x in [0...@width]
      for y in [0...@height]
        fn this.at(x, y)

  at: (x, y) ->
    return if x >= @grid.length or y >= @grid[0].length or x < 0 or y < 0
    @grid[x][y]

  enableAtPoint: (x, y) ->
    @selected = this.atPoint(x, y)

  toggleAtPoint: (x, y) ->
    this.atPoint(x, y).toggleBackground() if this.atPoint(x, y)

  atPoint: (x, y) ->
    side       = @radius * 3/2
    height     = Math.round(@radius * Math.sqrt(3))
    cellIndexX = Math.floor(x / side)
    cellX      = x - side * cellIndexX
    tileIndexY = y - (cellIndexX % 2) * height / 2
    cellIndexY = Math.floor(tileIndexY / height)
    cellY      = tileIndexY - height * cellIndexY

    if cellX > Math.abs(@radius / 2 - @radius * cellY / height)
      this.at(cellIndexX,cellIndexY)
    else
      this.at(cellIndexX - 1, cellIndexY + (cellIndexX % 2) - ((cellY < height / 2) ? 1 : 0))


# class used to store a single hex element in the grid
# math based on: http://blog.ruslans.com/2011/02/hexagonal-grid-math.html
class @HexaGrid
  constructor: (@radius, @horizontalIndex, @verticalIndex) ->
    @width      = @radius * 2
    @height     = @radius * Math.sqrt(3)
    @side       = @radius * 3/2
    @x          = @horizontalIndex * @side
    @y          = @height * (2 * @verticalIndex + (@horizontalIndex % 2)) / 2
    @numCorners = 6
    @centerX    = @x + @radius
    @centerY    = @y + (@height / 2)

    @cornersX   = [ @radius / 2, @side, @width, @side, @radius / 2, 0 ]
    @cornersX   = for value in @cornersX
      value + @x

    @cornersY   = [ 0, 0, @height / 2, @height, @height, @height / 2]
    @cornersY   = for value in @cornersY
      value + @y

    @background  = 0
    @backgrounds = ["rgba(255, 255, 255, 1)",
                    "rgba(255, 0, 0, 1)",
                    "rgba(0, 255, 0, 1)",
                    "rgba(0, 0, 255, 1)"]

  toggleBackground: ->
    @background++
    @background = 0 if @background == @backgrounds.length

  draw: (context) ->
    context.moveTo @cornersX[0], @cornersY[0]
    for index in [1...@numCorners]
      context.lineTo @cornersX[index],  @cornersY[index]
    context.lineTo @cornersX[0], @cornersY[0]

    context.fillStyle = @backgrounds[@background]
    context.fill()

    context.fillStyle = "rgba(0, 0, 0, 1)"
    context.font = "bold 12px sans-serif"
    context.fillText("#{@horizontalIndex},#{@verticalIndex}", @centerX - 10, @centerY)