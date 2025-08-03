"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import logoDark from "../../../../public/restoku-logo-dark.png";
import logoLight from "../../../../public/restoku-logo-light.png";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginFormType, loginSchema } from "@/lib/zod/login-validation";
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

const Login = () => {
  const { theme } = useTheme();
  const form = useForm<loginFormType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = () => {
    console.log(form.getValues);
  };
  return (
    <div className="max-h-svh w-full container mx-auto flex items-center justify-center px-4 lg:px-56 lg:py-56">
      <div className="flex w-full min-h-svh lg:min-h-0  justify-center">
        <div className="flex-1/2 rounded-tl-xl rounded-bl-xl overflow-hidden hidden lg:block bg-red-400">
          <Image
            src={theme == "light" ? logoLight : logoDark}
            alt="Restoku Logo"
            className="w-full h-full object-cover"
          />
        </div>
        <Card className="flex-1/2 md:rounded-tl-none md:rounded-bl-none self-center lg:self-auto">
          <CardHeader>
            <CardTitle>Restoku Login Page</CardTitle>
            <CardDescription>
              Input your credentials to login at Restoku
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="xxxx@gmail.com" />
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
                          {...field}
                          type="password"
                          placeholder="*******"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Login</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
