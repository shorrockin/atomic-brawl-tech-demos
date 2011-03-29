(function() {
  define(['jquery'], function($) {
    var active, largeBoard, smallBoard;
    largeBoard = {
      boardWidth: 60,
      boardHeight: 55,
      character: "images/girl_small.png",
      topHexImage: "images/dirt_tile_top_small.png",
      bottomHexImage: "images/dirt_tile_bottom_small.png",
      gridFont: "bold 15px sans-serif",
      gridTextOffset: {
        x: -10,
        y: 5
      },
      zoomRatio: 1,
      characterStart: [2, 2],
      disableGrids: []
    };
    smallBoard = {
      boardWidth: 12,
      boardHeight: 11,
      character: "images/girl.png",
      topHexImage: "images/dirt_tile_top_large.png",
      bottomHexImage: "images/dirt_tile_bottom_large.png",
      gridFont: "bold 25px sans-serif",
      gridTextOffset: {
        x: -18,
        y: 8
      },
      zoomRatio: 0.5,
      characterStart: [5, 4],
      disableGrids: [[0, 0], [1, 0], [2, 0], [0, 1], [6, 0], [7, 0], [8, 0], [9, 0], [10, 0], [11, 0], [8, 1], [9, 1], [10, 1], [11, 1], [10, 2], [11, 2], [0, 8], [0, 9], [0, 10], [1, 8], [1, 9], [1, 10], [2, 9], [2, 10], [3, 9], [3, 10], [4, 10], [5, 10], [11, 9], [9, 10], [10, 10], [11, 10]]
    };
    active = $("#large").length > 0 ? largeBoard : smallBoard;
    return {
      supportsTouch: ('createTouch' in document),
      boardWidth: active.boardWidth,
      boardHeight: active.boardHeight,
      framesPerSecond: 45,
      characterSpeed: 500,
      dudeSpeed: 100,
      character: active.character,
      topHexImage: active.topHexImage,
      bottomHexImage: active.bottomHexImage,
      treeOne: "images/tree_tall.png",
      treeTwo: "images/tree_short.png",
      treeThree: "images/tree_ugly.png",
      characterStart: active.characterStart,
      dudeStart: [6, 6],
      zoomRatio: active.zoomRatio,
      boardMovementRate: 2,
      gridFont: active.gridFont,
      gridTextOffset: active.gridTextOffset,
      dirtyStrokeStyle: "rgba(255,0,0,0.8)",
      gridFontColor: "rgba(255,255,255,0.2)",
      gridFillColorHighlighted: "rgba(54,12,9,0.2)",
      gridFillColorSelected: "rgba(255, 255, 255, 0.3)",
      treePositions: [[2, 1, 0], [2, 4, 1], [7, 7, 2], [5, 6, 0], [6, 1, 1], [7, 2, 2], [10, 6, 0]],
      disableGrids: active.disableGrids
    };
  });
}).call(this);
