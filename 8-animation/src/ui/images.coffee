define ['constants', 'logging'], (constants, log) ->
  main      = new Image()
  bottom    = new Image()
  treeOne   = new Image()
  treeTwo   = new Image()
  treeThree = new Image()
  character = new Image()
  callback  = null
  trees     = [treeOne, treeTwo, treeThree]
  all       = [main, bottom, treeOne, treeTwo, treeThree, character]

  resize = =>
    for i in all
      i.width = i.width * constants.zoomRatio
      i.height = i.height * constants.zoomRatio
    main.radius = Math.round(main.width / 2)
    main.side = Math.round(main.radius * 3/2)

  extractSrc = (event) ->
    src = event.target.src
    index = src.lastIndexOf("/")
    if index != -1
      src.substring(index + 1, src.length)
    else
      src

  load = (callback) ->
    loaded = 0
    for image in all
      image.onload = (event) =>
        log.debug "successfully loaded image: #{extractSrc(event)}"
        loaded = loaded + 1
        (resize() and callback()) if loaded == all.length

    main.src      = constants.topHexImage
    bottom.src    = constants.bottomHexImage
    treeOne.src   = constants.treeOne
    treeTwo.src   = constants.treeTwo
    treeThree.src = constants.treeThree
    character.src = constants.character

  return {
    main: main
    bottom: bottom
    treeOne: treeOne
    treeTwo: treeTwo
    treeThree: treeThree
    trees: trees
    character: character
    onLoad: (callback) -> load(callback)
  }