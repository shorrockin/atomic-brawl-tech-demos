# a type of linked list which ensures that rectangles that overlap are not added
define ['log', 'utils/LinkedList'], (log, LinkedList) ->
  class DirtyList
    constructor: ->
      @list = new LinkedList()

    push: (rectangle) => @append(rectangle)

    exists: -> @list.head?

    head: -> @list.head

    append: (rectangle) =>
      # first we need to determine if the rectangle being passed
      # in is a subset of any existing rectangles, if so then
      # we don't need to add it.
      existing = null
      @list.eachNode (node) -> existing = node if node.data.contains(rectangle)
      #log.debug "ignoring #{rectangle}, already contained within #{existing.data}" if existing
      return if existing

      # once we know it's not existing, then we can check to see
      # we can remove any other rectangles because they exist within
      # us. note that we can't remove within the loop
      toRemove = null
      @list.eachNode (node) ->
        toRemove = toRemove or []
        toRemove.push(node) if rectangle.contains(node.data)
      if toRemove
        for node in toRemove
          #log.debug "removing existing #{node.data}, as #{rectangle} contains it"
          node.remove()

      # once we've removed existing redundant rectangles, then we need
      # to determine if we can do any rectangle merging. when two rectangles
      # intersect each other we can combine then. in doing so we end up
      # drawing more than we need to, but it's better than doing multiple
      # passes over the same phsical space (or splitting the recntangles into
      # 3 separate rectangles. TODO confirm assertions in statement above.
      combine = null
      @list.eachNode (node) -> combine = node if node.data.intersects(rectangle)
      if combine
        merged = rectangle.merge(combine.remove().data)
        #log.debug "merging #{combine.data} and #{rectangle}, into #{merged}"
        return @append(merged)

      @list.push(rectangle)

    each: (fn) => @list.each(fn)

    eachNode: (fn) => @list.eachNode(fn)

    clear: => @list.clear()
