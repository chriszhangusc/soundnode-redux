import styled from 'styled-components';

// # Move these into theme file
const colorSuccess = '#51A351';
const colorWarning = '#f89406';
const colorInfo = '#58abc3';
const colorDanger = '#bd362f';

export default styled.div`
  display: flex;
  background-color: ${(props) => {
    switch (props.type) {
      case 'success':
        return colorSuccess;
      case 'warning':
        return colorWarning;
      case 'info':
        return colorInfo;
      case 'danger':
        return colorDanger;
      default:
        return 'transparent';
    }
  }};
  box-sizing: border-box;
  padding: 20px;
  border-radius: 2px;
  cursor: pointer;
  font-size: 1em;
  line-height: 1.2em;
  margin-bottom: 15px;
  width: 300px;
  transition: all .5s ease-in-out;
`;
