# exposes some basic constants used throughout the application
define ->
  return {
    supportsTouch: `('createTouch' in document)`
    boardWidth: 12
    boardHeight: 11
    topHexImage: "images/dirt_tile_top_large.png"
    bottomHexImage: "images/dirt_tile_bottom_large.png"
    treeOne: "images/tree_tall.png"
    treeTwo: "images/tree_short.png"
    treeThree: "images/tree_ugly.png"
    treePositions: [[3,0,0], [2,4,1], [7,7,2], [5,6,0], [6,1,1], [7,2,2], [10,6,0]]
    zoomRatio: 0.5
    gridFont: "bold 25px sans-serif"
    gridTextOffsetX: -18
    gridTextOffsetY: 8
    gridFontColor: "rgba(255,255,255,0.2)"
    gridFillColor: "rgba(54,12,9,0.2)"
    disableGrids: [[0,0], [1,0], [2,0], [0,1], [6,0], [7,0], [8,0], [9,0], [10,0], [11,0], [8,1], [9,1], [10,1], [11,1], [10,2], [11,2], [0,8], [0,9], [0,10], [1,8], [1,9], [1,10], [2,9], [2,10], [3,9], [3,10], [4,10], [5,10], [11,9], [9,10], [10,10], [11,10]]
  }