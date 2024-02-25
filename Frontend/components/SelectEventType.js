import {
  Flex,
  HStack,
  IconButton,
  Button,
  Pressable,
  Text,

  Heading,
  ScrollView,
  
} from "native-base";
import MultiSelector from "../tool/MultiSelector";
import { ICONS, EVENT_SYMBOL as SYMBOL } from "../config/style";
import React from "react";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/core";
const BackButton = () => {
  const navigation = useNavigation();
  return (
    <IconButton icon={ICONS.Back} onPress={() => navigation.goBack()} />
  );
};
const DiscardBtn = ({}) => {
  return <IconButton icon={ICONS.Trash} />;
};
// export const Header = ({ heading, nextRoute, params }) => {
//   const navigation = useNavigation();
// React.useEffect(()=>{
//   console.log(params)
// }, [params])

//   return (

//   );
// };
const Type = ({ imageKey, select, deselect }) => {
  const [selected, setSelected] = React.useState(false);
  handlePress = () => {
    if (!selected) {
      select();
    } else {
      deselect();
    }
    setSelected(!selected);
  };
  return (
    <>
      {selected && (
        <Pressable
          style={styles.pressable}
          bgColor='cyan.400'
          onPress={handlePress}
        >
          {SYMBOL[imageKey]}
          <Text> {imageKey}</Text>
        </Pressable>
      )}
      {!selected && (
        <Pressable
          style={styles.pressable}
          bgColor="primary.100"
   
          onPress={handlePress}
        >
          {SYMBOL[imageKey]}
          <Text> {imageKey}</Text>
        </Pressable>
      )}
    </>
  );
};

const SelectEventTypeScreen = ({ navigation, route }) => {
  const [types, setTypes] = React.useState(new Set());
  React.useEffect(() => {
    navigation.setOptions({
      headerTitle: "New Event",
      headerRight: () => (
        <HStack>
          <DiscardBtn />
          <Button
            marginTop='0'
            onPress={() => {
              console.log(types);
              navigation.navigate("New Event", Object.assign( { types: Array.from(types) }, {problemId: route.params?.problemId}))
            }}
          >
            Next
          </Button>
        </HStack>
      ),
    });
    console.log(types);
  }, [types]);
  //UseState doesn't work when binding
  return (
    <ScrollView>
      <Heading m="2">What events do you want to create?</Heading>
      <MultiSelector values={types} setValues={setTypes} object={SYMBOL} />
    </ScrollView>

  );
};
export default SelectEventTypeScreen;
const styles = StyleSheet.create({
  pressable: {
    width: "40%",
    padding: 10,
    margin: 10,
    borderRadius: 30,
  },
});
