import React, { useState, useEffect } from "react";
import { StyleSheet, Dimensions } from "react-native";
import { create } from "../database/events";
import { get as getProblemByID } from "../database/problems";
import { PermissionsAndroid } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Style, { Type } from "../config/style";
import { IconButton, NumberInput, Slider } from "native-base";

// import { InputButtonStyle as style } from "../config/style";
import {
  Center,
  Input,
  Box,
  HStack,
  Button,
  Text,
  Image,
  Flex,
  Heading,
  NumberDecrementStepper,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberInputField,
  ScrollView,
  Modal,
  VStack,
  Pressable
} from "native-base";
import { date_format, firebase_date_format, time_format } from "../config/lib";
import { ICONS } from "../config/style";
import { useAuth } from "@clerk/clerk-expo";
import NumericInput from "react-native-numeric-input";

import firebase from "../config/firebase";
import { getDocs, collection } from "firebase/firestore"

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
    params: { types, address, longitude, latitude, problemId },
  },
}) {
  const [capacity, setCapacity] = useState(10);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { userId } = useAuth();
  const [type, setType] = useState(types);
  const [problem, setProblem] = useState(false);
  //datatyle: date
  const [startTime, setStartTime] = useState(false);
  const [endTime, setEndTime] = useState(false);
  const [date, setDate] = useState(false);
  const [startTimePicker, setStartTimePicker] = useState(false);
  const [endTimePicker, setEndTimePicker] = useState(false);
  const [datePicker, setDatePicker] = useState(false);
  const [status, setStatus] = React.useState("disabled");

  // problem modal vars
  const [showProblemModal, setShowProblemModal] = React.useState(false)
  const [problems, setProblems] = React.useState([])
  const [chosenProblem, setChosenProblem] = React.useState({})

  function ListProblem(problem) {
    return (
      <Pressable onPress={() => {setChosenProblem(problem); setShowProblemModal(false)}}>
        <Box mt='5' p='5' bg='muted.100' shadow={3}>
      <HStack justifyContent="space-between">
        <Box>
        <Text>{problem.title}</Text>
        <Text size='sm'>{date_format(problem.create_time)}</Text>
        </Box>
        </HStack>
        <Image
          key={problem.imageUrl}
          width={500}
          height={500}
          source={{ uri: problem.imageUrl}}
          alt={problem.description}
        />
        <Text>{problem.description}</Text>
      </Box>
      </Pressable>
    )
  }

  React.useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: true,
    });
  });
  React.useEffect(() => {
    if (problemId) {
      (async () => {
        const data = await getProblemByID(problemId);
        console.log("problem: " + data);
        setProblem(data);
      })();
    }
  }, [problemId]);

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

    let getProblems = async () => {
      let temp = []
      let res = await getDocs(collection(firebase, 'problems'))
      res.forEach((doc) => {
        temp.push(doc.data())
      })
      setProblems(temp)
    }
    getProblems()
  }, [name, startTime, endTime, date]);

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
      types: Array.from(types),
      userId: userId,
      capacity: capacity,
      problemId: problemId,
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
        <Center px='4'>
          <Input
            {...Style.inputBtn}
            fontSize='2xl'
            placeholder='Title'
            value={name}
            size='2xl'
            onChangeText={setName}
          />
          <Button
            {...Style.inputBtn}
            leftIcon={ICONS.Calendar}
            onPress={() => setDatePicker(true)}
          >
            Date {date && date_format(date)}
          </Button>

          <HStack>
            <Button
              {...Style.inputBtn}
              w='50%'
              leftIcon={ICONS.Time}
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

          <Button
            {...Style.inputBtn}
            leftIcon={ICONS.Marker}
            onPress={() =>
              navigation.navigate("Add location", { action: "New Event" })
            }
          >
            {address ? address : "Add location"}
          </Button>
          <Button
            leftIcon={ICONS.Grid}
            onPress={() => {
              navigation.navigate("SelectEventType");
            }}
            {...Style.inputBtn}
          >
            Select types
            <Flex w='100%' direction='row' wrap='wrap'>
              {Array.from(type).map((item) => 
                <Type name={item} />
              )}
            </Flex>
          </Button>
          <Box {...Style.inputBtn}>
            <HStack>
              {ICONS.People}

              <Text> Capacity: </Text>
            </HStack>
            <NumberInput value={capacity} defaultValue={capacity}>
              <HStack>
                <IconButton
                  icon={ICONS.Inc}
                  onPress={() => setCapacity(capacity + 1)}
                />
                <NumberInputField w={50} value={capacity} />
                <IconButton
                  icon={ICONS.Dec}
                  onPress={() => setCapacity(capacity - 1)}
                />
              </HStack>
            </NumberInput>
            {/* <NumericInput
              min={0}
              max={100}
              value={10}
              onChange={(value) => setCapacity(value)}
            /> */}
          </Box>

          <Input
            {...Style.inputBtn}
            placeholder='Description'
            size='md'
            variant='unstyled'
            value={description}
            onChangeText={setDescription}
          />
          <Button {...Style.inputBtn} leftIcon={ICONS.Flag} onPress={() => { setShowProblemModal(true) }}>
            Link a problem
          </Button>
          {problem && <ProblemContent {...problem} />}
        <Modal isOpen={showProblemModal} onClose={() => setShowProblemModal(false)}>
        <Modal.Content w='100%' marginBottom='auto' marginTop='auto'>
          <Modal.Body>
            <Modal.Header>Problems</Modal.Header>
            <VStack>
              {problems.map((problem) => ListProblem(problem))}
            </VStack>
          </Modal.Body>
        </Modal.Content>
      </Modal>
        </Center>
      </ScrollView>
    </>
  );
}

const ProblemContent = ({ title, description, imageUrl }) => {
  return (
    <>
      <Box>
        {title}
        <Text fontSize='sm'>{description}</Text>
      </Box>

      <Center>
        <Image
          alt={description}
          style={styles.image}
          source={{ uri: imageUrl }}
        ></Image>
      </Center>
    </>
  );
};
const styles = StyleSheet.create({
  image: {
    minWidth: 300,
    minHeight: 300,
  },

  map: {
    //flex: 1,
    ...StyleSheet.absoluteFillObject,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
