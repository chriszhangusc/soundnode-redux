import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { media } from 'client/app/css/styleUtils';
import { connect } from 'react-redux';
import {
  clearAndHideSearchResults,
  requestDropdownSearch,
} from 'client/features/dropdownSearch/dropdownSearchActions';
import { FONT_COLOR_SECONDARY } from 'client/app/css/colors';

const StyledSearchInput = styled.input`
    display: inline-block;
    border: none;
    text-align: left;
    font-family: 'Open Sans';
    font-size: 0.9rem;
    outline: 0;
    border-radius: 5px;
    padding: 6px 10px 6px 30px;
    font-weight: 300;
    background-color: #333333;
    transition: all 0.2s ease-in-out;
    height: 30px;
    width: 320px;
    ${media.desktop`width: 400px`}
    ${media.desktopLG`width: 470px`}
    ${media.desktop4K`width: 550px`}
`;

const InputContentWrapper = styled.div`
  position: relative;
  margin-bottom: 0;
`;

const SearchIcon = styled.i`
    position: absolute;
    top: 5px;
    left: 10px;
    color: ${FONT_COLOR_SECONDARY};
    pointer-events: none;
`;

class DropdownSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    // this.onShowAllClick = this.onShowAllClick.bind(this);
  }

  // When user press enter, show all results.
  onSubmit(e) {
    e.preventDefault();
    const { handleShowAll } = this.props;
    const searchKeyword = this.searchInput.value;
    handleShowAll(searchKeyword);
    this.searchInput.value = '';
  }

  onChange(e) {
    e.preventDefault();
    e.stopPropagation();
    const { handleChange } = this.props;
    handleChange(e.target.value.trim());
  }

  onFocus(e) {
    this.props.handleFocus(e.target.value.trim());
  }

  onBlur() {
    this.props.handleBlur();
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <InputContentWrapper>
          <SearchIcon className="icon ion-search" />
          <StyledSearchInput
            type="search"
            placeholder="Search SoundCloud"
            ref={(node) => {
              this.searchInput = node;
            }}
            onChange={this.onChange}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
          />
        </InputContentWrapper>
      </form>
    );
  }
}

DropdownSearchInput.propTypes = {
  handleBlur: PropTypes.func.isRequired,
  handleFocus: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleShowAll: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  handleChange(keywords) {
    dispatch(requestDropdownSearch(keywords));
  },

  handleBlur() {
    dispatch(clearAndHideSearchResults());
  },

  handleFocus(keywords) {
    if (keywords.trim() === '') dispatch(clearAndHideSearchResults());
    else dispatch(requestDropdownSearch(keywords));
  },

  handleShowAll(rawKeywords) {
    const keywords = rawKeywords.toLowerCase().trim();
    if (keywords !== '') {
      dispatch(clearAndHideSearchResults());
    }
  },
});

export default connect(null, mapDispatchToProps)(DropdownSearchInput);
