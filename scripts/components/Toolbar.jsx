import React from 'react';
import { GENRES } from '../constants/SongConstants';
import {Link, IndexLink} from 'react-router';

const renderGenres = (genres) => {
  return genres.map(genre =>
  <Link className={`toolbar-item toolbar-genre`} activeClassName={'active'} to={`/songs/${genre}`} key={genre}>{genre}</Link>
  );
}

const Toolbar = () => {
  return (
    <div className="toolbar">
      <div className="container">
        <div className="toolbar-items">
          {renderGenres(GENRES)}
        </div>
      </div>
    </div>
  );
}

export default Toolbar;
