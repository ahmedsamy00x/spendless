import { z } from "zod";

// Enum definitions for better type safety
export const SubscriptionStatus = z.enum(
  ["active", "trial", "paused", "canceled", "expired", "pending"],
  {
    message: "Status is required",
  }
);

export const SubscriptionCategory = z.enum(
  [
    "entertainment",
    "software",
    "education",
    "storage",
    "business",
    "health",
    "gaming",
    "news",
    "tools",
    "memberships",
    "other",
  ],
  {
    message: "Category is required",
  }
);

export const SubscriptionFrequency = z.enum(
  ["monthly", "yearly", "weekly", "quarterly", "one_time"],
  {
    message: "Frequency is required",
  }
);

export const subscriptionsSchema = z
  .object({
    name: z
      .string()
      .min(1, "Name is required")
      .min(2, "Name must be at least 2 characters")
      .max(100, "Name must be less than 100 characters"),
    category: SubscriptionCategory,
    cost: z
      .number({
        message: "Cost is required and must be a number",
      })
      .min(0.01, "Cost must be greater than 0")
      .max(10000, "Cost must be less than $10,000"),
    status: SubscriptionStatus,
    frequency: SubscriptionFrequency,
    start_date: z
      .string()
      .min(1, "Start date is required")
      .refine((date) => {
        const parsedDate = new Date(date);
        return !isNaN(parsedDate.getTime());
      }, "Invalid start date"),
    renewal_date: z
      .string()
      .min(1, "Renewal date is required")
      .refine((date) => {
        const parsedDate = new Date(date);
        return !isNaN(parsedDate.getTime());
      }, "Invalid renewal date"),
  })
  .refine(
    (data) => {
      const startDate = new Date(data.start_date);
      const renewalDate = new Date(data.renewal_date);
      return renewalDate >= startDate;
    },
    {
      message: "Renewal date must be after start date",
      path: ["renewal_date"],
    }
  );

export type SubscriptionsFormData = z.infer<typeof subscriptionsSchema>;
