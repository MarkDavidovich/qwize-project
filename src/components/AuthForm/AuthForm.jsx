import {
  TextInput,
  PasswordInput,
  Button,
  Stack,
  Text,
  Anchor,
  Paper,
  Title,
  Container,
} from "@mantine/core";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../auth/AuthProvider";

const AuthForm = ({ type }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { handleLogin, handleRegister } = useAuth();

  const handleAuth = () => {
    if (type === "login") {
      handleLogin(email, password);
    } else {
      if (password !== confirmPassword) {
        console.log("Passwords do not match!");
        return;
      }
      handleRegister(email, password);
    }
  };

  const isDisabled =
    email.length === 0 ||
    password.length === 0 ||
    (type === "register" && confirmPassword.length === 0);

  return (
    <Container size={420} my={40}>
      <Title
        style={{
          color: "#1c7ed6",
          fontWeight: 900,
          textAlign: "center",
        }}
      >
        {type === "login" ? "Welcome back!" : "Create an account"}
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        {type === "login"
          ? "Enter your email and password to login"
          : "Register to start your Qwize journey"}
      </Text>

      <Paper withBorder shadow="md" p="xl" mt={30} radius="md">
        <Stack gap="md">
          <TextInput
            label="Email"
            placeholder="your_email@mail.com"
            type="email"
            required
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />

          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />

          {type === "register" && (
            <PasswordInput
              label="Confirm Password"
              placeholder="Confirm your password"
              required
              mt="md"
              value={confirmPassword}
              onChange={(ev) => setConfirmPassword(ev.target.value)}
            />
          )}

          <Stack gap="xs" mt="xl">
            {type === "login" && (
              <Text size="sm">
                Don't have an account?{" "}
                <Anchor component={Link} to="/register">
                  Register
                </Anchor>
              </Text>
            )}

            {type === "register" && (
              <Text size="sm">
                Already have an account?{" "}
                <Anchor component={Link} to="/login">
                  Login
                </Anchor>
              </Text>
            )}

            <Button disabled={isDisabled} onClick={handleAuth} fullWidth>
              {type === "login" ? "Login" : "Register"}
            </Button>
            {type === "login" && (
              <Button component={Link} to="/" variant="filled">
                Try the game out!
              </Button>
            )}
          </Stack>
        </Stack>
      </Paper>
    </Container>
  );
};

export default AuthForm;
