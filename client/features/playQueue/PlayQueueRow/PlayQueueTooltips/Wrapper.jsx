import styled from 'styled-components';

export default styled.div`
  text-align: center;
  &:hover {
    /* Better ideas? */
    & > div {
      transform: scale(1, 1);
    }
  }
`;
