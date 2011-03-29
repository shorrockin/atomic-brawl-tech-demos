(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  define(['log', 'utils/LinkedList'], function(log, LinkedList) {
    var LayerList;
    return LayerList = (function() {
      function LayerList() {
        this.each = __bind(this.each, this);;
        this.append = __bind(this.append, this);;
        this.push = __bind(this.push, this);;        this.list = new LinkedList();
      }
      LayerList.prototype.push = function(layer) {
        return this.append(layer);
      };
      LayerList.prototype.append = function(layer) {
        var current, inserted, previous;
        previous = null;
        inserted = null;
        current = layer.dimensions;
        this.list.eachNode(function(node) {
          var next;
          if (!inserted) {
            next = node.data.dimensions;
            if (previous === null && current.before(next)) {
              inserted = node.prepend(layer);
            } else if (previous !== null && current.before(next) && current.after(previous.data.dimensions)) {
              inserted = node.prepend(layer);
            }
            return previous = node;
          }
        });
        if (!inserted) {
          if (previous) {
            inserted = previous.append(layer);
          } else {
            inserted = this.list.append(layer);
          }
        }
        return layer.dimensions.addChangeListener(__bind(function(event) {
          if (event.from.depth !== event.to.depth) {
            return this.append(inserted.remove().data);
          }
        }, this));
      };
      LayerList.prototype.each = function(fn) {
        return this.list.each(fn);
      };
      return LayerList;
    })();
  });
}).call(this);
