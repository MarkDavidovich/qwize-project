import { Card, Avatar, Text, Group, Button, Box, Loader, Center, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { useAuth } from "../../auth/AuthProvider";
import { getUserInfo } from "../../lib/APIUserInfo";
import style from "./Profile.module.css";
import { IconBrandWhatsapp } from "@tabler/icons-react";
import { formatTimeHours } from "../../lib/helperFunctions";

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
    { label: "Total Score", value: userInfo?.total_score || 0 },
    { label: "Correct Answers", value: userInfo?.correct_answers || 0 },
    { label: "Time Played", value: formatTimeHours(userInfo?.total_time) || 0 },
  ];

  const items = stats.map((stat) => (
    <div key={stat.label} style={{ textAlign: "center" }}>
      <Text size="40px" fw={700} c={"white"}>
        {stat.value}
      </Text>
      <Text fz="xl" fw={600} c="" lh={1} pt={"sm"}>
        {stat.label}
      </Text>
    </div>
  ));

  return (
    <>
      <Box className={style.wrapper}>
        <Card withBorder padding="xl" radius="md" className={style.card} bg={"blue"}>
          <Text size="40px" fw={900} c={"white"} align="center" pb={"md"}>
            {userInfo?.username || loggedOnUser?.email.split("@")[0]}
          </Text>
          <Group mt="md" justify="center" gap={30}>
            {items}
          </Group>
        </Card>
        <Button
          radius="md"
          mt="xl"
          size="md"
          color="#25D366"
          leftSection={<IconBrandWhatsapp size={20} />}
          component="a"
          href={`https://wa.me/?text=${encodeURIComponent(`My Qwize score: ${userInfo?.total_score} Can you top that? Play now: https://markdavidovich.github.io/qwize-project/`)}`}
          //TODO add a normal message
          target="_blank"
        >
          Share on WhatsApp
        </Button>
      </Box>
    </>
  );
}

export default Profile;
