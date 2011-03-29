define ['models/Hexagon', 'models/Character', 'constants', 'logging'], (Hexagon, Character, constants, log) ->
  class Game
    constructor: ->
      log.debug 'initializing new game object'
      @hexagons  = []
      @character = new Character(constants.characterStart[0], constants.characterStart[1])

      for x in [0...constants.boardWidth]
        row = []
        for y in [0...constants.boardHeight]
          row.push new Hexagon(x, y, this)
        @hexagons.push(row)

      @hexagons[x[0]][x[1]].enable(false) for x in constants.disableGrids

      # tell all the little hexagons that they can calculate their neighbors now
      for row in @hexagons
        h.populateNeighbors() for h in row

    hexAt: (x, y) ->
      return if x < 0 or y < 0 or x >= constants.boardWidth or y >= constants.boardHeight
      @hexagons[x][y]

