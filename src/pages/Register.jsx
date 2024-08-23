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

const Register = () => {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const token = Cookies.get("access_token");

  if (token) {
    return <Navigate to="/" />;
  }

  const onSubmit = async (data) => {
    console.log(data);
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3030/signup", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        console.log(res);
        toast.success("Registration Successful!");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <h1 className="">Register</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <FormControl>
            <InputLabel htmlFor="firstname">First Name</InputLabel>
            <Input id="firstname" required={true} {...register("firstname")} />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="lastname">Last Name</InputLabel>
            <Input id="lastname" required={true} {...register("lastname")} />
          </FormControl>
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
        Already registered? <Link to="/login">Login</Link>
      </p>
    </Container>
  );
};

export default Register;
