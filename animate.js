let player = new Player(0, 0, scl)

animate();

function animate(){
  requestAnimationFrame(animate);
  clear();
  for (let i = 0; i < grid.length; i++){
    for (let j = 0; j < grid[i].length; j++){
        if (grid[i][j].val == 1){
          drawImage(grass, grid[i][j].x, grid[i][j].y, scl, scl);
        }
      }
    }
  player.show();
  player.move();
}


onKeyPress(dir => {
  if (dir == 'up'){
    player.callDirection(0, -1);
  }

  if (dir == 'down'){
    player.callDirection(0, 1);
  }

  if (dir == 'left'){
    player.callDirection(-1, 0);
  }

  if (dir == 'right'){
    player.callDirection(1, 0);
  }
});



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
