define ['constants', 'ui/images', 'ui/ImageLayer', 'ui/Layer', 'log', 'math'], (constants, images, ImageLayer, Layer, log, math) ->
  class HexagonTopLayer extends ImageLayer
    constructor: (@hexagon, parent) ->
      super("hexagon_top_#{@hexagon.x}_#{@hexagon.y}", images.main, parent)


  class HexagonBottomLayer extends ImageLayer
    constructor: (@hexagon, parent) ->
      super("hexagon_bottom_#{@hexagon.x}_#{@hexagon.y}", images.bottom, parent)
      @position.set(0, images.main.height)

    # only need to draw this if the stuff 'under' is ISN'T enabled
    enabled: -> (!@hexagon.south?.enabled or !@hexagon.southWest?.enabled or !@hexagon.southEast?.enabled)


  class HexagonHighlightLayer extends Layer
    constructor: (@hexagon, parent) ->
      super("hexagon_highlight_#{@hexagon.x}_#{@hexagon.y}", parent)
      @dimensions.set(images.main.width, images.main.height, 1)

    enabled: -> @parent.hovered() or @parent.selected()

    redraw: ->
      @beginPath()

      @moveTo(images.main.radius / 2, 0)
      @lineTo(images.main.side, 0)
      @lineTo(images.main.width, images.main.height / 2)
      @lineTo(images.main.side, images.main.height)
      @lineTo(images.main.radius / 2, images.main.height)
      @lineTo(0, images.main.height / 2)

      if @parent.hovered()
        @fillStyle(constants.gridFillColorHighlighted)
        @fill()

      if @parent.selected()
        @fillStyle(constants.gridFillColorSelected)
        @fill()

      @fillStyle(constants.gridFontColor)
      @font(constants.gridFont)
      @fillText("#{@hexagon.x},#{@hexagon.y}",
                 (images.main.width / 2) + constants.gridTextOffset.x,
                 (images.main.height / 2) + constants.gridTextOffset.y)
      @closePath()


  class HexagonLayer extends Layer
    constructor: (@hexagon, parent) ->
      super("hexagon_#{@hexagon.x}_#{@hexagon.y}", parent)
      pos = math.gridPosition(@hexagon.x, @hexagon.y)
      @position.set(pos.x, pos.y)
      @dimensions.set(images.main.width, images.main.height + images.bottom.height, pos.z)

      @top       = new HexagonTopLayer(@hexagon, this)
      @bottom    = new HexagonBottomLayer(@hexagon, this)
      @highlight = new HexagonHighlightLayer(@hexagon, this)

      @hexagon.addEnableListener => @markDirty()
      @hexagon.addSelectionListener => @top.markDirty()

    enabled: -> @hexagon.enabled

    hovered: -> @parent.hovered == this

    selected: -> @hexagon.selected

    toString: -> "HexagonLayer[hex: #{@hexagon}, pos: #{@position}, dim: #{@dimensions}]"


