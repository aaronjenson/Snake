var width = 600;
var height = 600;
var cellSize = 20;
var fps = 10;

window.onload = function() {
  game = new Game('canvas', width, height, cellSize, fps);
}

window.onkeydown = function(ev) {
  switch(ev.keyCode) {
    case 32:
      game.pause();
      break;
    case 37:
      game.left();
      break;
    case 38:
      game.up();
      break;
    case 39:
      game.right();
      break;
    case 40:
      game.down();
      break;
  }
}
