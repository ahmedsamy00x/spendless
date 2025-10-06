export type SubscriptionsResponse = {
  id: string;
  created_at: string;
  user_id: string;
  name: string;
  category: string;
  cost: number;
  currency: string | null;
  frequency: string;
  start_date: string;
  renewal_date: string;
  status: string;
};
