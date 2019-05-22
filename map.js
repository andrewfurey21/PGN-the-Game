

//Value for sprites:
/*
grass: 0
gravel: 1
brick_wall: 2
brick_wall_window 3

cmt roof centre e : 4
cmt roof centre n : 5
cmt roof centre s : 6
cmt roof centre w : 7

cmt roof corner ne : 8
cmt roof corner nw : 9
cmt roof corner se : 10
cmt roof corner sw : 11

water: 12




*/

let editorMode = true;

let max_amount = 13;

let scl = canv.width / 10;
// let amount = 300;
//

// let xAmount = 20;
// let yAmount = 20;

let pass = prompt('What is the developer key?');
if (pass != 'cathalfallonisanerd'){
  window.open("https://www.youtube.com/watch?v=nqs6wiHK99M","_self")
}


let xAmount = prompt('How many blocks along the x-axis (it begins to lag at around 250)');
let yAmount = prompt('How many blocks along the y-axis (it begins to lag at around 250)');

let map1 = [];
let editorMap = [];

let vel = 15;

let grid = [];

function randomMap() {
   //make map here
  editorMode = false;
  for (let i = 0; i < yAmount; i++){
    map1[i] = new Array();
    for (let j = 0; j < xAmount; j++){
      map1[i].push(Math.floor(Math.random() * max_amount));
    }
  }

}

function printMap() {
  let text = "[";
  for (let i = 0; i < editorMap.length; i++){
    for (let j = 0; j < editorMap[0].length; j++){
      map1[i][j] = editorMap[i][j].val;
    }
  }
  for (let i = 0; i < map1[0].length; i++){
    if (i == map1[0].length - 1){
      text += "[ " + map1[i].join(", ") + "]] <br>";
    } else {
      text += "[ " + map1[i].join(", ") + "], <br>";
    }
  }
  pg.innerHTML = text;
}




for (let i = 0; i < yAmount; i++){
  map1[i] = new Array();
  for (let j = 0; j < xAmount; j++){
    map1[i].push(0);
  }
}

for (let i = 0; i < yAmount; i++){
  editorMap[i] = new Array();
  for (let j = 0; j < xAmount; j++){
    //editorMap[i].push(new EditorBox(i * scl, j * scl, map[i][j]));

    let imgVal = map1[i][j];
    if (imgVal == 0){
      editorMap[i].push(new EditorBox(i * (scl), j * (scl), map1[i][j], grass[Math.floor(Math.random() * grass.length)]));
      /*===================================================================*/
    } else if (imgVal == 1){
      editorMap[i].push(new EditorBox(i * (scl), j * (scl), map1[i][j], gravel));
      /*===================================================================*/
    } else if (imgVal == 2){
      editorMap[i].push(new EditorBox(i * (scl), j * (scl), map1[i][j], brick_wall));
      /*===================================================================*/
    } else if (imgVal == 3){
      editorMap[i].push(new EditorBox(i * (scl), j * (scl), map1[i][j], brick_wall_window));
      /*===================================================================*/
    } else if (imgVal == 4){
      editorMap[i].push(new EditorBox(i * (scl), j * (scl), map1[i][j], centre_east));
      /*===================================================================*/
    } else if (imgVal == 5){
      editorMap[i].push(new EditorBox(i * (scl), j * (scl), map1[i][j], centre_north));
      /*===================================================================*/
    } else if (imgVal == 6){
      editorMap[i].push(new EditorBox(i * (scl), j * (scl), map1[i][j], centre_south));
      /*===================================================================*/
    }  else if (imgVal == 7){
      editorMap[i].push(new EditorBox(i * (scl), j * (scl), map1[i][j], centre_west));
      /*===================================================================*/
    } else if (imgVal == 8){
      editorMap[i].push(new EditorBox(i * (scl), j * (scl), map1[i][j], corner_ne));
      /*===================================================================*/
    } else if (imgVal == 9){
      editorMap[i].push(new EditorBox(i * (scl), j * (scl), map1[i][j], corner_nw));
      /*===================================================================*/
    } else if (imgVal == 10){
      editorMap[i].push(new EditorBox(i * (scl), j * (scl), map1[i][j], corner_se));
      /*===================================================================*/
    } else if (imgVal == 11){
      editorMap[i].push(new EditorBox(i * (scl), j * (scl), map1[i][j], corner_sw));
      /*===================================================================*/
    } else if (imgVal == 12){
      editorMap[i].push(new EditorBox(i * (scl), j * (scl), map1[i][j], water));
      /*===================================================================*/
    }

  }
}



editMap();

