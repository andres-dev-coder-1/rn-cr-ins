import { StyleSheet, Text, View } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStackNavigator from './HomeStackNavigator';
import CartStackNavigator from './CartStackNavigator';
import OrderStackNavigator from './OrderStackNavigator';

import { useSelector } from 'react-redux';

import Header from '../components/Header';
import { colors } from '../global/colors';

import { FontAwesome5 } from "@expo/vector-icons";
import MyProfileStackNavigator from './MyProfileStackNavigator';

const Tab = createBottomTabNavigator();

const BottomTapNavigator = () => {

  const { showBackButton } = useSelector(state => state.backButton.value);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        header: ({ navigation, route }) => {
          const isRootScreen = navigation.isFocused() && navigation.canGoBack();
          return (
            <Header
              title={route.name}
              showBackButton={showBackButton || isRootScreen}
              onBackPress={() => navigation.goBack()}
            />
          );
        },
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      })}
    >
      <Tab.Screen
        name="Inicio"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View>
                <FontAwesome5 name="home" size={24} color={focused ? "black" : colors.blue200} />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Carrito de Compras"
        component={CartStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View>
                <FontAwesome5 name="shopping-cart" size={24} color={focused ? "black" : colors.blue200} />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Mís Órdenes"
        component={OrderStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View>
                <FontAwesome5
                  name="receipt"
                  size={24}
                  color={focused ? "black" : colors.blue200}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Mi Perfil"
        component={MyProfileStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View>
                <FontAwesome5
                  name="user-alt"
                  size={24}
                  color={focused ? "black" : colors.blue200}
                />
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTapNavigator;

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.blue900,
    height: 60
  }
});
