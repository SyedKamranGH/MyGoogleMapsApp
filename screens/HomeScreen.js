import React, { useState, useEffect } from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import SearchInput from "../components/SearchInput";
import MapViewComponent from "../components/MapViewComponent";
import HistoryList from "../components/HistoryList";
import axios from "axios";
import { GOOGLE_MAPS_API_KEY } from "@env";
// Import your storage solution here. For MMKV, it might look like:
// import MMKVStorage from 'react-native-mmkv-storage';
// For this example, assume we create a simple in-memory storage or use expo-file-system based storage

const HomeScreen = () => {
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [history, setHistory] = useState([]);

  // Function to fetch place suggestions from Google Places API
  const fetchSuggestions = async (text) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${text}&key=${GOOGLE_MAPS_API_KEY}`
      );
      if (response.data.predictions) {
        setSuggestions(response.data.predictions);
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  // Handle search text change
  const handleSearchChange = (text) => {
    setSearchText(text);
    if (text.length > 2) {
      fetchSuggestions(text);
    }
  };

  // Function to handle place selection from suggestions or history
  const handlePlaceSelect = async (place) => {
    // For example, extract the place_id and then fetch details from Google Places Details API
    try {
      const detailsResponse = await axios.get(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place.place_id}&key=${GOOGLE_MAPS_API_KEY}`
      );
      if (detailsResponse.data.result) {
        const details = detailsResponse.data.result;
        const selected = {
          name: details.name,
          address: details.formatted_address,
          coordinate: {
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
          },
        };
        setSelectedPlace(selected);
        // Update search history and persist it using your chosen storage solution
        const updatedHistory = [selected, ...history];
        setHistory(updatedHistory);
        // Persist updatedHistory to local storage here.
      }
    } catch (error) {
      console.error("Error fetching place details:", error);
    }
  };

  // Function to handle selection from history list
  const handleHistorySelect = (item) => {
    setSelectedPlace(item);
  };

  // Example region for the map if a place is selected; otherwise default region.
  const region = selectedPlace
    ? {
        latitude: selectedPlace.coordinate.latitude,
        longitude: selectedPlace.coordinate.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }
    : {
        latitude: 31.5497,
        longitude: 74.3436,
        latitudeDelta: 0.2,
        longitudeDelta: 0.2,
      };

  return (
    <SafeAreaView style={styles.container}>
      <SearchInput onChangeText={handleSearchChange} />
      <MapViewComponent region={region} marker={selectedPlace} />
      <HistoryList history={history} onSelect={handleHistorySelect} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeScreen;
