(function() {
  var requirements, t, tests;
  tests = [];
  tests.push("ui/rectangle");
  tests.push("utils/HashMap");
  tests = (function() {
    var _i, _len, _results;
    _results = [];
    for (_i = 0, _len = tests.length; _i < _len; _i++) {
      t = tests[_i];
      _results.push("tests/" + t);
    }
    return _results;
  })();
  requirements = [];
  requirements.push('log');
  requirements.push('tests/assert');
  require(requirements.concat(tests), function(log, assert) {
    var failures, index, passes, results, run, _ref, _ref2;
    run = function(test) {
      var failures, passes, testName, unit;
      if (test) {
        failures = 0;
        passes = 0;
        log.debug("Running Test: " + (test.name ? test.name : 'Unknown'));
        for (testName in test) {
          unit = test[testName];
          if (assert.isFunction(unit)) {
            log.debug("  --------------------------------");
            try {
              log.debug("  Executing: " + testName);
              unit();
              log.debug("  Success: " + testName);
              passes = passes + 1;
            } catch (error) {
              log.error("  Failure: " + testName + ": " + error);
              failures = failures + 1;
            }
          }
        }
        return [passes, failures];
      } else {
        throw "test provided to run was null";
      }
    };
    log.debug("Starting all unit tests");
    failures = 0;
    passes = 0;
    for (index = _ref = requirements.length, _ref2 = arguments.length; (_ref <= _ref2 ? index < _ref2 : index > _ref2); (_ref <= _ref2 ? index += 1 : index -= 1)) {
      results = run(arguments[index]);
      passes = passes + results[0];
      failures = failures + results[1];
    }
    return log.debug("Unit Tests Complete. " + passes + " passing tests, " + failures + " failures");
  });
}).call(this);
