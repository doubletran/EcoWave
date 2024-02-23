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
import React from "react";
import { StyleSheet } from "react-native";
const TypesFlex = ()=>{
  
}
const Type = ({ value, image, description, select, deselect }) => {
  const [selected, setSelected] = React.useState(value);
  React.useEffect(()=> console.log(description, value), [])
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
          {image}
          <Text fontWeight='bold'> {description}</Text>
        </Pressable>
      )}
      {!selected && (
        <Pressable
          style={styles.pressable}
          bgColor='primary.100'
          onPress={handlePress}
        >
          {image}
          <Text fontWeight='bold'> {description}</Text>
        </Pressable>
      )}
    </>
  );
};
const MultiSelector = ({ values, setValues, object }) => {
  console.log(values)
  return (
    <ScrollView>
      <Flex w='100%' direction='row' justify='center' wrap='wrap'>
        {Object.keys(object).map((k) => {
          return (
            <Type
              value={values.has(k)}
              image={object[k]}
              description={k}
              select={() => {
                let temp = values;
                temp.add(k);
                setValues(temp);
              }}
              deselect={() => {
                let temp = values;
                temp.delete(k);

                setValues(temp);
              }}
            />
          );
        })}
      </Flex>
    </ScrollView>
  );
};
export default MultiSelector;
const styles = StyleSheet.create({
  pressable: {
    width: "40%",
    padding: 10,
    margin: 10,
    borderRadius: 30,
  },
});
