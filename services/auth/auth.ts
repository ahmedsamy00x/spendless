import supabase from "../supabase/client";
import { createServerClient } from "../supabase/server";

export const signup = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  if (!data.session) {
    throw new Error("Login failed - no session created");
  }

  return data;
};

// Server-side only: Get authenticated user from session cookies
export const getUser = async () => {
  const supabase = await createServerClient();
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    throw new Error(error.message);
  }
  return data;
};
