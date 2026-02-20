import style from "./Leaderboards.module.css";
import { Container, Table, Avatar, Text, Group, Title, Paper, Badge, Notification, Flex } from "@mantine/core";
import { leaderboardData } from "../../lib/DummyData.js";
import { usePlayerStats } from "../../store/player-stats-context.js";
import { formatTime } from "../../lib/helperFunctions.js";

const Leaderboards = () => {
  const { completedQuiz, correctAnswers, totalQuestions, totalScore, timeElapsed } = usePlayerStats();

  const stats = usePlayerStats();

  const formattedTime = formatTime(timeElapsed);

  const rows = leaderboardData.map((user) => (
    <Table.Tr key={user.rank}>
      <Table.Td>
        <Text fw={700} c={user.rank <= 3 ? "blue" : "gray"}>
          #{user.rank}
        </Text>
      </Table.Td>
      <Table.Td>
        <Group gap="sm">
          <Avatar size={30} radius="xl" color="blue">
            {user.name.charAt(0)}
          </Avatar>
          <Text size="sm" fw={500}>
            {user.name}
          </Text>
        </Group>
      </Table.Td>
      <Table.Td>
        <Badge variant="filled" color="teal">
          {user.score.toLocaleString()} pts
        </Badge>
      </Table.Td>
      <Table.Td>
        <Text size="sm">{user.accuracy}</Text>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Container size="md" mt="0">
      {completedQuiz && (
        <Paper mb="1rem" p="1rem">
          <Flex justify="center" align="center" gap="2rem">
            <Paper bg="blue" radius={"50%"} w={"80px"} h={"80px"}></Paper>
            <Paper
              shadow="md"
              bg="blue"
              radius={"50%"}
              w={"130px"}
              h={"130px"}
              display="flex"
              style={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }}
            >
              <Text size="30px" fw={900} c={"white"}>
                {formattedTime}
              </Text>
              <Text size="17px" fw={500}>
                total time
              </Text>
            </Paper>
            <Paper
              bg="blue"
              radius={"50%"}
              w={"160px"}
              h={"160px"}
              display="flex"
              style={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }}
            >
              {" "}
              <Text size="30px" fw={900} c={"white"}>
                {correctAnswers} correct
              </Text>
              <Text size="17px" fw={500}>
                out of {totalQuestions}
              </Text>
            </Paper>
            <Paper
              bg="blue"
              radius={"50%"}
              w={"130px"}
              h={"130px"}
              display="flex"
              style={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }}
            >
              <Text size="30px" fw={900} c={"white"}>
                {totalScore}
              </Text>
              <Text size="17px" fw={500}>
                score
              </Text>
            </Paper>
            <Paper bg="blue" radius={"50%"} w={"80px"} h={"80px"}></Paper>
          </Flex>
        </Paper>
      )}

      <Paper shadow="sm" radius="md" p="xl" withBorder>
        <Title order={2} mb="lg" ta="center">
          Top Players
        </Title>

        <Table verticalSpacing="md" highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Rank</Table.Th>
              <Table.Th>Player</Table.Th>
              <Table.Th>Score</Table.Th>
              <Table.Th>Accuracy</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Paper>
    </Container>
  );
};

export default Leaderboards;
