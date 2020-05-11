import React, {Component} from 'react';
import Node from './Node/Node';

import './SudokuSolver.css';

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

    console.log(grid);

  }

  render() {
    const {nodes} = this.state;
    console.log(nodes);

    return (
      <div  className="grid">
        <table id='mainTable'>
          {nodes.map((row, rowIdx) => {
            return <tr>
              {row.map((node, nodeIdx) => <Node></Node>)}
            </tr>
          })}

        </table>
        <button onClick={() => this.visualizeSudoku()}>Visualize</button>
      </div>

    );
  }
}
