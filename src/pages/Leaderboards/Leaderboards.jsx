import style from "./Leaderboards.module.css";
import { Container, Table, Avatar, Text, Group, Title, Paper, Badge, Notification, Flex, Center, Loader, Box } from "@mantine/core";
import { usePlayerStats } from "../../store/player-stats-context.js";
import { formatTimeMinutes } from "../../lib/helperFunctions.js";
import { getLeaderboards } from "../../lib/APILeaderboards.js";
import { useEffect, useState } from "react";
import { useAuth } from "../../auth/AuthProvider.jsx";

const Leaderboards = () => {
  const { completedQuiz, correctAnswers, totalQuestions, totalScore, timeElapsed } = usePlayerStats();
  const [topPlayers, setTopPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  const { loggedOnUser } = useAuth();

  const formattedTime = formatTimeMinutes(timeElapsed);

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
      <Table.Tr key={user.id || user.user_email} bg={loggedOnUser.email === user.user_email ? "blue" : ""}>
        <Table.Td className={style.roundedLeft}>
          <Text fw={700} c={loggedOnUser.email === user.user_email ? "white" : rank <= 3 ? "blue" : "gray"}>
            #{rank}
          </Text>
        </Table.Td>
        <Table.Td>
          <Text size="sm" fw={500} c={loggedOnUser.email === user.user_email ? "white" : ""}>
            {user.user_email.split("@")[0]}
          </Text>
        </Table.Td>
        <Table.Td>
          <Text size="sm" fw={500} c={loggedOnUser.email === user.user_email ? "white" : ""}>
            {user.correct}
          </Text>
        </Table.Td>
        <Table.Td className={style.roundedRight}>
          {" "}
          <Badge
            className={loggedOnUser.email === user.user_email ? `${style.blueText}` : ""}
            variant="filled"
            color={loggedOnUser.email === user.user_email ? "white" : "blue"}
          >
            {user.score} pts
          </Badge>
        </Table.Td>
      </Table.Tr>
    );
  });

  const quizResults = (
    <>
      <Flex className={style.statBox} direction={"column"} justify={"center"} align={"center"} p={"10px"} flex={"1"}>
        <Text size="30px" fw={900} c={"white"}>
          {totalScore}
        </Text>
        <Text size="17px" fw={500}>
          score
        </Text>
      </Flex>
      <Flex className={style.statBox} direction={"column"} justify={"center"} align={"center"} p={"10px"} flex={"2"}>
        <Text size="30px" fw={900} c={"white"}>
          {correctAnswers} correct
        </Text>
        <Text size="17px" fw={500}>
          out of {totalQuestions}
        </Text>
      </Flex>
      <Flex className={style.statBox} direction={"column"} justify={"center"} align={"center"} p={"10px"} flex={"1"}>
        <Text size="30px" fw={900} c={"white"}>
          {formattedTime}
        </Text>
        <Text size="17px" fw={500}>
          time
        </Text>
      </Flex>
    </>
  );

  return (
    <Container size="md">
      {completedQuiz && (
        <Paper p="1rem">
          <Title c={"blue"} fw={900} ta={"center"} mb={"1rem"}>
            Last Qwize results
          </Title>
          <Paper bg="blue" radius="lg" display="flex">
            <Flex className={style.results}>{quizResults}</Flex>
          </Paper>
        </Paper>
      )}

      <Paper shadow="sm" radius="md" p="xl" withBorder>
        <Title c={"blue"} fw={900} ta={"center"} order={2} mb="lg">
          Top Qwizers
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
                <Table.Th>Qwizer</Table.Th>
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
