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
  Pressable,
} from "native-base";
import { date_format, firebase_date_format, time_format } from "../config/lib";
import { ICONS } from "../config/style";
import { useAuth } from "@clerk/clerk-expo";
import NumericInput from "react-native-numeric-input";

import firebase from "../config/firebase";
import { getDocs, collection } from "firebase/firestore";
import { ImagesDeck } from "../database/ImageUploader";
import { StackActions } from "@react-navigation/native";

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
    params: { types = [], address, longitude, latitude, problemId },
  },
}) {
  const [capacity, setCapacity] = useState(10);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { userId } = useAuth();

  //datatyle: date
  const [startTime, setStartTime] = useState(false);
  const [endTime, setEndTime] = useState(false);
  const [date, setDate] = useState(false);
  const [startTimePicker, setStartTimePicker] = useState(false);
  const [endTimePicker, setEndTimePicker] = useState(false);
  const [datePicker, setDatePicker] = useState(false);
  const [status, setStatus] = React.useState("disabled");
  const [images, setImages] = React.useState([])
  // problem modal vars
  const [showProblemModal, setShowProblemModal] = React.useState(false);

  const [problem, setProblem] = React.useState([]);
  const [chosenProblem, setChosenProblem] = React.useState({});

  function ListProblem(problem) {
    return (
      <Pressable
        onPress={() => {
          setChosenProblem(problem);
          setShowProblemModal(false);
        }}
      >
        <Box mt='5' p='5' bg='muted.100' shadow={3}>
          <HStack justifyContent='space-between'>
            <Box>
              <Text>{problem.title}</Text>
              <Text size='sm'>{date_format(problem.create_time)}</Text>
            </Box>
          </HStack>
          <Image
            key={problem.imageUrl}
            width={500}
            height={400}
            source={{ uri: problem.imageUrl }}
            alt={problem.description}
          />
          <Text>{problem.description}</Text>
        </Box>
      </Pressable>
    );
  }

  React.useEffect(() => {
    console.log("Address" + address, longitude, latitude);

    navigation.setOptions({
      headerShown: true,
      headerTitle: "New Event",
    });
  });
  React.useEffect(() => {
    console.log(problem)
    console.log(problemId)
    if (problemId) {
      (async () => {
        const data = await getProblemByID(problemId);
        console.log("problem: " + data);
        setProblem(data);
      })();
    }
  }, [problemId]);

  React.useEffect(() => {
    if (types){
      setName(Array.from(types)[0])
    }
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
    console.log("type" + types);
    console.log(address, latitude, longitude)
    create({
      name: name,
      description: description,
      latitude: latitude ? latitude : 44.5691905,
      longitude: longitude ? longitude: -123.2741971,
      address: address,
      types: Array.from(types),
      userId: userId,
      capacity: capacity,
      problemId: problemId,
      images: images,
      start: start,
      end: end,
    })
      .then((res) => {
        console.log("Submit result: " + res);
        navigation.popToTop()
        navigation.navigate("Profile");
      })
      .catch((error) => {
        console.log(error);
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
            console.log("date" + date);
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
              leftIcon={ICONS.Time}
              w='50%'
              onPress={() => setEndTimePicker(true)}
            >
              To {endTime && <Text>{time_format(endTime)}</Text>}
            </Button>
          </HStack>

          <Button overflow="hidden"
            {...Style.inputBtn}
            leftIcon={ICONS.Marker}
            onPress={() => {
              navigation.navigate("Add location", {
                action: "New Event",
                address: address,
                types: types,
              });

              // const push = StackActions.p("Add location", {
              //   action: "New Event",
              //   types: types,
              // });
              // navigation.dispatch(push);
            }}
          >
            {address ? <Text width="100%">{address}</Text> : "Add location"}
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
              {Array.from(types).map((item) => (
                <Type name={item} />
              ))}
            </Flex>
          </Button>
          <Text fontWeight='bold'>Optional details</Text>

          <Box {...Style.inputBtn}>
            <HStack justifyContent="space-between">
              <HStack>
              {ICONS.People}

              <Text {...Style.inputBtn._text}> Capacity </Text>
              </HStack>
              <NumberInput value={capacity} defaultValue={capacity}>
              <HStack >
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
            </HStack>
          
          </Box>

          <Button
            {...Style.inputBtn}
            leftIcon={ICONS.Flag}
            onPress={() => {
              setShowProblemModal(true);
            }}
          >
            Link a problem
            {problem && <ProblemContent {...problem} />}
          </Button>

        
     
  
          <Input
            {...Style.inputBtn}
            placeholder='Add description'
            size='lg'
            variant='unstyled'
            value={description}
            onChangeText={setDescription}
          />
                   <Button
            {...Style.inputBtn}
          >
            Add Image
             <ImagesDeck images={images} setImageUri ={setImages} size={1} addible={true}/> 
          </Button>
            
          {/* <Modal
            isOpen={showProblemModal}
            onClose={() => setShowProblemModal(false)}
          >
            <Modal.Content w='100%' marginBottom='auto' marginTop='auto'>
              <Modal.Body>
                <Modal.Header>Problems</Modal.Header>
                <VStack>
                  {problems.map((problem) => ListProblem(problem))}
                </VStack>
              </Modal.Body>
            </Modal.Content>
          </Modal> */}
        </Center>
      </ScrollView>
    </>
  );
}

export const ProblemContent = ({ title, description, time, images }) => {
  return (
    <>
  
      <Box  {...Style.Float1}>
        <Text fontWeight="bold">{title}</Text>
        <Text >{firebase_date_format(time)}</Text>
        <Text fontSize='sm'>{description}</Text>
      </Box>

      <ImagesDeck images={images} size={3} />
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
