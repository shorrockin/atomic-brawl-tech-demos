define ['log', 'ui/Layer'], (log, Layer) ->
  class ImageLayer extends Layer
    constructor: (name, @image, parent) ->
      super(name, parent)
      @dimensions.set(@image.width, @image.height)

    # the clip is the clipping region that we need to clip our
    # image at.
    redraw: =>
      @drawImage(@image, 0, 0, @image.width, @image.height)