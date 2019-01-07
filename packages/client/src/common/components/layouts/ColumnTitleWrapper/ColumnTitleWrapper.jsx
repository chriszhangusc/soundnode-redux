import styled from 'styled-components';

export default styled.div`
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
  /* Prevent text-overflow, https://css-tricks.com/flexbox-truncated-text/ */
  min-width: 0;
`;
