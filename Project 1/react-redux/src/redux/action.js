import { useGetProfile } from "../utils/api";

export const getDataUser = () => {
  return async (dispatch) => {
    const response = await useGetProfile();
    console.log("ini response" + response);
    dispatch({
      type: "GET_USER",
      payload: response.data,
    });
  };
};
