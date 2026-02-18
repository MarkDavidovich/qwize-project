import AuthForm from "../../components/AuthForm/AuthForm";
import style from "./Login.module.css";
import { Button } from "@mantine/core";

const Login = () => {
  return (
    <>
      <AuthForm type="login" />
    </>
  );
};
export default Login;
