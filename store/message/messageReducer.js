import TYPE from "../types";

const initialState = {
  messages: [],
};

const message = (state = initialState, action) => {
  switch (action.type) {
    case TYPE.GET_MESSAGE_SUCCESS:
      return {
        ...state,
        messages: action.payload,
      };
    case TYPE.GET_MESSAGE_FAIL:
      return {
        ...state,
      };
    case TYPE.CLEAR_MSG:
      return initialState;
    default:
      return state;
  }
};

export default message;
