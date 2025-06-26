/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import Link from "next/link";
import Axios from "@/lib/Axios";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/card";

const formSchema = z
  .object({
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

const ResetPassword = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const [isLoading, setisLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const resetPasswordToken = searchParams.get("token");
  const [isvalidToken, setisvalidToken] = useState(true);
  const [isExpiredToken, setisExpiredToken] = useState(false);
  const [userId, setuserID] = useState("");

  const verifyResetTokenPassword = async () => {
    const payload = {
      userId: userId,
      token: resetPasswordToken,
    };
    try {
      setisvalidToken(true);
      const response = await Axios.post(
        "/api/auth/verify-forgot-password-token",
        payload
      );

      if (response.status === 200) {
        console.log("check token", response.data);
        setuserID(response?.data?.userId);
        setisExpiredToken(response?.data?.expired);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.response?.data?.error);
    } finally {
      setisLoading(false);
    }
  };
  useEffect(() => {
    if (resetPasswordToken) {
      verifyResetTokenPassword();
    } else {
      //   router.push("/forgot-password");
    }
  }, []);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    const payload = {
      password: values.password,
    };

    try {
      setisLoading(true);
      const response = await Axios.post("/api/auth/reset-password", payload);

      if (response.status === 200) {
        toast.success(response.data.message);
        form.reset();
        router.push("/login");
      }
      console.log(response);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.response?.data?.error);
    } finally {
      setisLoading(false);
    }
  }
  return (
    <div className="lg:p-10 space-y-7">
      <h1 className="text-xl text-center font-semibold">Reset Password</h1>
      {/* {isvalidToken ? (
        <Card>
          <p className="mx-auto w-fit">loading...</p>
        </Card>
      ) : isExpiredToken ? (
        <Card>
          <p className="mx-auto w-fit">Link Is Exppired</p>
        </Card>
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 max-w-md mx-auto"
          >
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
              {isLoading ? "Loading..." : "Reset Password"}
            </Button>
          </form>
        </Form>
      )} */}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 max-w-md mx-auto"
        >
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
            {isLoading ? "Loading..." : "Reset Password"}
          </Button>
        </form>
      </Form>

      <div className="max-w-md mx-auto">
        <p>
          Already Have Account?
          <Link href={"/login"} className="text-primary drop-shadow-2xl">
            {" "}
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
