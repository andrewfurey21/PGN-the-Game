class Player {
  constructor(w) {
    this.x = 0;
    this.y = 0;
    this.w = w;

    this.inMotion = false;

    this.vel = 4;

    this.availableBlocks = [0, 1];

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

  correctPosition(xBlock, yBlock, grid) {

    if (xBlock > grid.length - 1){
      console.error('The xBlock (argument 0) is greater than the total width of the map');
      return;
    } else if (yBlock > grid[0].length - 1){
      console.error('The yBlock (argument 1) is greater than the total height of the map');
      return;
    } else {
      if (xBlock <= (canv.width / 2) / this.w){
        this.xAxis = xBlock * this.w;
      } else if (xBlock >= (grid.length - ((canv.width / 2) / this.w))){
        let inbetween = grid.length - (canv.width / scl);
        let pos = (canv.width / scl - 1) - (grid.length - xBlock - 1);
        this.xAxis = pos * scl;
        for (let i = 0; i < grid.length; i++){
          for (let j = 0; j < grid[i].length; j++){
            grid[i][j].x -= inbetween * scl;
          }
        }
      } else {
        this.xAxis = canv.width / 2;
        for (let i = 0; i < grid.length; i++){
          for (let j = 0; j < grid[i].length; j++){
            //grid[i][j].x -= (Math.floor((xBlock - 1) / 2) * scl);
            grid[i][j].x -= (xBlock - ((canv.width / scl) / 2)) * scl
          }
        }
      }

      if (yBlock <= (canv.height / 2) / this.w){
        this.yAxis = yBlock * this.w;
      } else if (yBlock >= (grid[0].length - ((canv.height / 2) / this.w))){
        let inbetween = grid[0].length - (canv.height / scl);
        let pos = (canv.height / scl - 1) - (grid[0].length - yBlock - 1);
        this.yAxis = pos * scl;
        for (let i = 0; i < grid.length; i++){
          for (let j = 0; j < grid[i].length; j++){
            grid[i][j].y -= inbetween * scl;
          }
        }
      } else {
        this.yAxis = canv.height / 2;
        for (let i = 0; i < grid.length; i++){
          for (let j = 0; j < grid[i].length; j++){
            grid[i][j].y -= (yBlock - ((canv.height / scl) / 2)) * scl
          }
        }
      }
    }
  }

  //passing in the block that your moving to
  checkBlock(block, xdir, ydir) {
    let fails = 0;
    if (xdir == 1){
      for (let i = 0; i < this.availableBlocks.length; i++){
        if (this.xAxis + this.w == block.x && block.val != this.availableBlocks[i]){
          fails++;
        }
      }
    } else if (xdir == -1){
      for (let i = 0; i < this.availableBlocks.length; i++){
        if (this.xAxis - this.w == block.x && block.val != this.availableBlocks[i]){
          fails++;
        }
      }
    } else if (ydir == 1){
      for (let i = 0; i < this.availableBlocks.length; i++){
        if (this.yAxis - this.w == block.y && block.val != this.availableBlocks[i]){
          fails++;
        }
      }
    } else if (ydir == -1){
      for (let i = 0; i < this.availableBlocks.length; i++){
        if (this.yAxis - this.w == block.y && block.val != this.availableBlocks[i]){
          fails++;
        }
      }
    }

    if (fails > 0){
      return false;
    } else {
      return true;
    }
  }
}
