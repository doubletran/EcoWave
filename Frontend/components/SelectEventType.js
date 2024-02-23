import {
  Flex,
  HStack,
  IconButton,
  Button,
  Pressable,
  Text,
  Center,
  useTheme,
  Spacer,
  Heading,
  ScrollView,
} from "native-base";
import { NAV_ICONS, EVENT_SYMBOL as SYMBOL } from "../config/style";
import React from "react";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/core";
const BackButton = () => {
  const navigation = useNavigation();
  return (
    <IconButton icon={NAV_ICONS.Back} onPress={() => navigation.goBack()} />
  );
};
const DiscardBtn = ({}) => {
  return <IconButton icon={NAV_ICONS.Trash} />;
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
const SelectEventType = ({ navigation }) => {
  const [types, setTypes] = React.useState(new Set());
  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HStack>
          <DiscardBtn />
          <Button
            marginTop='0'
            onPress={() => {
              console.log(types);
              navigation.navigate("New Event", { types: Array.from(types) });
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
        <Heading>What types of problems?</Heading>
        <Flex w='100%' direction='row' justify='center' wrap='wrap'>
          {Object.keys(SYMBOL).map((k) => {
            return (
              <Type
                key={k}
                imageKey={k}
                select={() => {
                  let temp = types;
                  temp.add(k);
                  // console.log(temp);

                  setTypes(temp);
                }}
                deselect={() => {
                  let temp = types;
                  temp.delete(k);

                  setTypes(temp);
                }}
              />
            );
          })}
        </Flex>
      </ScrollView>

  );
};
export default SelectEventType;
const styles = StyleSheet.create({
  pressable: {
    width: "40%",
    padding: 10,
    margin: 10,
    borderRadius: 30,
  },
});
