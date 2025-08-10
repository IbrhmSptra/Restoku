"use server";
import { createClient } from "@/lib/supabase/server";
import { loginSchema } from "@/lib/zod/login-validation";
import { loginResponse } from "@/types/auth";
import { cookies } from "next/headers";

export async function LoginAction(formData: FormData): Promise<loginResponse> {
  // check if theres no formData given return error true
  if (!formData) {
    return {
      error: true,
      message: "Please fill requiered fields",
    };
  }

  // validate formData to align with schema login
  const validateFields = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!validateFields.success) {
    return {
      error: true,
      message: {
        email: validateFields.error.flatten().fieldErrors.email ?? [],
        password: validateFields.error.flatten().fieldErrors.password ?? [],
      },
    };
  }

  // signin with password
  const supabase = await createClient({});
  const {
    data: { user },
    error: errorAuth,
  } = await supabase.auth.signInWithPassword({
    email: validateFields.data.email,
    password: validateFields.data.password,
  });
  if (errorAuth) {
    return {
      error: true,
      message: errorAuth.message,
    };
  }

  //get profiles
  const { data: profile, error: errorProfile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user?.id)
    .single();
  if (errorProfile) {
    return {
      error: true,
      message: errorProfile.message,
    };
  }

  // set cookies
  const cookieStore = await cookies();
  cookieStore.set("user_profile", JSON.stringify(profile), {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
  });

  return {
    error: false,
    message: "Login successful",
  };
}
