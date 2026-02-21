import { Button, Container, Flex, Group, Text, Burger, Drawer, Stack } from "@mantine/core";
import classes from "./Navbar.module.css";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../auth/AuthProvider";
import { useDisclosure } from "@mantine/hooks";

export function Navbar() {
  const { loggedOnUser, handleLogout } = useAuth();
  const [opened, { open, close, toggle }] = useDisclosure(false);

  const navLinks = (
    <>
      <NavLink to="/" onClick={close} className={({ isActive }) => `${isActive ? classes.link + " " + classes.active : classes.link}`}>
        Home
      </NavLink>
      {!loggedOnUser && (
        <>
          <NavLink to="/login" onClick={close} className={({ isActive }) => `${isActive ? classes.link + " " + classes.active : classes.link}`}>
            Login
          </NavLink>
          <NavLink to="/register" onClick={close} className={({ isActive }) => `${isActive ? classes.link + " " + classes.active : classes.link}`}>
            Register
          </NavLink>
        </>
      )}
      {loggedOnUser && (
        <NavLink to="/leaderboards" onClick={close} className={({ isActive }) => `${isActive ? classes.link + " " + classes.active : classes.link}`}>
          Leaderboards
        </NavLink>
      )}
    </>
  );

  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
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

        <Drawer opened={opened} onClose={close} title="Navigation" padding="md" size="sm" hiddenFrom="xs">
          <Stack gap="md">
            {navLinks}
            <hr style={{ border: "0", borderTop: "1px solid #eee", width: "100%" }} />
            {loggedOnUser && (
              <>
                <Text size="sm" fw={500} px="sm">
                  User: {loggedOnUser.email}
                </Text>
                <Button color="red" variant="light" onClick={handleLogout}>
                  Log out
                </Button>
              </>
            )}
          </Stack>
        </Drawer>
      </Container>
    </header>
  );
}
