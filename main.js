var width = 600;
var height = 600;
var cellSize = 20;
var rows = Math.floor(width / cellSize);
var cols = Math.floor(height / cellSize);

var fps = 10;

var paper;
var snake;
var food;

var paused = true;

window.onload = function() {
  paper = new Raphael('canvas', width, height);

  snake = new Snake();
  food = new Food();

  window.setInterval(function() {
    paper.clear();
    paper.rect(0, 0, width, height).attr('fill', '#333');
    food.show();
    snake.show();
    if(!paused) {
      if(snake.run(food.loc)) {
        food.rnd(snake.tail);
      }
    } else {
      paper.text(width / 2, height / 2, "Press space to toggle gameplay")
          .attr('font-size', 24).attr('fill', '#0f0');
    }
  }, 1000 / fps);
}

window.onkeydown = function(ev) {
  switch(ev.keyCode) {
    case 32:
      paused = !paused;
      break;
    case 37:
      snake.left();
      break;
    case 38:
      snake.up();
      break;
    case 39:
      snake.right();
      break;
    case 40:
      snake.down();
      break;
  }
}
