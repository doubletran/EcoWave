import { useRef, useState } from "react";
import { useEffect } from "react";
import { Box, Container, IconButton, Input, useTheme } from "native-base";
import { getRegionByCoords } from "../config/lib";
import { StyleSheet, Dimensions } from "react-native";

import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { INPUT_ICONS } from "../config/style";
import { MAP_API_KEY } from "../App";

const MapSearchbox = ({ handleReturn, goBack, coords, address }) => {
  const ref = useRef();
  useEffect(() => {
    setTimeout(() => {
      ref.current.focus(); //setTimeout to wait for ref to be assigned before call focus
    }, 10);
  }, []);
  useEffect(() => {
    console.log("address: " + address);
    if (!coords.address){
      ref.current.setAddressText(address)
    }

  }, [address, coords]);

  return (
    <>
      <GooglePlacesAutocomplete
        ref={ref}
        renderRightButton={() => (
          <IconButton
            icon={INPUT_ICONS.Clear}
            onPress={() => ref.current.clear()}
          />
        )}
        renderLeftButton={() => (
          <IconButton icon={INPUT_ICONS.Back} onPress={goBack} />
        )}
        placeholder={
          address || address == ""
            ? `${coords.latitude}, ${coords.longitude}`
            : address
        }
        isRowScrollable={true}
        fetchDetails={true}
        autoFocus={true}
        onPress={(
          data,
          {
            formatted_address,
            geometry: {
              location,
              viewport: { northeast, southwest },
            },
          }
        ) => {
          let region = getRegionByCoords(location, northeast, southwest);
          handleReturn(Object.assign(region, {address: formatted_address}));
        }}
        query={{
          key: MAP_API_KEY,
          language: "en",
        }}
        styles={{
          textInput: {
            backgroundColor: useTheme().colors.muted[200],
          },
          textInputContainer: {
            width: "80%",
          },
        }}
      />
    </>
  );
};

export default MapSearchbox;
