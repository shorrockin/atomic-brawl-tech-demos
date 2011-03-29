define ['constants', 'logging'], (constants, log) ->
  main      = new Image()
  bottom    = new Image()
  treeOne   = new Image()
  treeTwo   = new Image()
  treeThree = new Image()
  callback  = null
  trees     = [treeOne, treeTwo, treeThree]
  all       = [main, bottom, treeOne, treeTwo, treeThree]

  resize = =>
    for i in all
      i.width = i.width * constants.zoomRatio
      i.height = i.height * constants.zoomRatio
    main.radius = Math.round(main.width / 2)
    main.side = Math.round(main.radius * 3/2)

  load = (callback) ->
    loaded = 0
    for image in all
      image.onload = =>
        loaded = loaded + 1
        (resize() and callback()) if loaded == 5

    main.src      = constants.topHexImage
    bottom.src    = constants.bottomHexImage
    treeOne.src   = constants.treeOne
    treeTwo.src   = constants.treeTwo
    treeThree.src = constants.treeThree

  return {
    main: main
    bottom: bottom
    treeOne: treeOne
    treeTwo: treeTwo
    treeThree: treeThree
    trees: trees
    onLoad: (callback) -> load(callback)
  }