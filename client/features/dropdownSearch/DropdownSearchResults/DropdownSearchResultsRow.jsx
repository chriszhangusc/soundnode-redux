import React from 'react';
import PropTypes from 'prop-types';
import RouterLink from 'common/components/links/RouterLink';
import UserImage from 'common/components/images/UserImage';
import TrackImage from 'common/components/images/TrackImage';
import styled from 'styled-components';
// import { Flex } from 'grid-styled';
// import FlexColumn from 'common/components/layouts/FlexColumn';
import { truncateWidth } from 'app/css/styleUtils';

const Wrapper = styled.div`
  padding: 8px 10px;
  display: flex;
  align-items: middle;
  border-bottom: 1px solid ${props => props.theme.colors.separatorDark};
  &:hover {
    background: ${props => props.theme.colors.separatorDark};
  }
`;

const SuggestionTitle = styled.span`
  font-size: 0.95rem;
  max-width: 100%;
  ${truncateWidth('100%')};
`;

const SuggestionSubtitle = SuggestionTitle.extend`
  color: ${props => props.theme.colors.fontColorSub};
  font-size: 0.9rem;
`;

const TitleWrapper = styled.div`
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
  /* Prevent text-overflow, https://css-tricks.com/flexbox-truncated-text/ */
  min-width: 0;
`;

function renderAvatarByType(type, avatarUrl) {
  return type === 'user'
    ? <UserImage src={avatarUrl} size="small" />
    : <TrackImage src={avatarUrl} size="small" />;
}

// Clicking the link will also trigger onBlur of the search input which will cause the result to
// disappear before handling onClick event of the link,
// So we have to put the routing logic to onMouseDown which trigger before onblur.
function DropdownSearchResultsRow({ type, avatarUrl, linkUrl, title, subtitle }) {
  return (
    <RouterLink to={linkUrl}>
      <Wrapper>
        {renderAvatarByType(type, avatarUrl)}
        <TitleWrapper>
          <SuggestionTitle>
            {title}
          </SuggestionTitle>
          <SuggestionSubtitle>
            {subtitle}
          </SuggestionSubtitle>
        </TitleWrapper>
      </Wrapper>
    </RouterLink>
  );
}

DropdownSearchResultsRow.defaultProps = {
  avatarUrl: undefined,
};

DropdownSearchResultsRow.propTypes = {
  avatarUrl: PropTypes.string,
  linkUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['user', 'track', 'playlist']).isRequired,
};

export default DropdownSearchResultsRow;
