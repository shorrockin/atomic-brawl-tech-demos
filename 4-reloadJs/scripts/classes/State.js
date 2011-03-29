define(["classes/Board", "logging"], function(Board, log) {
  var State;
  return State = (function() {
    function State(canvas, boardWidth, boardHeight, graphics) {
      this.canvas = canvas;
      this.boardWidth = boardWidth;
      this.boardHeight = boardHeight;
      this.graphics = graphics;
      this.context = this.canvas.getContext("2d");
      this.dragging = false;
      this.offsetX = 0;
      this.offsetY = 0;
      this.supportsTouch = ("createTouch" in document);
      this.board = new Board(this.boardWidth, this.boardHeight, this);
    }
    return State;
  })();
});