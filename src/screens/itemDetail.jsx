import React, { useEffect, useState } from "react";

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
    dispatch(addCartItem({ ...product, quantity: 1 }));
  };

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
          <View
            style={
              orientation === "portrait"
                ? styles.textContainer
                : styles.textContainerLandscape
            }
          >
            <Text>{product.description}</Text>
            <Text style={styles.price}>${product.price}</Text>
            <Button title="Agregar al carrito" onPress={handleAddCart}></Button>
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
    alignItems: "flex-start",
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
    flexDirection: "column",
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
  price: {
    textAlign: "right",
  },
});
