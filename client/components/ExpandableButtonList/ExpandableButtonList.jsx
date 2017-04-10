// Not sure if we should extract this part because it may not be
// reused in the future.
import React from 'react';

const ExpandableButtonList = ({ subtitle, buttons }) => (
  <div className="expandable-button-list" >
    <h3 className="title">Charts By Genre</h3>
    {renderItems}
  </div>
);
  
};

const renderButtons = (buttons) => buttons.map(
  genre => (<Link
    key={genre.link}
    className="button inline"
    to={`/charts/${genre.link}`}
  >{genre.title}</Link>),
);

export default ExpandableButtonList;
