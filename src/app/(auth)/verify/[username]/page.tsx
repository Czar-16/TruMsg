"use client";

import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import React from "react";

import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";

import { verifySchema } from "@/schemas/verifySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const VerifyAccount = () => {
  const router = useRouter();
  const params = useParams();

  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
    mode: "onChange",
    criteriaMode: "firstError",
  });

  const onSubmit = async (data: z.infer<typeof verifySchema>) => {
    try {
      await axios.post(`/api/verify-code`, {
        username: params.username,
        code: data.code,
      });

      toast.success("Account verified successfully");

      router.replace("/sign-in");
    } catch (error) {
      console.error("Error verifying user", error);

      const axiosError = error as AxiosError<ApiResponse>;
      const errorMessage = axiosError.response?.data.message;

      toast.error(errorMessage ?? "Verification failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <div className="w-106 bg-zinc-900 border border-zinc-800 p-8   rounded-2xl shadow-xl">
        <h1 className="text-2xl font-bold text-center text-white mb-2">
          Verify Your Account
        </h1>

        <p className="text-center text-zinc-300 text-sm mb-6">
          Enter the verification code sent to your email
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-zinc-300">
                    Verification Code
                  </FormLabel>

                  <FormControl>
                    <Input
                      placeholder="Enter verification code"
                      {...field}
                      className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
                    />
                  </FormControl>

                  
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-white text-black hover:bg-zinc-200"
              disabled={form.formState.isSubmitting}
            >
              Verify Account
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default VerifyAccount;
