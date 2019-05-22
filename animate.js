function playGame() {
  let player = new Player(scl);
  player.correctPosition(0, 0, grid);




  animate();
  function animate(){
    requestAnimationFrame(animate);
    clear();
    for (let i = 0; i < grid.length; i++){
      for (let j = 0; j < grid[i].length; j++){
        if (grid[i][j].x >= -scl && grid[i][j].x <= canv.width && grid[i][j].y >= -scl && grid[i][j].y <= canv.height)
          drawImage(grid[i][j].img, grid[i][j].x, grid[i][j].y, scl, scl);
        }
      }
    player.show();
    player.move();
  }


  onKeyPress(dir => {
    if (!editorMode){
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
    }
  });

}

