import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";

/**
 * MapViewComponent to display a map with an optional marker.
 * @param {Object} props - Component props.
 * @param {Object} props.region - The region object with latitude, longitude, latitudeDelta, and longitudeDelta.
 * @param {Object} props.marker - The marker details including coordinate, title, and description.
 * @returns {JSX.Element}
 */
const MapViewComponent = ({ region, marker }) => {
  return (
    <MapView style={styles.map} region={region}>
      {marker && (
        <Marker
          coordinate={marker.coordinate}
          title={marker.title}
          description={marker.description}
        />
      )}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 2,
  },
});

export default MapViewComponent;
