import React, {Component} from 'react';
import Node from './Node/Node';

import './SudokuSolver.css';

const DEFAULT = [
  [5,3,0,0,7,0,0,0,0],
  [6,0,0,1,9,5,0,0,0],
  [0,9,8,0,0,0,0,6,0],
  [8,0,0,0,6,0,0,0,3],
  [4,0,0,8,0,3,0,0,1],
  [7,0,0,0,2,0,0,0,6],
  [0,6,0,0,0,0,2,8,0],
  [0,0,0,4,1,9,0,0,5],
  [0,0,0,0,8,0,0,7,9]
];

export default class SudokuSolver extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: [],
    };
  }

  componentDidMount() {
    const nodes = [];
    for(let row = 0; row < 9; row++) {
      const currentRow = [];
      for(let col = 0; col < 9; col++) {
        currentRow.push([]);
      }
      nodes.push(currentRow);
    }
    this.setState({nodes})
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

      }
    }

    //send grid to visualization function

    console.log(grid);

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
      }
    }
  }

  render() {
    const {nodes} = this.state;
    console.log(nodes);

    return (
      <div  className="grid">
        <table id='mainTable'>
          <tbody>
            {nodes.map((row, rowIdx) => {
              console.log(rowIdx);
              return (
                <tr key={rowIdx}>
                  {row.map((node, nodeIdx) => <Node key={nodeIdx}></Node>)}
                </tr>
              );
            })}
          </tbody>
        </table>
        <button onClick={() => this.visualizeSudoku()}>Visualize</button>
        <button onClick={() => this.fillDefault()}>Sample Puzzle</button>
        <button onClick={() => this.clear()}>Clear Grid</button>
      </div>

    );
  }
}
