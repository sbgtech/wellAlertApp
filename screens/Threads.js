import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
} from "react-native";
import ThreadItem from "../components/threadItem";
import { useDispatch, useSelector } from "react-redux";
import { getThreads } from "../store/thread/threadAction";
import Icon from "react-native-vector-icons/FontAwesome";
import ButtonUI from "../components/ButtonUI";

export default function Threads({ navigation }) {
  // const [conversation, setConversation] = useState(threads);
  const threads = useSelector((state) => state.thread);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getThreads());
  }, []);

  const handleEmpty = () => {
    return (
      <View style={styles.emptyDataContainer}>
        <Text style={styles.emptyData}> No threads present!</Text>
        <ButtonUI
          onPress={() => dispatch(getThreads())}
          btnStyle={styles.btnRefresh}
        >
          <Text style={styles.textEmptyBtnRefresh}>Refresh </Text>
          <Icon name="refresh" size={20} color="#fff" />
        </ButtonUI>
      </View>
    );
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <FlatList
          ListEmptyComponent={handleEmpty}
          onRefresh={() => dispatch(getThreads())}
          //if set to true, the UI will show a loading indicator
          refreshing={false}
          data={threads.threads}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ThreadItem navigation={navigation} item={item} />
          )}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: "#f0f0f0",
  },
  emptyDataContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  emptyData: {
    padding: 8,
    fontWeight: "bold",
  },
  btnRefresh: {
    flexDirection: "row",
    backgroundColor: "#35374B",
  },
  textEmptyBtnRefresh: {
    fontWeight: "bold",
    color: "#fff",
  },
});
