define ["constants", "logging"], (constants, log) ->
  class Hexagon
    constructor: (@x, @y, @game) ->
      @highlighted        = false
      @selected           = false
      @enabled            = true
      @hashKey            = "hexagon_#{@x}_#{@y}"
      @selectionListeners = []
      @highlightListeners = []
      @enabledListeners   = []


    addSelectionListener: (fn) -> @selectionListeners.push(fn)
    addHighlightListener: (fn) -> @highlightListeners.push(fn)
    addEnableListener: (fn) -> @enabledListeners.push(fn)


    fire: (listeners, event) -> fn(event) for fn in listeners


    highlight: (value) =>
      if value != @highlighted
        @highlighted = value
        # directional debugging
        # @north.highlighted = value if @north and @north.enabled
        # @northEast.highlighted = value if @northEast and @northEast.enabled
        # @northWest.highlighted = value if @northWest and @northWest.enabled
        # @south.highlighted = value if @south and @south.enabled
        # @southWest.highlighted = value if @southWest and @southWest.enabled
        # @southEast.highlighted = value if @southEast and @southEast.enabled
        @fire(@highlightListeners, this)


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

    toString: -> "Hexagon(x: #{@x}, y: #{@y}, highlighted: #{@highlighted}, selected: #{@selected})"
