
//Value for sprites:
/*
grass: 1


*/

let scl = canv.width / 10;
let amount = 20;

let map1 = [] //make map here
for (let i = 0; i < amount; i++){
  map1[i] = new Array();
  for (let j = 0; j < amount; j++){
    map1[i].push(1);
  }
}


let grid = [];
for (let i = 0; i < amount; i++){
  grid[i] = new Array();
  for (let j = 0; j < amount; j++){
    grid[i].push(new Box(i * (scl), j * (scl), i, j, map1[i][j]));
  }
}
