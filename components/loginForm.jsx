import { useForm } from "react-hook-form";
import { InputField } from "./inputs";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { Button } from "./ui/button";
import Link from "next/link";
import { loginSchema } from "@/schemas/auth.schema";
import { AlertDialogCancel } from "./ui/alert-dialog";
import { ArrowUpRight } from "lucide-react";
import { useLogin } from "@/hooks/auth.hook";
import { useQueryClient } from "@tanstack/react-query";

const LoginForm = ({ setMode, setIsModal }) => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  // const { mutate: login, isPending, error, isError, data } = useLogin();
  const {
    mutate: login,
    isPending,
    error,
    isError,
  } = useLogin({
    onSuccess: (res) => {
      reset();
      toast.success("Login successful");
      setIsModal(false);
      // router.push("/overview"); // optional redirect
    },
    onError: (error) => {
      const errorMessage = error.message || "Login failed. Try again.";
      toast.error(errorMessage);
    },
  });

  const onSubmit = (data) => {
    login(data);
  };

  // const onSubmit = async (data) => {
  //   login(data, {
  //     onSuccess(res) {
  //       localStorage.setItem("token", res.token);
  //       queryClient.invalidateQueries({ queryKey: ["user-info"] });
  //       reset();
  //       toast.success("Login successful");
  //       setIsModal(false);
  //       // navigate("/overview")
  //     },
  //     onError(error) {
  //       const errorMessage = error.message;
  //       toast.error(errorMessage);
  //     },
  //   });
  // };

  return (
    <div className="space-y-4 p-10 ">
      {isError && error && (
        <span className="text-rose-500 mt-2 bg-rose-100 border border-rose-500 rounded-lg px-8 py-2 list-disc">
          {error.message}
        </span>
      )}

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
