# an additional layer which adds some plants. really just thrown in there so I can
# toy with different layer groupings and properties.
define ['views/BoundLayer', 'views/PlantView', 'constants', 'models/images'], (BoundLayer, PlantView, constants, images) ->
  class PlantLayer extends BoundLayer
    constructor: (@gridLayer) ->
      super("plant-layer", 1, @gridLayer, 2)

      for trees in constants.treePositions
        @addComponent(new PlantView(trees[0], trees[1], images.trees[trees[2]]))

