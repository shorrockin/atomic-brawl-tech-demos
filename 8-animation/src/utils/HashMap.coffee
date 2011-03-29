# really simple implementation of a hashmap that fakes a hashmap using an object
# since it seems to provide O(1) lookup speed.
define [], () ->
  class HashMap
    add: (key, value) ->
      this[key] = value

    exists: (key) ->
      return this.hasOwnProperty(key)

    get: (key) ->
      return this[key]

    remove: (key) ->
      delete this[key]