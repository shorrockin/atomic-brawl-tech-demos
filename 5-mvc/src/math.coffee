define ['constants', 'models/images'], (constants, images) ->
  return {
    gridAtMousePosition: (x, y) ->
      cellIndexX = Math.floor(x / images.main.side)
      cellX      = x - images.main.side * cellIndexX
      tileIndexY = y - (cellIndexX % 2) * images.main.height / 2
      cellIndexY = Math.floor(tileIndexY / images.main.height)
      cellY      = tileIndexY - images.main.height * cellIndexY
      if cellX > Math.abs(images.main.radius / 2 - images.main.radius * cellY / images.main.height)
        { x: cellIndexX, y: cellIndexY }
      else
        { x: cellIndexX - 1, y: cellIndexY + (cellIndexX % 2) - ((cellY < images.main.height / 2) ? 1 : 0) }

    boardWidth: -> constants.boardWidth * images.main.width

    boardHeight: -> (constants.boardHeight * images.main.height) + (images.main.height / 2) + images.bottom.height

    gridPosition: (x, y) -> { x: x * images.main.side, y: images.main.height * (2 * y + (x % 2)) / 2, z: y * 10 + (x % 2) }
  }