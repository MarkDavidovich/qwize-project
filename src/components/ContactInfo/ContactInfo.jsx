import { ActionIcon, Anchor, Flex, Text } from "@mantine/core";
import { IconBrandGithub } from "@tabler/icons-react";

const ContactInfo = ({ isMobile = false }) => (
  <Flex direction={isMobile ? "column" : "row"} justify={isMobile ? "center" : "space-between"} align="center" gap="md" w="100%">
    <Text c="gray" fw={500} size={isMobile ? "sm" : "md"} ta={isMobile ? "center" : "left"}>
      Made by{" "}
      <Anchor fw={700} href="https://github.com/galraij" target="_blank">
        Gal
      </Anchor>
      ,{" "}
      <Anchor fw={700} href="https://github.com/TOMLUCA7" target="_blank">
        Tom
      </Anchor>{" "}
      and{" "}
      <Anchor fw={700} href="https://github.com/MarkDavidovich" target="_blank">
        Mark
      </Anchor>
    </Text>

    <ActionIcon component="a" href="https://github.com/MarkDavidovich/qwize-project" target="_blank" size="lg" radius="xl" variant="filled">
      <IconBrandGithub size={22} stroke={1.5} />
    </ActionIcon>
  </Flex>
);

export default ContactInfo;
