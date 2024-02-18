import * as Location from 'expo-location'
import { Dimensions } from 'react-native';


const options = {
  weekday: 'short',
  year: 'numeric',
  month: 'short',
  day: 'numeric',
};
// export let DEFAULT = {
//   location: {
//     latitude:44.2423649,-119.80930251,
//     longitude: -123.3659387,
//     latitudeDelta: 0.01,
//     longitudeDelta: 0.01,
//   }
// }
export const DEFAULT_REGION = (async()=> {
  let { status } = await Location.requestForegroundPermissionsAsync();
  let location = {latitude: 44.2423649,longitude: -119.80930251}
  if (status === "granted") {
    // setErrorMsg('Permission to access location was denied');
     location = await Location.getCurrentPositionAsync({})
  }

  return {
    latitude : location.coords.latitude,
    longitude: location.coords.longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  }
})()

export function getRegionByCoords(center, northeast, southwest, ASPECT_RATIO = 0.4){


  const latDelta = (northeast.lat - southwest.lat).toPrecision(6)
  const lngDelta = (latDelta * ASPECT_RATIO).toPrecision(6)
  return {
    latitude: center.lat,
    longitude: center.lng,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01
  }
}
export const date_format = (date) => {
  if (!date) return ""
  return date.toString()
}

export const firebase_date_format = (date) => {
  if (!date) return ""
  return date.toDate().toString()
}

export const time_format = (timestamp) => {
  if (!timestamp) return ""

  const fireBaseTime = new Date(
    timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000,
  );

  return fireBaseTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  // return timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
}
