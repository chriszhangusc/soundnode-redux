import styled from 'styled-components';

// # Move these into theme file
const colorSuccess = '#51A351';
const colorWarning = '#f89406';
const colorInfo = '#58abc3';
const colorDanger = '#bd362f';

export default styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
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
  padding: 15px;
  border-radius: 4px;
  cursor: pointer;
  width: 250px;
  font-size: 1rem;
  line-height: 1.2em;
  margin-bottom: 15px;
  transition: opacity 500ms ease-in-out;
`;
