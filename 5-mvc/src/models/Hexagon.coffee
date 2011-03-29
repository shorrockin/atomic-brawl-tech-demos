define ["constants", "logging"], (constants, log) ->
  class Hexagon
    constructor: (@x, @y) ->
    toString: -> "Hexagon(x: #{@x}, y: #{@y})"
