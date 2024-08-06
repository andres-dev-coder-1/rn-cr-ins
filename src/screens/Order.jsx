import React, { useCallback } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import OrderItem from "../components/OrderItem";
import { useSelector } from 'react-redux';
import { useGetOrderByUserQuery } from '../services/shopServices';
import { useFocusEffect } from '@react-navigation/native';

const Order = () => {

  const { user, localId } = useSelector((state) => state.auth.value);
  const { data: OrderData, refetch } = useGetOrderByUserQuery(user);

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

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
