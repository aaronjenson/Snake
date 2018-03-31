function Snake() {
  this.loc = {};
  this.loc.x = Math.floor(cols / 4);
  this.loc.y = Math.floor(rows / 4);
  this.xSpeed = 1;
  this.ySpeed = 0;
  this.lastXSpeed = this.xSpeed;
  this.lastYSpeed = this.ySpeed;
  this.tail = [];

  this.show = function() {
    paper.rect(this.loc.x * cellSize, this.loc.y * cellSize, cellSize, cellSize, 3)
        .attr('stroke-width', 0).attr('fill', '#ddd');
    this.tail.forEach(function(point) {
      paper.rect(point.x * cellSize, point.y * cellSize, cellSize, cellSize, 3)
          .attr('stroke-width', 0).attr('fill', '#fff');
    })
  }

  this.run = function(foodLoc) {
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

    // handle cliffs
    if(self.loc.x < 0 || self.loc.x > cols || self.loc.y < 0 || self.loc.y > rows) {
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


    // handle eating
    if(self.loc.x === foodLoc.x && self.loc.y === foodLoc.y) {
      self.tail.unshift({x: self.loc.x, y: self.loc.y});
      return true;
    }
    return false;
  }

  this.left = function() {
    if(this.lastXSpeed !== 1) {
      this.xSpeed = -1;
      this.ySpeed = 0;
    }
  }

  this.up = function() {
    if(this.lastYSpeed !== 1) {
      this.xSpeed = 0;
      this.ySpeed = -1;
    }
  }

  this.right = function() {
    if(this.lastXSpeed !== -1) {
      this.xSpeed = 1;
      this.ySpeed = 0;
    }
  }

  this.down = function() {
    if(this.lastYSpeed !== -1) {
      this.xSpeed = 0;
      this.ySpeed = 1;
    }
  }

  this.reset = function() {
    this.tail = [];
    this.loc.x = Math.floor(cols / 4);
    this.loc.y = Math.floor(rows / 4);
    paused = true;
  }
}
