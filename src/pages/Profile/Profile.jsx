import { Card, Avatar, Text, Group, Button, Box, Loader, Center } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useAuth } from '../../auth/AuthProvider';
import { getUserInfo } from '../../lib/APIUserInfo';
import classes from './Profile.module.css';

export function Profile() {
  const { loggedOnUser } = useAuth();
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (loggedOnUser) {
        const data = await getUserInfo(loggedOnUser.id);
        console.log(data);
        setUserInfo(data);
      }
      setLoading(false);
    };

    fetchUserInfo();
  }, [loggedOnUser]);

  if (loading) {
    return (
      <Center h="50vh">
        <Loader size="xl" />
      </Center>
    );
  }

  const stats = [
    { label: 'Total Score', value: userInfo?.total_score || 0 },
    { label: 'Correct Answers', value: userInfo?.correct_answers || 0 },
    { label: 'Total Time', value: userInfo?.total_time || 0 },
  ];

  const items = stats.map((stat) => (
    <div key={stat.label} style={{ textAlign: 'center' }}>
      <Text fz="lg" fw={500}>
        {stat.value}
      </Text>
      <Text fz="sm" c="dimmed" lh={1}>
        {stat.label}
      </Text>
    </div>
  ));

  return (
    <Box className={classes.wrapper}>
      <Card withBorder padding="xl" radius="md" className={classes.card}>
        <Text c="blue" fw={700} align="center" fz="lg" mt="sm">
          {userInfo?.username || loggedOnUser?.email.split('@')[0]}
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
