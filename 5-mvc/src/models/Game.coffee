define ['models/Hexagon', 'constants', 'logging'], (Hexagon, constants, log) ->
  class Game
    constructor: ->
      log.debug 'initializing new game object'
      @hexagons = []
      for x in [0...constants.boardWidth]
        row = []
        for y in [0...constants.boardHeight]
          row.push new Hexagon(x, y)
        @hexagons.push(row)