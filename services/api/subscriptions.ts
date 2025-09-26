import { SubscriptionsFormData } from "@/lib";
import { createServerClient } from "../supabase/server";

export const createSubscription = async (
  subscription: SubscriptionsFormData,
  user_id: string
) => {
  const supabase = await createServerClient();
  const { data, error, status } = await supabase
    .from("subscriptions")
    .insert({ ...subscription, user_id });
  if (error) {
    throw new Error(error.message);
  }
  return { data, status };
};

export const updateSubscription = async (
  subscription: SubscriptionsFormData,
  id: string
) => {
  const supabase = await createServerClient();
  const { data, error, status } = await supabase
    .from("subscriptions")
    .update(subscription)
    .eq("id", id);
  if (error) {
    throw new Error(error.message);
  }
  return { data, status };
};

export const deleteSubscription = async (id: string) => {
  const supabase = await createServerClient();
  const { data, error, status } = await supabase
    .from("subscriptions")
    .delete()
    .eq("id", id);
  if (error) {
    throw new Error(error.message);
  }
  return { data, status };
};
