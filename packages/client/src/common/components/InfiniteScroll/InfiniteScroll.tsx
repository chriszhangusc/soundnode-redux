import useScroll from '@soundnode-redux/client/src/common/hooks/useScroll';

type Props = {
  children: JSX.Element;
  onBottomReached: () => void;
};

function InfiniteScroll(props: Props) {
  const { children } = props;

  const onScroll = () => {
    const { onBottomReached } = props;

    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      onBottomReached();
    }
  };

  useScroll(onScroll);

  return children;
}

export default InfiniteScroll;
