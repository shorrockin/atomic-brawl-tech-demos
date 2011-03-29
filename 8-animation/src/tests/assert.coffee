define ['log'], (log) ->
  return {
    isFunction: (object) -> typeof(object) == 'function'

    ok: (test, message) ->
      if @isFunction(test)
        result = test()
        throw (message or "specified function did not evaluate to true, was: #{result}") unless result
      else
        throw (message or "specified object was not true, was #{test}") unless test

    fail: (test, message) ->
      if @isFunction(test)
        result = test()
        throw (message or "specified function did not evaluate to false, was: #{result}") if result
      else
        throw (message or "specified object was not false, was #{test}") if test
  }