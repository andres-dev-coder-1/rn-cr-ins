import { Image, StyleSheet, Text, View } from 'react-native';
import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from '../components/ProfileButton';

import * as ImagePicker from 'expo-image-picker';
import { setCameraImage } from '../features/User/UserSlice';
import { useGetProfileImageQuery, usePostProfileImageMutation } from '../services/shopServices';

const ImageSelector = ({ navigation }) => {

  const { localId } = useSelector((state) => state.auth.value);
  const [image, setImage] = useState(null);
  const [triggerPostImage, result] = usePostProfileImageMutation();

  const { data: imageFromBase } = useGetProfileImageQuery(localId);

  const dispatch = useDispatch();

  const verifyCameraPermissions = async () => {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();

    if (!granted) {
      return false;
    }
    return true;
  };

  const pickImage = async () => {
    const isCameraOk = await verifyCameraPermissions();

    if (isCameraOk) {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        base64: true,
        quality: 0.5,
      });

      if (!result.canceled) {
        setImage(`data:image/jpg;base64, ${result.assets[0].base64}`);
      }
    }
  };

  const confirmImage = () => {
    try {
      dispatch(setCameraImage(image));
      triggerPostImage({ image, localId });
      navigation.goBack();
    } catch (error) {
      // console.error(error);  // Reemplazar por ALERT
    }

  };


  return (
    <View style={styles.container}>
      {
        image ?
          <>
            <Image source={{ uri: image }} style={styles.img} resizeMode='cover' />
            <ProfileButton title="Toma otra foto" onPress={pickImage} />
            <ProfileButton title="Confirmar foto" onPress={confirmImage} />
          </>
          :
          !imageFromBase?.image ?
            <>
              <View style={styles.photoContainer}>
                <Text>No hay foto para mostrar...</Text>
              </View>
              <ProfileButton title="Toma una nueva foto" onPress={pickImage} />
            </>
            :
            <>
              <Image source={{ uri: imageFromBase?.image }} style={styles.img} resizeMode='cover' />
              <ProfileButton title="Toma otra foto" onPress={pickImage} />
            </>
      }
    </View>
  );
};

export default ImageSelector;

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
  photoContainer: {
    marginTop: 20,
    height: 200,
    width: 200,
    borderWidth: 1,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  }

});