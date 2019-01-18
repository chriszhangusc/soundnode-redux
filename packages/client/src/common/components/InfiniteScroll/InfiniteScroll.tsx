import * as React from 'react';

interface Props {
  children: React.ReactNode;
  onBottomReached(): void;
}

class InfiniteScroll extends React.Component<Props> {
  componentDidMount() {
    window.addEventListener('scroll', this.onScroll, false);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false);
  }

  onScroll = () => {
    const { onBottomReached } = this.props;

    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      onBottomReached();
    }
  };

  render() {
    const { children } = this.props;

    return children;
  }
}

export default InfiniteScroll;
