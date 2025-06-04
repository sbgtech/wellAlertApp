import AsyncStorage from "@react-native-async-storage/async-storage";
import TYPE from "../types";
import axios from "axios";
import { Alert } from "react-native";

export const getThreads = () => async (dispatch) => {
  try {
    const res = await axios({
      baseURL: "https://well-alert-api.s2c.io/v1",
      method: "get",
      url: "/user-conversation",
      headers: {
        Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
      },
    });
    dispatch({
      type: TYPE.GET_THREAD_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const err = error.response.data.error;
    console.log("thread", await AsyncStorage.getItem("token"));
    Alert.alert("Error", err);
    dispatch({
      type: TYPE.GET_THREAD_FAIL,
    });
  }
};
