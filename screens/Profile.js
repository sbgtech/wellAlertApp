import React from "react";
import { StyleSheet, View, Text } from "react-native";
import ButtonUI from "../components/ButtonUI";
import AvatarUI from "../components/AvatarUI";
import { useSelector } from "react-redux";
import Moment from "moment";

export const Profile = ({ navigation }) => {
  const auth = useSelector((state) => state.user);
  const { name, email, country_code, phone_number, createdAt } = auth.user;
  const created = Moment(createdAt).format("lll");
  return (
    <View style={styles.container}>
      <AvatarUI
        name={auth.user.name ? auth.user.name : auth.user.phone_number}
        avatarStyle={styles.itemAvatar}
        size={80}
      />
      <View>
        <Text style={styles.label}>Name</Text>
        <Text style={styles.text}>{name}</Text>
      </View>
      <View>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.text}>{email}</Text>
      </View>
      <View>
        <Text style={styles.label}>Phone number</Text>
        <Text style={styles.text}>
          {country_code}
          {phone_number}
        </Text>
      </View>
      <View>
        <Text style={styles.label}>Created at</Text>
        <Text style={styles.text}>{created}</Text>
      </View>
      <ButtonUI
        onPress={() => navigation.navigate("editProfile")}
        title={"Edit profile"}
        textStyle={styles.txtBtnEdit}
        btnStyle={styles.btnEdit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    gap: 20,
  },
  itemAvatar: {
    width: 85,
    height: 85,
    borderRadius: 50,
    marginTop: 10,
    marginBottom: 20,
    marginLeft: "auto",
    marginRight: "auto",
  },
  label: {
    color: "grey",
    fontSize: 16,
  },
  text: {
    paddingTop: 5,
  },
  btnEdit: {
    marginTop: "auto",
    marginBottom: 15,
    backgroundColor: "#35374B",
    borderRadius: 9,
    minHeight: 50,
  },
  txtBtnEdit: { color: "#fff", fontSize: 16 },
});
