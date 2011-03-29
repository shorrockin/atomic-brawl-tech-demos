requirements = []
requirements.push 'log'
requirements.push 'animator'
requirements.push 'ui/images'
requirements.push 'models/Game'
requirements.push 'layers/BoardLayer'
requirements.push 'layers/CharacterLayer'
requirements.push 'layers/DirtyLayer'
requirements.push 'layers/DudeLayer'

require requirements, (log, animator, images, Game, BoardLayer, CharacterLayer, DirtyLayer, DudeLayer) ->
  images.onLoad =>
    animator.start()

    new DirtyLayer()
    game  = new Game()
    board = new BoardLayer(game)
    log.debug "initialization process complete..."










