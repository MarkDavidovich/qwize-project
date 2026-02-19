import { useState } from "react";
import { Box, Burger, Button, Container, Group } from "@mantine/core";
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
          <Button variant="subtle" color="red" onClick={handleLogout}>
            Log out
          </Button>
        )}
      </Container>
    </header>
  );
}
