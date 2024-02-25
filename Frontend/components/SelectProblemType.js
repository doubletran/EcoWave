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
import { ICONS, PROBLEM_SYMBOL as SYMBOL } from "../config/style";
import React from "react";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/core";
import MultiSelector from "../tool/MultiSelector";
const BackButton = () => {
  const navigation = useNavigation();
  return (
    <IconButton icon={ICONS.Back} onPress={() => navigation.goBack()} />
  );
};
const DiscardBtn = ({}) => {
  return <IconButton icon={ICONS.Trash} />;
};

const SelectProblemType = ({ navigation, route }) => {
  const [types, setTypes] = React.useState(
    route.params?.types ? route.params.types : new Set()
  );
  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HStack>
          <DiscardBtn />
          <Button
            marginTop='0'
            onPress={() => {
              console.log(types);
              //get state of navigation to get the parent
              const routes = navigation.getState()?.routes;
              console.log(routes);
              if (routes.length > 2) {
                const prev = routes[routes.length - 2];
                if (prev.name == "New Problem") {
                  navigation.navigate({
                    name: "New Problem",
                    params: {
                      types: types,
                    },
                    merge: true,
                  });
                  return;
                }
              }
              navigation.navigate("Add location", {
                action: "New Problem",
                types: types,
              });
            }}
          >
            Next
          </Button>
        </HStack>
      ),
    });
    console.log(types);
  }, [types]);

  return (
    <ScrollView>
      <Heading>What types of problems?</Heading>
      <MultiSelector values={types} setValues={setTypes} object={SYMBOL} />
    </ScrollView>
  );
};
export default SelectProblemType;
