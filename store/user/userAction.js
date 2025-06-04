import AsyncStorage from "@react-native-async-storage/async-storage";
import TYPE from "../types";
import axios from "axios";
import { Alert } from "react-native";

export const login =
  (navigation, phone_number, country_code, fcm_token) => async (dispatch) => {
    try {
      const data = { phone_number, country_code, fcm_token };
      const res = await axios({
        baseURL: "https://well-alert-api.s2c.io/v1",
        method: "post",
        url: "/otp",
        headers: { "Content-Type": "application/json" },
        data,
      });
      console.log(res.data);
      otp = res.data;
      dispatch({
        type: TYPE.LOGIN_SUCCESS,
        payload: res.data,
      });
      setTimeout(() => {
        navigation.navigate("verifyOTP", {
          phone_number,
          country_code,
          fcm_token,
          otp,
        });
      }, 500);
    } catch (error) {
      console.log(error.message);
      const err = error?.response?.data.error;
      let msg = error.message;
      if ("phone_number" in err) {
        msg = err.phone_number;
      }
      Alert.alert("Error", msg);
      dispatch({
        type: TYPE.LOGIN_FAIL,
      });
    }
  };

export const verifyOTP =
  (phone_number, country_code, fcm_token, otp) => async (dispatch) => {
    try {
      const data = { phone_number, country_code, fcm_token, otp };
      const res = await axios({
        baseURL: "https://well-alert-api.s2c.io/v1",
        method: "post",
        url: "/login",
        headers: { "Content-Type": "application/json" },
        data,
      });
      await AsyncStorage.setItem("token", res.data.token);
      // await AsyncStorage.setItem("isLogged", JSON.stringify(true));
      dispatch({
        type: TYPE.VERIFY_SUCCESS,
        payload: res.data.user,
      });
    } catch (error) {
      Alert.alert("Error", error.response.data.error);
      dispatch({
        type: TYPE.VERIFY_FAIL,
      });
    }
  };

export const editProfile = (navigation, data) => async (dispatch) => {
  try {
    // const data = {name, email, phone_number, country_code};
    const res = await axios({
      baseURL: "https://well-alert-api.s2c.io/v1",
      method: "patch",
      url: "/profile",
      headers: {
        Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
      },
      data,
    });
    dispatch({
      type: TYPE.SET_PROFILE_SUCCESS,
      payload: res.data,
    });
    Alert.alert("Success", "Profile updated successfully");
    navigation.navigate("profile");
  } catch (error) {
    const err = error.response.data.error;
    let msg = "An error came up";
    if ("email" in err) {
      msg = err.email;
    }
    if ("name" in err) {
      msg = err.name;
    }
    if (typeof err === "string") {
      msg = err;
    }
    Alert.alert("Error", msg);
    dispatch({
      type: TYPE.SET_PROFILE_FAIL,
    });
  }
};

export const logout = () => async (dispatch) => {
  try {
    const res = await axios({
      baseURL: "https://well-alert-api.s2c.io/v1",
      method: "post",
      url: "/logout",
      headers: {
        Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
      },
    });
    await AsyncStorage.clear();
    dispatch({
      type: TYPE.LOGOUT,
    });
    dispatch({
      type: TYPE.CLEAR_THREAD,
    });
    dispatch({
      type: TYPE.CLEAR_MSG,
    });
  } catch (error) {
    console.log("gggg ", error.response.data.error);
  }
};

export const getProfile = () => async (dispatch) => {
  try {
    // throw new Error("hamza");
    const res = await axios({
      baseURL: "https://well-alert-api.s2c.io/v1",
      method: "get",
      url: "/profile",
      headers: {
        Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
      },
    });

    dispatch({
      type: TYPE.GET_PROFILE_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    // const err = error.response.data.error;
    console.log("get profile ", error.message);
    dispatch({
      type: TYPE.GET_PROFILE_FAIL,
    });
  }
};
