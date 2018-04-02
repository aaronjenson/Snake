class Snake {
  constructor(paper, cols, rows, cell) {
    this.paper = paper;
    this.cols = cols;
    this.rows = rows;
    this.cell = cell;
    this.startX = Math.floor(this.cols / 4);
    this.startY = Math.floor(this.rows / 4);
    this.loc = {};
    this.loc.x = this.startX;
    this.loc.y = this.startY;
    this.xSpeed = 1;
    this.ySpeed = 0;
    this.lastXSpeed = this.xSpeed;
    this.lastYSpeed = this.ySpeed;
    this.tail = [];
  }

  show() {
    var self = this;
    self.paper.rect(self.loc.x * self.cell, self.loc.y * self.cell, self.cell, self.cell, 3)
        .attr('stroke-width', 0).attr('fill', '#ddd');
    self.tail.forEach(function(point) {
      self.paper.rect(point.x * self.cell, point.y * self.cell, self.cell, self.cell, 3)
          .attr('stroke-width', 0).attr('fill', '#fff');
    })
  }

  run() {
    var self = this;
    // update tail
    self.tail.unshift({x: self.loc.x, y: self.loc.y});
    self.tail.pop();

    // move head
    self.loc.x += self.xSpeed;
    self.loc.y += self.ySpeed;

    // update last speeds
    self.lastXSpeed = self.xSpeed;
    self.lastYSpeed = self.ySpeed;
  }

  isDead() {
    var self = this;
    // handle cliffs
    if(self.loc.x < 0 || self.loc.x > self.cols || self.loc.y < 0 || self.loc.y > self.rows) {
      self.reset();
      return true;
    }

    // handle cannabalism
    if(self.tail.some(function(point) {
      return self.loc.x === point.x && self.loc.y === point.y;
    })) {
      self.reset();
      return true;
    }
  }

  isFed(foodLoc) {
    var self = this;
    // handle eating
    if(self.loc.x === foodLoc.x && self.loc.y === foodLoc.y) {
      self.tail.unshift({x: self.loc.x, y: self.loc.y});
      return true;
    }
  }

  left() {
    if(this.lastXSpeed !== 1) {
      this.xSpeed = -1;
      this.ySpeed = 0;
    }
  }

  up() {
    if(this.lastYSpeed !== 1) {
      this.xSpeed = 0;
      this.ySpeed = -1;
    }
  }

  right() {
    if(this.lastXSpeed !== -1) {
      this.xSpeed = 1;
      this.ySpeed = 0;
    }
  }

  down() {
    if(this.lastYSpeed !== -1) {
      this.xSpeed = 0;
      this.ySpeed = 1;
    }
  }

  reset() {
    this.tail = [];
    this.loc.x = this.startX;
    this.loc.y = this.startY;
    this.xSpeed = 1;
    this.ySpeed = 0;
  }
}
