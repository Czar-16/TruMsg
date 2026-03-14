"use client";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { signInSchema } from "@/schemas/signInSchema";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const SignInpage = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    try {
      const response = await axios.post("/api/sign-in", data);
      toast.success(response.data.message);
      router.replace("/dashboard");
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      const message = axiosError.response?.data.message;
      toast.error(message ?? "Sign in failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <div className="w-full max-w-md p-8 space-y-8 bg-zinc-900 rounded-2xl shadow-xl border border-zinc-800">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold mb-6 text-white">
            Welcome to TruMsg 🗨️
          </h1>

          <p className="mb-4 text-zinc-300">
            Sign in to start your anonymous adventure
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Username */}
            <FormField
              control={form.control}
              name="username"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className="text-zinc-300">Username</FormLabel>

                  <FormControl>
                    <Input
                      placeholder="Enter username"
                      {...field}
                      className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-400"
                    />
                  </FormControl>

                  {fieldState.error && (
                    <p className="text-red-400 text-sm">
                      {fieldState.error.message}
                    </p>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className="text-zinc-300">Password</FormLabel>

                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter password"
                      {...field}
                      className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-400"
                    />
                  </FormControl>

                  {fieldState.error && (
                    <p className="text-red-400 text-sm">
                      {fieldState.error.message}
                    </p>
                  )}
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full bg-blue-700 text-white hover:bg-blue-800"
            >
              Sign in
            </Button>
            <div className="text-center">
              <p className="text-zinc-400">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => router.replace("/sign-up")}
                  className="text-blue-500 hover:text-blue-400"
                >
                  Sign up
                </button>
              </p>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SignInpage;
