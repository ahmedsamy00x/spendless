"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { CalendarIcon, Loader2 } from "lucide-react";
import dayjs, { ManipulateType } from "dayjs";

import {
  SubscriptionsFormData,
  subscriptionsSchema,
  SubscriptionStatus,
  SubscriptionCategory,
  SubscriptionFrequency,
} from "@/lib/validations";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import {
  createSubscription,
  GET_SUBSCRIPTION_QUERY_KEY,
  GET_SUBSCRIPTIONS_QUERY_KEY,
  updateSubscription,
} from "@/services/api";
import { getSession } from "@/lib/session";
import { getUser } from "@/services/auth/auth";
import { useQueryClient } from "@tanstack/react-query";

interface SubscriptionsFormProps {
  onSuccess?: () => void;
  initialData?: Partial<SubscriptionsFormData> & { id?: string };
}

const SubscriptionsForm = ({
  onSuccess,
  initialData,
}: SubscriptionsFormProps) => {
  const [isEditMode, setIsEditMode] = useState(() => !!initialData);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();

  const handleCalculateRenewalDate = (startDate: string, frequency: string) => {
    if (!startDate || !frequency) return "";

    const startDateObj = dayjs(startDate);
    const unitMap = {
      monthly: "month",
      yearly: "year",
      weekly: "week",
      quarterly: "quarter",
      one_time: "year",
    };

    const unit = unitMap[frequency as keyof typeof unitMap] || "month";
    return startDateObj.add(1, unit as ManipulateType).format("YYYY-MM-DD");
  };

  const form = useForm<SubscriptionsFormData>({
    resolver: zodResolver(subscriptionsSchema),
    defaultValues: {
      name: initialData?.name ?? "",
      category: initialData?.category ?? undefined,
      cost: initialData?.cost ?? undefined,
      status: initialData?.status ?? undefined,
      frequency: initialData?.frequency ?? undefined,
      start_date: initialData?.start_date ?? "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: SubscriptionsFormData) => {
    const { user } = await getUser();
    setIsSubmitting(true);

    try {
      data.renewal_date = handleCalculateRenewalDate(
        data.start_date,
        data.frequency
      );
      const { data: resData } = isEditMode
        ? await updateSubscription(data, initialData?.id || "")
        : await createSubscription(data, user?.id);

      queryClient.invalidateQueries({
        queryKey: [GET_SUBSCRIPTIONS_QUERY_KEY],
      });
      queryClient.invalidateQueries({
        queryKey: [GET_SUBSCRIPTION_QUERY_KEY],
      });

      toast.success("Subscription saved successfully! ");

      form.reset();

      onSuccess?.();
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to save subscription. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Add Subscription</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Name Field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subscription Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g., Netflix, Spotify..."
                    {...field}
                    disabled={isSubmitting}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* Category Field */}
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={isSubmitting}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {SubscriptionCategory.options.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* Cost Field */}
          <FormField
            control={form.control}
            name="cost"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cost</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    {...field}
                    onChange={(e) =>
                      field.onChange(parseFloat(e.target.value) || 0)
                    }
                    disabled={isSubmitting}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* Status Field */}
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={isSubmitting}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {SubscriptionStatus.options.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* Frequency Field */}
          <FormField
            control={form.control}
            name="frequency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Billing Frequency</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={isSubmitting}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {SubscriptionFrequency.options.map((frequency) => (
                      <SelectItem key={frequency} value={frequency}>
                        {frequency.charAt(0).toUpperCase() + frequency.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* Start Date Field */}
          <FormField
            control={form.control}
            name="start_date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Start Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                        disabled={isSubmitting}
                      >
                        {field.value ? (
                          dayjs(field.value).format("MMM DD, YYYY")
                        ) : (
                          <span>Pick start date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={(date) => {
                        if (date) {
                          // Format date as YYYY-MM-DD in local timezone
                          const year = date.getFullYear();
                          const month = String(date.getMonth() + 1).padStart(
                            2,
                            "0"
                          );
                          const day = String(date.getDate()).padStart(2, "0");
                          field.onChange(`${year}-${month}-${day}`);
                        }
                      }}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* Renewal Date Field */}
          {/* <FormField
            control={form.control}
            name="renewal_date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Next Renewal Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                        disabled={isSubmitting}
                      >
                        {field.value ? (
                          dayjs(field.value).format("MMM DD, YYYY")
                        ) : (
                          <span>Pick renewal date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={(date) =>
                        field.onChange(date?.toISOString().split("T")[0])
                      }
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                <FormMessage />
              </FormItem>
            )}
          /> */}

          {/* Submit Button */}
          <Button
            variant="default"
            type="submit"
            className="w-full "
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Subscription"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SubscriptionsForm;
