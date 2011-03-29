(function() {
  define(['tests/assert', 'log', 'utils/HashMap'], function(assert, log, HashMap) {
    return {
      name: "HashMap Tests",
      basicInsertionAndLoopup: function() {
        var hm;
        hm = new HashMap();
        hm.add("Chris", "Shorrock");
        assert.ok(hm.get() === "Shorrock", "get did not return Shorrock");
        assert.ok(hm.exists("Chris"), "exists did not return true");
        hm.remove("Chris");
        return assert.fail(hm.exists("Chris"), "exists did not return false");
      }
    };
  });
}).call(this);
