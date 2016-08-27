import React, {Component} from 'react';

class Toolbar extends Component {
  render () {
    return (
      <div className="toolbar">
        <div className="container">
          <div className="toolbar-items">
            <a className="toolbar-item toolbar-genre active" href="/#/songs?q=chill" title="">chill</a>
            <a className="toolbar-item toolbar-genre" href="/#/songs?q=chill" title="">deep</a>
            <a className="toolbar-item toolbar-genre" href="/#/songs?q=chill" title="">house</a>
            <a className="toolbar-item toolbar-genre" href="/#/songs?q=chill" title="">hip</a>
            <a className="toolbar-item toolbar-genre " href="/#/songs?q=chill" title="">hop</a>
            <a className="toolbar-item toolbar-genre " href="/#/songs?q=chill" title="">r & b</a>
            <a className="toolbar-item toolbar-genre " href="/#/songs?q=chill" title="">b-box</a>
          </div>
        </div>
      </div>
    );
  }
}

export default Toolbar;
