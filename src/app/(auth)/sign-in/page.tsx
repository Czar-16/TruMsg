"use client";
import { useDebounceValue } from "usehooks-ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import Link from "next/link";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { signInSchema } from "@/schemas/signInSchema";
import { signUpSchema } from "@/schemas/signUpSchema";
import axios from 'axios'

const page = () => {
  const [username, setUsername] = useState("");

  const [usernameMessage, setUsernameMessage] = useState("");
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const debouncedUsername = useDebounceValue(username, 300);
  const router = useRouter();
  // zod implementation
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  useEffect(() => {
    const checkUsernameUnique =async()=>{
      if(debouncedUsername){
        setIsCheckingUsername(true)
        setUsernameMessage("")
        try {
          axios.get("/api/")
          
          
        } catch (error) {
          
        }
      }
    }
  }, [debouncedUsername]);
  return <div>page</div>;
};

export default page;
