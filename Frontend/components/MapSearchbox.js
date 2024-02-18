import { useRef, useState } from "react";
import { useEffect } from "react";
import { Box, Container, Input} from "native-base";
import { getRegionByCoords } from "../config/lib";
import { StyleSheet,Dimensions } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
const MapSearchbox = ({ handleReturn,placeholder }) => {

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
            width: 300
          },
          textInputContainer: {
            width:300
          },

          listView:{
            width:300
         
          } 
        }}




      />


    </>
  );
};
const styles = StyleSheet.create({
  search: {
    //flex: 1,
    ...StyleSheet.absoluteFillObject,
    maxWidth: 500,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
});
export default MapSearchbox