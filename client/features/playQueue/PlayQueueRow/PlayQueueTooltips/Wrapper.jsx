import styled from 'styled-components';

export default styled.div`
  text-align: center;
  position: relative;
  &:hover {
    & > div {
      transform: scale(1, 1);
    }
  }
`;
