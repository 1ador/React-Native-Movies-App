import React, { useRef } from "react";
import { View, TouchableOpacity, Text, StyleSheet, FlatList } from "react-native";
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
      <TouchableOpacity 
        onPress={() => actionSheetRef.current?.show()} 
        style={[styles.selectBox, hasError && styles.errorBorder]}>
        <Text style={styles.text}>{selectedValue}</Text>
        <Ionicons name="chevron-down" size={20} color="gray" />
      </TouchableOpacity>

      <ActionSheet 
        ref={actionSheetRef} 
        gestureEnabled={true}
        containerStyle={styles.actionSheetContainer} >
        <FlatList
          data={categoryList}
          keyExtractor={(item) => item}
          renderItem={({ item }) => {
            const isSelected = item === selectedValue;
            return (
              <TouchableOpacity
                style={isSelected ? [styles.option, styles.selectedOption] : styles.option}
                onPress={() => handleValueChange(item)}
              >
                <Text style={isSelected ? [styles.optionText, styles.selectedOptionText] : styles.optionText }>
                  {item}
                </Text>
                {isSelected && (
                  <Ionicons 
                    name="checkmark" 
                    size={20} 
                    color="white"
                  />
                )}
              </TouchableOpacity>
            );
          }}
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  actionSheetContainer: {
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  optionText: {
    fontSize: 16,
    color: "#000",
    fontWeight: "bold",
    paddingHorizontal: 10,
  },
  selectedOption: {
    backgroundColor: "#469738",
    borderRadius: 12,
  },
  selectedOptionText: {
    color: "white",
  },
});
