import { useForm } from "react-hook-form";
// import { Button } from "./button";
import { InputField } from "./inputs";
import { zodResolver } from "@hookform/resolvers/zod";
// import { loginSchema, type LoginFormData } from "../schemas/auth-schema";
import toast from "react-hot-toast";

import Cookies from "js-cookie";
import { Button } from "./ui/button";
import Link from "next/link";
import { loginSchema } from "@/schemas/auth.schema";
import { AlertDialogCancel } from "./ui/alert-dialog";
import { ArrowUpRight } from "lucide-react";
import { useLogin } from "@/hooks/auth.hook";
// import { useLoginAdmin } from "../hooks/register-admin.hook";

const LoginForm = ({ setMode }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const { mutate: login, isPending, error, isError, data } = useLogin();

  const onSubmit = async (data) => {
    console.log("🚀 ~ onSubmit ~ data:", data);
    login(data, {
      onSuccess(res) {
        console.log("🚀 ~ onSuccess ~ res:", res);
        Cookies.set("token", res.token);
        reset();
        toast.success("Login successful");

        // navigate("/overview");
      },
      onError(error) {
        console.log("🚀 ~ onError ~ error:", error);
        // const errorMessage = toast.error(
        //   "Failed to login.Please try again later"
        // );
      },
    });
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
          label="Email"
          name="email"
          type="email"
          register={register}
          error={errors.email?.message}
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

        <div className="pt-4  ">
          <Button
            type="submit"
            disabled={isSubmitting || isPending}
            className="mb-4 cursor-pointer w-full bg-pink-600 hover:bg-pink-300"
          >
            {isSubmitting || isPending ? "Logging in..." : "Log in"}
          </Button>
        </div>
        <div>
          <p className="flex items-center gap-2 text-sm">
            New customer?{" "}
            <button
              type="button"
              onClick={() => setMode("signup")}
              className="text-pink-500 underline"
            >
              Create your account
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
