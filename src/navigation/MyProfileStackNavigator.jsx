import { StyleSheet, Text, View } from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyProfile from '../screens/MyProfile';
import ImageSelector from '../screens/ImageSelector';

import LocationSelector from "../screens/LocationSelector";
import ListAddress from "../screens/ListAddress";

const Stack = createNativeStackNavigator();

const MyProfileStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName='My Profile Stack'
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name='My Profile Stack' component={MyProfile} />
      <Stack.Screen name='Image Selector' component={ImageSelector} />
      <Stack.Screen name='List Address' component={ListAddress} />
      <Stack.Screen name='Location Selector' component={LocationSelector} />
    </Stack.Navigator>
  );
};

export default MyProfileStackNavigator;

const styles = StyleSheet.create({});