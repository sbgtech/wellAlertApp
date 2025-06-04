import React, { useState, useRef } from "react";
import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  View,
  Image,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import PhoneInput from "react-native-phone-number-input";
import ButtonUI from "../components/ButtonUI";
import { useDispatch } from "react-redux";
import { login } from "../store/user/userAction";

export const Login = ({ navigation, fcmToken }) => {
  const [phone_number, setPhone_number] = useState("");
  const [disbledLogin, setDisbledLogin] = useState(false);
  const phoneInput = useRef(null);
  const country_code = "+" + phoneInput.current?.getCallingCode(phone_number);
  const dispatch = useDispatch();
  const handleSubmit = async () => {
    setDisbledLogin(true);
    dispatch(login(navigation, phone_number, country_code, fcmToken));
    setTimeout(() => {
      setDisbledLogin(false);
    }, 1200);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.inner}
    >
      <TouchableWithoutFeedback
        style={styles.wrapper}
        onPress={() => Keyboard.dismiss()}
      >
        <View style={styles.container}>
          <Image
            alt="App Logo"
            resizeMode="contain"
            style={styles.headerImg}
            source={require("../assets/icon.png")}
          />
          <View>
            <Text style={styles.title}>
              Login to <Text style={{ color: "#075eec" }}>WellAlert</Text>
            </Text>

            <Text style={styles.subtitle}>
              Get access for your devices notifications
            </Text>
          </View>

          <View style={styles.form}>
            <Text style={styles.inputLabel}>Phone number</Text>

            <PhoneInput
              containerStyle={styles.phoneInputContainer}
              textContainerStyle={styles.phoneInputTextContainerStyle}
              countryPickerButtonStyle={styles.countryPickerButtonStyle}
              countryPickerProps={{
                countryCodes: ["CA", "US"],
              }}
              defaultCode="CA"
              ref={phoneInput}
              defaultValue={phone_number}
              layout="first"
              onChangeText={(text) => {
                setPhone_number(text);
              }}
            />
          </View>
          <ButtonUI
            onPress={() => {
              handleSubmit();
            }}
            disabled={disbledLogin}
            title={"Log In"}
            textStyle={styles.txtBtnLogin}
            btnStyle={[
              styles.btnLogin,
              ...(disbledLogin ? [styles.btnLoginDisbaled] : []),
            ]}
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  inner: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 16,
    gap: 10,
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  headerImg: {
    width: 120,
    height: 120,
    borderRadius: 20,
    marginBottom: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1D2A32",
    marginBottom: 6,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#929292",
    textAlign: "center",
  },
  form: {
    marginTop: 30,
    width: "100%",
    maxWidth: 480,
    gap: 6,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: "600",
    color: "#222",
  },
  phoneInputContainer: {
    width: "100%",
    borderRadius: 9,
    overflow: "hidden",
    minHeight: 55,
    borderWidth: 0.5,
    borderColor: "#35374B",
  },
  phoneInputTextContainerStyle: {
    paddingVertical: 6,
  },
  countryPickerButtonStyle: {
    maxWidth: 100,
  },
  btnContainer: {},
  btnLogin: {
    marginTop: 18,
    marginBottom: 15,
    backgroundColor: "#35374B",
    borderRadius: 9,
    minHeight: 50,
    width: "100%",
    maxWidth: 480,
  },
  btnLoginDisbaled: {
    backgroundColor: "#bababa",
  },
  txtBtnLogin: { color: "#fff", fontSize: 18 },
});
