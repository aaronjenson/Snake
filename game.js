class Game {
  constructor(canvas, width, height, cellSize, fps, callback) {
    this.canvas = canvas instanceof Element ? canvas : document.getElementById(canvas);
    this.width = width;
    this.height = height;
    this.paper = new Raphael(this.canvas, this.width, this.height);
    this.cell = cellSize;

    this.callback = callback;

    this.score = 0;

    this.cols = Math.floor(this.width / this.cell);
    this.rows = Math.floor(this.height / this.cell);
    this.fps = fps;

    this.state = "stopped";

    this.snake = new Snake(this.paper, this.cols, this.rows, this.cell);
    this.food = new Food(this.paper, this.cols, this.rows, this.cell);

    this.loop = window.setInterval(this.run.bind(this), 1000 / this.fps);
  }

  run() {
    this.paper.clear();
    this.paper.rect(0, 0, width, height).attr('fill', '#333');
    this.food.show();
    this.snake.show();
    
    switch(this.state) {
      case "stopped":
        this.paper.text(this.width / 2, this.height / 2, "Press space to begin gameplay")
            .attr('font-size', 24).attr('fill', '#0f0');
        break;
      case "paused":
        this.paper.text(this.width / 2, this.height / 2, "Press space to resume gameplay")
            .attr('font-size', 24).attr('fill', '#0f0');
        break;
      case "running":
        this.snake.run();
        if(this.snake.isDead()) {
          this.state = "stopped";
        }
        if(this.snake.isFed(this.food.loc)) {
          this.food.rnd(this.snake.tail);
          this.score++;
        }
        break;
    }

    this.callback();
  }

  setFPS(fps) {
    this.fps = fps;
    window.clearInterval(this.loop);
    this.loop = window.setInterval(this.run.bind(this), 1000 / this.fps);
  }

  getScore() {
    return this.score;
  }

  isRunning() {
    return this.state === "running";
  }
  isStopped() {
    return this.state === "stopped";
  }
  isPaused() {
    return this.state === "paused";
  }

  pause() {
    this.state = "paused";
  }
  resume() {
    this.state = "running";
  }
  start() {
    this.state = "running";
    this.score = 0;
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
