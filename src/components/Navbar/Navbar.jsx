import { Button, Container, Group, Text, Burger, Drawer, Stack, Divider } from "@mantine/core";
import style from "./Navbar.module.css";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../auth/AuthProvider";
import { useDisclosure } from "@mantine/hooks";
import { Footer } from "../Footer/Footer";
import ContactInfo from "../ContactInfo/ContactInfo";

export function Navbar() {
  const { loggedOnUser, handleLogout } = useAuth();
  const [opened, { open, close, toggle }] = useDisclosure(false);

  const navLinks = (
    <>
      <NavLink to="/" onClick={close} className={({ isActive }) => `${isActive ? style.link + " " + style.active : style.link}`}>
        Home
      </NavLink>
      {!loggedOnUser && (
        <>
          <NavLink to="/login" onClick={close} className={({ isActive }) => `${isActive ? style.link + " " + style.active : style.link}`}>
            Login
          </NavLink>
          <NavLink to="/register" onClick={close} className={({ isActive }) => `${isActive ? style.link + " " + style.active : style.link}`}>
            Register
          </NavLink>
        </>
      )}
      {loggedOnUser && (
        <NavLink to="/leaderboards" onClick={close} className={({ isActive }) => `${isActive ? style.link + " " + style.active : style.link}`}>
          Leaderboards
        </NavLink>
      )}
    </>
  );

  return (
    <header className={style.header}>
      <Container size="md" className={style.inner}>
        <Group gap={5} visibleFrom="xs">
          {navLinks}
        </Group>

        {loggedOnUser && (
          <Group gap={5} visibleFrom="xs">
            <Button variant="transparent">{loggedOnUser.email.split("@")[0]}</Button>
            <Button variant="subtle" color="red" onClick={handleLogout}>
              Log out
            </Button>
          </Group>
        )}
        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />

        <Drawer
          opened={opened}
          onClose={close}
          title="Qwize"
          padding="md"
          size="80%"
          h="100%"
          hiddenFrom="xs"
          styles={{
            body: {
              height: "calc(100vh - 70px)",
              display: "flex",
              flexDirection: "column",
            },
          }}
        >
          <Stack h="100%" justify="space-between">
            <Stack gap="md">
              {navLinks}
              <hr style={{ border: "0", borderTop: "1px solid #eee", width: "100%" }} />
            </Stack>

            <Stack pb="sm">
              {loggedOnUser && (
                <>
                  <Button variant="transparent">{loggedOnUser.email.split("@")[0]}</Button>
                  <Button color="red" variant="light" onClick={handleLogout}>
                    Log out
                  </Button>
                </>
              )}
              <Divider w="100%" label="Connect" labelPosition="center" />
              <ContactInfo isMobile={true} />
            </Stack>
          </Stack>
        </Drawer>
      </Container>
    </header>
  );
}
