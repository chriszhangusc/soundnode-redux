import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import IconButton from '@soundnode-redux/client/src/common/components/buttons/IconButton';
import { updateActiveTooltip } from '@soundnode-redux/client/src/features/playQueue/playQueueActions';
import { getActiveTooltipId } from '@soundnode-redux/client/src/features/playQueue/playQueueSelectors';
import Wrapper from './Wrapper';
import DropdownList from './DropdownList';

function PlayQueueTooltips({ index, trackId, tooltipActive, updateActiveTooltip }) {
  const handleTooltipClick = (e) => {
    e.preventDefault();
    updateActiveTooltip(index);
  };

  const handleTooltipClose = () => {
    updateActiveTooltip(null);
  };
  return (
    <Wrapper>
      <IconButton iconName="ellipsis-v" onClick={handleTooltipClick} />
      {tooltipActive && <DropdownList onClose={handleTooltipClose} trackId={trackId} />}
    </Wrapper>
  );
}

PlayQueueTooltips.propTypes = {
  index: PropTypes.number.isRequired,
  trackId: PropTypes.number.isRequired,
};

function mapStateToProps(state, { index }) {
  return {
    tooltipActive: getActiveTooltipId(state) === index,
  };
}

const actions = {
  updateActiveTooltip,
};

export default connect(mapStateToProps, actions)(PlayQueueTooltips);
