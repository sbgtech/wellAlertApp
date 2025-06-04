import AsyncStorage from "@react-native-async-storage/async-storage";
import TYPE from "../types";
import axios from "axios";
import { Alert } from "react-native";
import { getThreads } from "../thread/threadAction";

export const getMessages = (conversation_id) => async (dispatch) => {
  try {
    const res = await axios({
      baseURL: "https://well-alert-api.s2c.io/v1",
      method: "get",
      url: "/user-message",
      headers: {
        Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
      },
      params: { conversation_id },
    });
    dispatch({
      type: TYPE.GET_MESSAGE_SUCCESS,
      payload: res.data,
    });
    await axios({
      baseURL: "https://well-alert-api.s2c.io/v1",
      method: "post",
      url: "/user-message",
      headers: {
        Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
      },
      data: { conversation_id },
    });
    dispatch(getThreads());
  } catch (error) {
    const err = error.response.data.error;
    console.log("msg");
    Alert.alert("Error", err);
    dispatch({
      type: TYPE.GET_MESSAGE_FAIL,
    });
  }
};
