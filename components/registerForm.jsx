import { useForm } from "react-hook-form";
import { InputField } from "./inputs";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Button } from "./ui/button";
import Link from "next/link";
import { loginSchema, registerSchema } from "@/schemas/auth.schema";
import { AlertDialogCancel } from "./ui/alert-dialog";
import { ArrowUpRight, LoaderCircle } from "lucide-react";
import { useRegister } from "@/hooks/auth.hook";

const RegisterForm = ({ setMode }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const { mutate: registerUser, isPending, error, isError } = useRegister();

  const onSubmit = async (data) => {
    registerUser(data, {
      onSuccess() {
        reset();
        toast.success("User created successfully");
        setMode("login");
      },
      onError(error) {
        const errorMessage = error.message;
        toast.error(errorMessage);
      },
    });
  };

  return (
    <div className="space-y-4 p-10 ">
      {isError && error && (
        <span className="text-rose-500 mt-2 bg-rose-100 border border-rose-500 rounded-lg px-8 py-2 list-disc">
          {error.message}
        </span>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label="User Name"
          name="username"
          type="text"
          register={register}
          error={errors.username?.message}
          required
        />

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

        <div className="pt-4">
          <Button
            type="submit"
            disabled={isSubmitting || isPending}
            className="mb-4 cursor-pointer w-full bg-pink-600 hover:bg-pink-300"
          >
            {isSubmitting || isPending ? (
              <LoaderCircle className="animate-spin text-white" />
            ) : (
              "Sign Up"
            )}
          </Button>
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
