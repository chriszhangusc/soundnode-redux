export function createReducer(initialState, handlers) {
  return function reducer(state = initialState, { type, payload }) {
    const handler = handlers[type];
    return handler ? handler(state, payload) : state;
  };
}
