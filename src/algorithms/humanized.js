var ret = [];

//i is used for rows, j is used for columns, k is used for the range of numbers in a sudoku

export function humanized(grid) {
  return hInitialize(grid);
}

//translated from my C algorithm, due for an update for javascript
function hInitialize(grid) {

  var puzzle =  [...Array(9)].map(e => Array(9));

  for(let i = 0; i < 9; i++) {
    for(let j = 0; j < 9; j++) {

      puzzle[i][j] = Square(i, j, grid[i][j]);

      if(puzzle[i][j].number !== 0) {//set anything with a number to have no possible numbers
        puzzle[i][j].possibleNumbers = [];
      }

    }
  }

  puzzle = hSolve(puzzle);
  console.log(puzzle);
  return puzzle;
}

function hSolve(puzzle) {

  for(let i = 0; i < 9; i++) {//update possibleNumbers once, then do it on every change to puzzle
    for(let j = 0; j < 9; j++) {
      puzzle = updatePosibilities(puzzle, i, j);
    }
  }


  var complete = false;
  var failSafe = 0;

  while(complete === false) {

    for(let i = 0; i < 9; i++) {
      for(let j = 0; j < 9; j++) {

        if(checkOnlyOption(puzzle[i][j]) > -1) {
          console.log("Single option");
          console.log("@ " +i +", "+j);
          console.log(puzzle[i][j]);
          console.log(puzzle[0][8]);
          puzzle[i][j].number = checkOnlyOption(puzzle[i][j]);
          puzzle = updateAround(puzzle, i, j);
        }

        puzzle = noOtherPosibilities(puzzle, i, j);//updateAround triggers in this function on its own as well

        if(i===0&&j===7){

          console.log(puzzle);
        }

      }
    }

    if(isComplete(puzzle) === true){
      complete = true;
    }
    else {
      failSafe ++;
      if(failSafe === 100){
        console.log("Killed");
        complete = true;
      }
    }


  }

  return puzzle;

}


//might be redundant and slower than updating whenever there is a change, will leave in for initializing
function updatePosibilities(puzzle, row, col) {

  //console.log("Before update: ");
  //console.log(puzzle[row][col]);

  if(isEmpty(puzzle[row][col]) === true) {//if empty check if any posssible numbers to eliminate
    //console.log("Empty square");
    for(let i = 0; i < 9; i++) {//check all affecting squares in row
      if(isEmpty(puzzle[i][col]) === false) {//if there is a number in the square
        puzzle[row][col].possibleNumbers = removeElement(puzzle[row][col].possibleNumbers, puzzle[i][col].number);
      }
    }

    for(let j = 0; j < 9; j++) {//check all affecting squares in column
      if(isEmpty(puzzle[row][j]) === false) {//if there is a number in the square
        puzzle[row][col].possibleNumbers = removeElement(puzzle[row][col].possibleNumbers, puzzle[row][j].number);
      }
    }

    const sqRow = Math.floor(row/3)*3;
    const sqCol = Math.floor(col/3)*3;

    for(let i = 0; i < 3; i++) {//check all affecting squares in 3x3 square
      for(let j = 0; j < 3; j++) {
        if(isEmpty(puzzle[ i+sqRow ][ j+sqCol ]) === false) {//if there is a number in the square
          puzzle[row][col].possibleNumbers = removeElement(puzzle[row][col].possibleNumbers, puzzle[ i+sqRow ][ j+sqCol ].number);
        }
      }
    }

  }

  //console.log("After update: ");
  //console.log(puzzle[row][col]);


  return puzzle;

}


