import { useRef, useState } from "react";
import { useEffect } from "react";
import { Box, Container, IconButton, Input, useTheme} from "native-base";
import { getRegionByCoords } from "../config/lib";
import { StyleSheet,Dimensions } from "react-native";

import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { INPUT_ICONS } from "../config/style";
const MapSearchbox = ({ handleReturn,placeholder, goBack}) => {

  const ref = useRef();
  useEffect(() => {
    
   
    setTimeout(() => {
     
      ref.current.focus(); //setTimeout to wait for ref to be assigned before call focus
    }, 10);

  }, []);
  useEffect(()=> {
    console.log("plcae: " + placeholder)
    if (placeholder){
      ref.current.setAddressText(false)}
    }
    
     , [placeholder])
 


  return (
    <>

      <GooglePlacesAutocomplete 
        ref={ref}
        renderRightButton={()=> <IconButton icon={INPUT_ICONS.Clear} onPress={()=> ref.current.clear()} />}
        renderLeftButton={()=> <IconButton icon={INPUT_ICONS.Back} onPress={goBack} /> }
        placeholder={placeholder? placeholder : "Search"}
       isRowScrollable ={true}
        fetchDetails={true}
        autoFocus={true}
        onPress={(data, {formatted_address, geometry: {location, viewport : {northeast, southwest}}}) => {
          let region = getRegionByCoords(location, northeast, southwest)
          region.address=formatted_address

          handleReturn(region)
        }}
        query={{
          key: "AIzaSyC2M542GAMZIBZsWxkiVaW6Vc3yAr7JEOs",
          language: "en",
        }} 
        styles={{
  
          
          textInput: {
            backgroundColor: useTheme().colors.muted[200],
     
            
          },
          textInputContainer: {
            width:"80%"
            
            
          },

 
        }}




      />


    </>
  );
};

export default MapSearchbox