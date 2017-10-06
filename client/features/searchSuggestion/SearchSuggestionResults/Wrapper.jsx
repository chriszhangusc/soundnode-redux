import styled from 'styled-components';

export default styled.div`
  width: 100%;
  position: absolute;
  top: 50px;
  background-color: ${props => props.theme.colors.bgSub};
  z-index: ${props => props.theme.zIndexes[3]};
  display: block;
  transition: opacity 0.5s linear;
  box-shadow: 0 0 10px 8px rgba(0, 0, 0, 0.2);
  /* 
  box-shadow: ${props => !props.searchResultsHidden && '0 0 10px 8px rgba(0, 0, 0, 0.2)'};
  */
  padding: ${props => !props.searchResultsHidden && '10px 10px 5px 10px'};
  opacity: ${props => (props.searchResultsHidden ? 0 : 1)};  
  /* Transform animation is not currently working */
  /* transform: translateY(${props => (props.searchResultsHidden ? '0px' : '50px')}); */
  max-height: 600px;
`;
