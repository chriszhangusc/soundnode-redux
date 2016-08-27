import React, { Component } from 'react';
import SongCard from '../components/SongCard';
import Spinner from 'Spinner';

class SongCards extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div className="content">
        <div className="songs-row grid">
          <div className="col-1-5 clearfix">
              <SongCard />
          </div>
          <div className="col-1-5 clearfix">
              <SongCard />
          </div>
          <div className="col-1-5 clearfix">
              <SongCard />
          </div>
          <div className="col-1-5 clearfix">
              <SongCard />
          </div>
          <div className="col-1-5 clearfix">
              <SongCard />
          </div>
        </div>
      </div>
    );
  }
}

export default SongCards;
