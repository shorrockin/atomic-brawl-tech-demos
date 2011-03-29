# an animation is a transform applied to a layer over time. generally speaking this transform
# will change position, rotate, etc.
define ['animator', 'log'], (animator, log) ->
  class Animation
    constructor: (@layer) ->
      animator.addListener(@animate)
      @updateLastAnimated()

    updateLastAnimated: ->
      @lastAnimated = new Date().getTime()

    timeSinceLastAnimation: ->
      new Date().getTime() - @lastAnimated

    stop: ->
      animator.removeListener(@animate)

