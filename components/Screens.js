import { useCallback, useState, useEffect } from "react";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import Entypo from "@expo/vector-icons/Entypo";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Threads from "../screens/Threads";
import Messages from "../screens/Messages";
import { StyleSheet } from "react-native";
import { EditProfile } from "../screens/EditProfile";
import { Profile } from "../screens/Profile";
import Icon from "react-native-vector-icons/FontAwesome";
import { Login } from "../screens/Login";
import { VerifyOTP } from "../screens/VerifyOTP";
import { Header } from "./header";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, logout } from "../store/user/userAction";
import ButtonUI from "./ButtonUI";
// import messaging from "@react-native-firebase/messaging";
import Toast from "react-native-toast-message";
import { getThreads } from "../store/thread/threadAction";

SplashScreen.preventAutoHideAsync();
const Stack = createNativeStackNavigator();

export default function Screens({ fcmToken }) {
  const [appIsReady, setAppIsReady] = useState(false);
  const auth = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProfile());
  }, []);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync(Entypo.font);
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }
    prepare();
    // assume a message-notification contains a "type" property in the data payload of the screen to open
    // messaging().onNotificationOpenedApp((remoteMessage) => {
    //   console.log(
    //     "Notification caused app to open from background state:",
    //     remoteMessage.notification
    //   );
    //   dispatch(getThreads());
    // });
    // const unsubscribe = messaging().onMessage(async (remoteMessage) => {
    //   console.log("Message handled in the foreground!", remoteMessage);
    //   if (remoteMessage.notification.title !== "OTP") {
    //     Toast.show({
    //       type: "info",
    //       text1: remoteMessage.notification.title,
    //       text2: remoteMessage.notification.body,
    //     });
    //     dispatch(getThreads());
    //   }
    // });

    // return unsubscribe;
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  if (auth.isLoading) {
    return <></>;
  }

  return (
    <NavigationContainer onReady={onLayoutRootView}>
      <Stack.Navigator>
        {auth.user ? (
          <>
            <Stack.Screen
              options={({ navigation }) => ({
                header: () => (
                  <Header title={"Notifications"} navigation={navigation} />
                ),
              })}
              name="notifications"
              component={Threads}
            />
            <Stack.Screen
              name="messages"
              component={Messages}
              options={() => ({
                headerStyle: { backgroundColor: "#35374B" },
                headerTintColor: "#fff",
                title: "Messages",
              })}
            />
            <Stack.Screen
              name="profile"
              component={Profile}
              options={() => ({
                title: "Profile",
                headerStyle: { backgroundColor: "#35374B" },
                headerTintColor: "#fff",
                headerRight: () => (
                  <ButtonUI
                    onPress={() => dispatch(logout())}
                    btnStyle={styles.btnSignout}
                  >
                    <Icon name="sign-out" size={30} color="#fff" />
                  </ButtonUI>
                  // <Pressable onPress={() => dispatch(logout())}>
                  //   <Icon name="sign-out" size={30} color="#fff" />
                  // </Pressable>
                ),
              })}
            />
            <Stack.Screen
              options={() => ({
                headerStyle: { backgroundColor: "#35374B" },
                headerTintColor: "#fff",
                title: "Edit profile",
              })}
              name="editProfile"
              component={EditProfile}
            />
          </>
        ) : (
          <>
            {/* <Stack.Screen
              name="login"
              component={Login}
              options={{ headerShown: false }}
            /> */}
            <Stack.Screen name="login" options={{ headerShown: false }}>
              {(props) => <Login {...props} fcmToken={fcmToken} />}
            </Stack.Screen>
            <Stack.Screen
              name="verifyOTP"
              component={VerifyOTP}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  btnSignout: {
    paddingHorizontal: 0,
  },
});
