import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'common/components/icons/Icon';
import Wrapper from './Wrapper';
import ActionList from './ActionList';

function PlayQueueTooltips({ index, trackId }) {
  return (
    <Wrapper>
      <Icon iconName="ellipsis-v" />
      <ActionList index={index} trackId={trackId} />
    </Wrapper>
  );
}

PlayQueueTooltips.propTypes = {
  index: PropTypes.number.isRequired,
  trackId: PropTypes.number.isRequired,
};

export default PlayQueueTooltips;
