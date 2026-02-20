import { Button, Container, Flex, Group, Text } from "@mantine/core";
import classes from "./Navbar.module.css";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../auth/AuthProvider";

export function Navbar() {
  const { loggedOnUser, handleLogout } = useAuth();

  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        <Group gap={5}>
          <NavLink to="/" className={({ isActive }) => `${isActive ? classes.link + " " + classes.active : classes.link}`}>
            Home
          </NavLink>
          {!loggedOnUser && (
            <>
              <NavLink to="/login" className={({ isActive }) => `${isActive ? classes.link + " " + classes.active : classes.link}`}>
                Login
              </NavLink>
              <NavLink to="/register" className={({ isActive }) => `${isActive ? classes.link + " " + classes.active : classes.link}`}>
                Register
              </NavLink>
            </>
          )}
          {loggedOnUser && (
            <NavLink to="/leaderboards" className={({ isActive }) => `${isActive ? classes.link + " " + classes.active : classes.link}`}>
              Leaderboards
            </NavLink>
          )}
        </Group>

        {loggedOnUser && (
          <Flex justify="center" align="center">
            <Button
              variant="transparent"
              onClick={() => {
                console.log("User Profile?");
              }}
            >
              {loggedOnUser.email.split("@")[0]}
            </Button>
            <Button variant="subtle" color="red" onClick={handleLogout}>
              Log out
            </Button>
          </Flex>
        )}
      </Container>
    </header>
  );
}
