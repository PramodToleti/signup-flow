import {
  Container,
  FormControl,
  FormGroup,
  Input,
  InputLabel,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const token = Cookies.get("access_token");

  if (token) {
    return <Navigate to="/" />;
  }

  const onSubmit = async (data) => {
    console.log(data);
    const newData = {
      password: data.password,
    };
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:3030/users/${data.email}/login`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(newData),
        }
      );

      const resData = await res.json();
      console.log(resData.access_token);

      if (res.ok) {
        toast.success("Login Successful!");
        Cookies.set("access_token", res.access_token);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <h1 className="">Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <FormControl>
            <InputLabel htmlFor="my-input">Email address</InputLabel>
            <Input id="my-input" required={true} {...register("email")} />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input id="password" required={true} {...register("password")} />
          </FormControl>
          {loading ? <p>Loading...</p> : <Input type="submit" />}
        </FormGroup>
      </form>
      <p>
        Dont have an account? <Link to="/register">Register</Link>
      </p>
    </Container>
  );
};

export default Login;
