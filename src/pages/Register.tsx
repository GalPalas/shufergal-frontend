import Layout from "components/common/Layout";
import jwt_decode from "jwt-decode";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { signUp } from "services/userService";
import { toast } from "react-toastify";
import { getError } from "utilities/error";
import { useDispatch } from "react-redux";
import { addUser } from "store/slices/userSlice";
import { login } from "services/authService";
import { getCurrentUser } from "services/authService";

type Inputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<Inputs>();

  const fetchUser = async () => {
    const token = localStorage.getItem("x-auth-token")!;

    if (!token) return;
    const currentUser: any = jwt_decode(token);

    const { data } = await getCurrentUser(currentUser._id);

    dispatch(addUser(data));
  };

  const onSubmit: SubmitHandler<Inputs> = async ({ name, email, password }) => {
    try {
      await signUp(name, email, password);
      const { data: token } = await login(email, password);
      localStorage.setItem("x-auth-token", JSON.stringify(token));
      fetchUser();
      navigate("/");
    } catch (ex: any) {
      toast.error(getError(ex), {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <Layout title="Create Account">
      <form
        className="mx-auto max-w-screen-sm"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="mb-4 text-xl">Create Account</h1>

        <div className="mb-4">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            {...register("name", {
              required: "Please enter name",
            })}
            id="name"
            className="w-full rounded border p-2  outline-none ring-indigo-300  focus:ring"
            autoFocus
          />
          {errors.name && (
            <div className="text-red-500">{errors.name.message}</div>
          )}
        </div>

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
              minLength: {
                value: 5,
                message:
                  "Use 5 characters with a mix of letters, numbers & symbols",
              },
            })}
            className="w-full rounded border p-2  outline-none ring-indigo-300  focus:ring"
            id="password"
          ></input>
          {errors.password && (
            <div className="text-red-500">{errors.password.message}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            {...register("confirmPassword", {
              required: "Please confirm password",
              validate: (value) => value === getValues("password"),
              minLength: {
                value: 5,
                message:
                  "Use 5 characters with a mix of letters, numbers & symbols",
              },
            })}
            className="w-full rounded border p-2  outline-none ring-indigo-300  focus:ring"
            id="confirmPassword"
          ></input>
          {errors.confirmPassword && (
            <div className="text-red-500">{errors.confirmPassword.message}</div>
          )}
          {errors.confirmPassword &&
            errors.confirmPassword.type === "validate" && (
              <div className="text-red-500">
                Those passwords didn’t match. Try again.
              </div>
            )}
        </div>

        <div className="mb-4">
          <button
            type="submit"
            className="px-4 py-2 bg-red-700 text-white font-semibold rounded-2xl"
          >
            Register
          </button>
        </div>
      </form>
    </Layout>
  );
};

export default Register;
