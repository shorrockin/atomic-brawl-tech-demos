define ->
  class Graphics
    constructor: (mainSrc, bottomSrc, onLoad) ->
      @main   = new Image()
      @bottom = new Image()

      @mainLoaded   = false
      @bottomLoaded = false

      notify         = => onLoad() if (@mainLoaded and @bottomLoaded)
      @main.onload   = => (@mainLoaded = true) and notify()
      @bottom.onload = => (@bottomLoaded = true) and notify()

      @main.src   = mainSrc
      @bottom.src = bottomSrc

    # height would normally be calculated with Math.round(@radius * Math.sqrt(3))
    # for a perfectly symetciral hexagon. However - since reducing this gives an
    # isometric perspective, we'll just use the image height.
    height: => @main.height
    width: => @main.width
    radius: => Math.round(this.width() / 2)
    side: => Math.round(this.radius() * 3/2)
