class Game {
  constructor(canvas, width, height, cellSize, fps) {
    this.canvas = canvas instanceof Element ? canvas : document.getElementById(canvas);
    this.width = width;
    this.height = height;
    this.paper = new Raphael(this.canvas, this.width, this.height);
    this.cell = cellSize;

    this.cols = Math.floor(this.width / this.cell);
    this.rows = Math.floor(this.height / this.cell);
    this.fps = fps;

    this.paused = true;

    this.snake = new Snake(this.paper, this.cols, this.rows, this.cell);
    this.food = new Food(this.paper, this.cols, this.rows, this.cell);

    this.loop = window.setInterval(this.run.bind(this), 1000 / this.fps);
  }

  run() {
    this.paper.clear();
    this.paper.rect(0, 0, width, height).attr('fill', '#333');
    this.food.show();
    this.snake.show();
    if(!this.paused) {
      this.snake.run();
      if(this.snake.isDead()) {
        this.paused = true;
      }
      if(this.snake.isFed(this.food.loc)) {
        this.food.rnd(this.snake.tail);
      }
    } else {
      this.paper.text(this.width / 2, this.height / 2, "Press space to toggle gameplay")
          .attr('font-size', 24).attr('fill', '#0f0');
    }
  }

  setFPS(fps) {
    this.fps = fps;
    window.clearInterval(this.loop);
    this.loop = window.setInterval(this.run.bind(this), 1000 / this.fps);
  }

  pause() {
    this.paused = !this.paused;
  }

  up() {
    this.snake.up();
  }
  right() {
    this.snake.right();
  }
  down() {
    this.snake.down();
  }
  left() {
    this.snake.left();
  }
}
