(function() {
  define(['views/canvas'], function(canvas) {
    var context;
    context = canvas.getContext('2d');
    context.redraw = function() {
      return canvas.redraw();
    };
    return context;
  });
}).call(this);
