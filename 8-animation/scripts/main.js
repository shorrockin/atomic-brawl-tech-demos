(function() {
  var requirements;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  requirements = [];
  requirements.push('log');
  requirements.push('animator');
  requirements.push('ui/images');
  requirements.push('models/Game');
  requirements.push('layers/BoardLayer');
  requirements.push('layers/CharacterLayer');
  requirements.push('layers/DirtyLayer');
  requirements.push('layers/DudeLayer');
  require(requirements, function(log, animator, images, Game, BoardLayer, CharacterLayer, DirtyLayer, DudeLayer) {
    return images.onLoad(__bind(function() {
      var board, game;
      animator.start();
      new DirtyLayer();
      game = new Game();
      board = new BoardLayer(game);
      return log.debug("initialization process complete...");
    }, this));
  });
}).call(this);
