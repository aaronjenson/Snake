class Food {

  constructor(paper, cols, rows, cell) {
    this.paper = paper;
    this.cols = cols;
    this.rows = rows;
    this.cell = cell;
    this.loc = {};
    this.loc.x = 0;
    this.loc.y = 0;

    this.rnd([]);
  }

  show() {
    this.paper.rect(this.loc.x * this.cell, this.loc.y * this.cell, this.cell, this.cell, 5)
        .attr('fill', '#f00').attr('stroke-width', 0);
  }

  rnd(tail) {
    var self = this;
    do {
      this.loc.x = Math.floor(Math.random() * this.cols);
      this.loc.y = Math.floor(Math.random() * this.rows);
    } while(tail.some(function(point) {
      return self.loc.x === point.x && self.loc.y === point.y;
    }));
  }
}
