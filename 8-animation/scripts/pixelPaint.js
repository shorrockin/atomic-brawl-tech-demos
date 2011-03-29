(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  require(['jquery', 'animator', 'log', 'ui/images'], function($, animator, log, images) {
    return images.onLoad(function() {
      this.canvas = $("#canvas")[0];
      this.context = canvas.getContext('2d');
      this.id = context.createImageData(1000, 600);
      this.value = 0;
      log.debug("image data length " + id.data.length + " / " + (id.data.length / 4));
      animator.addListener(__bind(function() {
        if (this.value % 2 === 0) {
          this.context.drawImage(images.character, 0, 0, 1000, 600);
        } else {
          this.context.drawImage(images.main, 0, 0, 1000, 600);
        }
        return this.value++;
      }, this));
      return animator.start();
    });
  });
}).call(this);
