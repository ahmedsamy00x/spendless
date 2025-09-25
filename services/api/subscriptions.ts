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
