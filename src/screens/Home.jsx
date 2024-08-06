import React from "react";
import { StyleSheet, View, FlatList, Text } from "react-native";
import CategoryItem from "../components/CategoryItem";
import { colors } from "../global/colors";
// import categories from "../data/categories.json";

// hooks RTK Query
import { useGetCategoriesQuery } from "../services/shopServices";

const Home = ({ navigation, route }) => {

  const { data: categories } = useGetCategoriesQuery();


  return (
    <View style={styles.mainContainer}>
      <Text style={styles.title}>Elige una de nuestras categorías</Text>
      <View style={styles.flatListContainer}>
        <FlatList
          keyExtractor={(category) => category}
          data={categories}
          renderItem={({ item }) => (
            <CategoryItem category={item} navigation={navigation} />
          )}
        />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    marginTop: 20,
    width: "70%",
    textAlign: "center",
    fontSize: 26,
    lineHeight: 25,
    fontWeight: "bold",
    color: colors.black
  },
  flatListContainer: {
    width: "100%",
    marginTop: 20,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});
