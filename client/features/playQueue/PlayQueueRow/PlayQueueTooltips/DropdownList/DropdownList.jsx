import React from 'react';
import { compose } from 'recompose';
import styled from 'styled-components';
import onClickOutside from 'react-onclickoutside';

// / ES6 Class and Module Syntax
// import React, { Component } from 'react'
// import onClickOutside from 'react-onclickoutside'

// class MyComponent extends Component {
//   handleClickOutside = evt => {
//     // ..handling code goes here...
//   }
// }

// export default onClickOutside(MyComponent)

const Wrapper = styled.div`
  width: 150px;
  height: 200px;
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

  render() {
    return <Wrapper />;
  }
}

export default onClickOutside(DropdownList);
