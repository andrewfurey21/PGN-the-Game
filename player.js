class Player {
  constructor(x, y, w) {
    this.x = x;
    this.y = y;
    this.w = w;

    this.inMotion = false;


    this.vel = 4;

    this.origX = this.x;
    this.origY = this.y;

    this.xAxis = this.x;
    this.yAxis = this.y;

    this.xMove = true;
    this.yMove = true;


    this.xdir;
    this.ydir;

    this.prevMoves = {
      left: false,
      right: false,
      up: false,
      down: false
    }
  }

  show() {
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    drawImage(player_sprite, this.xAxis, this.yAxis, this.w, this.w);
  }

  callDirection(xdir, ydir){
    if (!this.inMotion){
      this.xdir = xdir;
      this.ydir = ydir;
      this.inMotion = true;

      if (xdir == 1){
        this.prevMoves.right = true;
        this.prevMoves.left = false;
        this.prevMoves.up = false;
        this.prevMoves.down = false;
      } else if (xdir == -1){
        this.prevMoves.right = false;
        this.prevMoves.left = true;
        this.prevMoves.up = false;
        this.prevMoves.down = false;
      } else if (ydir == 1){
        this.prevMoves.right = false;
        this.prevMoves.left = false;
        this.prevMoves.up = false;
        this.prevMoves.down = true;
      } else if (ydir == -1){
        this.prevMoves.right = false;
        this.prevMoves.left = false;
        this.prevMoves.up = true;
        this.prevMoves.down = false;
      }

      if (this.xAxis == canv.width / 2 && this.prevMoves.left == true && grid[0][0].x > -scl){
        this.xMove = true;
      } else if (this.xAxis == canv.width / 2 && this.prevMoves.left == true && grid[0][0].x < -scl){
        this.xMove = false;
      }

      if (this.xAxis == canv.width / 2 && this.prevMoves.right == true && grid[grid.length - 1][grid.length - 1].x < canv.width){
        this.xMove = true;
      } else if (this.xAxis == canv.width / 2 && this.prevMoves.right == true && grid[grid.length - 1][grid.length - 1].x > canv.width){
        this.xMove = false;
      }

      if (this.yAxis == canv.height / 2 && this.prevMoves.up == true && grid[0][0].y > -scl){
        this.yMove = true;
      } else if (this.yAxis == canv.height / 2 && this.prevMoves.up == true && grid[0][0].y < -scl){
        this.yMove = false;
      }

      if (this.yAxis == canv.height / 2 && this.prevMoves.down == true && grid[grid.length - 1][grid.length - 1].y < canv.height){
        this.yMove = true;
      } else if (this.yAxis == canv.height / 2 && this.prevMoves.down == true && grid[grid.length - 1][grid.length - 1].y > canv.height){
        this.yMove = false;
      }


      if (!this.xMove){
        this.origX = this.x;
      } else {
        this.origX = this.xAxis;
      }
      if (!this.yMove){
        this.origY = this.y;
      } else {
        this.origY = this.yAxis;
      }
    }
  }


  move(){
    if (this.inMotion){
      if (this.xdir == 1){

        if (!this.xMove){
          this.x += this.vel;
          this.xAxis = canv.width / 2;

          for (let i = 0; i < grid.length; i++){
            for (let j = 0; j < grid.length; j++){
              grid[i][j].x -= this.vel;
            }
          }

          if (this.x == this.origX + this.w){
            this.inMotion = false;
            this.origX = this.x;
            this.origY = this.y;

            for (let i = 0; i < grid.length; i++){
              for (let j = 0; j < grid.length; j++){
                grid[i][j].origX = grid[i][j].x;
              }
            }
          }
        } else {
          if (this.xAxis >= canv.width - this.w){
            this.inMotion = false;
            this.xAxis = canv.width - this.w;
          } else {
            this.xAxis += this.vel;
            if (this.xAxis == this.origX + this.w){
              this.inMotion = false;
              this.origX = this.xAxis;
              this.origY = this.yAxis;
            }
          }
        }
      }

      if (this.xdir == -1){
        if (!this.xMove){

          this.x -= this.vel;
          this.xAxis = canv.width / 2;

          for (let i = 0; i < grid.length; i++){
            for (let j = 0; j < grid.length; j++){
              grid[i][j].x += this.vel;
            }
          }

          if (this.x == this.origX - this.w){
            this.inMotion = false;
            this.origX = this.x;
            this.origY = this.y;

            for (let i = 0; i < grid.length; i++){
              for (let j = 0; j < grid.length; j++){
                grid[i][j].origX = grid[i][j].x;
              }
            }
          }
        } else {
          if (this.xAxis <= 0){
            this.inMotion = false;
            this.xAxis = 0;
          } else {
            this.xAxis -= this.vel;
            if (this.xAxis == this.origX - this.w){
              this.inMotion = false;
              this.origX = this.xAxis;
              this.origY = this.yAxis;
            }
          }
        }
      }

      if (this.ydir == 1){
        if (!this.yMove){
          this.y += this.vel;
          this.yAxis = canv.height / 2;

          for (let i = 0; i < grid.length; i++){
            for (let j = 0; j < grid.length; j++){
              grid[i][j].y -= this.vel;
            }
          }
          if (this.y == this.origY + this.w){
            this.inMotion = false;
            this.origX = this.x;
            this.origY = this.y;

            for (let i = 0; i < grid.length; i++){
              for (let j = 0; j < grid.length; j++){
                grid[i][j].origY = grid[i][j].y;
              }
            }
          }
        } else {
          if (this.yAxis >= canv.height - this.w){
            this.inMotion = false;
            this.yAxis = canv.height - this.w;
          } else {
            this.yAxis += this.vel;
            if (this.yAxis == this.origY + this.w){
              this.inMotion = false;
              this.origX = this.xAxis;
              this.origY = this.yAxis;
            }
          }

        }
      }

      if (this.ydir == -1){
        if (!this.yMove){

          this.y -= this.vel;
          this.yAxis = canv.height / 2;

          for (let i = 0; i < grid.length; i++){
            for (let j = 0; j < grid.length; j++){
              grid[i][j].y += this.vel;
            }
          }
          if (this.y == this.origY - this.w){
            this.inMotion = false;
            this.origX = this.x;
            this.origY = this.y;
            for (let i = 0; i < grid.length; i++){
              for (let j = 0; j < grid.length; j++){
                grid[i][j].origY = grid[i][j].y;
              }
            }
          }
        } else {
          if (this.yAxis <= 0){
            this.inMotion = false;
            this.yAxis = 0;
          } else {
            this.yAxis -= this.vel;
            if (this.yAxis == this.origY - this.w){
              this.inMotion = false;
              this.origX = this.xAxis;
              this.origY = this.yAxis;
            }
          }
        }
      }
    }
  }
}
