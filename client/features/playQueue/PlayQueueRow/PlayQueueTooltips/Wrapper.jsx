import styled from 'styled-components';

export default styled.div`
  flex-grow: 1;
  text-align: center;
  &:hover {
    /* Better ideas? */
    & > div {
      transform: scale(1, 1);
    }
  }
`;
