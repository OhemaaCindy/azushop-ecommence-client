import { useForm } from "react-hook-form";
// import { Button } from "./button";
import { InputField } from "./inputs";
import { zodResolver } from "@hookform/resolvers/zod";
// import { loginSchema, type RegisterFormData } from "../schemas/auth-schema";
import toast from "react-hot-toast";

import Cookies from "js-cookie";
import { Button } from "./ui/button";
import Link from "next/link";
import { loginSchema } from "@/schemas/auth.schema";
import { AlertDialogCancel } from "./ui/alert-dialog";
import { ArrowUpRight } from "lucide-react";
// import { useLoginAdmin } from "../hooks/register-admin.hook";

const RegisterForm = ({ setMode }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  //   const {
  //     mutate: loginUser,
  //     isPending,
  //     error,
  //     isError,
  //     data,
  //   } = useLoginAdmin();

  const onSubmit = async (data) => {
    console.log("🚀 ~ onSubmit ~ data:", data);
    // loginUser(data, {
    //   onSuccess(res) {
    //     Cookies.set("token", res.token);
    //     reset();
    //     toast.success("Login successful");

    //     navigate("/overview");
    //   },
    //   onError() {
    //     toast.error("Failed to login.Please try again later");
    //   },
    // });
  };

  return (
    <div className="space-y-4 p-10 ">
      {/* {isError && error && (
        <ul className="text-rose-500 mt-2 bg-rose-100 border border-rose-500 rounded-lg px-8 py-2 list-disc">
          {error.errors.map((err, index) => (
            <li key={index}>{err.message}</li>
          ))}
        </ul>
      )} */}

      {/* {data && data.success && (
        <p className="text-green-600 mt-2">{data.message}</p>
      )} */}

      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label="First Name"
          name="email"
          type="email"
          register={register}
          error={errors.email?.message}
          required
        />
        <InputField
          label="Last Name"
          name="email"
          type="email"
          register={register}
          error={errors.email?.message}
          required
        />
        <InputField
          label="Email"
          name="password"
          type="password"
          register={register}
          error={errors.password?.message}
          required
        />

        <InputField
          label="Password"
          name="password"
          type="password"
          register={register}
          error={errors.password?.message}
          required
        />
        <InputField
          label="Confirm Password"
          name="password"
          type="password"
          register={register}
          error={errors.password?.message}
          required
        />

        <div className="pt-4  ">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="mb-4 cursor-pointer w-full bg-pink-600 hover:bg-pink-300"
          >
            {isSubmitting ? "Signing up..." : "Sign Up"}
          </Button>
          {/* <AlertDialogCancel>Cancel</AlertDialogCancel> */}
        </div>
        <p className="flex items-center gap-2 text-sm">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => setMode("login")}
            className="text-pink-500 underline"
          >
            Login here
          </button>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
