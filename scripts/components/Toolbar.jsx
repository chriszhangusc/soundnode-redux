import React, {Component} from 'react';
import { GENRES, DEFAULT_GENRE } from 'SongConstants';
import {Link, IndexLink} from 'react-router';

class Toolbar extends Component {

  renderGenres() {
    return GENRES.map((genre) => {
      return <Link className={`toolbar-item toolbar-genre`} activeClassName={'active'} to={`/songs/${genre}`} key={genre}>{genre}</Link>
    });
  }

  render () {
    return (
      <div className="toolbar">
        <div className="container">
          <div className="toolbar-items">
            {this.renderGenres()}
          </div>
        </div>
      </div>
    );
  }
}

export default Toolbar;
