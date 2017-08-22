import styled from 'styled-components';

export default styled.div`
  overflow: hidden;
  height: 105px;
  transition: height 0.4s;
  margin-bottom: 20px;
  padding: 0 15px;
  &:hover {
    height: 250px;
  }
`;
