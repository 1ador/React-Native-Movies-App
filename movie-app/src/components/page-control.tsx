import React from "react";
import { View, Button, Text, StyleSheet } from "react-native";

interface PaginationProps {
  page: number;
  onNext: () => void;
  onPrev: () => void;
  disableNext: boolean;
  disablePrev: boolean;
}

const PageControl: React.FC<PaginationProps> = ({
  page,
  onNext,
  onPrev,
  disableNext,
  disablePrev,
}) => {
  return (
    <View style={styles.pagination}>
      <Button title="Prev" onPress={onPrev} disabled={disablePrev} />
      <Text>
        Page {page}
      </Text>
      <Button title="Next" onPress={onNext} disabled={disableNext} />
    </View>
  );
};

const styles = StyleSheet.create({
  pagination: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
  },
});

export default PageControl;
