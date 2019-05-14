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

window.onkeydown = e => {
     e.preventDefault();

     if(e.keyCode == 37 || e.keyCode == 65) player.callDirection(-1, 0);
     if(e.keyCode == 38 || e.keyCode == 87) player.callDirection(0, -1);
     if(e.keyCode == 39 || e.keyCode == 68) player.callDirection(1, 0);
     if(e.keyCode == 40 || e.keyCode == 83) player.callDirection(0, 1);
 };
