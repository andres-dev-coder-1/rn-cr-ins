import { useState } from 'react';
import { StyleSheet, View, Text, Image, Pressable } from 'react-native';
import { colors } from '../global/colors';
import ProfileButton from '../components/ProfileButton';

import { useDispatch, useSelector } from 'react-redux';
import { useGetProfileImageQuery } from '../services/shopServices';
import { clearUser } from '../features/User/UserSlice';
import { truncateSessionTable } from '../persistence';


const MyProfile = ({ navigation }) => {

  const dispatch = useDispatch();
  const { imageCamera, localId } = useSelector((state) => state.auth.value);
  const { data: imageFromBase } = useGetProfileImageQuery(localId);

  const defaultImageRoute = "../../assets/user.png";


  const launchCamera = async () => {
    navigation.navigate("Image Selector");
  };

  const launchLocation = async () => {
    navigation.navigate("List Address");
  };

  const signOut = async () => {
    try {
      const response = await truncateSessionTable();
      // console.log(response);
      dispatch(clearUser());
    } catch (error) {
      // console.log({ errorSignOutDB: error });
    }
  };


  return (

    <View style={styles.container}>
      {imageFromBase || imageCamera ? (
        <Image
          source={{ uri: imageFromBase?.image || imageCamera }}
          style={styles.img}
          resizeMode="cover"
        />
      ) : (
        <Image
          style={styles.img}
          resizeMode="cover"
          source={require(defaultImageRoute)}
        />
      )}
      <ProfileButton
        onPress={launchCamera}
        title={
          imageFromBase || imageCamera ?
            "Modificar foto de perfil"
            :
            "Agrega foto de perfil"}
      />
      <ProfileButton
        onPress={launchLocation}
        title={"Mi dirección"}
      />
      <ProfileButton
        onPress={signOut}
        title={"Cerrar sesión"}
      />


    </View>

  );
};

export default MyProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  img: {
    marginTop: 20,
    height: 200,
    width: 200,
    borderRadius: 100,
  },
});