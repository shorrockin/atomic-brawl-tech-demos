# formalizes the dimension variables of an object
define ['log'], (log) ->
  class Dimensions
    constructor: (@width, @height, @depth) ->
      @changeListeners = []

    addChangeListener: (fn) => @changeListeners.push(fn)

    fireChanged: (event) => fn(event) for fn in @changeListeners

    before: (dimensions) => (this.depth <= dimensions.depth)

    after: (dimensions) => (this.depth >= dimensions.depth)

    clone: => new Dimensions(@width, @height, @depth)

    set: (width, height, depth) =>
      if @width != width or @height != height or @depth != depth
        original = { width: @width, height: @height, depth: @depth }
        @width   = width if width
        @height  = height if height
        @depth   = depth if depth
        @fireChanged({from: original, to: this})

    toString: => "Dimensions[width: #{@width}, height: #{@height}, depth: #{@depth}]"