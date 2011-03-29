define [], ->
  class ConstantVelocity
    constructor: (@pixelsPerSecond) ->
    calculate: (distanceTravelled, duration) -> (duration / 1000) * @pixelsPerSecond