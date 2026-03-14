"use client";

import { useDebounceCallback } from "usehooks-ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import Link from "next/link";
import axios, { AxiosError } from "axios";
import { Loader2 } from "lucide-react";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { signUpSchema } from "@/schemas/signUpSchema";
import { ApiResponse } from "@/types/ApiResponse";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SignUppage = () => {
  const [username, setUsername] = useState("");
  const [usernameMessage, setUsernameMessage] = useState("");
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const debounced = useDebounceCallback(setUsername, 500);
  const router = useRouter();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
    criteriaMode: "firstError",
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    const checkUsernameUnique = async () => {
      if (!username) return;

      setIsCheckingUsername(true);
      setUsernameMessage("");

      try {
        const response = await axios.get<ApiResponse>(
          `/api/check-username-unique?username=${username}`,
        );

        setUsernameMessage(response.data.message);
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;

        setUsernameMessage(
          axiosError.response?.data.message ?? "Error checking username",
        );
      } finally {
        setIsCheckingUsername(false);
      }
    };

    checkUsernameUnique();
  }, [username]);

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsSubmitting(true);

    try {
      const response = await axios.post<ApiResponse>("/api/sign-up", data);

      toast.success(response.data.message);

      router.replace(`/verify/${data.username}`);
    } catch (error) {
      console.error("Error in signup of user", error);

      const axiosError = error as AxiosError<ApiResponse>;
      const errorMessage = axiosError.response?.data.message;

      toast.error(errorMessage ?? "Signup failed");
    } finally {
      setIsSubmitting(false);
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
            Sign up to start your anonymous adventure
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
                      onChange={(e) => {
                        field.onChange(e);
                        debounced(e.target.value);
                      }}
                    />
                  </FormControl>

                  {fieldState.error && (
                    <p className="text-red-400 text-sm">
                      {fieldState.error.message}
                    </p>
                  )}

                  {!fieldState.error && isCheckingUsername && (
                    <p className="text-zinc-400 text-sm flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </p>
                  )}

                  {!fieldState.error &&
                    !isCheckingUsername &&
                    usernameMessage && (
                      <p
                        className={`text-sm ${
                          usernameMessage.toLowerCase().includes("available")
                            ? "text-green-400"
                            : "text-red-400"
                        }`}
                      >
                        {usernameMessage}
                      </p>
                    )}
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className="text-zinc-300">Email</FormLabel>

                  <FormControl>
                    <Input
                      placeholder="Enter email"
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

            {/* Password */}
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

            {/* Submit */}
            <Button
              type="submit"
              className="w-full bg-blue-700 text-white hover:bg-blue-800"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Signing up...
                </span>
              ) : (
                "Sign up"
              )}
            </Button>

            <div className="text-center">
              <p className="text-zinc-400">
                Already have an account?{" "}
                <Link
                  href="/sign-in"
                  className="text-blue-500 hover:text-blue-400"
                >
                  Login
                </Link>
              </p>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SignUppage;
