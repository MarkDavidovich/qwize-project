import style from "./Leaderboards.module.css";
import { Container, Table, Avatar, Text, Group, Title, Paper, Badge, Notification, Flex, Center, Loader } from "@mantine/core";
import { usePlayerStats } from "../../store/player-stats-context.js";
import { formatTime } from "../../lib/helperFunctions.js";
import { getLeaderboards } from "../../lib/APILeaderboards.js";
import { useEffect, useState } from "react";

const Leaderboards = () => {
  const { completedQuiz, correctAnswers, totalQuestions, totalScore, timeElapsed } = usePlayerStats();
  const [topPlayers, setTopPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  const formattedTime = formatTime(timeElapsed);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const data = await getLeaderboards();
        setTopPlayers(data || []);
      } catch (err) {
        console.error(`Failed to load leaderboards: ${err}`);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  const rows = topPlayers.map((user, idx) => {
    const rank = idx + 1;

    return (
      <Table.Tr key={user.id || user.user_email}>
        <Table.Td>
          <Text fw={700} c={rank <= 3 ? "blue" : "gray"}>
            #{rank}
          </Text>
        </Table.Td>
        <Table.Td>
          <Text size="sm" fw={500}>
            {user.user_email.split("@")[0]}
          </Text>
        </Table.Td>
        <Table.Td>{user.correct}</Table.Td>
        <Table.Td>
          {" "}
          <Badge variant="filled" color="blue">
            {user.score} pts
          </Badge>
        </Table.Td>
      </Table.Tr>
    );
  });

  return (
    <Container size="md" mt="0">
      {completedQuiz && (
        <Paper mb="1rem" p="1rem">
          <Title c={"blue"} fw={900} ta={"center"}>
            Last quiz results
          </Title>
          <Flex justify="center" align="center" gap="2rem">
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
          </Flex>
        </Paper>
      )}

      <Paper shadow="sm" radius="md" p="xl" withBorder>
        <Title c={"blue"} fw={900} ta={"center"} order={2} mb="lg">
          Top Players
        </Title>
        {loading ? (
          <Center py="xl">
            <Loader size="xl" />
          </Center>
        ) : topPlayers.length > 0 ? (
          <Table verticalSpacing="md" highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Rank</Table.Th>
                <Table.Th>Player</Table.Th>
                <Table.Th>Correct</Table.Th>
                <Table.Th>Score</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        ) : (
          <Text ta="center" c="dimmed">
            No high scores yet. Be the first!
          </Text>
        )}
      </Paper>
    </Container>
  );
};

export default Leaderboards;
