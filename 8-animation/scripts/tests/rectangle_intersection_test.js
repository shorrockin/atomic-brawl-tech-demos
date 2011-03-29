(function() {
  define(['tests/assert', 'ui/Rectangle', 'log'], function(assert, Rectangle, log) {
    return {
      name: "Rectangle Intersection Tests",
      basicRectangleIntersction: function() {
        var r1, r2;
        r1 = new Rectangle(0, 0, 5, 5);
        r2 = new Rectangle(3, 3, 10, 10);
        assert.ok(r1.intersects(r2), "r1 did not intersect r2");
        return assert.ok(r2.intersects(r1), "r2 did not intersect r1");
      }
    };
  });
}).call(this);
