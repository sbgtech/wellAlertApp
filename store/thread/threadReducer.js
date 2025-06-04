import TYPE from "../types";

const initialState = {
  threads: [],
};

const thread = (state = initialState, action) => {
  switch (action.type) {
    case TYPE.GET_THREAD_SUCCESS:
      return {
        ...state,
        threads: action.payload,
      };
    case TYPE.GET_THREAD_FAIL:
      return {
        ...state,
      };
    case TYPE.CLEAR_THREAD:
      return initialState;
    default:
      return state;
  }
};

export default thread;
