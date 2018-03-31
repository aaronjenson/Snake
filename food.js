function Food() {
  this.loc = {};
  this.loc.x = 0;
  this.loc.y = 0;

  this.show = function() {
    paper.rect(this.loc.x * cellSize, this.loc.y * cellSize, cellSize, cellSize, 5)
        .attr('fill', '#f00').attr('stroke-width', 0);
  }

  this.rnd = function(tail) {
    var self = this;
    do {
      this.loc.x = Math.floor(Math.random() * cols);
      this.loc.y = Math.floor(Math.random() * rows);
    } while(tail.some(function(point) {
      return self.loc.x === point.x && self.loc.y === point.y;
    }));
  }

  this.rnd([]);
}
