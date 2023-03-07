import Layout from "components/common/Layout";
import jwt_decode from "jwt-decode";
import { login } from "services/authService";
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { getCurrentUser } from "services/authService";
import { addUser } from "store/slices/userSlice";
import { useDispatch } from "react-redux";

type Inputs = {
  email: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const fetchUser = async () => {
    const token = localStorage.getItem("x-auth-token")!;

    if (!token) return;
    const currentUser: any = jwt_decode(token);

    const { data } = await getCurrentUser(currentUser._id);

    dispatch(addUser(data));
  };

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    try {
      const { data: token } = await login(email, password);
      localStorage.setItem("x-auth-token", JSON.stringify(token));
      fetchUser();
      navigate("/cart");
    } catch (ex: any) {
      if (ex.respone && ex.response.status === 400) {
      }
    }
  };

  return (
    <Layout title="Login">
      <form
        className="mx-auto max-w-screen-sm"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="mb-4 text-xl">Login</h1>
        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            {...register("email", {
              required: "Please enter email",
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                message: "Please enter valid email",
              },
            })}
            id="email"
            className="w-full rounded border p-2  outline-none ring-indigo-300  focus:ring"
            autoFocus
          />
          {errors.email && (
            <div className="text-red-500">{errors.email.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            {...register("password", {
              required: "Please enter password",
              minLength: { value: 5, message: "password is more than 5 chars" },
            })}
            className="w-full rounded border p-2  outline-none ring-indigo-300  focus:ring"
            id="password"
            autoFocus
          ></input>
          {errors.password && (
            <div className="text-red-500">{errors.password.message}</div>
          )}
        </div>
        <div className="mb-4">
          <button
            type="submit"
            className="px-4 py-2 bg-red-700 text-white font-semibold rounded-2xl"
          >
            Login
          </button>
        </div>
        <div className="mb-4">
          Don&apos;t have an account? &nbsp;
          <Link to="/register" className="underline">
            Register
          </Link>
        </div>
      </form>
    </Layout>
  );
};

export default Login;
