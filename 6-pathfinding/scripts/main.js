(function() {
  var modules;
  modules = [];
  modules.push('math');
  modules.push('logging');
  modules.push('constants');
  modules.push('animator');
  modules.push('models/images');
  modules.push('models/Game');
  modules.push('views/GridLayer');
  modules.push('views/GridHighlightLayer');
  modules.push('views/canvas');
  modules.push('views/CharacterLayer');
  require(modules, function(math, log, constants, animator, images, Game, GridLayer, GridHighlightLayer, canvas, CharacterLayer) {
    log.debug('initializing super radical jetskys subsystems');
    if (constants.supportsTouch) {
      log.debug('current client supports touch');
    }
    log.debug("board dimensions: " + constants.boardWidth + "/" + constants.boardHeight + ", zoom ratio of: " + constants.zoomRatio);
    return images.onLoad(function() {
      var game, ghl, gl, pl;
      log.debug('all images have been loaded into the system');
      game = new Game();
      gl = new GridLayer(game.hexagons);
      ghl = new GridHighlightLayer(game.hexagons, gl);
      pl = new CharacterLayer(gl, game);
      canvas.add(gl);
      canvas.add(ghl);
      canvas.add(pl);
      canvas.redraw();
      log.debug("starting animator");
      return animator.start();
    });
  });
}).call(this);
