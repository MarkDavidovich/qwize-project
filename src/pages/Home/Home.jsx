import { Anchor, Button, Divider, Flex, Group, Paper, SimpleGrid, Text, Title } from "@mantine/core";
import style from "./Home.module.css";
import { useState } from "react";
import { useAuth } from "../../auth/AuthProvider";
import { Link } from "react-router-dom";

const Home = () => {
  const [selectedAmount, setSelectedAmount] = useState(5);
  const [activeDifficulty, setActiveDifficulty] = useState("Easy");

  const amountOptions = [5, 10, 15, 20];
  const difficultyOptions = ["Easy", "Medium", "Hard", "Remix"];

  const { loggedOnUser } = useAuth();

  return (
    <div>
      <Title c={"blue"} fw={900} ta={"center"} mb={"xl"} visibleFrom="sm">
        Ready to play Qwize?
      </Title>

      <Flex mih={50} gap="md" justify="center" align="center" direction="column" wrap="wrap">
        <Paper shadow="sm" p="xl" withBorder radius="md" mx={"1rem"}>
          {!loggedOnUser && (
            <Text ta={"center"} mb={"md"} c={"gray"} fw={500} size="xl">
              <Anchor component={Link} to="/login" c={"yellow"} fw={500}>
                Log in
              </Anchor>{" "}
              for the full experience!
            </Text>
          )}
          <Text c="gray" size="xl" fw={500} mb="10px">
            How many questions?
          </Text>

          <SimpleGrid cols={{ base: 2, xs: 4 }} spacing="md" mb="lg">
            {amountOptions.map((value, idx) => (
              <Button
                disabled={idx !== 0 && !loggedOnUser}
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
          </SimpleGrid>
          <Divider mb="sm"></Divider>
          <Text c="gray" size="xl" fw={500} mb="10px">
            Difficulty
          </Text>
          <SimpleGrid cols={{ base: 2, xs: 4 }} spacing="md" mb="lg">
            {difficultyOptions.map((value, idx) => (
              <Button
                disabled={idx !== 0 && !loggedOnUser}
                key={value}
                variant={activeDifficulty === value ? "filled" : "light"}
                size="lg"
                radius="md"
                onClick={() => setActiveDifficulty(value)}
              >
                {value}
              </Button>
            ))}
          </SimpleGrid>
          <Divider mb="lg"></Divider>
          <Button size="xl" color="yellow" fullWidth component={Link} to={`/quiz/${activeDifficulty}/${selectedAmount}`}>
            Start
          </Button>
        </Paper>
      </Flex>
    </div>
  );
};

export default Home;
