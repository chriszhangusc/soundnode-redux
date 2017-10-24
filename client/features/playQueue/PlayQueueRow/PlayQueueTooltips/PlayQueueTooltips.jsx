import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import IconButton from 'common/components/buttons/IconButton';
import { updateActiveTooltip } from 'features/playQueue/playQueueActions';
import Wrapper from './Wrapper';
import ActionList from './ActionList';
import DropdownList from './DropdownList';

function PlayQueueTooltips({ index, trackId, tooltipActive, updateActiveTooltip }) {
  const handleTooltipClick = (e) => {
    e.preventDefault();
    updateActiveTooltip(index);
    console.log('Showing tooltip ', index);
  };
  return (
    <Wrapper>
      <IconButton iconName="ellipsis-v" onClick={handleTooltipClick} />
      {tooltipActive && <DropdownList />}
    </Wrapper>
  );
}

PlayQueueTooltips.propTypes = {
  index: PropTypes.number.isRequired,
  trackId: PropTypes.number.isRequired,
};

function mapStateToProps(state) {
  return {
    tooltipActivegetActiveTooltipId(state),
  };
}

export default connect(mapStateToProps, {
  updateActiveTooltip,
})(PlayQueueTooltips);
