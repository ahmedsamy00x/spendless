import { useQuery } from "@tanstack/react-query";
import { createServerClient } from "../supabase/server";
import { Subscription } from "@/app/dashboard/subscriptions/columns";

export const GET_SUBSCRIPTIONS_QUERY_KEY = "subscriptions";
const getSubscriptions = async ({ search }: { search: string }) => {
  const supabase = await createServerClient();
  const query = supabase.from("subscriptions").select("*");
  if (search) {
    query.textSearch("name", search);
  }
  const { data, error } = await query;
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const useGetSubscriptions = ({ search }: { search: string }) => {
  return useQuery<Subscription[] | null>({
    queryKey: [GET_SUBSCRIPTIONS_QUERY_KEY, search],
    queryFn: () => getSubscriptions({ search }),
  });
};
