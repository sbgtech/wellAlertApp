import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import AvatarUI from "./AvatarUI";
import { useSelector } from "react-redux";
import { StatusBar } from "expo-status-bar";

export const Header = ({ title, navigation }) => {
  const auth = useSelector((state) => state.user);
  if (!auth.user) {
    return null;
  }
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        minHeight: 60,
        paddingVertical: 20,
        paddingHorizontal: 12,
        paddingTop: 35,
        backgroundColor: "#35374B",
      }}
    >
      <StatusBar style="light" />
      <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 20 }}>
        {title}
      </Text>

      <Pressable
        style={({ pressed }) => [
          {
            opacity: pressed ? 0.5 : 1,
          },
        ]}
        onPress={() => navigation.navigate("profile")}
      >
        <AvatarUI
          name={auth.user.name ? auth.user.name : auth.user.phone_number}
          avatarStyle={styles.itemAvatar}
          size={45}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 70,
    paddingTop: 25,
    backgroundColor: "coral",
  },
  title: {
    textAlign: "center",
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  itemAvatar: {
    height: 50,
    width: 50,
  },
});
