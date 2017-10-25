import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import IconButton from 'common/components/buttons/IconButton';
import { updateActiveTooltip } from 'features/playQueue/playQueueActions';
import { getActiveTooltipId } from 'features/playQueue/playQueueSelectors';
import Wrapper from './Wrapper';
import DropdownList from './DropdownList';

function PlayQueueTooltips({ index, trackId, tooltipActive, updateActiveTooltip }) {
  console.log(tooltipActive);
  const handleTooltipClick = (e) => {
    e.preventDefault();
    updateActiveTooltip(index);
    console.log('Showing tooltip ', index);
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

export default connect(mapStateToProps, {
  updateActiveTooltip,
})(PlayQueueTooltips);
