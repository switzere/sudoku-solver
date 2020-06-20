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

    this.whiteGrid();

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



  backtrack() {
    var grid = this.getInputGrid();

    var actions = backtrack(grid);
    console.log(actions);
    console.log("LENGTH:"+actions.length);

    this.displayActions(actions);

  }

  humanized() {


    var grid = this.getInputGrid();

    console.log(grid);
    var actions = humanized(grid);
    console.log(actions);
    console.log("LENGTH:"+actions.length);

    this.displayActions(actions);


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

  getEl(i, actions) {
    return document.getElementById(`node-${actions[i].row}-${actions[i].col}`);
  }

  displayActions(actions) {

    this.whiteGrid();

    document.getElementById('humanized').disabled = true;
    document.getElementById('backtrack').disabled = true;
    document.getElementById('clear').disabled = true;
    document.getElementById('sample').disabled = true;

    document.getElementById('humanized').className = 'offButton';
    document.getElementById('backtrack').className = 'offButton';
    document.getElementById('clear').className = 'offButton';
    document.getElementById('sample').className = 'offButton';


  //  var oldRow = -1;
  //  var oldCol = -1;

    for(let i = 0; i < actions.length; i++){
      setTimeout(() => {

      //  console.log(actions[i]);

        switch(actions[i].action) {
          case 'add':
            this.getEl(i, actions).className = 'node-good';
            this.getEl(i, actions).innerHTML = actions[i].val;
            break;
          case 'sub':
            this.getEl(i, actions).className = 'node-bad';
            break;
          case 'onePos':
            this.whiteGrid();
            this.highlightCol(i, actions);
            this.highlightRow(i, actions);
            this.highlightSqr(i, actions);
            this.getEl(i, actions).className = 'node-good';
            this.getEl(i, actions).innerHTML = actions[i].val;
            break;
          case 'rOnly':
            this.whiteGrid();
            this.highlightCol(i, actions);
            this.getEl(i, actions).className = 'node-good';
            this.getEl(i, actions).innerHTML = actions[i].val;
            break;
          case 'cOnly':
            this.whiteGrid();
            this.highlightRow(i, actions);
            this.getEl(i, actions).className = 'node-good';
            this.getEl(i, actions).innerHTML = actions[i].val;
            break;
          case 'sOnly':
            this.whiteGrid();
            this.highlightSqr(i, actions);
            this.getEl(i, actions).className = 'node-good';
            this.getEl(i, actions).innerHTML = actions[i].val;
            break;
        }

        if(i === actions.length - 1){
          document.getElementById('humanized').disabled = false;
          document.getElementById('backtrack').disabled = false;
          document.getElementById('clear').disabled = false;
          document.getElementById('sample').disabled = false;

          document.getElementById('humanized').className = 'runButton';
          document.getElementById('backtrack').className = 'runButton';
          document.getElementById('clear').className = 'runButton';
          document.getElementById('sample').className = 'runButton';

          if( this.isFull() === 1 ) {
            this.greenGrid();
          }
          else {
            this.redGrid();
          }
        }

      }, 500 * i)

    }


    /*setTimeout(() => {
      this.whiteGrid();
    }, 500 * actions.length+20)*/



  }

  whiteGrid() {
    for(let i = 0; i < 9; i++) {
      for(let j = 0; j < 9; j++) {
        document.getElementById(`node-${i}-${j}`).className = '';
      }
    }
  }

  greenGrid() {
    for(let i = 0; i < 9; i++) {
      for(let j = 0; j < 9; j++) {
        document.getElementById(`node-${i}-${j}`).className = 'node-good';
      }
    }
  }

  redGrid() {
    for(let i = 0; i < 9; i++) {
      for(let j = 0; j < 9; j++) {
        document.getElementById(`node-${i}-${j}`).className = 'node-bad';
      }
    }
  }

  isFull() {

    var table = document.getElementById('mainTable');


    for(let i = 0; i < 9; i++) {
      for(let j = 0; j < 9; j++) {
        if( table.rows[i].cells[j].innerHTML === '' ) {
          return -1;
        }
      }
    }

    return 1;
  }

  highlightRow(n, actions) {
    const rowNum = actions[n].row;
    for(let j = 0; j < 9; j++) {
      document.getElementById(`node-${rowNum}-${j}`).className = 'node-highlighted';
    }
  }

  highlightCol(n, actions) {
    const colNum = actions[n].col;
    for(let i = 0; i < 9; i++) {
      document.getElementById(`node-${i}-${colNum}`).className = 'node-highlighted';
    }
  }

  highlightSqr(n, actions) {
    const sqRow = Math.floor(actions[n].row/3)*3;
    const sqCol = Math.floor(actions[n].col/3)*3;

    for(let i = 0; i < 3; i++) {
      for(let j = 0; j < 3; j++) {
        document.getElementById(`node-${i+sqRow}-${j+sqCol}`).className = 'node-highlighted';
      }
    }
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
        <button onClick={() => this.backtrack()} id="backtrack" className="runButton">Run Backtrack</button>
        <button onClick={() => this.humanized()} id="humanized" className="runButton">Run Humanized</button>
        <br></br>
        <button onClick={() => this.fillDefault()} id="sample" className="runButton">Sample Puzzle</button>
        <button onClick={() => this.clear()} id="clear" className="runButton">Clear Grid</button>
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
