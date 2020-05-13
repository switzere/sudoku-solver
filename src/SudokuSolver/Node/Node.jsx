import React, {Component} from 'react';

import './Node.css';

export default class Node extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {val, row, col} = this.props;

  /*  const extraClassName =
      isNum ? 'node-num':
      isVisited ? 'node-visited':
      '' ;*/

    return <td
      contentEditable="true"
      suppressContentEditableWarning={true}
      //className={extraClassName}
      id={`node-${row}-${col}`}
      >{val}</td>;
  }
}
