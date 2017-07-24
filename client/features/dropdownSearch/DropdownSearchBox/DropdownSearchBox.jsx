import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import {
  clearAndHideSearchResults,
  startDropdownSearch,
} from 'features/dropdownSearch/dropdownSearchActions';
import SearchIcon from './SearchIcon';

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

const DropdownSearchInput = styled.input`
    display: inline-block;
    border: none;
    text-align: left;
    font-family: 'Open Sans';
    font-size: 0.9rem;
    outline: 0;
    border-radius: 5px;
    padding: 6px 10px 6px 30px;
    font-weight: 300;
    transition: all 0.2s ease-in-out;
    background-color: #333333;
    height: 30px;
    width: 100%;
`;

class DropdownSearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.onInputChange = this.onInputChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  // When user press enter, show all results.
  onSubmit(e) {
    e.preventDefault();
    const { handleShowAll } = this.props;
    const searchKeyword = this.searchInput.value;
    handleShowAll(searchKeyword);
    this.searchInput.value = '';
  }

  onInputChange(e) {
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
      <Wrapper>
        <form onSubmit={this.onSubmit}>
          <SearchIcon />
          <DropdownSearchInput
            type="search"
            placeholder="Search SoundCloud"
            ref={(node) => {
              this.searchInput = node;
            }}
            onChange={this.onInputChange}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
          />
        </form>
      </Wrapper>
    );
  }
}

DropdownSearchBox.propTypes = {
  handleBlur: PropTypes.func.isRequired,
  handleFocus: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleShowAll: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    handleChange(keywords) {
      dispatch(startDropdownSearch(keywords));
    },

    handleBlur() {
      // Delay onblur to make sure when user click on the search result it will redirect first
      // and then do onblur
      setTimeout(() => {
        // dispatch(clearAndHideSearchResults());
      }, 250);
    },

    handleFocus(keywords) {
      if (keywords.trim() === '') dispatch(clearAndHideSearchResults());
      else dispatch(startDropdownSearch(keywords));
    },

    handleShowAll(rawKeywords) {
      const keywords = rawKeywords.toLowerCase().trim();
      if (keywords !== '') {
        dispatch(clearAndHideSearchResults());
      }
    },
  };
}

export default connect(null, mapDispatchToProps)(DropdownSearchBox);
