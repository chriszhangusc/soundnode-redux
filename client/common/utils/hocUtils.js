// The most common technique is to wrap the display name of the wrapped component.
// So if your higher-order component is named withSubscription,
// and the wrapped component's display name is CommentList,
// use the display name WithSubscription(CommentList):

// function withSubscription(WrappedComponent) {
//   class WithSubscription extends React.Component {/* ... */}
//   WithSubscription.displayName = `WithSubscription(${getDisplayName(WrappedComponent)})`;
//   return WithSubscription;
// }

// function getDisplayName(WrappedComponent) {
//   return WrappedComponent.displayName || WrappedComponent.name || 'Component';
// }
export function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
