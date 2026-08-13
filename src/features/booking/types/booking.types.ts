export type ExistingBooking = {
  startAt: Date;
  endAt: Date;
};

export type BookingSlot = {
  startTime: string;
  startAt: string;
  endAt: string;
  label: string;
};

export type BookingNotificationData = {
  fullName: string;
  phone: string;
  vehicle: string;
  services: { name: string; price: number }[];
  startAt: Date;
  endAt: Date;
  durationMinutes: number;
  totalPrice: number;
  notes?: string | null;
};
