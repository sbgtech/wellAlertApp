import React, { useEffect } from "react";
import { StyleSheet, View, Text, FlatList, Alert } from "react-native";
import ChatBubble from "react-native-chat-bubble";
import Moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { getMessages } from "../store/message/messageAction";

export default function Messages({ route }) {
  const { conversation_id, device_name } = route.params;
  const messages = useSelector((state) => state.message);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMessages(conversation_id));
  }, []);
  const handleEmpty = () => {
    return <Text style={styles.emptyData}> No messages!</Text>;
  };
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{device_name}</Text>
      <FlatList
        ListEmptyComponent={handleEmpty}
        onRefresh={() => console.log("refreshing")}
        refreshing={false}
        data={messages.messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ChatBubble
            onPress={() =>
              Alert.alert("Read at", Moment(item.readAt).format("lll"))
            }
            isOwnMessage={false}
            bubbleColor="lightgrey"
            withTail={true}
            style={styles.chatBubble}
          >
            <Text style={styles.text}>{item.body}</Text>
            <Text style={styles.itemDate}>
              {Moment(item.createdAt).format("lll")}
            </Text>
          </ChatBubble>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    padding: 20,
  },
  name: {
    color: "#000",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    paddingBottom: 10,
  },
  // chatBubble: {
  //   padding: 20,
  //   backgroundColor: "red",
  // },
  text: {
    padding: 5,
  },
  itemDate: {
    fontSize: 11,
    color: "grey",
    paddingHorizontal: 5,
    textAlign: "right",
  },
  emptyData: {
    padding: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
});
