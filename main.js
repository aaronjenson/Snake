var width = 600;
var height = 600;
var cellSize = 20;
var fps = 10;

gameCallback = function() {
  scoreElement.innerHTML = game.getScore();
  console.log("trying to update score... " + game.getScore());
}

window.onload = function() {
  game = new Game('canvas', width, height, cellSize, fps, gameCallback);
  
  scoreElement = document.getElementById('score');
}

window.onkeydown = function(ev) {
  switch(ev.keyCode) {
    case 32:
      if(game.isStopped()) {
        game.start();
      }
      else if(game.isPaused()) {
        game.resume();
      }
      else if(game.isRunning()) {
        game.pause();
      }
      break;
    case 72:
    case 37:
      game.left();
      break;
    case 75:
    case 38:
      game.up();
      break;
    case 76:
    case 39:
      game.right();
      break;
    case 74:
    case 40:
      game.down();
      break;
  }
}
