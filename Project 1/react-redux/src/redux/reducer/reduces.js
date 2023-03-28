const initialState = {
  data: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_USER":
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
