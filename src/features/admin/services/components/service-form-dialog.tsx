"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { AdminService } from "../types/service.types";
import { useSaveService } from "../hooks/use-save-service";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  service?: AdminService | null;
  onCreated?: (service: AdminService) => void;
  onUpdated?: (service: AdminService) => void;
};

const empty = {
  name: "",
  description: "",
  price: "",
  durationMinutes: "",
  isActive: true,
  displayOrder: "0",
};

export default function ServiceFormDialog({
  open,
  onOpenChange,
  service,
  onCreated,
  onUpdated,
}: Props) {
  const isEditing = !!service;
  const { saving, createService, updateService } = useSaveService();

  const [fields, setFields] = useState(empty);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (open) {
      if (service) {
        setFields({
          name: service.name,
          description: service.description ?? "",
          price: String(service.price),
          durationMinutes: String(service.durationMinutes),
          isActive: service.isActive,
          displayOrder: String(service.displayOrder),
        });
      } else {
        setFields(empty);
      }
      setFormError("");
    }
  }, [open, service]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setFormError("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError("");

    const price = parseFloat(fields.price);
    const durationMinutes = parseInt(fields.durationMinutes, 10);
    const displayOrder = parseInt(fields.displayOrder, 10);

    if (!fields.name.trim()) {
      setFormError("Service name is required.");
      return;
    }

    if (isNaN(price) || price < 0) {
      setFormError("Enter a valid price (0 or more).");
      return;
    }

    if (isNaN(durationMinutes) || durationMinutes < 1) {
      setFormError("Enter a valid duration (minimum 1 minute).");
      return;
    }

    const payload = {
      name: fields.name.trim(),
      description: fields.description.trim(),
      price,
      durationMinutes,
      isActive: fields.isActive,
      displayOrder: isNaN(displayOrder) ? 0 : displayOrder,
    };

    try {
      if (isEditing && service) {
        const updated = await updateService(service.id, payload);
        toast.success("Service updated.");
        onUpdated?.(updated);
      } else {
        const created = await createService(payload);
        toast.success("Service created.");
        onCreated?.(created);
      }
      onOpenChange(false);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "An error occurred.");
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Service" : "Add New Service"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Update the service details below."
              : "Fill in the details to add a new service."}
          </DialogDescription>
        </DialogHeader>

        <form id="service-form" onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div className="space-y-1.5">
            <Label htmlFor="name">Service Name</Label>
            <Input
              id="name"
              name="name"
              value={fields.name}
              onChange={handleChange}
              placeholder="e.g. Full Interior Detail"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <Label htmlFor="description">
              Description{" "}
              <span className="text-muted-foreground font-normal">
                (optional)
              </span>
            </Label>
            <Textarea
              id="description"
              name="description"
              value={fields.description}
              onChange={handleChange}
              placeholder="Brief description of the service..."
              className="min-h-20 resize-none"
            />
          </div>

          {/* Price + Duration */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="price">Price (PKR)</Label>
              <Input
                id="price"
                name="price"
                type="number"
                min="0"
                step="1"
                value={fields.price}
                onChange={handleChange}
                placeholder="e.g. 5000"
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="durationMinutes">Duration (minutes)</Label>
              <Input
                id="durationMinutes"
                name="durationMinutes"
                type="number"
                min="1"
                step="1"
                value={fields.durationMinutes}
                onChange={handleChange}
                placeholder="e.g. 120"
                required
              />
            </div>
          </div>

          {/* Display order */}
          <div className="space-y-1.5">
            <Label htmlFor="displayOrder">Display Order</Label>
            <Input
              id="displayOrder"
              name="displayOrder"
              type="number"
              min="0"
              step="1"
              value={fields.displayOrder}
              onChange={handleChange}
              placeholder="0"
            />
            <p className="text-xs text-muted-foreground">
              Lower numbers appear first in the booking form.
            </p>
          </div>

          {/* Active toggle */}
          <div className="flex items-center justify-between rounded-lg border p-3">
            <div>
              <p className="text-sm font-medium">Active</p>
              <p className="text-xs text-muted-foreground">
                Inactive services are hidden from the booking form.
              </p>
            </div>
            <Switch
              checked={fields.isActive}
              onCheckedChange={(checked) => {
                setFields((prev) => ({ ...prev, isActive: checked }));
                setFormError("");
              }}
            />
          </div>

          {formError && (
            <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {formError}
            </p>
          )}
        </form>

        <DialogFooter>
          <Button
            variant="outline"
            type="button"
            onClick={() => onOpenChange(false)}
            disabled={saving}
          >
            Cancel
          </Button>
          <Button type="submit" form="service-form" disabled={saving}>
            {saving
              ? isEditing
                ? "Saving..."
                : "Creating..."
              : isEditing
                ? "Save Changes"
                : "Create Service"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
