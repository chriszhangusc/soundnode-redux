import RouterLink from 'common/components/links/RouterLink';

const SongCardTitle = RouterLink.extend`
  display: -webkit-box;
  font-size: 1.05rem;
  font-weight: bold;
  overflow: hidden;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  height: 40px;
  &:hover {
    color: ${props => props.theme.fontColor};
  }
`;

export default SongCardTitle;