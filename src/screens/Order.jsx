import { StyleSheet, Text, View, FlatList } from 'react-native';
// import OrderData from "../data/orders.json";
import OrderItem from "../components/OrderItem";
import { useGetOrderByUserQuery } from '../services/shopServices';
import { useEffect } from 'react';

const Order = () => {

  const { data: OrderData } = useGetOrderByUserQuery("pepito@mail.com");  ///// OJO : Tomar email de la sesión  
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
