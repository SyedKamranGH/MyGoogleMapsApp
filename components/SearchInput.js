import React from "react";
import { View, TextInput, StyleSheet } from "react-native";

/**
 * A reusable search input component that handles text input and calls a callback on change.
 * @param {Object} props - Component props.
 * @param {Function} props.onChangeText - Callback function when text changes.
 * @returns {JSX.Element}
 */
const SearchInput = ({ onChangeText, placeholder }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder || "Search for places..."}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

export default SearchInput;
