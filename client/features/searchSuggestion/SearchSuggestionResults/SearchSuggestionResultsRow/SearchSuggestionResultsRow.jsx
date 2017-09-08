import React from 'react';
import PropTypes from 'prop-types';
import RouterLink from 'common/components/links/RouterLink';
import UserImage from 'common/components/images/UserImage';
import TrackImage from 'common/components/images/TrackImage';
import ColumnTitleWrapper from 'common/components/layouts/ColumnTitleWrapper';

import Wrapper from './Wrapper';
import SuggestionTitle from './SuggestionTitle';
import SuggestionSubtitle from './SuggestionSubtitle';

function renderAvatarByType(type, avatarUrl) {
  return type === 'user'
    ? <UserImage src={avatarUrl} size="small" />
    : <TrackImage src={avatarUrl} size="small" />;
}

// Clicking the link will also trigger onBlur of the search input which will cause the result to
// disappear before handling onClick event of the link,
// So we have to put the routing logic to onMouseDown which trigger before onblur.
function SearchSuggestionResultsRow({ type, avatarUrl, linkUrl, title, subtitle }) {
  return (
    <RouterLink to={linkUrl}>
      <Wrapper>
        {renderAvatarByType(type, avatarUrl)}
        <ColumnTitleWrapper>
          <SuggestionTitle>
            {title}
          </SuggestionTitle>
          <SuggestionSubtitle>
            {subtitle}
          </SuggestionSubtitle>
        </ColumnTitleWrapper>
      </Wrapper>
    </RouterLink>
  );
}

SearchSuggestionResultsRow.defaultProps = {
  avatarUrl: '',
};

SearchSuggestionResultsRow.propTypes = {
  avatarUrl: PropTypes.string,
  linkUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['user', 'track', 'playlist']).isRequired,
};

export default SearchSuggestionResultsRow;
