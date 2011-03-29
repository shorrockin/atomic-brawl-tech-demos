(function() {
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  define(['views/BoundLayer', 'views/PlantView', 'constants', 'models/images'], function(BoundLayer, PlantView, constants, images) {
    var PlantLayer;
    return PlantLayer = (function() {
      __extends(PlantLayer, BoundLayer);
      function PlantLayer(gridLayer, name) {
        var trees, _i, _len, _ref;
        this.gridLayer = gridLayer;
        PlantLayer.__super__.constructor.call(this, name, 1, this.gridLayer, 2);
        _ref = constants.treePositions;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          trees = _ref[_i];
          this.addComponent(new PlantView(trees[0], trees[1], images.trees[trees[2]]));
        }
      }
      return PlantLayer;
    })();
  });
}).call(this);
