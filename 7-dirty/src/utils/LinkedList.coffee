# implementation of a doubly linked list, that takes advantage of the
# prototype object model to define the next and previous points in the
# actual object model.
define ['log'], (log) ->
  class Node
    constructor: (@data, @list, @previous, @next) ->
      @next.previous = this if @next
      @previous.next = this if @previous

    append: (appendedData) ->
      node = new Node(appendedData, @list, this, @next)
      @list.tail = node if @list.tail == this
      return node

    prepend: (prependData) ->
      node = new Node(prependData, @list, @previous, this)
      @list.head = node if @list.head == this
      return node

    remove: ->
      @next.previous = null if @next and !@previous
      @next.previous = @previous if @next and @previous
      @previous.next = null if @previous and !@next
      @previous.next = @next if @previous and @next

      if @list.head == this
        if @next
          @list.head = @next
        else
          @list.head = null

      if @list.tail == this
        if @previous
          @list.tail = @previous
        else
          @list.tail = null

      return this

  class LinkedList
    constructor: ->
      @head   = null
      @tail   = null

    push: (data) -> @append(data)

    append: (data) ->
      if @head and @tail
        @tail = new Node(data, this, @tail)
        return @tail
      else
        @head = new Node(data, this)
        @tail = @head
        return @head

    eachNode: (fn) ->
      iterate = (node) ->
        fn(node)
        iterate(node.next) if node.next
      iterate(@head) if @head

    each: (fn) ->
      iterate = (node) ->
        fn(node.data)
        iterate(node.next) if node.next
      iterate(@head) if @head

    clear: ->
      @head = null
      @tail = null