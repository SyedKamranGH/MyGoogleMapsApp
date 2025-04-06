import React from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
} from "react-native";

/**
 * HistoryList component displays a list of searched locations.
 * @param {Object} props - Component props.
 * @param {Array} props.history - Array of search history items.
 * @param {Function} props.onSelect - Callback when a history item is selected.
 * @returns {JSX.Element}
 */
const HistoryList = ({ history, onSelect }) => {
  return (
    <FlatList
      data={history}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => onSelect(item)}>
          <View style={styles.item}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.subtitle}>{item.address}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
  },
});

export default HistoryList;
