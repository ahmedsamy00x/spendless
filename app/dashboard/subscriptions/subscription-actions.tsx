import React, { useState } from "react";
import { Subscription } from "./columns";
import { Button } from "@/components/ui/button";
import { Edit, Edit2, Trash } from "iconsax-reactjs";
import {
  deleteSubscription,
  GET_SUBSCRIPTIONS_QUERY_KEY,
  useGetSubscription,
} from "@/services/api";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import SubscriptionsForm from "./subscriptions-form";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

const SubscriptionActions = ({
  subscription,
}: {
  subscription: Subscription;
}) => {
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useGetSubscription(subscription.id);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const handleDelete = async () => {
    try {
      const result = await deleteSubscription(subscription.id);

      setOpenDelete(false);
      toast.success("Subscription deleted successfully");

      queryClient.invalidateQueries({
        queryKey: [GET_SUBSCRIPTIONS_QUERY_KEY],
      });
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete subscription");
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <Button variant="ghost">
            <Edit size={24} />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <SubscriptionsForm
            initialData={data || undefined}
            onSuccess={() => setOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={openDelete} onOpenChange={setOpenDelete}>
        <DialogTrigger>
          <Button variant="ghost">
            <Trash className="text-primary" size={24} />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Delete Subscription</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this subscription?
          </DialogDescription>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenDelete(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SubscriptionActions;
