import React from 'react';
import shortid from 'shortid';
import { getDisplayName } from 'common/utils/hocUtils';
import Fade from 'common/components/transitions/FadeTransition';
import { TransitionGroup } from 'react-transition-group';

export default function withFadeTransition(WrappedComponent) {
  function EnhancedComponent(props) {
    const { active, ...rest } = props;
    return (
      <TransitionGroup>
        {active && (
          <Fade key={shortid.generate()}>
            <WrappedComponent {...rest} />
          </Fade>
        )}
      </TransitionGroup>
    );
  }

  EnhancedComponent.displayName = `WithFadeTransition(${getDisplayName(WrappedComponent)})`;

  return EnhancedComponent;
}
