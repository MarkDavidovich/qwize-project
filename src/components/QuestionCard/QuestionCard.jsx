import style from "./QuestionCard.module.css";
import { Anchor, Button, Divider, Flex, Group, Paper, Text, Title } from "@mantine/core";


const QuestionCard = () => {
  return (
    <>
      <Flex mih={50} gap="md" justify="center" align="center" direction="column" wrap="wrap">
        <Paper shadow="sm" p="xl" withBorder radius="md">

          <Text c="gray" size="xl" fw={500}>
            How many questions?
          </Text>


          <Text c="gray" size="xl" fw={500}>
            Difficulty
          </Text>

        </Paper>
      </Flex>
    </>
  );
};


export default QuestionCard;
