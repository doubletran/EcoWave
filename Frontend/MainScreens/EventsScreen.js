import { ScrollView, Text, Heading, Box, HStack, List } from "native-base";

import { VStack, Center, Flex, Button, Modal } from "native-base";
import { firebase_date_format, firebase_time_format } from "../config/lib";
import { EVENT_SYMBOL, ICONS, Type } from "../config/style";
import Style from "../config/style";
import { Pressable } from "react-native";
import { EventModal } from "../components/ViewEvent";
import React, { useState, useEffect } from "react";
import { getAll, queryWithFilter } from "../database/events";
import { useAuth } from "@clerk/clerk-expo";
import MultiSelector from "../tool/MultiSelector";
import { useNavigation } from "@react-navigation/native";
import BottomNav from "../BottomNav";
export const ListableEvent = (event) => {
  const navigation = useNavigation()
  const { name, description, time, capacity, location, address, participants, types } =
    event;
  // console.log(name, location, time)
  // hash algorithm from stack overflow, non-secure
  let str = name + description;
  let hash = 0;
  for (let i = 0, len = str.length; i < len; i++) {
    let chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }

  return (
    <Box p='3' bgColor={Style.ViewBox} w='95%' rounded='xl' shadow='3'>
      <Pressable
        key={hash}
        onPress={() => navigation.navigate("View an event", { ...event })}
      >
        <Text fontWeight='bold' fontSize='md'>
          {name}
        </Text>
        <HStack justifyContent='space-between'>
          <Box mt='1'>
            <Text>{firebase_date_format(time.start)}</Text>
            <Text>
              {firebase_time_format(time.start)} -{" "}
              {firebase_time_format(time.end)}
            </Text>
          </Box>
          <Text>{JSON.stringify(capacity - participants.length)}</Text>

          {/* <Button {...Style.inputBtn} leftIcon={INPUT_ICONS.People}>
          {participants.length}
        </Button> */}
        </HStack>
        <Button
          variant='ghost'
          leftIcon={ICONS.Marker}
          // onPress={() => navigation.navigate("Add location")}
        >
          {`${address}`}
        </Button>
        <HStack>{types?.map((item) => <Type name={item}/>)}</HStack>
      </Pressable>
    </Box>
  );
};
export const EventScreen = ({ navigation }) => {
  const [events, setEvents] = useState([]);
  const [filterTypes, setFilterTypes] = useState(new Set());
  const [filterDate, setFilterDate] = useState(false);
  const [filterCap, setFilterCap] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [modal, setModal] = useState(false);
  const { userId } = useAuth();


  useEffect(() => {
    const getData = async () => {
      let data = await getAll();
      //console.log(data)
      setEvents(data);
    };
    getData();
  }, []);

  useEffect(() => {

   (async () =>{

      let data = await queryWithFilter(Array.from(filterTypes))
      setEvents(data);
    })()
    console.log(filterTypes)
  }, 
    [filterTypes, showModal]);



  return (
    <>
      <Modal
        size='full'
        height='50%'
        top='30%'
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      >
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Body bgColor='white'>
            {modal}
          </Modal.Body>
        </Modal.Content>
        <Modal.Footer>
          <Button onPress={() => setShowModal(false)} width='100%'>
            Apply
          </Button>
          <Button
            onPress={() => {
              setModal(
                <MultiSelector
                  values={new Set()}
                  setValues={setFilterTypes}
                  object={EVENT_SYMBOL}
                />
              );
            }}
            variant='outline'
            width='100%'
          >
            Reset
          </Button>
        </Modal.Footer>
      </Modal>

      <HStack justifyContent="center">
        <Button
          variant='outline'
          {...Style.Float1}
          onPress={() => {
             setModal(<MultiSelector values={filterTypes} setValues={setFilterTypes} object={EVENT_SYMBOL}/>)
            setShowModal(true);
          }}
        >
          Type
        </Button>
        <Button variant='outline' {...Style.Float1}>
          Date
        </Button>
        <Button variant='outline' {...Style.Float1}>
          Capacity
        </Button>
        <Button variant='outline' {...Style.Float1}>
          Location
        </Button>
      </HStack>
      <ScrollView>
        <VStack space={3} alignItems='center'>
          {events.map((event) => ListableEvent(event))}
        </VStack>
      </ScrollView>
      <BottomNav atEvents={true} />
    </>
  );
};
