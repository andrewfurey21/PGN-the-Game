class Box {
  constructor(x, y, i, j, val, img){
    this.x = x;
    this.y = y;
    this.i = i;
    this.j = j;
    this.val = val;
    this.img = img;

    this.cx = this.x + (scl / 2);
    this.cy = this.y + (scl / 2);

    this.origX = this.x;
    this.origY = this.y;
  }
}
