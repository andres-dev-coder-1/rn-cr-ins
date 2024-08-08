import React, { useEffect, useState } from "react";
import { colors } from "../global/colors";

import {
  Button,
  Image,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";


import { useGetProductByIdQuery } from "../services/shopServices";
import { useDispatch } from "react-redux";
import { addCartItem } from "../features/Cart/CartSlice";
import ProfileButton from "../components/ProfileButton";


const ItemDetail = ({ route, navigation }) => {
  const { width, height } = useWindowDimensions();
  const [orientation, setOrientation] = useState("portrait");
  //  const [product, setProduct] = useState(null);
  const { productoId: idSelected } = route.params;

  const dispatch = useDispatch();

  const { data: product, error, isLoading } = useGetProductByIdQuery(idSelected);

  // Landscape: Horisontal
  // Portraint: Vertical
  useEffect(() => {
    if (width > height) setOrientation("landscape");
    else setOrientation("portrait");
  }, [width, height]);

  const handleAddCart = () => {
    // agregar al carrito
    dispatch(addCartItem);
    dispatch(addCartItem({ ...product, price: getFinalPrice(product.price, product.discountPercentage), quantity: 1 }));
  };

  const getFinalPrice = (productPrice, discountPercentage) => (
    productPrice * (100 - discountPercentage) / 100
  );

  return (
    <View>
      {product ? (
        <View
          style={
            orientation === "portrait"
              ? styles.mainContainer
              : styles.mainContainerLandscape
          }
        >
          <Text style={styles.productTitle}>{product.title}</Text>
          <Image
            source={{ uri: product.images[0] }}
            style={
              orientation === "portrait" ? styles.image : styles.imageLandscape
            }
            resizeMode="contain"
          />

          <View style={styles.priceContainer}>
            <Text style={styles.textDiscount}>{product.discountPercentage}% OFF</Text>
            <View style={styles.containerPriceDiscount}>
              <Text style={styles.textDiscountPercentage}>${getFinalPrice(product.price, product.discountPercentage)}</Text>
              <Text style={styles.textPrice}>${product.price}</Text>
            </View>
          </View>
          <ProfileButton
            onPress={handleAddCart}
            title={"Agregar al carrito"}
          />

          <View
            style={
              orientation === "portrait"
                ? styles.textContainer
                : styles.textContainerLandscape
            }
          >
            <Text style={styles.productDescription}>{product.description}</Text>
          </View>

        </View>
      ) : null}
    </View>
  );
};

export default ItemDetail;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  mainContainerLandscape: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 10,
    gap: 10,
  },
  image: {
    marginTop: 20,
    marginBottom: 30,
    width: "100%",
    height: 250,
  },
  imageLandscape: {
    width: "45%",
    height: 200,
  },
  textContainer: {
    // borderWidth: 1,
    width: "100%",
  },
  productTitle: {
    fontSize: 25,
    fontWeight: 'bold'
  },
  textContainerLandscape: {
    width: "50%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "start",
    gap: 10,
  },
  productDescription: {
    fontSize: 20,
    marginLeft: 20,
    marginTop: 25,
    textAlign: "left",
    // width: "50%"
  },
  priceContainer: {
    // borderWidth: 1,
    marginTop: 4,
    width: "100%",
    alignItems: "center"
  },
  containerPriceDiscount: {
    flexDirection: "row",
    marginTop: 3
  },
  textDiscount: {
    color: colors.orange900,
    fontWeight: "900",
    fontSize: 26,
  },
  textDiscountPercentage: {
    color: colors.green900,
    fontSize: 40,
  },
  textPrice: {
    color: colors.green800,
    textDecorationLine: "line-through",
    fontSize: 20.5,
  },
  btnCart: {
    marginTop: 200,
    color: "red",
  }
});
