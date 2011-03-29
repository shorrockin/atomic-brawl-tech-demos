define ['constants', 'ui/images', 'logging'], (constants, images, log) ->
  class PathFindingState
    constructor: (@hexagon, p, @end) ->
      @hashKey = @hexagon.hashKey
      @updateParent(p)

    updateParent: (p) ->
      @parent = p
      @distanceFromStart = 0 # often referred to as G
      @distanceFromStart = @parent.distanceFromStart + 1 if @parent
      @distanceToEnd = @distanceFrom(@end) # often referred to as H
      @distance = @distanceFromStart + @distanceToEnd # often referred to as F

    distanceFrom: (other) ->
      if other instanceof PathFindingState
        dx = other.hexagon.x - @hexagon.x
        dy = other.hexagon.y - @hexagon.y
      else
        dx = other.x - @hexagon.x
        dy = other.y - @hexagon.y
      Math.sqrt((dx * dx) + (dy * dy))

    isHex: (hex) ->
      (hex.x == @hexagon.x and hex.y == @hexagon.y)

    addNeighborsToOpenList: (openList, closedList) =>
      for neighbor in @hexagon.neighbors
        if neighbor.enabled and !closedList.hasOwnProperty(neighbor.hashKey)
          # Add all neighbors if they're not on the open list
          if !openList.hasOwnProperty(neighbor.hashKey)
            openList[neighbor.hashKey] = new PathFindingState(neighbor, this, @end)
          # Check to see if going through us provides a fast means to the start, if so update the parent
          else if openList[neighbor.hashKey].distanceFromStart < this.distanceFromStart
            openList[neighbor.hashKey].updateParent(this)



  return {
    # returns a path to get from point a to point b based on based on http://www.vanreijmersdal.nl/?p=54
    path: (from, to) ->
      return if from.x == to.x and from.y == to.y
      return if !from.enabled or !to.enabled

      starting = new PathFindingState(from, null, to)
      current  = starting
      foundEnd = false
      noPath   = false

      openList   = {} # generally speaking should provide O(1) lookup
      closedList = {}
      openList[starting.hashKey] = starting

      cheapest = ->
        cheapest = null
        for key, value of openList
          cheapest = value if (cheapest == null or value.distance < cheapest.distance)
        cheapest

      pathFinding = ->
        current = cheapest()                                   # 1. Find the square with the lowest distance to the end
        if current
          delete openList[current.hashKey]                     # 2. Remove it from open list
          closedList[current.hashKey] = current                # 3. Move it to the closed list
          current.addNeighborsToOpenList(openList, closedList) # 4. Add all new neighbors to our open list, ignoring it if it's already been closed
          foundEnd = true if current.isHex(to)                 # 5. We're all done if the current is at the finish line
        else
          noPath = true                                        # 6. Path isn't available if our open list becomes empty. Sad Panda

      pathFinding() while (!foundEnd and !noPath)
      return if noPath

      path = []
      while (current and current.parent != null)
        path.push(current.hexagon)
        current = current.parent
      return path.reverse()


    # finds the x/y index of the hex grid for the specified x/y mouse positions
    gridAtMousePosition: (x, y) =>
      validateCoords = (coords) ->
        if coords and coords.x? and coords.y?
          if coords.x >= 0 and coords.x < constants.boardWidth
            if coords.y >= 0 and coords.y < constants.boardHeight
              return coords
        return null

      cellIndexX = Math.floor(x / images.main.side)
      cellX      = x - images.main.side * cellIndexX
      tileIndexY = y - (cellIndexX % 2) * images.main.height / 2
      cellIndexY = Math.floor(tileIndexY / images.main.height)
      cellY      = tileIndexY - images.main.height * cellIndexY
      if cellX > Math.abs(images.main.radius / 2 - images.main.radius * cellY / images.main.height)
        validateCoords({ x: cellIndexX, y: cellIndexY })
      else
        validateCoords({ x: cellIndexX - 1, y: cellIndexY + (cellIndexX % 2) - ((cellY < images.main.height / 2) ? 1 : 0) })


    # returns the board width
    boardWidth: -> (constants.boardWidth * images.main.side)


    # returns the beard height
    boardHeight: -> (constants.boardHeight * images.main.height) + (images.main.height / 2) + images.bottom.height


    # converts grid indexes to mouse positions based on the current image
    # widths and heights.
    gridPosition: (x, y) -> { x: x * images.main.side, y: images.main.height * (2 * y + (x % 2)) / 2, z: y * 10 + (x % 2) }
  }