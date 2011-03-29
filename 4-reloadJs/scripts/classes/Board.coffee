define ["classes/Grid"], (Grid) ->
  # class used to store the board
  class Board
    constructor: (@gridWidth, @gridHeight, @state) ->
      @grid        = []
      @graphics    = @state.graphics
      @width       = @graphics.width()
      @height      = @graphics.height()
      @side        = @graphics.side()
      @radius      = @graphics.radius()
      @selected    = null

      for x in [0...@gridWidth]
        @grid.push([])
        for y in [0...@gridHeight]
          @grid[x].push(new Grid(this, x, y))

    each: (fn) ->
      for y in [0...@gridHeight]
        for x in [0...@gridWidth] by 2
          fn this.at(x, y)
        for x in [1...@gridWidth] by 2
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
      tileIndexY = y - (cellIndexX % 2) * @height / 2
      cellIndexY = Math.floor(tileIndexY / @height)
      cellY      = tileIndexY - @height * cellIndexY
      if cellX > Math.abs(@radius / 2 - @radius * cellY / @height)
        this.at(cellIndexX, cellIndexY)
      else
        this.at(cellIndexX - 1, cellIndexY + (cellIndexX % 2) - ((cellY < @height / 2) ? 1 : 0))