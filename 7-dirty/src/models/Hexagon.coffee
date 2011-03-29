define ["constants", "logging"], (constants, log) ->
  class Hexagon
    constructor: (@x, @y, @game) ->
      @highlighted        = false
      @selected           = false
      @enabled            = true
      @hashKey            = "hexagon_#{@x}_#{@y}"
      @selectionListeners = []
      @enabledListeners   = []


    addSelectionListener: (fn) -> @selectionListeners.push(fn)
    addEnableListener: (fn) -> @enabledListeners.push(fn)

    fire: (listeners, event) -> fn(event) for fn in listeners

    select: (value) =>
      if value != @selected
        @selected = value
        @fire(@selectionListeners, this)

    enable: (value) =>
      if value != @enabled
        @enabled = value
        @fire(@enabledListeners, this)


    populateNeighbors: ->
      @north     = @game.hexAt(@x, @y - 1)
      @northEast = @game.hexAt(@x + 1, @y - (if @x % 2 == 0 then 1 else 0))
      @southEast = @game.hexAt(@x + 1, @y + (@x % 2))
      @south     = @game.hexAt(@x, @y + 1)
      @southWest = @game.hexAt(@x - 1, @y + (@x % 2))
      @northWest = @game.hexAt(@x - 1, @y - (if @x % 2 == 0 then 1 else 0))

      @neighbors = []
      @neighbors.push(@north) if @north
      @neighbors.push(@northEast) if @northEast
      @neighbors.push(@southEast) if @southEast
      @neighbors.push(@south) if @south
      @neighbors.push(@southWest) if @southWest
      @neighbors.push(@northWest) if @northWest

    toString: -> "Hexagon(x: #{@x}, y: #{@y}, selected: #{@selected}, enabled: #{@enabled})"
