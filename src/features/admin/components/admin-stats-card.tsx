import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { CalendarClock, Clock3, Car, DollarSign } from "lucide-react";
import type { DashboardStats } from "@/features/admin/types/admin-types.types";

function formatPKR(amount: number): string {
  return new Intl.NumberFormat("en-PK").format(amount);
}

type Props = {
  stats: DashboardStats | undefined;
  loading: boolean;
};

export default function AdminStatsCard({ stats, loading }: Props) {
  const cards = [
    {
      title: "Today's Bookings",
      icon: CalendarClock,
      value: stats?.todayBookings ?? 0,
      display: loading ? null : String(stats?.todayBookings ?? 0),
      footer:
        !loading && (stats?.todayBookings ?? 0) > 0
          ? { color: "bg-blue-500", label: `${stats!.todayBookings} scheduled today` }
          : { color: "bg-gray-300", label: "No bookings today" },
    },
    {
      title: "Pending",
      icon: Clock3,
      value: stats?.pending ?? 0,
      display: loading ? null : String(stats?.pending ?? 0),
      footer:
        !loading && (stats?.pending ?? 0) > 0
          ? { color: "bg-amber-400", label: `${stats!.pending} need attention` }
          : { color: "bg-gray-300", label: "All clear" },
    },
    {
      title: "In Progress",
      icon: Car,
      value: stats?.inProgress ?? 0,
      display: loading ? null : String(stats?.inProgress ?? 0),
      footer:
        !loading && (stats?.inProgress ?? 0) > 0
          ? { color: "bg-purple-500", label: `${stats!.inProgress} active now` }
          : { color: "bg-gray-300", label: "None active" },
    },
    {
      title: "Total Revenue",
      icon: DollarSign,
      value: stats?.todayRevenue ?? 0,
      display: loading ? null : `Rs. ${formatPKR(stats?.todayRevenue ?? 0)}`,
      footer:
        !loading && (stats?.todayRevenue ?? 0) > 0
          ? { color: "bg-green-500", label: `Rs. ${formatPKR(stats!.todayRevenue)} earned` }
          : { color: "bg-gray-300", label: "No revenue yet" },
    },
  ];

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((item) => {
        const Icon = item.icon;
        return (
          <Card key={item.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardDescription>{item.title}</CardDescription>
              <Icon className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {loading ? (
                <Skeleton className="h-9 w-24" />
              ) : (
                <p className="text-3xl font-semibold">{item.display}</p>
              )}
            </CardContent>
            <CardFooter>
              {loading ? (
                <Skeleton className="h-4 w-32" />
              ) : (
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span
                    className={`inline-block h-2 w-2 rounded-full ${item.footer.color}`}
                  />
                  {item.footer.label}
                </div>
              )}
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
