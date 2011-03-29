(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  define(['constants', 'logging'], function(constants, log) {
    var all, bottom, callback, character, extractSrc, load, main, resize, treeOne, treeThree, treeTwo, trees;
    main = new Image();
    bottom = new Image();
    treeOne = new Image();
    treeTwo = new Image();
    treeThree = new Image();
    character = new Image();
    callback = null;
    trees = [treeOne, treeTwo, treeThree];
    all = [main, bottom, treeOne, treeTwo, treeThree, character];
    resize = __bind(function() {
      var i, _i, _len;
      for (_i = 0, _len = all.length; _i < _len; _i++) {
        i = all[_i];
        i.width = i.width * constants.zoomRatio;
        i.height = i.height * constants.zoomRatio;
      }
      main.radius = Math.round(main.width / 2);
      return main.side = Math.round(main.radius * 3 / 2);
    }, this);
    extractSrc = function(event) {
      var index, src;
      src = event.target.src;
      index = src.lastIndexOf("/");
      if (index !== -1) {
        return src.substring(index + 1, src.length);
      } else {
        return src;
      }
    };
    load = function(callback) {
      var image, loaded, _i, _len;
      loaded = 0;
      for (_i = 0, _len = all.length; _i < _len; _i++) {
        image = all[_i];
        image.onload = __bind(function(event) {
          log.debug("successfully loaded image: " + (extractSrc(event)));
          loaded = loaded + 1;
          if (loaded === all.length) {
            return resize() && callback();
          }
        }, this);
      }
      main.src = constants.topHexImage;
      bottom.src = constants.bottomHexImage;
      treeOne.src = constants.treeOne;
      treeTwo.src = constants.treeTwo;
      treeThree.src = constants.treeThree;
      return character.src = constants.character;
    };
    return {
      main: main,
      bottom: bottom,
      treeOne: treeOne,
      treeTwo: treeTwo,
      treeThree: treeThree,
      trees: trees,
      character: character,
      onLoad: function(callback) {
        return load(callback);
      }
    };
  });
}).call(this);
