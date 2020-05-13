var ret = [];

export function backtrack(grid) {
  ret = [];
  backtrackRec(grid);
  return ret;
}

function backtrackRec(grid) {

  for(let i = 0; i < 9; i++ ) {
    for(let j = 0; j < 9; j++) {

      if( grid[i][j] === 0 ){

        for(let n = 1; n < 10; n++) {

          if(validate(grid, i, j, n)) {
            grid[i][j] = n;
            ret.push(createMove(i,j,n,'add'));
            if(backtrackRec(grid)){
              return true;
            }
            grid[i][j] = 0;
            ret.push(createMove(i,j,n,'sub'));
          }
        }

        return false;

      }
    }
  }

  console.log(grid);
  return true;

}

function createMove(i, j, n, action) {
  return {
    row: i,
    col: j,
    val: n,
    action: action,
  }
}

function validate(grid, row, col, val) {

  if(grid[row][col] > 0){
    return false;
  }

  for(let i = 0; i < 9; i++) {
    if(grid[row][i] === val) {
      return false;
    }
  }

  for(let i = 0; i < 9; i++) {
    if(grid[i][col] === val) {
      return false;
    }
  }

  const sqRow = Math.floor(row/3)*3;
  const sqCol = Math.floor(col/3)*3;

  for(let i = 0; i < 3; i++){
    for(let j = 0; j < 3; j++){
      if(grid[sqRow+i][sqCol+j] === val){
        return false;
      }
    }
  }

  return true;

}
