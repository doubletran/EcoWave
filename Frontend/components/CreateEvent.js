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
  Flex,
  Spacer,
  ScrollView,
} from "native-base";
import { date_format, firebase_date_format, time_format } from "../config/lib";
import { INPUT_ICONS } from "../config/style";
import { useAuth } from "@clerk/clerk-expo";
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

export default function CreateEvent({
  navigation,
  route: {
    params:{types, address, longitude, latitude}
  },
}) {

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { userId } = useAuth();
  const [type, setType] = useState(types);
  //datatyle: date
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

    if (name && startTime && endTime && date) {
      navigation.setOptions({
        headerRight: () => <Button onPress={submit}> Submit</Button>,
      });
    } else {
      navigation.setOptions({
        headerRight: () => <Button isDisabled>Submit</Button>,
      });
    }
  }, [name, startTime, endTime, date]);
  // useEffect(() => {
  //   console.log(location)
  //   // Request permission to access the device's location
  //   let getLocationPerms = async () => {
  //     PermissionsAndroid.check(
  //       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
  //     ).then(async (request) => {
  //       if (request) {
  //         console.log("We have location permissions.");
  //         return;
  //       }
  //       try {
  //         const granted = await PermissionsAndroid.request(
  //           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //           {
  //             title: "Example App",
  //             message: "Example App access to your location ",
  //           }
  //         );
  //         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //           console.log("You can use the location");
  //         } else {
  //           console.log("location permission denied");
  //         }
  //       } catch (err) {
  //         console.warn(err);
  //       }
  //     });
  //   };
  //   getLocationPerms();
  // }, []);

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
  const submit = () => {
    let start = new Date(startTime);
    let end = new Date(endTime);
    start.setDate(date.getDate());
    end.setDate(date.getDate());
    create({
      title: name,
      description,
      latitude: latitude,
      longitude: longitude,
      address: address,
      userId: userId,
      start: start,
      end: end,
    }).then((res) => {
      console.log("Submit result: " + res);
    });
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
              setStartTime(new Date(date));
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
              setEndTime(new Date(date));
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
              setDate(new Date(date));
            }
            setDatePicker(false);
          }}
        />
      )}
        <ScrollView>
      <Center px="4">
      
        <Input     {...Style.inputBtn}
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

          Date {date && date_format(date)}
        </Button>

        <HStack>
          <Button
            {...Style.inputBtn}
            w='50%'
            leftIcon={INPUT_ICONS.Time}
            onPress={() => setStartTimePicker(true)}
          >
            From {startTime && <Text>{time_format(startTime)}</Text>}
          </Button>

          <Button
            {...Style.inputBtn}
            w='50%'
            onPress={() => setEndTimePicker(true)}
          >
            To {endTime && <Text>{time_format(endTime)}</Text>}
          </Button>
        </HStack>

        <Button {...Style.inputBtn} leftIcon={INPUT_ICONS.Flag}>
          Link a problem
        </Button>

        <Button
          {...Style.inputBtn}
          leftIcon={INPUT_ICONS.Marker}
          onPress={() =>
            navigation.navigate("Add location", { action: "New Event" })
          }
        >
          {address ? address : "Add location"}
        </Button>
        <Button
          onPress={() => {
            navigation.navigate("SelectEventType");
          }}
          {...Style.inputBtn}
        >
          Select types
          <Flex w='100%' direction='row' wrap='wrap'>
            {Array.from(type).map((item) => (
              <>
                <Box bgColor='cyan.400' {...Style.Float1}>
                  {item}
                </Box>
              </>
            ))}
          </Flex>
        </Button>

        <Input
          placeholder='Description'
          size='md'
          variant='unstyled'
          value={description}
          onChangeText={setDescription}
        />
        
     
      </Center>
      </ScrollView>
      
    </>
  );
}
// effdsakfds;
// fs)findDOMNode;
// [fdsaf})]
