let canv = document.querySelector('canvas');
let ctx = canv.getContext('2d');
const player_sprite = document.getElementById('player');

let randomButton = document.getElementById('random');
let generateButton = document.getElementById('generate');
let print = document.getElementById('print');

let grass = [];

/* ---------------------------------------------- */

const grass0 = document.getElementById('grass0');
const grass1 = document.getElementById('grass1');
const grass2 = document.getElementById('grass2');
const grass3 = document.getElementById('grass3');
const grass4 = document.getElementById('grass4');

/* ---------------------------------------------- */

const gravel = document.getElementById('gravel');
const water = document.getElementById('water');

const brick_wall = document.getElementById('brick_wall');
const brick_wall_window = document.getElementById('brick_wall_window');

/* ---------------------------------------------- */

const CRcentreE = document.getElementById('centre_east');
const CRcentreN = document.getElementById('centre_north');
const CRcentreS = document.getElementById('centre_south');
const CRcentreW = document.getElementById('centre_west');

/* ---------------------------------------------- */

const CRcornerNE = document.getElementById('corner_ne');
const CRcornerNW = document.getElementById('corner_nw');
const CRcornerSE = document.getElementById('corner_se');
const CRcornerSW = document.getElementById('corner_sw');

/* ---------------------------------------------- */

let pg = document.getElementById('pgph');




grass.push(grass0, grass1, grass2, grass3, grass4);

let mousePressed = false;


function clear() {
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canv.width, canv.height)
}

function drawImage(image, dx, dy, dWidth, dHeight){
  ctx.drawImage(image, dx, dy, dWidth, dHeight);
}

function lerp(val1, val2, perc){
  return (val1 + ((val2 - val1) * perc));
}

function circle(x, y, r, c){
  ctx.beginPath();
  ctx.fillStyle = c;
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
}

function text(str, x, y, c){
  ctx.font = "30px Arial";
  ctx.fillStyle = c;
  ctx.fillText(str, x, y);
  ctx.stroke();
}

function rect(x, y, w, h, c){
  ctx.fillStyle = c;
  ctx.strokeStyle = '#888'
  ctx.rect(x, y, w, h);
  ctx.fill();
  ctx.stroke();
}

function getCssProperty(elmId, property){
   let elem = document.getElementById(elmId);
   return parseFloat(window.getComputedStyle(elem,null).getPropertyValue(property));
}

function onKeyPress(callback) {
  let keys = {},
      keysCount = 0,
      interval = null,
      trackedKeys = {
      87: true, // w
      83: true, // s
      65: true, // a
      68: true, // d
      37: true, // left arrow
      38: true, // up arrow
      39: true, // right arrow
      40: true // down arrow
  };

  window.onkeydown = e => {
    let code = e.which;

    if (trackedKeys[code]) {
      if (!keys[code]) {
        keys[code] = true;
        keysCount++;
      }



      if (interval === null) {
        interval = setInterval( () => {
          let direction = '';

          if (keys[87] || keys[38]) {
            direction = 'up';
          } else if (keys[83] || keys[40]) {
            direction = 'down';
          }


          if (keys[65] || keys[37]) {
            direction += 'left';
          } else if (keys[68] || keys[39]) {
            direction += 'right';
          }
          callback(direction);
        }, 1000 / 50);
      }
    }
  }

  window.onkeyup = e => {
    let code = e.which;

    if (keys[code]) {
      delete keys[code];
      keysCount--;
    }

    if ((trackedKeys[code]) && (keysCount === 0)) {
      clearInterval(interval);
      interval = null;
      callback('none');
    }
  }
}

let mouse = {
  x: null,
  y: null
}

document.addEventListener('mousedown', () => {
  mousePressed = true;
});

document.addEventListener('mouseup', () => {
  mousePressed = false;
});

document.addEventListener('mousemove', e => {
  mouse.x = e.x;
  mouse.y = e.y - 20;
});

randomButton.addEventListener('click', () => {
  randomMap();
  generateGridFromMap();
  playGame();
});

print.addEventListener('click', () => {
  printMap();
});

generate.addEventListener('click', () => {
  //editMap();
  generateGridFromEditor();
  playGame();
});
