"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { startTransition, useActionState, useEffect } from "react";
import logoDark from "../../../../public/restoku-logo-dark.png";
import logoLight from "../../../../public/restoku-logo-light.png";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginFormType, loginSchema } from "@/lib/zod/login-validation";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/common/form-input";
import z from "zod";
import { LoaderCircle } from "lucide-react";
import { login } from "@/api/auth";

const Login = () => {
  const { theme } = useTheme();
  const form = useForm<loginFormType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [loginState, loginAction, isPendingLogin] = useActionState(login, {
    status: "idle",
    errors: {
      email: [],
      password: [],
      _form: [],
    },
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value);
    });

    startTransition(() => {
      loginAction(formData);
    });
  };

  useEffect(() => {
    if (loginState?.status === "error") {
      startTransition(() => {
        loginAction(null);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginState]);
  console.log(loginState.errors);

  return (
    <div className="min-h-svh w-full container mx-auto flex items-center justify-center px-4">
      <div className="flex w-full min-h-svh justify-center lg:max-h-96 lg:max-w-2xl lg:min-h-0">
        <div className="flex-1/2 rounded-tl-xl rounded-bl-xl overflow-hidden hidden lg:block ">
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
          <CardContent className="h-full">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className=" h-full flex flex-col justify-between gap-y-6"
              >
                <div className="space-y-4">
                  <FormInput
                    form={form}
                    name="email"
                    label="Email"
                    placeholder="xxxx@gmail.com"
                  />
                  <FormInput
                    form={form}
                    name="password"
                    label="Password"
                    placeholder="*******"
                    type="password"
                  />
                </div>

                <Button type="submit">
                  {isPendingLogin ? (
                    <LoaderCircle className="animate-spin" />
                  ) : (
                    "Login"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
