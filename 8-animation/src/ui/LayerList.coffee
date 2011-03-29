# a type of linked list which ensures that layers added are orderd based on their
# depth values.
# TODO implement sorting on append. may need to listen for depth changes as well.
define ['log', 'utils/LinkedList'], (log, LinkedList) ->
  class LayerList
    constructor: ->
      @list = new LinkedList()

    push: (layer) => @append(layer)

    append: (layer) =>
      previous  = null
      inserted  = null
      current   = layer.dimensions

      # iterate over each node, stopping if we've inserted anything. if this
      # is our first run and this is before the first element, add it before
      # the first element. otherwise if check to see if this layer is before
      # the current one and after the previous one. continue this until we
      # find a spot where we can insert it.
      @list.eachNode (node) ->
        unless inserted
          next = node.data.dimensions
          if previous == null and current.before(next)
            inserted = node.prepend(layer)
          else if previous != null and current.before(next) and current.after(previous.data.dimensions)
            inserted = node.prepend(layer)
          previous = node

      # if we didn't insert it then if there was anything, add it after the
      # last element we found, otherwise, just append it as the head of the
      # list
      unless inserted
        if previous
          inserted = previous.append(layer)
        else
          inserted = @list.append(layer)

      # add's a listener to maintain the sorted order when dimensions change
      layer.dimensions.addChangeListener (event) =>
        if event.from.depth != event.to.depth
          @append(inserted.remove().data)


    each: (fn) => @list.each(fn)

