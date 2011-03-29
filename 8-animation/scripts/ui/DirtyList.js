(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  define(['log', 'utils/LinkedList'], function(log, LinkedList) {
    var DirtyList;
    return DirtyList = (function() {
      function DirtyList() {
        this.clear = __bind(this.clear, this);;
        this.eachNode = __bind(this.eachNode, this);;
        this.each = __bind(this.each, this);;
        this.append = __bind(this.append, this);;
        this.push = __bind(this.push, this);;        this.list = new LinkedList();
      }
      DirtyList.prototype.push = function(rectangle) {
        return this.append(rectangle);
      };
      DirtyList.prototype.exists = function() {
        return this.list.head != null;
      };
      DirtyList.prototype.head = function() {
        return this.list.head;
      };
      DirtyList.prototype.append = function(rectangle) {
        var combine, existing, merged, node, toRemove, _i, _len;
        existing = null;
        this.list.eachNode(function(node) {
          if (node.data.contains(rectangle)) {
            return existing = node;
          }
        });
        if (existing) {
          return;
        }
        toRemove = null;
        this.list.eachNode(function(node) {
          toRemove = toRemove || [];
          if (rectangle.contains(node.data)) {
            return toRemove.push(node);
          }
        });
        if (toRemove) {
          for (_i = 0, _len = toRemove.length; _i < _len; _i++) {
            node = toRemove[_i];
            node.remove();
          }
        }
        combine = null;
        this.list.eachNode(function(node) {
          if (node.data.intersects(rectangle)) {
            return combine = node;
          }
        });
        if (combine) {
          merged = rectangle.merge(combine.remove().data);
          return this.append(merged);
        }
        return this.list.push(rectangle);
      };
      DirtyList.prototype.each = function(fn) {
        return this.list.each(fn);
      };
      DirtyList.prototype.eachNode = function(fn) {
        return this.list.eachNode(fn);
      };
      DirtyList.prototype.clear = function() {
        return this.list.clear();
      };
      return DirtyList;
    })();
  });
}).call(this);
