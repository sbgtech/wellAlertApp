import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { OtpInput } from "react-native-otp-entry";
import { useDispatch } from "react-redux";
import { verifyOTP } from "../store/user/userAction";
import Toast from "react-native-toast-message";

export const VerifyOTP = ({ route }) => {
  const [isIndicatorShown, setIsIndicatorShown] = useState(false);
  const { phone_number, country_code, fcm_token, otp } = route.params;
  const dispatch = useDispatch();
  const handleSubmit = async (otp) => {
    setIsIndicatorShown(true);
    setTimeout(() => {
      dispatch(verifyOTP(phone_number, country_code, fcm_token, otp));
    }, 2000);
  };

  const otpInputRef = useRef();

  useEffect(() => {
    const fillOTPInput = setTimeout(() => {
      otpInputRef.current.setValue(`${otp}`);
    }, 3500);
    Toast.show({
      type: "info",
      text1: "You will receive your otp in few seconds",
    });
    const otpToast = setTimeout(() => {
      Toast.show({
        type: "info",
        text1: "Your OPT is " + otp,
      });
    }, 2500);
    return () => {
      clearTimeout(otpToast);
      clearTimeout(fillOTPInput);
    };
  }, []);

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
            source={require("../assets/otp.png")}
          />
          <Text style={styles.title}>Enter verification code</Text>
          <Text style={styles.subtitle}>
            We are automatically detecting notification send to your mobile
            phone number
          </Text>
          <OtpInput
            ref={otpInputRef}
            autoFocus={false}
            numberOfDigits={4}
            focusColor="#35374B"
            focusStickBlinkingDuration={500}
            onFilled={handleSubmit}
            theme={{
              containerStyle: styles.containerInputs,
              inputsContainerStyle: styles.inputsContainer,
              pinCodeContainerStyle: styles.pinCodeContainer,
              pinCodeTextStyle: styles.pinCodeText,
              focusStickStyle: styles.focusStick,
              focusedPinCodeContainerStyle: styles.activePinCodeContainer,
            }}
          />
          <TouchableOpacity style={styles.resendContainer}>
            <Text>Didn't receive the code ?</Text>
            <TouchableOpacity>
              <Text style={styles.resend}>Resend code</Text>
            </TouchableOpacity>
          </TouchableOpacity>
          <View style={styles.indicatorWrapper}>
            {isIndicatorShown && (
              <ActivityIndicator
                size={50}
                color={"#075eec"}
                style={styles.loadingStyle}
              />
            )}
          </View>
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
    gap: 0,
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "pink",
  },
  inputsContainer: {
    // backgroundColor: "pink",
    marginHorizontal: 50,
    marginVertical: 20,
    width: "100%",
    maxWidth: 340,
  },
  pinCodeContainer: {
    // backgroundColor: "orange",
    width: 58,
    height: 58,
    borderRadius: 15,
    marginVertical: 8,
    borderColor: "#8d8d8d",
  },
  pinCodeText: {
    // backgroundColor: "red",
  },
  focusStick: {
    backgroundColor: "#000",
  },
  activePinCodeContainer: {
    backgroundColor: "#e9e9e9",
    borderColor: "#000",
  },
  headerImg: {
    width: 180,
    height: 180,
    borderRadius: 20,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#000",
    marginBottom: 6,
    // textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    color: "#535353",
    width: "80%",
    textAlign: "center",
  },
  resendContainer: {
    flexDirection: "row",
    gap: 8,
  },
  resend: {
    color: "#075eec",
    fontWeight: "bold",
  },
  indicatorWrapper: {
    height: 60,
  },
  loadingStyle: {
    marginTop: 40,
  },
});
