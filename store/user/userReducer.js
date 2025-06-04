import TYPE from "../types";

const initialState = {
  user: null,
  isLogged: false,
  isLoading: true,
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case TYPE.VERIFY_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isLogged: true,
      };
    case TYPE.VERIFY_FAIL:
      return {
        user: null,
        isLogged: false,
      };
    case TYPE.SET_PROFILE_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isLogged: true,
      };
    case TYPE.GET_PROFILE_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isLoading: false,
      };
    case TYPE.LOGOUT:
      return {
        user: null,
        isLogged: false,
        isLoading: false,
      };
    case TYPE.GET_PROFILE_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    case TYPE.SET_PROFILE_FAIL:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default user;
