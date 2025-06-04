import React from "react";
import { StyleSheet } from "react-native";
import UserAvatar from "react-native-user-avatar";

export default function AvatarUI(props) {
  const randomColor = () => {
    let randomHue = Math.floor(Math.random() * 360);
    return randomHue;
  };
  const getBackgroundColor = `hsl(${randomColor()}, 50% , 50%)`;
  const { name, size, avatarStyle } = props;
  return (
    <UserAvatar
      style={{ ...styles.itemAvatar, ...(avatarStyle ? avatarStyle : {}) }}
      name={name}
      textColor={"#fff"}
      size={size}
      bgColor={getBackgroundColor}
    />
  );
}

const styles = StyleSheet.create({
  itemAvatar: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
});
