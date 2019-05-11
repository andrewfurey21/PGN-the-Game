let canv = document.querySelector('canvas');
let ctx = canv.getContext('2d');



const grass1 = document.getElementById('grass1');

const player_sprite = document.getElementById('player');
console.log(player_sprite)

/*
possibly add an array of similar sprites for more randomness in the background

grass1 = 1: grass block sprite
*/

let scl = 1;

// let map1 = [[1, 1], [1, 1]];

let map1 = [];

let amount = 40;

let player_w = 32;

for (let i = 0; i < amount; i++){
  map1[i] = new Array();
  for (let j = 0; j < amount; j++){
    map1[i].push(1);
  }
}

let vel = 5;

class Box {
  constructor(x, y, i, j, val){
    this.x = x;
    this.y = y;
    this.i = i;
    this.j = j;
    this.val = val;

    this.origX = this.x;
    this.origY = this.y;

    // this.img = img;

    this.cx = this.x + (scl / 2);
    this.cy = this.y + (scl / 2);
  }
}

let grid = [];
for (let i = 0; i < map1.length; i++){
  grid[i] = new Array();
  for (let j = 0; j < map1[i].length; j++){
    grid[i].push(new Box(i * (grass1.naturalWidth), j * (grass1.naturalHeight), i, j, map1[i][j]));
  }
}

function drawImg(image, dx, dy, dWidth, dHeight){
  ctx.drawImage(image, dx, dy, dWidth, dHeight);
}

class Player {
  constructor(x, y, w) {
    this.x = x;
    this.y = y;
    this.w = w;

    this.yAxis = grid[0][0].y;
    this.xAxis = grid[0][0].x;

    this.yMove = false;
    this.xMove = false;
  }

  show() {

    if (Math.abs(grid[0][0].x) + canv.width / 2 <= (canv.width / 2) + 100){
      if (grid[0][0].x > -100 && this.xAxis == canv.width / 2){
        // it is possible to move around x axis
        this.xMove = true;
      } else if (this.xAxis >= canv.width / 2){
        this.xMove = false;
      }
    } else {
      if (grid[grid.length - 1][grid[0].length - 1].x < canv.width && this.xAxis == canv.width / 2){
        // it is possible to move around x axis
        this.xMove = true;
      } else if (this.xAxis <= canv.width / 2){
        this.xMove = false;
      }
    }

    if (Math.abs(grid[0][0].y) + canv.height / 2 <= (canv.height / 2) + 100){
      if (grid[0][0].y > -100 && this.yAxis == canv.height / 2){
        // it is possible to move around x axis
        this.yMove = true;
      } else if (this.yAxis >= canv.width / 2){
        this.yMove = false;
      }
    } else {
      if (grid[grid.length - 1][grid[0].length - 1].y < canv.height && this.yAxis == canv.height / 2){
        // it is possible to move around x axis
        this.yMove = true;
      } else if (this.yAxis <= canv.width / 2){
        this.yMove = false;
      }
    }

    if (this.xAxis <= 0){
      this.xAxis = 0;
    }

    if (this.xAxis >= canv.width - this.w){
      this.xAxis = canv.width - this.w;
    }

    if (this.yAxis <= 0){
      this.yAxis = 0;
    }

    if (this.yAxis >= canv.height - this.w){
      this.yAxis = canv.height - this.w;
    }

    //rct(this.xAxis, this.yAxis, this.w, this.w, '#ff00f0');
    drawImg(player_sprite, this.xAxis, this.yAxis, this.w, this.w);

  }
}

let p = new Player(0, 0, player_w);

function rct(x, y, w, h, c){
  ctx.fillStyle = c;
  ctx.fillRect(x, y, w, h);
}
//
// console.log(grass1.naturalWidth);
// console.log(player_sprite.naturalWidth);


animate();

function animate() {
  requestAnimationFrame(animate);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canv.width, canv.height);

  for (let i = 0; i < grid.length; i++){
    for (let j = 0; j < grid[i].length; j++){
      grid[i][j].x = -p.x + grid[i][j].origX;
      grid[i][j].y = -p.y + grid[i][j].origY;
      if (grid[i][j].x >= -1 * (grass1.naturalWidth * 2) && grid[i][j].x <= canv.width && grid[i][j].y >= -1 * (grass1.naturalHeight * 2) && grid[i][j].y <= canv.height){
        if (grid[i][j].val == 1){
          drawImg(grass1, grid[i][j].x, grid[i][j].y, grass1.naturalWidth, grass1.naturalHeight);
        }
      }
    }
  }
  p.show();
}

onKeyPress((keyString) => {
  if (keyString != 'none'){
    switch (keyString) {
      case 'Up':
        if (p.yMove){
          p.yAxis -= vel;
        } else {
          p.y -= vel;
          p.yAxis = canv.width / 2;
          p.yAxis = canv.height / 2;
        }
        break;
      case 'Down':
        if (p.yMove){
          p.yAxis += vel;
        } else {
          p.y += vel;
          p.yAxis = canv.width / 2;
          p.yAxis = canv.height / 2;
        }
        break;
      case 'Left':
        if (p.xMove){
          p.xAxis -= vel;
        }  else {
          p.x -= vel;
          p.xAxis = canv.width / 2;
          p.xAxis = canv.height / 2;
        }
        break;
      case 'Right':
        if (p.xMove){
          p.xAxis += vel;
        } else {
          p.x += vel;
          p.xAxis = canv.width / 2;
          p.xAxis = canv.height / 2;
        }
        break;
    }
  }
})


function onKeyPress(callback) {
    var keys = {},
        keysCount = 0,
        interval = null,
        trackedKeys = {
            119: true, // W
            87: true, // w
            115: true, // S
            83: true, // s
            97: true, // A
            65: true, // a
            100: true, // D
            68: true, // d
            37: true, // left arrow
            38: true, // up arrow
            39: true, // right arrow
            40: true // down arrow
        };

    document.addEventListener('keydown', function (event) {
        var code = event.which;

         if (trackedKeys[code]) {
            if (!keys[code]) {
                keys[code] = true;
                keysCount++;
            }

            if (interval === null) {
                interval = setInterval(function () {
                    var direction = '';

                    // check if north or south
                    if (keys[119] || keys[87] || keys[38]) {
                        direction = 'Up';
                        //console.log('Up');
                    } else if (keys[115] || keys[83] || keys[40]) {
                        direction = 'Down';
                        //console.log('Down');
                    }

                    // concat west or east
                    if (keys[97] || keys[65] || keys[37]) {
                        direction += 'Left';
                    } else if (keys[100] || keys[68] || keys[39]) {
                        direction += 'Right';
                    }

                    callback(direction);
                }, 1000 / 50);
            }
        }
    });

    document.addEventListener('keyup', (event) => {
        let code = event.which;

        if (keys[code]) {
            delete keys[code];
            keysCount--;
        }

        // need to check if keyboard movement stopped
        if ((trackedKeys[code]) && (keysCount === 0)) {
            clearInterval(interval);
            interval = null;
            callback('none');
        }
    });
}
