import React, { useState, createContext } from "react";

export const MapContext = createContext(null);

export function MapProvider(props) {
  const [region, setRegion] = useState({
    latitude: 54.093,
    longitude: -2.895,
    latitudeDelta: 10,
    longitudeDelta: 10,
  });

  return (
    <MapContext.Provider value={{ region, setRegion }}>
      {props.children}
    </MapContext.Provider>
  );
}
