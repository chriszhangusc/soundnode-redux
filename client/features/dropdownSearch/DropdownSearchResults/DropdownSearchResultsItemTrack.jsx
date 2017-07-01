import React from 'react';
import PropTypes from 'prop-types';
import RouterLink from 'common/components/links/RouterLink';
import TrackAvatar from 'common/components/images/TrackAvatar';
import styled from 'styled-components';
import { media } from 'app/css/styleUtils';
import { SEPARATOR_COLOR_DARK } from 'app/css/colors';
import { connect } from 'react-redux';
import { getTrackById } from 'features/entities/entitiesSelectors';
import { TRACK_PROFILE_ROUTE } from 'common/constants/routeConsts';

const StyledListItem = styled.li`
  padding: 8px 10px;
  white-space: nowrap;
  cursor: pointer;
  display: flex;
  align-items: middle;
  border-bottom: 1px solid ${SEPARATOR_COLOR_DARK};
  &:hover {
    background: ${SEPARATOR_COLOR_DARK};
  }
`;

const DROPDOWN_SEARCH_TITLE_WIDTH = '320px';
const DROPDOWN_SEARCH_TITLE_WIDTH_MD = '370px';
const DROPDOWN_SEARCH_TITLE_WIDTH_LG = '390px';
const DROPDOWN_SEARCH_TITLE_WIDTH_4K = '450px';

const DropdownItemTitle = styled.span`
  margin-left: 10px;
  display: inline-block;
  width: ${DROPDOWN_SEARCH_TITLE_WIDTH};
  ${media.desktop`width: ${DROPDOWN_SEARCH_TITLE_WIDTH_MD}`}
  ${media.desktopLG`width: ${DROPDOWN_SEARCH_TITLE_WIDTH_LG}`}
  ${media.desktop4K`width: ${DROPDOWN_SEARCH_TITLE_WIDTH_4K}`}
  text-overflow: ellipsis;
  overflow: hidden;
`;

// Clicking the link will also trigger onBlur of the search input which will cause the result to
// disappear before handling onClick event of the link,
// So we have to put the routing logic to onMouseDown which trigger before onblur.
function DropdownSearchResultsItemTrack({ imageUrl, itemLinkUrl, itemTitle }) {
  return (
    <RouterLink to={itemLinkUrl}>
      <StyledListItem>
        <TrackAvatar src={imageUrl} size="small" />
        <DropdownItemTitle>{itemTitle}</DropdownItemTitle>
      </StyledListItem>
    </RouterLink>
  );
}

DropdownSearchResultsItemTrack.defaultProps = {
  imageUrl: undefined,
};

DropdownSearchResultsItemTrack.propTypes = {
  imageUrl: PropTypes.string,
  itemLinkUrl: PropTypes.string.isRequired,
  itemTitle: PropTypes.string.isRequired,
};

function mapStateToProps(state, { trackId }) {
  const track = getTrackById(state, trackId);
  return {
    imageUrl: track.artworkUrl,
    itemLinkUrl: `${TRACK_PROFILE_ROUTE}/${trackId}`,
    itemTitle: track.title,
  };
}

export default connect(mapStateToProps)(DropdownSearchResultsItemTrack);
