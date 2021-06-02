import React from "react";
import { Link, useHistory, Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import { setSession } from "../redux/auth/auth";
import { useDispatch } from "react-redux";
const SIGNUP = gql`
  mutation register($email: String!, $password: String!, $name: String!) {
    register(email: $email, password: $password, name: $name) {
      token
    }
  }
`;

function Signup() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [signup] = useMutation(SIGNUP);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const { data: token } = await signup({
        variables: {
          email: data.email,
          name: data.name,
          password: data.password,
        },
      });
      console.log(token);
      dispatch(setSession(token.register.token));
      localStorage.setItem("auth-token", token.register.token);
      setTimeout(() => {
        history.push("/");
      }, 1000);
    } catch (err) {
      //TODO: error handling
      console.log(err);
      return;
    }
  };

  return (
    <div className="grid place-items-center bg-gray-100 h-screen">
      <div>
        <form
          className="flex flex-col items-center border p-2 bg-white"
          onSubmit={handleSubmit(onSubmit)}
        >
          <p>Sign Up</p>
          <input
            type="text"
            placeholder="Full Name"
            {...register("name", { required: true })}
            className="my-1 border px-2 py-1"
          />
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: true })}
            className="my-1 border px-2 py-1"
          />
          {errors.email && <span>Email is required</span>}
          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: true })}
            className="my-1 border px-2 py-1"
          />
          {errors.password && <span>Password is required</span>}
          <input
            type="password"
            placeholder="Confirm Password"
            {...register("confirmPassword", {
              required: true,
              validate: (value) => value === watch("password"),
            })}
            className="my-1 border px-2 py-1"
          />
          {errors.confirmPassword && <span>Passwords do not match</span>}
          <button
            className="bg-blue-500 px-2 py-1 my-2 text-white"
            type="submit"
          >
            Sign Up
          </button>
        </form>
        <div className="text-center mt-2 text-blue-500 font-semibold">
          <Link to="/signin">
            <p>Sign In</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
