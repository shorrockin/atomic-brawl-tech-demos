define [], ->
  class Rectangle
    constructor: (@x1, @y1, @x2, @y2) ->
      @width  = Math.abs(@x2 - @x1)
      @height = Math.abs(@y2 - @y1)
      @x = @x1
      @y = @y1


    # given two intersecting rectangles, form a super rectangle that
    # is composed of both rectangles.
    merge: (rectangle) ->
      new Rectangle((if @x1 < rectangle.x1 then @x1 else rectangle.x1),
                    (if @y1 < rectangle.y1 then @y1 else rectangle.y1),
                    (if @x2 > rectangle.x2 then @x2 else rectangle.x2),
                    (if @y2 > rectangle.y2 then @y2 else rectangle.y2))


    # given two intersecting rectangles, form a rectangle that represents
    # the inner most bounds.
    contract: (rectangle) ->
      new Rectangle((if @x1 > rectangle.x1 then @x1 else rectangle.x1),
                    (if @y1 > rectangle.y1 then @y1 else rectangle.y1),
                    (if @x2 < rectangle.x2 then @x2 else rectangle.x2),
                    (if @y2 < rectangle.y2 then @y2 else rectangle.y2))



    # a rectangle intersects this rectangle if any of the points lie within the
    # bounds of this rectangle. we do so by checking to see if they don't intersect
    # and return true if that's not the case. they intersect if a box is not completly
    # to the right, left, top or bottom
    intersects: (rectangle) -> !@outside(rectangle)


    # true if the rectangle is outside of this rectangle
    outside: (rectangle) ->
      @x1 >= rectangle.x2 or # rectangle left
      @x2 <= rectangle.x1 or # rectangle right
      @y1 >= rectangle.y2 or # rectangle above
      @y2 <= rectangle.y1    # rectangle below


    # true if the rectangle is completely within this rectangle
    contains: (rectangle) ->
      @hasPoint(rectangle.x1, rectangle.y1) and
      @hasPoint(rectangle.x2, rectangle.y1) and
      @hasPoint(rectangle.x1, rectangle.y2) and
      @hasPoint(rectangle.x2, rectangle.x2)

    # true if the x/y coord lies within the bounds of this rectangle
    hasPoint: (x, y) -> (@x1 <= x and @x2 >= x and @y1 <= y and @y2 >= y)

    equals: (rectangle) ->
      (@x1 == rectangle.x1 and @x2 == rectangle.x2 and @y1 == rectangle.y1 and @y2 == rectangle.y2)

    toString: -> "Rectangle[#{@x1}/#{@y1} -> #{@x2}/#{@y2}, width: #{@width}, height: #{@height}]"