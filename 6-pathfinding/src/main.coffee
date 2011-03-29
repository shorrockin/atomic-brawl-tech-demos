modules = []
modules.push 'math'
modules.push 'logging'
modules.push 'constants'
modules.push 'animator'
modules.push 'models/images'
modules.push 'models/Game'
modules.push 'views/GridLayer'
modules.push 'views/GridHighlightLayer'
modules.push 'views/canvas'
modules.push 'views/CharacterLayer'

# main entry point for our application. uses requireJs to bootstrap
# and get references to external libraries and modules.
require modules, (math, log, constants, animator, images, Game, GridLayer, GridHighlightLayer, canvas, CharacterLayer) ->
  log.debug 'initializing super radical jetskys subsystems'
  log.debug 'current client supports touch' if constants.supportsTouch
  log.debug "board dimensions: #{constants.boardWidth}/#{constants.boardHeight}, zoom ratio of: #{constants.zoomRatio}"

  images.onLoad ->
    log.debug 'all images have been loaded into the system'

    game = new Game()
    gl   = new GridLayer(game.hexagons)
    ghl  = new GridHighlightLayer(game.hexagons, gl)
    pl   = new CharacterLayer(gl, game)

    canvas.add(gl)
    canvas.add(ghl)
    canvas.add(pl)
    canvas.redraw()

    log.debug "starting animator"
    animator.start()
