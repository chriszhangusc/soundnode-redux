import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import {
  clearAndHideSearchResults,
  requestDropdownSearch,
} from 'client/features/dropdownSearch/dropdownSearchActions';

// const StyledSearchInput = styled.input`
//   border-bottom: 1px solid $light-gray;
// `;

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
        <div className="form-group">
          <i className="icon ion-search" />
          <input
            type="search"
            className="nav-search-input"
            placeholder="Search SoundCloud"
            ref={(node) => {
              this.searchInput = node;
            }}
            onChange={this.onChange}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
          />
        </div>
      </form>
    );
  }
}

DropdownSearchInput.propTypes = {
  // dropdownShown: PropTypes.bool.isRequired,
  // userIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  // trackIds: PropTypes.arrayOf(PropTypes.number).isRequired,
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
