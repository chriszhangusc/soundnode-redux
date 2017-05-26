import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchGenreList } from 'client/common/api/common/genreList';
import { updateGenreList } from 'client/features/charts/chartsActions';
import { getGenreList } from 'client/features/charts/chartsSelectors';
import GenreList from './GenreList';

class GenreListContainer extends React.Component {
  componentWillMount() {
    // Should be fetched from database, but keep it here for simplicity.
    const { dispatch } = this.props;
    const genreListData = fetchGenreList();
    dispatch(updateGenreList(genreListData));
  }

  render() {
    // Validate twice ???
    // const { genreListData } = this.props;
    return <GenreList {...this.props} />;
  }
}

GenreListContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    genreListData: getGenreList(state),
  };
}

export default connect(mapStateToProps)(GenreListContainer);
