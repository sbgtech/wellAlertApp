import React from "react";
import { Text, StyleSheet, Pressable } from "react-native";

export default function ButtonUI(props) {
  const { onPress, disabled, title, btnStyle, textStyle, children } = props;
  return (
    <Pressable
      disabled={disabled}
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.5 : 1,
        },
        styles.button,
        btnStyle,
      ]}
      onPress={onPress}
    >
      {children ? children : <Text style={textStyle}>{title}</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    // backgroundColor: "#ddd",
    minHeight: 40,
  },
});
