import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import IconButton from 'common/components/buttons/IconButton';
import { clearPlayQueue } from 'features/playQueue/playQueueActions';
import Wrapper from './Wrapper';

function ClearIcon({ handleClearPlayQueue }) {
  return (
    <Wrapper>
      <IconButton
        title="Clear play queue"
        iconName="trash"
        iconSize="lg"
        tooltipText="Clear Play Queue"
        onClick={handleClearPlayQueue}
      />
    </Wrapper>
  );
}

ClearIcon.propTypes = {
  handleClearPlayQueue: PropTypes.func.isRequired,
};

export default connect(null, { handleClearPlayQueue: clearPlayQueue })(ClearIcon);
