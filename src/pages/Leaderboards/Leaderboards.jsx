import style from "./Leaderboards.module.css";

import { 
  Container, 
  Table, 
  Avatar, 
  Text, 
  Group, 
  Title, 
  Paper, 
  Badge 
} from '@mantine/core'; 

import { leaderboardData } from "../../lib/DummyData.js";

const Leaderboards = () => {

  const rows = leaderboardData.map((user) => (
    <Table.Tr key={user.rank}>
      <Table.Td>
        <Text fw={700} c={user.rank <= 3 ? 'blue' : 'gray'}>
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
    <Container size="md" py="xl">
      <Paper shadow="sm" radius="md" p="xl" withBorder>
        <Title order={2} mb="lg" textAlign="center">
          🏆 Top Players 
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