function editMap() {

  requestAnimationFrame(editMap);
  clear();
  for (let i = 0; i < editorMap.length; i++){
    for (let j = 0; j < editorMap[i].length; j++){
      if (editorMap[i][j].x >= -scl && editorMap[i][j].x <= canv.width && editorMap[i][j].y >= -scl && editorMap[i][j].y <= canv.height){

        drawImage(editorMap[i][j].img, editorMap[i][j].x, editorMap[i][j].y, scl, scl);
      }
    }
  }

  if (mousePressed && editorMode){
    mousePressed = false;
    for (let i = 0; i < editorMap.length; i++){
      for (let j = 0; j < editorMap[i].length; j++){
        if (mouse.x >= editorMap[i][j].x && mouse.x < editorMap[i][j].x + scl && mouse.y >= editorMap[i][j].y && mouse.y < editorMap[i][j].y + scl){
          //console.log(mouse.x, mouse.y, editorMap[i][j].x, editorMap[i][j].y)
          editorMap[i][j].val++;


          if (editorMap[i][j].val > max_amount - 1){
            editorMap[i][j].val = 0;
          }

          let imgVal = editorMap[i][j].val;
          if (imgVal == 0){
            //editorMap[i].push(new EditorBox(i * (scl), j * (scl), map1[i][j], grass[Math.floor(Math.random() * grass.length)]));
            editorMap[i][j].val = 0;
            editorMap[i][j].img = grass[Math.floor(Math.random() * grass.length)];
            /*===================================================================*/
          } else if (imgVal == 1){
            editorMap[i][j].val = 1;
            editorMap[i][j].img = gravel;
            //editorMap[i].push(new EditorBox(i * (scl), j * (scl), map1[i][j], gravel));
            /*===================================================================*/
          } else if (imgVal == 2){
            editorMap[i][j].val = 2;
            editorMap[i][j].img = brick_wall;
          //  editorMap[i].push(new EditorBox(i * (scl), j * (scl), map1[i][j], brick_wall));
            /*===================================================================*/
          } else if (imgVal == 3){
            editorMap[i][j].val = 3;
            editorMap[i][j].img = brick_wall_window;

            //editorMap[i].push(new EditorBox(i * (scl), j * (scl), map1[i][j], brick_wall_window));
            /*===================================================================*/
          } else if (imgVal == 4){
            editorMap[i][j].val = 4;
            editorMap[i][j].img = centre_east;
            //editorMap[i].push(new EditorBox(i * (scl), j * (scl), map1[i][j], centre_east));
            /*===================================================================*/
          } else if (imgVal == 5){
            editorMap[i][j].val = 5;
            editorMap[i][j].img = centre_north;
            //editorMap[i].push(new EditorBox(i * (scl), j * (scl), map1[i][j], centre_north));
            /*===================================================================*/
          } else if (imgVal == 6){
            editorMap[i][j].val = 6;
            editorMap[i][j].img = centre_south;
            //editorMap[i].push(new EditorBox(i * (scl), j * (scl), map1[i][j], centre_south));
            /*===================================================================*/
          }  else if (imgVal == 7){
            editorMap[i][j].val = 7;
            editorMap[i][j].img = centre_west;
            //editorMap[i].push(new EditorBox(i * (scl), j * (scl), map1[i][j], centre_west));
            /*===================================================================*/
          } else if (imgVal == 8){
            editorMap[i][j].val = 8;
            editorMap[i][j].img = corner_ne;
            //editorMap[i].push(new EditorBox(i * (scl), j * (scl), map1[i][j], corner_ne));
            /*===================================================================*/
          } else if (imgVal == 9){
            editorMap[i][j].val = 9;
            editorMap[i][j].img = corner_nw;
            //editorMap[i].push(new EditorBox(i * (scl), j * (scl), map1[i][j], corner_nw));
            /*===================================================================*/
          } else if (imgVal == 10){
            editorMap[i][j].val = 10;
            editorMap[i][j].img = corner_se;
            //editorMap[i].push(new EditorBox(i * (scl), j * (scl), map1[i][j], corner_se));
            /*===================================================================*/
          } else if (imgVal == 11){
            editorMap[i][j].val = 11;
            editorMap[i][j].img = corner_sw;
            //editorMap[i].push(new EditorBox(i * (scl), j * (scl), map1[i][j], corner_sw));
            /*===================================================================*/
          } else if (imgVal == 12){
            editorMap[i][j].val = 12;
            editorMap[i][j].img = water;
            //editorMap[i].push(new EditorBox(i * (scl), j * (scl), map1[i][j], water));
            /*===================================================================*/
          }
        }
      }
    }
  }



  if (!editorMode){
    cancelAnimationFrame(editMap);
  }
}



onKeyPress(dir => {
  if (editorMode){
    if (dir == 'up'){
      for (let i = 0; i < editorMap.length; i++){
        for (let j = 0; j < editorMap[i].length; j++){
          editorMap[i][j].y += vel;
        }
      }
    }

    if (dir == 'down'){
      for (let i = 0; i < editorMap.length; i++){
        for (let j = 0; j < editorMap[i].length; j++){
          editorMap[i][j].y -= vel;
        }
      }
    }

    if (dir == 'left'){
      for (let i = 0; i < editorMap.length; i++){
        for (let j = 0; j < editorMap[i].length; j++){
          editorMap[i][j].x += vel;
        }
      }
    }

    if (dir == 'right'){
      for (let i = 0; i < editorMap.length; i++){
        for (let j = 0; j < editorMap[i].length; j++){
          editorMap[i][j].x -= vel;
        }
      }
    }
  }
});



