import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import useToggle from "../customHooks/useToggle";
import { LOGIN_USER } from "../mutations/userMutations";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import Cookies from 'universal-cookie';

const Login = () => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  // console.log(cookies.get('authToken'));

  const [login, { loading, error, data }] = useMutation(LOGIN_USER, {
    onError: (e) => alert(e),
    onCompleted:async ({ login }) => {

        cookies.set('authToken', login, { path: '/' });
        // await new Promise(r=>setTimeout(r,1000))
        navigate("/");
      
    },
  });
// console.log(cookies.get('authToken'))
 


  const [showPassword, setShowPassword] = useToggle(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email required"),
      password: Yup.string().required("Password required"),
    }),
    onSubmit: (values) => {


    
      login({
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
                Sign in to your account
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

                <button
                  type="submit"
                  class={loading?"w-full disabled text-white bg-blue-500 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800":"w-full text-white bg-blue-500 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"}
                >
                 {loading?<Spinner customHeight={9} customColor="#FFF"></Spinner>:"Sign in"}
                </button>
                <p class="text-sm font-light text-gray-50 dark:text-gray-400">
                  Don’t have an account yet?{" "}
                  <Link
                    to="/register"
                    class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign up
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

export default Login;
