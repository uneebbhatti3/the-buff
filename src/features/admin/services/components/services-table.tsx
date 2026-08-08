"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  MoreHorizontalIcon,
  PencilIcon,
  Trash2Icon,
  PlusIcon,
  WrenchIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { AdminService } from "../types/service.types";
import { useAdminServices } from "../hooks/use-admin-services";
import { useDeleteService } from "../hooks/use-delete-service";
import ServiceFormDialog from "./service-form-dialog";

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-PK").format(price);
}

function formatDuration(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m} min`;
  if (m === 0) return `${h} hr`;
  return `${h} hr ${m} min`;
}

function TableSkeleton() {
  return (
    <>
      {Array.from({ length: 4 }).map((_, i) => (
        <TableRow key={i}>
          <TableCell>
            <Skeleton className="h-4 w-36" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-20" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-16" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-5 w-16 rounded-full" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-8" />
          </TableCell>
          <TableCell />
        </TableRow>
      ))}
    </>
  );
}

export default function ServicesTable() {
  const {
    services,
    loading,
    error,
    refresh,
    addServiceToList,
    updateServiceInList,
    removeServiceFromList,
  } = useAdminServices();

  const { deletingId, deleteService } = useDeleteService();

  const [formOpen, setFormOpen] = useState(false);
  const [editingService, setEditingService] = useState<AdminService | null>(
    null,
  );

  const [deleteTarget, setDeleteTarget] = useState<AdminService | null>(null);
  const [deleteError, setDeleteError] = useState("");

  function openCreate() {
    setEditingService(null);
    setFormOpen(true);
  }

  function openEdit(service: AdminService) {
    setEditingService(service);
    setFormOpen(true);
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleteError("");

    try {
      await deleteService(deleteTarget.id);
      removeServiceFromList(deleteTarget.id);
      setDeleteTarget(null);
      toast.success("Service deleted.");
    } catch (err) {
      setDeleteError(
        err instanceof Error ? err.message : "Failed to delete service.",
      );
    }
  }

  if (error) {
    return (
      <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
        {error}{" "}
        <button
          onClick={() => void refresh()}
          className="underline underline-offset-2"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Services</h2>
          <p className="text-sm text-muted-foreground">
            {loading
              ? "Loading..."
              : `${services.length} service${services.length !== 1 ? "s" : ""}`}
          </p>
        </div>

        <Button onClick={openCreate} size="sm">
          <PlusIcon className="h-4 w-4" />
          Add Service
        </Button>
      </div>

      <div className="mt-4 rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-center">Order</TableHead>
              <TableHead className="w-10" />
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              <TableSkeleton />
            ) : services.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="py-16 text-center text-muted-foreground"
                >
                  <WrenchIcon className="mx-auto mb-3 h-8 w-8 opacity-30" />
                  <p className="font-medium">No services yet</p>
                  <p className="mt-1 text-xs">
                    Click "Add Service" to create your first one.
                  </p>
                </TableCell>
              </TableRow>
            ) : (
              services.map((service) => (
                <TableRow key={service.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{service.name}</p>
                      {service.description && (
                        <p className="mt-0.5 max-w-xs truncate text-xs text-muted-foreground">
                          {service.description}
                        </p>
                      )}
                    </div>
                  </TableCell>

                  <TableCell className="font-medium">
                    Rs. {formatPrice(service.price)}
                  </TableCell>

                  <TableCell className="text-muted-foreground">
                    {formatDuration(service.durationMinutes)}
                  </TableCell>

                  <TableCell>
                    {service.isActive ? (
                      <Badge
                        variant="outline"
                        className="border-green-500/30 bg-green-500/10 text-green-600"
                      >
                        Active
                      </Badge>
                    ) : (
                      <Badge
                        variant="outline"
                        className="border-zinc-400/30 bg-zinc-400/10 text-zinc-500"
                      >
                        Inactive
                      </Badge>
                    )}
                  </TableCell>

                  <TableCell className="text-center text-muted-foreground">
                    {service.displayOrder}
                  </TableCell>

                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontalIcon className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => openEdit(service)}>
                          <PencilIcon className="h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => {
                            setDeleteError("");
                            setDeleteTarget(service);
                          }}
                        >
                          <Trash2Icon className="h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Create / Edit dialog */}
      <ServiceFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        service={editingService}
        onCreated={addServiceToList}
        onUpdated={updateServiceInList}
      />

      {/* Delete confirm dialog */}
      <Dialog
        open={!!deleteTarget}
        onOpenChange={(open) => {
          if (!open) {
            setDeleteTarget(null);
            setDeleteError("");
          }
        }}
      >
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete Service</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-medium text-foreground">
                {deleteTarget?.name}
              </span>
              ? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          {deleteError && (
            <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {deleteError}
            </p>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setDeleteTarget(null);
                setDeleteError("");
              }}
              disabled={!!deletingId}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => void handleDelete()}
              disabled={!!deletingId}
            >
              {deletingId ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
