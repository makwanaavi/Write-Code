"use client";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  //   FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import Link from "next/link";
// import { file } from "zod/v4-mini";

const formSchema = z
  .object({
    name: z.string({ message: "Name Is Required!" }).min(3),
    email: z.string({ message: "Email Is Required!" }).email().min(5).max(50),
    password: z
      .string({ message: "Passowrd Is Required!" })
      .min(8, { message: "Passwors In Required 8 Character" })
      .max(16, { message: "Passwors In Required Only 16 Character" })
      // .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
      .regex(/[A-Z]/, "Passwordn in required at least one uppercase letter")
      .regex(/[a-z]/, "Passwordn in required at least one lower letter")
      .regex(/[0-9]/, "Passwordn in required at least one one number")
      .regex(/[#?!@$%^&*-]/, "Passwordn in required at leasr one symbol"),
    confirmPassword: z.string({ message: "Confirm Password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password Confirm Must Be Same",
    path: ["confirmPassword"],
  });

const Register = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const [isLoading, setisLoading] = useState(false);
  function onSubmit(values: z.infer<typeof formSchema>) {
    // localStorage.setItem("User Data", JSON.stringify(values))
    setisLoading(true);
    setTimeout(() => {
      setisLoading(false);
    }, 2000);
    console.log(values);
  }

  return (
    <div className="lg:p-10 space-y-7">
      <h1 className="text-xl text-center font-semibold">Create Account</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 max-w-md mx-auto"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Your Name"
                    {...field}
                    disabled={isLoading}
                    value={field.value ?? ""}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Your Email"
                    {...field}
                    disabled={isLoading}
                    type="email"
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Your Password"
                    {...field}
                    disabled={isLoading}
                    type="password"
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Your Confirm Password"
                    {...field}
                    disabled={isLoading}
                    type="password"
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={isLoading}
            type="submit"
            className="w-full cursor-pointer text-white"
          >
            {isLoading ? "Loading..." : "Create Account"    }
          </Button>
        </form>
        
      </Form>

      <div className="max-w-md mx-auto">
        <p>Already Have Account? 
            <Link href={'/login'} className="text-primary drop-shadow-2xl"> Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
