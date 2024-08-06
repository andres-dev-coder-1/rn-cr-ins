import { StyleSheet, Text, View, FlatList } from 'react-native';
// import OrderData from "../data/orders.json";
import OrderItem from "../components/OrderItem";
import { useDispatch, useSelector } from 'react-redux';
import { useGetOrderByUserQuery } from '../services/shopServices';
import { useEffect } from 'react';

const Order = () => {

  const { user, localId } = useSelector((state) => state.auth.value);
  const { data: OrderData } = useGetOrderByUserQuery(user);  

  return (
    <View>
      <FlatList
        data={OrderData}
        keyExtractor={(orderItem) => orderItem.id}
        renderItem={({ item }) => {
          return <OrderItem order={item} />;
        }}
      />
    </View>
  );
};

export default Order;

const styles = StyleSheet.create({});
