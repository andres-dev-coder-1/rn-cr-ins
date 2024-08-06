import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native';

import { useSelector } from 'react-redux';
import { usePostOrderMutation } from '../services/shopServices';

import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

import CartItem from '../components/CartItem';


const Cart = () => {

  const { user } = useSelector((state) => state.auth.value);
  const { items: CartData, total, updatedAt } = useSelector((state) => state.cart.value);
  const [triggerPostOrder, result] = usePostOrderMutation();

  const onConfirmOrder = () => {
    const id = generateId();
    triggerPostOrder({ updatedAt, items: CartData, user, total, id });
  };

  const generateId = () => {
    return uuidv4();
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={CartData}
        renderItem={({ item }) => {
          return <CartItem cartItem={item} />;
        }}
        keyExtractor={(producto) => producto.id}
      />

      <View style={styles.totalContainer}>
        <Pressable onPress={onConfirmOrder}>
          <Text>Confirm Order</Text>
        </Pressable>
        <Text>Total: $ {total}</Text>
      </View>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    flex: 1,
    marginBottom: 100,
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});


