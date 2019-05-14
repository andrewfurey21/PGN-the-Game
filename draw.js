let canv = document.querySelector('canvas');
let ctx = canv.getContext('2d');

const grass = document.getElementById('grass');
const player_sprite = document.getElementById('player');

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
