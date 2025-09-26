import { useQuery } from "@tanstack/react-query";
import { createServerClient } from "../supabase/server";
import { Subscription } from "@/app/dashboard/subscriptions/columns";

export const GET_SUBSCRIPTIONS_QUERY_KEY = "subscriptions";
export const GET_SUBSCRIPTION_QUERY_KEY = "subscription";

interface GetSubscriptionsParams {
  search: string;
  page: number;
  pageSize: number;
}

const getSubscriptions = async ({
  search,
  page,
  pageSize,
}: GetSubscriptionsParams) => {
  const supabase = await createServerClient();

  // Calculate offset for pagination
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from("subscriptions")
    .select("*", { count: "exact" })
    .range(from, to);

  if (search) {
    query = query.textSearch("name", search);
  }

  const { data, error, count } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return {
    data: data || [],
    total: count || 0,
    page,
    pageSize,
    pageCount: Math.ceil((count || 0) / pageSize),
  };
};

export const useGetSubscriptions = ({
  search,
  page,
  pageSize,
}: GetSubscriptionsParams) => {
  return useQuery({
    queryKey: [GET_SUBSCRIPTIONS_QUERY_KEY, search, page, pageSize],
    queryFn: () => getSubscriptions({ search, page, pageSize }),
  });
};

export const getSubscription = async (id: string) => {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const useGetSubscription = (id: string) => {
  return useQuery<Subscription | null>({
    queryKey: [GET_SUBSCRIPTION_QUERY_KEY, id],
    queryFn: () => getSubscription(id),
  });
};
