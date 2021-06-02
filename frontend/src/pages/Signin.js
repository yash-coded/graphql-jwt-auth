import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import { setSession } from "../redux/auth/auth";
import { useDispatch } from "react-redux";
const SIGNIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

function Signin() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [login] = useMutation(SIGNIN);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const { data: token } = await login({
        variables: { email: data.email, password: data.password },
      });

      dispatch(setSession(token.login.token));
      localStorage.setItem("auth-token", token.login.token);
      history.push("/");
    } catch (error) {
      // TODO: error handling
      console.log(error.message);
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
          <p>Sign In</p>
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: true })}
            className="my-1 border px-2 py-1"
          />
          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: true })}
            className="my-1 border px-2 py-1"
          />
          <button
            className="bg-blue-500 px-2 py-1 my-2 text-white"
            type="submit"
          >
            Sign In
          </button>
          {errors.password && <span>Password is required</span>}
          {errors.email && <span>Email is required</span>}
        </form>
        <div className="text-center mt-2 text-blue-500 font-semibold">
          <Link to="/signup">
            <p>Sign Up</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signin;
