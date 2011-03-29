(function() {
  define(['tests/assert', 'ui/Rectangle', 'log'], function(assert, Rectangle, log) {
    return {
      name: "Rectangle Tests",
      angularIntersction: function() {
        var r1, r2;
        r1 = new Rectangle(0, 0, 5, 5);
        r2 = new Rectangle(3, 3, 10, 10);
        assert.ok(r1.intersects(r2), "r1 did not intersect r2");
        return assert.ok(r2.intersects(r1), "r2 did not intersect r1");
      },
      verticalIntersection: function() {
        var r1, r2;
        r1 = new Rectangle(0, 0, 1000, 600);
        r2 = new Rectangle(4, -2, 938, 494);
        assert.ok(r1.intersects(r2), "r1 did not intersect r2");
        return assert.ok(r2.intersects(r1), "r2 did not intersect r1");
      },
      noPointIntersection: function() {
        var r1, r2;
        r1 = new Rectangle(0, 10, 20, 20);
        r2 = new Rectangle(5, 0, 15, 25);
        assert.ok(r1.intersects(r2), "r1 did not intersect r2");
        return assert.ok(r2.intersects(r1), "r2 did not intersect r1");
      },
      sameIntersection: function() {
        var r1;
        r1 = new Rectangle(0, 0, 10, 10);
        return assert.ok(r1.intersects(r1), "r1 does not intersect itself");
      },
      doesntIntersect: function() {
        var above, base, below, left, right;
        base = new Rectangle(10, 10, 20, 20);
        above = new Rectangle(10, 0, 20, 5);
        right = new Rectangle(25, 10, 35, 20);
        below = new Rectangle(10, 25, 20, 35);
        left = new Rectangle(0, 10, 5, 20);
        assert.fail(base.intersects(above), "base intersects above");
        assert.fail(base.intersects(right), "base intesects right");
        assert.fail(base.intersects(below), "base intersects below");
        return assert.fail(base.intersects(left), "base intersects left");
      },
      rectangleContains: function() {
        var r1, r2;
        r1 = new Rectangle(0, 0, 10, 10);
        r2 = new Rectangle(3, 3, 5, 5);
        assert.ok(r1.contains(r2), "r1 did not contain r2");
        return assert.fail(r2.contains(r1), "r2 contained r1");
      },
      rectangleMerging: function() {
        var m, r1, r2;
        r1 = new Rectangle(10, 10, 10, 10);
        r2 = new Rectangle(13, 13, 15, 15);
        m = r1.merge(r2);
        assert.ok(m.equals(new Rectangle(10, 10, 15, 15)), "merged rectangle did not match expected");
        return assert.ok(r2.merge(r1).equals(m), "merged r2 with r1 rectangle did not match the original " + m + " and " + (r2.merge(r1)));
      },
      rectangleContraction: function() {
        var c, r1, r2;
        r1 = new Rectangle(10, 10, 10, 10);
        r2 = new Rectangle(13, 13, 15, 15);
        c = r1.contract(r2);
        assert.ok(c.equals(new Rectangle(13, 13, 10, 10)), "contracted rectangle did not match expected");
        return assert.ok(r2.contract(r1).equals(c), "contract r2 with r1 rectangle did not match the original " + c + " and " + (r2.contract(r1)));
      }
    };
  });
}).call(this);