//check each number for single possiblities
//where no other square in the row/col/square can be that number so it must be that number
function noOtherPosibilities(puzzle, row, col) {

  for(let posNum = 0; posNum < puzzle[row][col].possibleNumbers.length; posNum++) {
    const posibility = puzzle[row][col].possibleNumbers[posNum];//for each posibility

    var count = 0;

    for(let r = 0; r < 9; r++) {
//      console.log("@ " +r +", "+col);
//      console.log(posibility);
//      console.log(puzzle[r][col].number);
//      console.log(puzzle[r][col].possibleNumbers);

      if(puzzle[r][col].possibleNumbers.includes(posibility)) {
        count++;
      }




      if(puzzle[r][col].number === posibility) {//redundant, take out
        count = 100;
        console.log("already taken");
      }

    }

    if(count === 1 && puzzle[row][col].number === 0){
      puzzle[row][col].number = posibility;
      puzzle[row][col].possibleNumbers = [];
      console.log(puzzle[row][col].number);
      puzzle = updateAround(puzzle, row, col);
      console.log("noOtherPosibilities(row)");
      console.log("@ " +row +", "+col);
      console.log(posibility);
      console.log(puzzle[row][col].number);
      console.log(puzzle);
      return puzzle;
    }

    if(count < 100) {
      count = 0;
    }



    for(let c = 0; c < 9; c++) {
      if(puzzle[row][c].possibleNumbers.includes(posibility)) {
        count++;
      }
      if(puzzle[row][c].number === posibility) {
        count = 100;
      }
    }

    if(count === 1 && puzzle[row][col].number === 0){
      puzzle[row][col].number = posibility;
      puzzle[row][col].possibleNumbers = [];
      puzzle = updateAround(puzzle, row, col);
      //console.log("noOtherPosibilities(col)");
    //  console.log("@ " +row +", "+col);
    //  console.log(puzzle[row][col]);
      return puzzle;
    }

    if(count < 100) {
      count = 0;
    }

    const sqRow = Math.floor(row/3)*3;
    const sqCol = Math.floor(col/3)*3;

    for(let r = 0; r < 3; r++) {
      for(let c = 0; c < 3; c++) {
        if(puzzle[r+sqRow][c+sqCol].possibleNumbers.includes(posibility)) {
          count++;
        }
        if(puzzle[r+sqRow][c+sqCol].number === posibility) {
          count = 100;
        }
      }
    }

    if(count === 1 && puzzle[row][col].number === 0){
      puzzle[row][col].number = posibility;
      puzzle[row][col].possibleNumbers = [];
      puzzle = updateAround(puzzle, row, col);
    //  console.log("noOtherPosibilities(sqr)");
    //  console.log("@ " +row +", "+col);
    //  console.log(puzzle[row][col]);
      return puzzle;
    }

    if(count < 100) {
      count = 0;
    }
    return puzzle;

  }

    /*for(let r = 0; r < 9; r++) {//check rows if there is no other option for this posibility
      if((puzzle[r][col].possibleNumbers.includes(posibility) && r !== row) || puzzle[r][col].number === posibility) {
        r = 10;
      }
      else if(r === 8) {
        puzzle[row][col].number = posibility;
        puzzle = updateAround(puzzle, row, col);
        return puzzle;
      }
    }

    for(let c = 0; c < 9; c++) {//check columns if there is no other option for this posibility
      if((puzzle[row][c].possibleNumbers.includes(posibility) && c !== col) || puzzle[row][c].number === posibility) {
        c = 10;
      }
      else if(c === 8){
        puzzle[row][col].number = posibility;
        puzzle = updateAround(puzzle, row, col);
        return puzzle;
      }
    }

    const sqRow = Math.floor(row/3)*3;
    const sqCol = Math.floor(col/3)*3;

    for(let r = 0; r < 3; r++) {//check all affecting squares in 3x3 square
      for(let c = 0; c < 3; c++) {
        console.log("hi")
        console.log(r+sqRow);
        if((puzzle[r+sqRow][c+sqCol].possibleNumbers.includes(posibility) && (c+sqCol !== col && r+sqRow !== row)) || puzzle[r+sqRow][c+sqCol].number === posibility){
          r = 4;
          c = 4;
        }
        else if(r === 2 && c === 2) {
          puzzle[row][col].number = posibility;
          puzzle = updateAround(puzzle, row, col);
          return puzzle;
        }
      }
    }*/


  return puzzle;

}

//used when square gets new value
function updateAround(puzzle, row, col) {

  if(isEmpty(puzzle[row][col]) === false) {//if there is a number in the square

    for(let rowCol = 0; rowCol < 9; rowCol++) {
      puzzle[row][rowCol].possibleNumbers = removeElement(puzzle[row][rowCol].possibleNumbers, puzzle[row][col].number);
      puzzle[rowCol][col].possibleNumbers = removeElement(puzzle[rowCol][col].possibleNumbers, puzzle[row][col].number);
    }

  }

  return puzzle;

}

function checkOnlyOption(square) {

  if(isEmpty(square) === false){
    return -1;
  }
  if(square.possibleNumbers.length === 1) {
    return square.possibleNumbers[0];
  }
  return -1;

}

function removeElement(array, element) {

  var index = array.indexOf(element);
  if(index > -1) {
    array.splice(index, 1);
  }

  return array;
}

function isEmpty(square){
  if(square.number === 0) {
    return true;
  }
  return false;
}

function isComplete(puzzle) {
  for(let i = 0; i < 9; i++) {
    for( let j = 0; j < 9; j++) {
      if(puzzle[i][j].number === 0){
        return false;
      }
    }
  }

  return true;
}

function Square(row, col, num) {
  const obj = {};
  obj.number = num;
  obj.row = row;
  obj.col = col;
  obj.possibleNumbers = [1,2,3,4,5,6,7,8,9];
  return obj;
}
