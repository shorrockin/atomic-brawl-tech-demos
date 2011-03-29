# defines some core extensions to the string class, does not return anything.
define [], ->
  String::capitalize = ->
    if this.length > 0
      return this.substring(0, 1).toUpperCase() + this.substring(1, this.length)
    return this