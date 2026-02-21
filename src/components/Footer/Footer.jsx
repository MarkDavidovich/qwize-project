import { IconBrandGithub, IconBrandInstagram, IconBrandTwitter, IconBrandYoutube } from "@tabler/icons-react";
import { ActionIcon, Anchor, Container, Group, Text } from "@mantine/core";
import classes from "./Footer.module.css";
import ContactInfo from "../ContactInfo/ContactInfo";

export function Footer() {
  return (
    <div className={classes.footer}>
      <Container className={classes.inner} visibleFrom="xs">
        <ContactInfo />
      </Container>
    </div>
  );
}
