const options = {
  weekday: 'short',
  year: 'numeric',
  month: 'short',
  day: 'numeric',
};
export let DEFAULT = {
  location: {
    latitude: 44.5630651,
    longitude: -123.3659387,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
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
