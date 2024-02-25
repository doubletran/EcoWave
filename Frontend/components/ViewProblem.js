import { ScrollView, Text, Heading, Box, HStack, Container } from "native-base";
import { BottomNav } from "../Navigator"
import { VStack, Center, Flex, Button, Image } from "native-base";
import { date_format} from "../config/lib";
import { ICONS } from "../config/style";
import Style from "../config/style";
export default function ViewProblem({
  title,
  description,
  create_time,
  imageUrl
}) {
  return (
    <>
      <Box mt='5' p='5' bg='muted.100' shadow={3}>
      <HStack justifyContent="space-between">
        <Box>
        <Heading>Target problem</Heading>
        <Text>{title}</Text>
        <Text size='sm'>{date_format(create_time)}</Text>
        </Box>
        </HStack>
        <Image
          key={imageUrl}
          width={500}
          height={500}
          source={{ uri: imageUrl}}
          alt={description}
        />
        <Text>{description}</Text>
      </Box>
    </>
  );
}
