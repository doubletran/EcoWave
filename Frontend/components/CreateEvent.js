import React, { useState, useEffect } from "react";

import { create } from "../database/events";
import { PermissionsAndroid } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Style from "../config/style";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
// import { InputButtonStyle as style } from "../config/style";
import {
  Center,
  Input,
  Box,
  HStack,
  Button,
  Text,
  Divider,
} from "native-base";
import { date_format, time_format } from "../config/lib";
import { INPUT_ICONS } from "../config/style";
export function ViewEvents({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Events</Text>
      <Button
        title='Create Event'
        onPress={() => navigation.navigate("Create Event")}
      />
    </View>
  );
}

export default function CreateEvent({ navigation, route }) {
  const [name, setName] = useState("");

  const [description, setDescription] = useState("");

  const [startTime, setStartTime] = useState(false);
  const [endTime, setEndTime] = useState(false);
  const [date, setDate] = useState(false);

  const [startTimePicker, setStartTimePicker] = useState(false);
  const [endTimePicker, setEndTimePicker] = useState(false);
  const [datePicker, setDatePicker] = useState(false);
  const [status, setStatus] = React.useState("disabled");
  React.useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: true,
    });
  });
  React.useEffect(() => {
    console.log(name, startTime, endTime, date);
    if (name && startTime && endTime && date) {
      navigation.setOptions({
        headerRight: () => <Button> Submit</Button>,
      });
    } else {
      navigation.setOptions({
        headerRight: () => <Button isDisabled>Submit</Button>,
      });
    }
  }, [name, startTime, endTime, date]);
  useEffect(() => {
    if (route.params) {
      setLocation(toute.params);
    }
    // Request permission to access the device's location
    let getLocationPerms = async () => {
      PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      ).then(async (request) => {
        if (request) {
          console.log("We have location permissions.");
          return;
        }
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: "Example App",
              message: "Example App access to your location ",
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("You can use the location");
          } else {
            console.log("location permission denied");
          }
        } catch (err) {
          console.warn(err);
        }
      });
    };
    getLocationPerms();
  }, []);

  const handleMapPress = (event) => {
    // Extract latitude and longitude from the pressed location
    const { latitude, longitude } = event.nativeEvent.coordinate;

    setLocation({ latitude: latitude, longitude: longitude });
    console.log(location);
  };

  /* EVENTS SHOULD BE SEND IN THIS FORMAT TO THE DATABASE
  const event = {
    name: "",
    description: "",
    date: new Date(),
    start_time: new Date(),
    end_time: new Date(),
    location: { latitude: 0, longitude: 0 },
    participants: [user.Id]
  }
  */
  const submitReport = () => {
    create({
      title: name,
      description,
      latitude: location.latitude,
      longtitude: location.longitude,
      time: "undefined",
    });
    setName("");
    setDescription("");
    setLocation({ latitude: 0, longitude: 0 });
    setDate(false);
    setStartTime(false);
    setEndTime(false);
  };

  return (
    <>
      {startTimePicker && (
        <DateTimePicker
          mode='time'
          value={new Date(startTime)}
          onChange={(event, date) => {
            const {
              type,
              nativeEvent: { timestamp, utcOffset },
            } = event;
            if (type == "set") {
              setStartTime(date);
            }
            setStartTimePicker(false);
          }}
        />
      )}
      {endTimePicker && (
        <DateTimePicker
          mode='time'
          value={new Date(endTime)}
          onChange={(event, date) => {
            const {
              type,
              nativeEvent: { timestamp, utcOffset },
            } = event;
            if (type == "set") {
              setEndTime(date);
            }
            setEndTimePicker(false);
          }}
        />
      )}

      {datePicker && (
        <DateTimePicker
          minimumDate={Date.now()}
          value={new Date(date)}
          onChange={(event, date) => {
            const {
              type,
              nativeEvent: { timestamp, utcOffset },
            } = event;
            console.log(date);
            if (type == "set") {
              setDate(date);
            }
            setDatePicker(false);
          }}
        />
      )}
      <Center>
        <Box w='90%'>
          <Input
            placeholder='Title'
            value={name}
            variant='underlined'
            size='2xl'
            onChangeText={setName}
          />

          <Button
            {...Style.inputBtn}
            leftIcon={INPUT_ICONS.Calendar}
            onPress={() => setDatePicker(true)}
          >
            {" "}
            Date {date_format(date)}
          </Button>
          <Divider thickness='2' />
          <HStack>
            <Button
              {...Style.inputBtn}
              w='50%'
              onPress={() => setStartTimePicker(true)}
            >
              {" "}
              From {time_format(startTime)}
            </Button>

            <Button
              {...Style.inputBtn}
              w='50%'
              onPress={() => setEndTimePicker(true)}
            >
              {" "}
              To {time_format(endTime)}{" "}
            </Button>
          </HStack>
          <Divider thickness='2' />

          <Button {...Style.inputBtn} leftIcon={INPUT_ICONS.Flag}>
            Link a problem
          </Button>
          <Divider thickness='2' />
          <Button
            {...Style.inputBtn}
            leftIcon={INPUT_ICONS.Marker}
            onPress={() =>
              navigation.navigate("Set location", { action: "New Event" })
            }
          >
            Location
          </Button>

          <Input
            placeholder='Description'
            size='md'
            variant='unstyled'
            value={description}
            onChangeText={setDescription}
          />
        </Box>
      </Center>
    </>
  );
}
