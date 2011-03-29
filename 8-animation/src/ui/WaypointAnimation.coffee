# type of animation structure that is used to move a layer between
# mulitple waypoint's applying a constant speed based on animation
# cycles. takes in the layer to animate, an array of waypoints which
# are objects with absolute x/y coords, and a velocity object. if the
# waypoint object in the array contains a method called "reached" it
# will be invoked for each waypoint that is hit.
define ['ui/Animation', 'ui/Position','math', 'log'], (Animation, Position, math, log) ->
  class WaypointAnimation extends Animation
    constructor: (layer, @waypoints, @velocity) ->
      super(layer)
      @distanceTravelled = 0
      @listeners = []


    addStopListener: (fn) -> @listeners.push(fn)


    # duration determines the amount of time which has passed since
    # the last animation cycle. we use this to determine the distance
    # we should travel, such that our perceived speed is not determined
    # by our FPS.
    animate: (duration) =>
      movement           = Math.round(@velocity.calculate(@distanceTravelled, @timeSinceLastAnimation()))
      @distanceTraveled += movement
      destination        = null;
      #log.debug "last animated: #{@timeSinceLastAnimation()}, thus moving #{movement}"
      while movement > 0 and @waypoints.length > 0
        current        = @layer.position
        to             = @waypoints[0]
        targetDistance = math.distanceFrom(current, to)

        # if we're not going to move for enough to reach our target, else
        # reach our target and move to the next waypoint
        if targetDistance > movement
          dx          = Math.abs(current.x - to.x)
          dy          = Math.abs(current.y - to.y)
          directionX  = if to.x > current.x then 1 else -1
          directionY  = if to.y > current.y then 1 else -1
          angle       = Math.atan(dy / dx)
          mx          = Math.round(Math.cos(angle) * movement)
          my          = Math.round(Math.sin(angle) * movement)
          destination = new Position(current.x + (mx * directionX), current.y + (my * directionY))
          movement    = 0
        else
          movement    = movement - targetDistance
          destination = @waypoints[0]
          current     = @waypoints[0]
          @waypoints[0].reached() if @waypoints[0].reached # callback
          @waypoints  = @waypoints.slice(1, @waypoints.length)

      if destination and (@layer.position.x != destination.x or @layer.position.y != destination.y)
        @layer.position.set(destination.x, destination.y)
        @updateLastAnimated()

      if @waypoints.length == 0
        fn() for fn in @listeners
        @stop()



