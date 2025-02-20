// import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
// import { View, StyleSheet } from "react-native";
// import MovieScreen from "../pages/movie-screen";
// import SearchScreen from "../pages/search-result-screen";
// import TVShowScreen from "../pages/tv-shows-screen";

// const Tab = createMaterialTopTabNavigator(); 

// export default function Index() {
//   return (
//     <View style={{ flex: 1 }}>
//       <Tab.Navigator
//         screenOptions={{
//           tabBarIndicatorStyle: {
//             backgroundColor: "#273646",
//             height: 3,
//           },
//           tabBarActiveTintColor: "#273646",
//           tabBarInactiveTintColor: "gray",
//           lazy: false
//         }}
//       >
//         <Tab.Screen
//           name="Movies"
//           component={MovieScreen}
//         />
//         <Tab.Screen
//           name="Search Result"
//           component={SearchScreen}
//         />
//         <Tab.Screen
//           name="TV Shows"
//           component={TVShowScreen}
//         />
//       </Tab.Navigator>
//     </View>
//   );
// }

import { View, Text, StyleSheet, TouchableOpacity, Animated } from "react-native";
import { useRef, useState } from "react";
import MovieScreen from "../pages/movie-screen";
import SearchScreen from "../pages/search-result-screen";
import TVShowScreen from "../pages/tv-shows-screen";

export default function Index() {
  const tabs = ["Movies", "Search Results", "TV Shows"];
  const [selectedTab, setSelectedTab] = useState("Movies");
  const tabPosition = useRef(new Animated.Value(0)).current;

  const renderScreen = () => {
    switch (selectedTab) {
      case "Movies":
        return <MovieScreen />;
      case "Search Results":
        return <SearchScreen />;
      case "TV Shows":
        return <TVShowScreen />;
      default:
        return <MovieScreen />;
    }
  };

  const handleTabPress = (tab: string, index: number) => {
    setSelectedTab(tab);
    Animated.spring(tabPosition, {
      toValue: index * (100 / tabs.length),
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={styles.flexContainer}>
      <View style={styles.tabContainer}>
        <View style={styles.tabRow}>
          {tabs.map((tab, index) => (
            <TouchableOpacity 
              key={tab} 
              onPress={() => handleTabPress(tab, index)} 
              style={styles.tabButton}>
              <Text style={[styles.tabText, selectedTab === tab && styles.activeTabText]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.bottomLine}>
          <Animated.View
            style={[
              styles.activeIndicator,
              {
                left: tabPosition.interpolate({
                  inputRange: [0, 100],
                  outputRange: ["0%", "100%"],
                }),
              },
            ]}
          />
        </View>
      </View>

      <View style={styles.flexContainer}>
        {renderScreen()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
  tabContainer: {
    paddingVertical: 16,
  },
  tabRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    position: "relative",
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
  },
  tabText: {
    color: "gray",
    fontSize: 16,
  },
  activeTabText: {
    color: "#273646",
    fontWeight: "bold",
  },
  bottomLine: {
    height: 3,
    marginTop: 16,
    position: "relative",
    backgroundColor: "#E1E3E8",
  },
  activeIndicator: {
    position: "absolute",
    width: "33.33%",
    height: "100%",
    backgroundColor: "#273646",
  },
});