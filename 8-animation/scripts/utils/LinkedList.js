(function() {
  define(['log'], function(log) {
    var LinkedList, Node;
    Node = (function() {
      function Node(data, list, previous, next) {
        this.data = data;
        this.list = list;
        this.previous = previous;
        this.next = next;
        if (this.next) {
          this.next.previous = this;
        }
        if (this.previous) {
          this.previous.next = this;
        }
      }
      Node.prototype.append = function(appendedData) {
        var node;
        node = new Node(appendedData, this.list, this, this.next);
        if (this.list.tail === this) {
          this.list.tail = node;
        }
        return node;
      };
      Node.prototype.prepend = function(prependData) {
        var node;
        node = new Node(prependData, this.list, this.previous, this);
        if (this.list.head === this) {
          this.list.head = node;
        }
        return node;
      };
      Node.prototype.remove = function() {
        if (this.next && !this.previous) {
          this.next.previous = null;
        }
        if (this.next && this.previous) {
          this.next.previous = this.previous;
        }
        if (this.previous && !this.next) {
          this.previous.next = null;
        }
        if (this.previous && this.next) {
          this.previous.next = this.next;
        }
        if (this.list.head === this) {
          if (this.next) {
            this.list.head = this.next;
          } else {
            this.list.head = null;
          }
        }
        if (this.list.tail === this) {
          if (this.previous) {
            this.list.tail = this.previous;
          } else {
            this.list.tail = null;
          }
        }
        return this;
      };
      return Node;
    })();
    return LinkedList = (function() {
      function LinkedList() {
        this.head = null;
        this.tail = null;
      }
      LinkedList.prototype.push = function(data) {
        return this.append(data);
      };
      LinkedList.prototype.append = function(data) {
        if (this.head && this.tail) {
          this.tail = new Node(data, this, this.tail);
          return this.tail;
        } else {
          this.head = new Node(data, this);
          this.tail = this.head;
          return this.head;
        }
      };
      LinkedList.prototype.eachNode = function(fn) {
        for(var node = this.head; node; node = node.next) { fn(node); };        return null;
      };
      LinkedList.prototype.each = function(fn) {
        for(var node = this.head; node; node = node.next) { fn(node.data); };        return null;
      };
      LinkedList.prototype.clear = function() {
        this.head = null;
        return this.tail = null;
      };
      return LinkedList;
    })();
  });
}).call(this);
