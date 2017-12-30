const byId = (state = {}, action) => {
  if (action.response) {
    return {
      ...state,
      ...action.response.entities.todos
    }
  }

  return state;
};

export default byId;

// state corresponds to the state of byId reducer
export const getTodo = (state, id) => state[id];