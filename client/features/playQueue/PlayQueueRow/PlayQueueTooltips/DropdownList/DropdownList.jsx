import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import styled from 'styled-components';
import onClickOutside from 'react-onclickoutside';
import { getReposts, isAuthed } from 'features/auth/authSelectors';
import * as authActions from 'features/auth/authActions';
import * as copyActions from 'features/copy/copyActions';
import DropdownListItem from './DropdownListItem';

const Wrapper = styled.div`
  width: 150px;
  z-index: ${props => props.theme.zIndexes[4]};
  background: ${props => props.theme.colors.bg};
  position: absolute;
  box-shadow: 0 0 12px 8px ${props => props.theme.colors.boxShadowColor};
  border: solid 0px;
  border-radius: 5px;
  right: 0;
  top: 0;
`;

class DropdownList extends React.Component {
  handleClickOutside = (e) => {
    console.log('handleClickOutside');
    this.props.onClose();
  };

  handleRepostClick = (e) => {
    if (!this.props.authed) {
      this.props.authRequired();
    } else {
      const toggleRepost = this.props.reposted ? this.props.removeRepost : this.props.createRepost;
      toggleRepost(this.props.trackId);
    }
  };

  render() {
    const { trackId, reposted } = this.props;
    return (
      <Wrapper>
        <DropdownListItem
          iconName="retweet"
          text={reposted ? 'Remove repost' : 'Add repost'}
          onClick={this.handleRepostClick}
        />
        <DropdownListItem iconName="external-link" text="Permalink" />
        <DropdownListItem iconName="music" text="Track profile" />
        <DropdownListItem iconName="plus" text="Add to playlist" />
      </Wrapper>
    );
  }
}

function mapStateToProps(state, { trackId }) {
  return {
    authed: isAuthed(state),
    reposted: getReposts(state).includes(trackId),
  };
}

const actions = {
  ...authActions,
  ...copyActions,
};

export default compose(connect(mapStateToProps, actions), onClickOutside)(DropdownList);
