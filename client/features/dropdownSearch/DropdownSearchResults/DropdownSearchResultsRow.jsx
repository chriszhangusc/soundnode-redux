import React from 'react';
import PropTypes from 'prop-types';
import RouterLink from 'common/components/links/RouterLink';
import UserImage from 'common/components/images/UserImage';
import TrackImage from 'common/components/images/TrackImage';
import styled from 'styled-components';
import { saparatorColorDark, fontColorSub } from 'app/css/colors';

const ContentWrapper = styled.div`
  padding: 8px 10px;
  cursor: pointer;
  display: flex;
  align-items: middle;
  border-bottom: 1px solid ${saparatorColorDark};
  &:hover {
    background: ${saparatorColorDark};
  }
`;

const Title = styled.div`
  font-size: 0.95rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const Subtitle = styled.div`
  color: ${fontColorSub};
  font-size: 0.9rem;
`;

const TitleWrapper = styled.div`
  display: flex;
  margin-left: 10px;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
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
    <div>
      <RouterLink to={linkUrl}>
        <ContentWrapper>
          {renderAvatarByType(type, avatarUrl)}
          <TitleWrapper>
            <Title>
              {title}
            </Title>
            <Subtitle>
              {subtitle}
            </Subtitle>
          </TitleWrapper>
        </ContentWrapper>
      </RouterLink>
    </div>
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
