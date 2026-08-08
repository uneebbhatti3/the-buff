export type BookingStatus =
  | "PENDING"
  | "CONFIRMED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";

export type AdminBookingService = {
  id: string;
  serviceName: string;
  price: number;
  durationMinutes: number;
};

export type AdminBooking = {
  id: string;
  fullName: string;
  phone: string;
  vehicle: string;
  bookingDate: string;
  startAt: string;
  endAt: string;
  durationMinutes: number;
  totalPrice: number;
  notes: string | null;
  bookingStatus: BookingStatus;
  bookingServices: AdminBookingService[];
  createdAt: string;
};

export type DashboardStats = {
  todayBookings: number;
  pending: number;
  inProgress: number;
  todayRevenue: number;
};

export type DashboardScheduleItem = {
  id: string;
  fullName: string;
  phone: string;
  vehicle: string;
  startAt: string;
  endAt: string;
  bookingStatus: BookingStatus;
  durationMinutes: number;
  totalPrice: number;
  services: string[];
};

export type DashboardPendingItem = {
  id: string;
  fullName: string;
  phone: string;
  vehicle: string;
  bookingDate: string;
  startAt: string;
  endAt: string;
  services: string[];
  createdAt: string;
};

export type DashboardRecentItem = {
  id: string;
  fullName: string;
  vehicle: string;
  bookingDate: string;
  startAt: string;
  bookingStatus: BookingStatus;
  totalPrice: number;
  services: string[];
};

export type DashboardData = {
  stats: DashboardStats;
  todaySchedule: DashboardScheduleItem[];
  pendingBookings: DashboardPendingItem[];
  recentBookings: DashboardRecentItem[];
};
