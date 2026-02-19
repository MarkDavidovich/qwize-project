import { IconBrandGithub, IconBrandInstagram, IconBrandTwitter, IconBrandYoutube } from "@tabler/icons-react";
import { ActionIcon, Anchor, Container, Group, Text } from "@mantine/core";
// import { MantineLogo } from "@mantinex/mantine-logo";
import classes from "./Footer.module.css";

export function Footer() {
  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        {/* <MantineLogo size={28} /> */}
        <Text c="gray" fw={500}>
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
        <Group gap={0} className={classes.links} justify="flex-end" wrap="nowrap">
          <ActionIcon component="a" href="https://github.com/MarkDavidovich/qwize-project" target="_blank" size="xl" radius="xl" aria-label="GitHub">
            <IconBrandGithub size={18} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Container>
    </div>
  );
}
