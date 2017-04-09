export function defaultEventHandlerFactory(name) {
  return function () {
    console.warn(`You have to pass in proper event handler for ${name}`);
  };
}
