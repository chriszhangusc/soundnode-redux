import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Heading from '@soundnode-redux/client/src/common/components/Heading';
import TrackProfileComment from './TrackProfileComment';

type Props = {
  commentCount: number;
  comments: Array<any>;
};

function TrackProfileComments({ commentCount, comments }: Props) {
  return (
    <Fragment>
      <Heading>{`Comments: (${commentCount})`}</Heading>
      <ul>
        {comments.map(comment => (
          <li key={comment.id}>
            <TrackProfileComment comment={comment} />
          </li>
        ))}
      </ul>
    </Fragment>
  );
}

TrackProfileComments.defaultProps = {
  commentCount: 0,
};

TrackProfileComments.propTypes = {
  commentCount: PropTypes.number,
};

export default TrackProfileComments;
