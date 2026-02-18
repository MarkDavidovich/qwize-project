import { Button, Divider, Flex, Group, Paper, Text } from "@mantine/core";
import style from "./Home.module.css";
import { useState } from "react";

const Home = () => {
  const [selectedAmount, setSelectedAmount] = useState(5);
  const [activeDifficulty, setActiveDifficulty] = useState("Easy");

  const amountOptions = [5, 10, 15, 20];
  const difficultyOptions = ["Easy", "Medium", "Hard", "Remix"];

  return (
    <div>
      <Flex mih={50} gap="md" justify="center" align="center" direction="column" wrap="wrap">
        <Paper shadow="sm" p="xl">
          <Text c="blue" size="xl" fw={500}>
            How many questions?
          </Text>
          <Group p="md" flex="1">
            {amountOptions.map((value) => (
              <Button
                key={value}
                variant={selectedAmount === value ? "filled" : "light"}
                size="lg"
                radius="md"
                flex="1"
                onClick={() => setSelectedAmount(value)}
              >
                {value}
              </Button>
            ))}
          </Group>

          <Text c="blue" size="xl" fw={500}>
            Difficulty
          </Text>
          <Group p="md">
            {difficultyOptions.map((value) => (
              <Button key={value} variant={activeDifficulty === value ? "filled" : "light"} size="lg" radius="md" onClick={() => setActiveDifficulty(value)}>
                {value}
              </Button>
            ))}
          </Group>
          <Divider mb="lg"></Divider>
          <Button size="xl" color="yellow" fullWidth>
            Start Quiz!
          </Button>
        </Paper>
      </Flex>
    </div>
  );
};

export default Home;
