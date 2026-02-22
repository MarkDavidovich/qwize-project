import { Card, Avatar, Text, Group, Button, Box } from '@mantine/core';
import classes from './Profile.module.css';

const stats = [
  { label: 'Followers', value: '34K' },
  { label: 'Follows', value: '187' },
  { label: 'Posts', value: '1.6K' },
];

export function Profile() {
  const items = stats.map((stat) => (
    <div key={stat.label}>
      <Text textAlign="center" fz="lg" fw={500}>
        {stat.value}
      </Text>
      <Text textAlign="center" fz="sm" c="dimmed" lh={1}>
        {stat.label}
      </Text>
    </div>
  ));

  return (
    <Box className={classes.wrapper}>
      <Card withBorder padding="xl" radius="md" className={classes.card}>
        <Card.Section
          h={140}
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80)',
          }}
        />
        <Avatar
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-9.png"
          size={80}
          radius={80}
          mx="auto"
          mt={-30}
          className={classes.avatar}
        />
        <Text textAlign="center" fz="lg" fw={500} mt="sm">
          Bill Headbanger
        </Text>
        <Text textAlign="center" fz="sm" c="dimmed">
          Fullstack engineer
        </Text>
        <Group mt="md" justify="center" gap={30}>
          {items}
        </Group>
        <Button fullWidth radius="md" mt="xl" size="md" variant="default" color="gray">
          Follow
        </Button>
      </Card>
    </Box>
  );
}

export default Profile;
