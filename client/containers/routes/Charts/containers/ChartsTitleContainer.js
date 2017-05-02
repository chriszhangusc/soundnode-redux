import { connect } from 'react-redux';
import { getCurrentGenreTitle } from 'client/redux/modules/charts/selectors';
import { CHARTS_MAIN_TITLE_PREFIX } from 'client/constants/ChartsConsts';

import ChartsTitle from '../components/ChartsTitle';

function mapStateToProps(state) {
  return {
    genreTitle: `${CHARTS_MAIN_TITLE_PREFIX}${getCurrentGenreTitle(state)}`,
  };
}

export default connect(mapStateToProps)(ChartsTitle);
