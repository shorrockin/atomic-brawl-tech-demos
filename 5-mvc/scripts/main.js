(function() {
  var modules;
  modules = [];
  modules.push('logging');
  modules.push('constants');
  modules.push('models/images');
  modules.push('models/Game');
  modules.push('views/GridLayer');
  modules.push('views/GridHighlightLayer');
  modules.push('views/canvas');
  modules.push('views/PlantLayer');
  require(modules, function(log, constants, images, Game, GridLayer, GridHighlightLayer, canvas, PlantLayer) {
    log.debug('initializing super radical jetskys subsystems');
    if (constants.supportsTouch) {
      log.debug('current client supports touch');
    }
    log.debug("board dimensions: " + constants.boardWidth + "/" + constants.boardHeight + ", zoom ratio of: " + constants.zoomRatio);
    log.debug;
    return images.onLoad(function() {
      var game, ghl, gl, pl;
      log.debug('all images have been loaded into the system');
      game = new Game();
      gl = new GridLayer(game.hexagons);
      ghl = new GridHighlightLayer(game.hexagons, gl);
      pl = new PlantLayer(gl);
      canvas.add(gl);
      canvas.add(ghl);
      canvas.add(pl);
      return canvas.redraw();
    });
  });
}).call(this);
