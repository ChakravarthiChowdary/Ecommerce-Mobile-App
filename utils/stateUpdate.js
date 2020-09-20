const stateUpdate = (oldState, newState) => {
  return {
    ...oldState,
    ...newState,
  };
};

export default stateUpdate;
