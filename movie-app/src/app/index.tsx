import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { View, StyleSheet } from "react-native";
import MovieScreen from "../pages/movie-screen";
import SearchScreen from "../pages/search-result-screen";
import TVShowScreen from "../pages/tv-shows-screen";

const Tab = createMaterialTopTabNavigator(); 

export default function Index() {
  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={{
          tabBarIndicatorStyle: {
            backgroundColor: "#273646",
            height: 3,
          },
          tabBarActiveTintColor: "#273646",
          tabBarInactiveTintColor: "gray",
         
        }}
      >
        <Tab.Screen
          name="Movies"
          component={MovieScreen}
        />
        <Tab.Screen
          name="Search Result"
          component={SearchScreen}
        />
        <Tab.Screen
          name="TV Shows"
          component={TVShowScreen}
        />
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
});