import { useFormik } from "formik";
import * as Yup from "yup";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import useToggle from "../customHooks/useToggle";
import { Link } from "react-router-dom";
import { REGISTER_USER } from "../mutations/userMutations";
import { useMutation } from "@apollo/client";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const Register = () => {
  const navigate = useNavigate();
  const cookies = new Cookies();

  const [register, { loading, error, data }] = useMutation(REGISTER_USER, {
    onError: (e) => alert(e),
    onCompleted: ({ register }) => {
      cookies.set("authToken", register, { path: "/" });
      // await new Promise(r=>setTimeout(r,1000))
      navigate("/");
    },
  });

  console.log(data);

  const [showPasswordConfirm, setShowPasswordConfirm] = useToggle(false);

  const [showPassword, setShowPassword] = useToggle(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordConfirmation: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email required"),
      password: Yup.string().required("Password required"),
      passwordConfirmation: Yup.string()
        .required("Password required")
        .oneOf([Yup.ref("password"), null], "Passwords must match"),
    }),
    onSubmit: (values) => {
      register({
        variables: {
          email: values.email,
          password: values.password,
        },
      });
    },
  });

  return (
    <div className="h-screen relative bg-splash bg-center bg-cover bg-no-repeat">
      <div className="absolute z-20  flex items-center justify-center h-screen w-screen">
        <div class="flex flex-col w-full items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div class="w-full bg-red-white backdrop-blur-sm bg-white/20  rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl dark:text-white">
                Create account
              </h1>
              <form
                onSubmit={formik.handleSubmit}
                class="space-y-4 md:space-y-6"
                action="#"
              >
                <div>
                  <label
                    for="email"
                    class="block mb-2 text-sm font-medium text-white dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    class=" border border-gray-300 text-gray-900 sm:text-sm rounded-lg  focus:border-white block w-full p-2.5  dark:border-gra"
                    placeholder="name@company.com"
                    required=""
                    value={formik.values.email}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="text-sm text-red-500 font-semibold">
                      {formik.errors.email}
                    </div>
                  ) : null}
                </div>

                <div className="relative">
                  <label
                    for="password"
                    class="block mb-2 text-sm font-medium text-gray-50 dark:text-white"
                  >
                    Password
                  </label>
                  <div className="flex items-center justify-center">
                    <input
                      value={formik.values.password}
                      type={showPassword ? "text" : "password"}
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      onChange={formik.handleChange}
                      class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required=""
                    />
                    <div
                      onClick={() => setShowPassword()}
                      className=" absolute text-xl justify-end text-gray-400 right-0 pr-2"
                    >
                      {showPassword ? (
                        <AiOutlineEyeInvisible />
                      ) : (
                        <AiOutlineEye />
                      )}
                    </div>
                  </div>

                  {formik.touched.password && formik.errors.password ? (
                    <div className="text-sm text-red-500 font-semibold">
                      {formik.errors.password}
                    </div>
                  ) : null}
                </div>
                <div className="relative">
                  <label
                    for="password"
                    class="block mb-2 text-sm font-medium text-gray-50 dark:text-white"
                  >
                    Confrim Password
                  </label>
                  <div className="flex items-center justify-center">
                    <input
                      value={formik.values.passwordConfirmation}
                      type={showPasswordConfirm ? "text" : "password"}
                      name="passwordConfirmation"
                      id="passwordConfirmation"
                      placeholder="••••••••"
                      onChange={formik.handleChange}
                      class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required=""
                    />
                    <div
                      onClick={() => setShowPasswordConfirm()}
                      className=" absolute text-xl justify-end text-gray-400 right-0 pr-2"
                    >
                      {showPasswordConfirm ? (
                        <AiOutlineEyeInvisible />
                      ) : (
                        <AiOutlineEye />
                      )}
                    </div>
                  </div>

                  {formik.touched.passwordConfirmation &&
                  formik.errors.passwordConfirmation ? (
                    <div className="text-sm text-red-500 font-semibold">
                      {formik.errors.passwordConfirmation}
                    </div>
                  ) : null}
                </div>

                <button
                  type="submit"
                  class={loading?"w-full disabled text-white bg-blue-500 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800":"w-full text-white bg-blue-500 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"}
                >
                  {loading ? (
                    <Spinner customHeight={9} customColor="#FFFFFF" />
                  ) : (
                    "Sign up"
                  )}
                </button>
                <p class="text-sm font-light text-gray-50 dark:text-gray-400">
                  Have an account ?{" "}
                  <Link
                    to="/login"
                    class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign in
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
