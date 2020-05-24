import React, {Component} from 'react';
import Node from './Node/Node';
import {backtrack} from '../algorithms/backtrack';
import {humanized} from '../algorithms/humanized';

import './SudokuSolver.css';

const DEFAULT = [
  [5,3,0, 0,7,0, 0,0,0],
  [6,0,0, 1,9,5, 0,0,0],
  [0,9,8, 0,0,0, 0,6,0],

  [8,0,0, 0,6,0, 0,0,3],
  [4,0,0, 8,0,3, 0,0,1],
  [7,0,0, 0,2,0, 0,0,6],

  [0,6,0, 0,0,0, 2,8,0],
  [0,0,0, 4,1,9, 0,0,5],
  [0,0,0, 0,8,0, 0,7,9]
];

export default class SudokuSolver extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [],
    };
  }

  componentDidMount() {
    const grid = getInitialGrid();
    this.setState({grid});

    this.updateGrid();
  }



  updateGrid() {
    const {grid} = this.state;
    var table = document.getElementById('mainTable');

    for(let row = 0; row < table.rows.length; row++){
      for(let col = 0; col < table.rows[row].cells.length; col++){
        table.rows[row].cells[col].innerHTML = grid[row][col];
      }
    }
    console.log("udpategrid");
    console.log(this.state);
  }

  fillDefault() {
    var table = document.getElementById('mainTable');

    for(let row = 0; row < table.rows.length; row++){
      for(let col = 0; col < table.rows[row].cells.length; col++){

        var defaultVal = '';
        if(DEFAULT[row][col] !== 0){
          defaultVal = DEFAULT[row][col];
        }

        table.rows[row].cells[col].innerHTML = defaultVal;
      }
    }
  }


  clear() {
    var table = document.getElementById('mainTable');

    for(let row = 0; row < table.rows.length; row++){
      for(let col = 0; col < table.rows[row].cells.length; col++){
        table.rows[row].cells[col].innerHTML = '';
        document.getElementById(`node-${row}-${col}`).className = '';
      }
    }
  }



  b() {
    var grid = this.getInputGrid();

    var actions = backtrack(grid);
    console.log(actions);
    console.log("LENGTH:"+actions.length);

    this.displayActions(actions);

  }

  h() {
    var grid = this.getInputGrid();

    var actions = humanized(grid);

    this.dA(actions);
  }



  getInputGrid() {
    var grid = [];


    var table = document.getElementById('mainTable');
    for(let row = 0; row < table.rows.length; row++){

      grid[row] = [];

      for(let col = 0; col < table.rows[row].cells.length; col++){

        var input =  table.rows[row].cells[col].innerHTML;
        input = input.charAt(0);

        if( input === "1" || input === "2" || input === "3" || input === "4" || input === "5" || input === "6" || input === "7" || input === "8" || input === "9" ){
          grid[row][col] = parseInt(input, 10);
        }
        else{
          grid[row][col] = 0;
        }

        // if( grid[row][col] !== 0 ){
        //   document.getElementById(`node-${row}-${col}`).className =
        //     'node-visited';
        // }

      }
    }

    return grid;
  }

  displayActions(actions) {

  //  var oldRow = -1;
  //  var oldCol = -1;

    for(let i = 0; i < actions.length; i++){
      setTimeout(() => {

      //  console.log(actions[i]);

        if(actions[i].action === "add") {
          document.getElementById(`node-${actions[i].row}-${actions[i].col}`).className = 'node-good';
          document.getElementById(`node-${actions[i].row}-${actions[i].col}`).innerHTML = actions[i].val;
        }
        else {
          document.getElementById(`node-${actions[i].row}-${actions[i].col}`).className = 'node-bad';
        }
        //document.getElementById(`node-${node.row}-${node.col}`).className = 'node-selected';

        /*if(oldRow >= 0 && oldRow < 9 && oldCol >= 0 && oldCol < 9){
          document.getElementById(`node-${oldRow}-${oldCol}`).className = '';
        }
        oldRow = actions[i].row;
        oldCol = actions[i].col;*/
      }, 100 * i)

    }





  }

  dA(actions) {
    for(let i = 0; i < 9; i++) {
      for(let j = 0; j < 9; j++) {
        document.getElementById(`node-${i}-${j}`).innerHTML = actions[i][j].number;
      }
    }
  }

  visualizeSudoku() {
    var grid = [];

    console.log("pressed");

    var table = document.getElementById('mainTable');
    for(let row = 0; row < table.rows.length; row++){

      grid[row] = [];

      for(let col = 0; col < table.rows[row].cells.length; col++){

        var input =  table.rows[row].cells[col].innerHTML;
        input = input.charAt(0);

        if( input === "1" || input === "2" || input === "3" || input === "4" || input === "5" || input === "6" || input === "7" || input === "8" || input === "9" ){
          grid[row][col] = input;
        }
        else{
          grid[row][col] = 0;
        }

        // if( grid[row][col] !== 0 ){
        //   document.getElementById(`node-${row}-${col}`).className =
        //     'node-visited';
        // }

      }
    }

    //send grid to visualization function
    //backtrack(grid);


    for( let row = 0; row < 9; row++ ){

      var oldRow = -1;
      var oldCol = -1;

      setTimeout(() => {

        for( let col = 0; col < 9; col++ ){

          setTimeout(() => {

            document.getElementById(`node-${row}-${col}`).className = 'node-selected';
            //document.getElementById(`node-${node.row}-${node.col}`).className = 'node-selected';

            if(oldRow >= 0 && oldRow < 9 && oldCol >= 0 && oldCol < 9){
              document.getElementById(`node-${oldRow}-${oldCol}`).className = '';
            }
            oldRow = row;
            oldCol = col;

          }, 100 * col)


        }

      }, 1000 * row)


    }

    console.log(grid);

  }







  render() {
    const {grid} = this.state;
    //console.log(grid);

    return (
      <div  className="grid">
        <table id='mainTable'>
          <tbody>
            {grid.map((row, rowIdx) => {
              return (
                <tr key={rowIdx}>
                  {row.map((node, nodeIdx) => {
                    const {row, col} = node;
                    const displayVal = grid[rowIdx][nodeIdx].val;
                    return(
                      <Node
                        key={nodeIdx}
                        row={row}
                        col={col}
                        val={displayVal}></Node>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <button onClick={() => this.visualizeSudoku()}>Solve!</button>
        <button onClick={() => this.fillDefault()}>Sample Puzzle</button>
        <button onClick={() => this.clear()}>Clear Grid</button>
        <button onClick={() => this.b()}>Backtrack</button>
        <button onClick={() => this.h()}>Humanized</button>
      </div>

    );
  }
}

const getInitialGrid = () => {
  const grid = [];

  for(let row = 0; row < 9; row++) {

    const currentRow = [];

    for(let col = 0; col < 9; col++) {

      var defaultVal = '';
      if(DEFAULT[row][col] !== 0){
        defaultVal = DEFAULT[row][col];
      }

      currentRow.push(createNode(col, row, defaultVal))

    }

    grid.push(currentRow);

  }

  return grid;

}

const createNode = (col, row, val) => {
  return {
    col,
    row,
    val: val,
  }
}
