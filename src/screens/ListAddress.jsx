import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react"
import ProfileButton from "../components/ProfileButton";
import  AddressItem  from "../components/AddressItem";
import { useSelector } from "react-redux"
import { useGetLocationQuery } from "../services/shopServices"


const ListAddress = ({ navigation }) => {

  const {localId} = useSelector((state) => state.auth.value)
  const {data: location} = useGetLocationQuery(localId)

  return location ? (
    <AddressItem
      location={location}
      navigation={navigation}
    />
  ) : (
    <View style={styles.container}>
      <Text style={styles.text}>Aún no tienes establecida tu ubicación</Text>
      <ProfileButton
        title="Establecer ubicación"
        onPress={() => navigation.navigate("Location Selector")}
      />
    </View>
  );
};

export default ListAddress;

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    alignItems: "center",
  },
  text: {
    paddingVertical: 20,
    fontFamily: "Josefin",
    fontSize: 18,
  },
});