function generateGridFromMap() {
  editorMode = false;
  for (let i = 0; i < yAmount; i++){
    grid[i] = new Array();
    for (let j = 0; j < xAmount; j++){

      let imgVal = map1[i][j];
      if (imgVal == 0){
        grid[i].push(new Box(i * (scl), j * (scl), i, j, map1[i][j], grass[Math.floor(Math.random() * grass.length)]));
        /*===================================================================*/
      } else if (imgVal == 1){
        grid[i].push(new Box(i * (scl), j * (scl), i, j, map1[i][j], gravel));
        /*===================================================================*/
      } else if (imgVal == 2){
        grid[i].push(new Box(i * (scl), j * (scl), i, j, map1[i][j], brick_wall));
        /*===================================================================*/
      } else if (imgVal == 3){
        grid[i].push(new Box(i * (scl), j * (scl), i, j, map1[i][j], brick_wall_window));
        /*===================================================================*/
      } else if (imgVal == 4){
        grid[i].push(new Box(i * (scl), j * (scl), i, j, map1[i][j], centre_east));
        /*===================================================================*/
      } else if (imgVal == 5){
        grid[i].push(new Box(i * (scl), j * (scl), i, j, map1[i][j], centre_north));
        /*===================================================================*/
      } else if (imgVal == 6){
        grid[i].push(new Box(i * (scl), j * (scl), i, j, map1[i][j], centre_south));
        /*===================================================================*/
      }  else if (imgVal == 7){
        grid[i].push(new Box(i * (scl), j * (scl), i, j, map1[i][j], centre_west));
        /*===================================================================*/
      } else if (imgVal == 8){
        grid[i].push(new Box(i * (scl), j * (scl), i, j, map1[i][j], corner_ne));
        /*===================================================================*/
      } else if (imgVal == 9){
        grid[i].push(new Box(i * (scl), j * (scl), i, j, map1[i][j], corner_nw));
        /*===================================================================*/
      } else if (imgVal == 10){
        grid[i].push(new Box(i * (scl), j * (scl), i, j, map1[i][j], corner_se));
        /*===================================================================*/
      } else if (imgVal == 11){
        grid[i].push(new Box(i * (scl), j * (scl), i, j, map1[i][j], corner_sw));
        /*===================================================================*/
      } else if (imgVal == 12){
        grid[i].push(new Box(i * (scl), j * (scl), i, j, map1[i][j], water));
        /*===================================================================*/
      }
    }
  }
}

function generateGridFromEditor() {
  editorMode = false;
  for (let i = 0; i < yAmount; i++){
    grid[i] = new Array();
    for (let j = 0; j < xAmount; j++){

      let imgVal = map1[i][j];
      if (imgVal == 0){
        grid[i].push(new Box(i * (scl), j * (scl), i, j, editorMap[i][j].val, grass[Math.floor(Math.random() * grass.length)]));
        /*===================================================================*/
      } else if (imgVal == 1){
        grid[i].push(new Box(i * (scl), j * (scl), i, j, editorMap[i][j].val, gravel));
        /*===================================================================*/
      } else if (imgVal == 2){
        grid[i].push(new Box(i * (scl), j * (scl), i, j, editorMap[i][j].val, brick_wall));
        /*===================================================================*/
      } else if (imgVal == 3){
        grid[i].push(new Box(i * (scl), j * (scl), i, j, editorMap[i][j].val, brick_wall_window));
        /*===================================================================*/
      } else if (imgVal == 4){
        grid[i].push(new Box(i * (scl), j * (scl), i, j, editorMap[i][j].val, centre_east));
        /*===================================================================*/
      } else if (imgVal == 5){
        grid[i].push(new Box(i * (scl), j * (scl), i, j, editorMap[i][j].val, centre_north));
        /*===================================================================*/
      } else if (imgVal == 6){
        grid[i].push(new Box(i * (scl), j * (scl), i, j, editorMap[i][j].val, centre_south));
        /*===================================================================*/
      }  else if (imgVal == 7){
        grid[i].push(new Box(i * (scl), j * (scl), i, j, editorMap[i][j].val, centre_west));
        /*===================================================================*/
      } else if (imgVal == 8){
        grid[i].push(new Box(i * (scl), j * (scl), i, j, editorMap[i][j].val, corner_ne));
        /*===================================================================*/
      } else if (imgVal == 9){
        grid[i].push(new Box(i * (scl), j * (scl), i, j, editorMap[i][j].val, corner_nw));
        /*===================================================================*/
      } else if (imgVal == 10){
        grid[i].push(new Box(i * (scl), j * (scl), i, j, editorMap[i][j].val, corner_se));
        /*===================================================================*/
      } else if (imgVal == 11){
        grid[i].push(new Box(i * (scl), j * (scl), i, j, editorMap[i][j].val, corner_sw));
        /*===================================================================*/
      } else if (imgVal == 12){
        grid[i].push(new Box(i * (scl), j * (scl), i, j, editorMap[i][j].val, water));
        /*===================================================================*/
      }
    }
  }
}
