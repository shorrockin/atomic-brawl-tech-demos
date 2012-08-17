tests = []
tests.push "ui/rectangle"
tests.push "utils/HashMap"
tests = ("tests/#{t}" for t in tests)

requirements = []
requirements.push 'log'
requirements.push 'tests/assert'

require requirements.concat(tests), (log, assert) ->
  run = (test) ->
    if test
      failures = 0
      passes = 0
      log.debug "Running Test: #{if test.name then test.name else 'Unknown'}"
      for testName of test
        unit = test[testName]
        if assert.isFunction(unit)
          log.debug "  --------------------------------"
          try
            log.debug "  Executing: #{testName}"
            unit()
            log.debug "  Success: #{testName}"
            passes = passes + 1
          catch error
            log.error "  Failure: #{testName}: #{error}"
            failures = failures + 1
      return [passes, failures]
    else
      throw "test provided to run was null"


  log.debug "Starting all unit tests"
  failures = 0
  passes = 0
  for index in [requirements.length...arguments.length]
    results  = run arguments[index]
    passes   = passes + results[0]
    failures = failures + results[1]

  log.debug "Unit Tests Complete. #{passes} passing tests, #{failures} failures"