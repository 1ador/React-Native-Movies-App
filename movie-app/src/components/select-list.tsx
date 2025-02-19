import React, { useRef, useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";

interface SelectListProps {
  selectedValue: string;
  onValueChange: (value: string) => void;
  mode: string;
  hasError?: boolean;
}

const SelectList: React.FC<SelectListProps> = ({ selectedValue, onValueChange, mode, hasError }) => {
  const actionSheetRef = useRef<ActionSheetRef>(null);

  const categoryList =
    mode === "movie"
      ? ["now_playing", "popular", "top_rated", "upcoming"]
      : mode === "tv"
        ? ["airing_today", "on_the_air", "popular", "top_rated"]
        : ["movie", "multi", "tv"];

  const handleValueChange = (value: string) => {
    onValueChange(value);
    actionSheetRef.current?.hide();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => actionSheetRef.current?.show()} style={[styles.selectBox, hasError && styles.errorBorder]}>
        <Text style={styles.text}>{selectedValue}</Text>
        <Ionicons name="chevron-down" size={20} color="gray" />
      </TouchableOpacity>

      <ActionSheet ref={actionSheetRef} gestureEnabled={true}>
        <FlatList
          data={categoryList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.option}
              onPress={() => handleValueChange(item)}
            >
              <Text style={styles.optionText}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      </ActionSheet>
    </View>
  );
};

export default SelectList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  selectBox: {
    width: 200,
    height: 40,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 4,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
  },
  errorBorder: {
    borderColor: "#EF4444",
  },
  text: {
    fontSize: 16,
    color: "#000",
  }, 
  option: {
    paddingVertical: 15,
    alignItems: "center",
  },
  optionText: {
    fontSize: 16,
    color: "#000",
  },
});
