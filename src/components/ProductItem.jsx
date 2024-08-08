import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import Card from "./Card";
import { colors } from "../global/colors";

import { useDispatch } from "react-redux";
import { setItemSelected } from "../features/Shop/ShopSlice";


const ProductItem = ({
  product,
  navigation
}) => {

  const dispatch = useDispatch();

  const handleNavigate = () => {
    dispatch(setItemSelected(product.title));
    navigation.navigate("ItemDetail", { productoId: product.id });
  };


  const getFinalPrice = (productPrice, discountPercentage) => (
    productPrice * (100 - discountPercentage) / 100
  );

  return (
    <Card style={styles.additionalStylesCard}>
      <Pressable
        style={styles.pressable}
        onPress={handleNavigate}
      >
        <View style={styles.textContainer}>
          <Text style={styles.textTitle}>{product.title}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.textDiscount}>{product.discountPercentage}% OFF</Text>
            <View style={styles.containerPriceDiscount}>
              <Text style={styles.textDiscountPercentage}>${getFinalPrice(product.price, product.discountPercentage)}</Text>
              <Text style={styles.textPrice}>${product.price}</Text>
            </View>
          </View>
        </View>
        <Image
          resizeMode="cover"
          style={styles.image}
          source={{ uri: product.images[0] }}
        />
      </Pressable>
    </Card>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  image: {
    height: 160,
    width: "30%",
    // borderRadius: 8,
  },
  additionalStylesCard: {
    height: 160,
    width: 300,
    margin: 10,
    paddingLeft: 10,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  textContainer: {
    maxWidth: 190,
  },
  textTitle: {
    color: colors.blue1000,
    fontSize: 22,
    fontWeight:"700",
    lineHeight:21.5,
    width: '95%',
  },
  priceContainer: {
    marginTop: 4
  },
  containerPriceDiscount:{
    flexDirection:"row",
    marginTop:3
  },
  textDiscount: {
    color: colors.orange900,    
    fontWeight:"900",
    fontSize: 18,    
  },
  textDiscountPercentage: {
    color: colors.green900,
    fontSize: 25,
  },
  textPrice: {
    color: colors.green800,
    textDecorationLine: "line-through",
    fontSize: 15.5,
  },
  pressable: {
    width: "100%",
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
  }
});
