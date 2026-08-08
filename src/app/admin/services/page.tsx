import { WrenchIcon } from "lucide-react";
import ServicesTable from "@/features/admin/services/components/services-table";

export const metadata = {
  title: "Services | The Buff Admin",
};

export default function ServicesPage() {
  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-primary/10 p-2 text-primary">
          <WrenchIcon className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-xl font-semibold">Services</h1>
          <p className="text-sm text-muted-foreground">
            Manage the services available for booking.
          </p>
        </div>
      </div>

      <ServicesTable />
    </div>
  );
}
