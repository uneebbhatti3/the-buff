import { normalisePakistaniPhone, sendWhatsAppMessage } from "@/lib/wasender";
import { formatSlotLabel } from "./booking-utils";
import { BookingNotificationData } from "../types/booking.types";

export function formatPKR(amount: number): string {
  return new Intl.NumberFormat("en-PK").format(amount);
}

export function formatDuration(minutes: number): string {
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hrs > 0 && mins > 0) return `${hrs} hr ${mins} min`;
  if (hrs > 0) return `${hrs} hr`;
  return `${mins} min`;
}

function buildAdminMessage(b: BookingNotificationData): string {
  const slot = formatSlotLabel(b.startAt, b.endAt);

  const date = new Intl.DateTimeFormat("en-PK", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Karachi",
  }).format(b.startAt);

  const serviceLines = b.services
    .map((s) => `  • ${s.name} — Rs. ${formatPKR(s.price)}`)
    .join("\n");

  const lines = [
    "🔔 *NEW BOOKING RECEIVED*",
    "━━━━━━━━━━━━━━━━━━━━━━",
    "",
    "👤 *CLIENT*",
    `  Name: *${b.fullName}*`,
    `  Phone: ${b.phone}`,
    `  Vehicle: ${b.vehicle}`,
    "",
    "📅 *APPOINTMENT*",
    `  Date: *${date}*`,
    `  Time: *${slot}*`,
    `  Duration: ${formatDuration(b.durationMinutes)}`,
    "",
    "🛠 *SERVICES REQUESTED*",
    serviceLines,
    "",
    "━━━━━━━━━━━━━━━━━━━━━━",
    `💰 *TOTAL: Rs. ${formatPKR(b.totalPrice)}*`,
    "━━━━━━━━━━━━━━━━━━━━━━",
  ];

  if (b.notes) {
    lines.push("", "📝 *CLIENT NOTES*", `  _${b.notes}_`);
  }

  lines.push(
    "",
    "_Please confirm this appointment with the client as soon as possible._",
  );

  return lines.join("\n");
}

function buildUserMessage(b: BookingNotificationData): string {
  const slot = formatSlotLabel(b.startAt, b.endAt);

  const date = new Intl.DateTimeFormat("en-PK", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Karachi",
  }).format(b.startAt);

  const serviceLines = b.services
    .map((s) => `  • ${s.name} — Rs. ${formatPKR(s.price)}`)
    .join("\n");

  const lines = [
    `Hi *${b.fullName}* 👋`,
    "",
    "Thank you for choosing *The Buff Detailing*. Your booking request has been received and is currently under review. We will confirm your appointment shortly.",
    "",
    "━━━━━━━━━━━━━━━━━━━━━━",
    "📋 *BOOKING SUMMARY*",
    "━━━━━━━━━━━━━━━━━━━━━━",
    "",
    "📅 *Date & Time*",
    `  ${date}`,
    `  ${slot}`,
    "",
    "🚗 *Vehicle*",
    `  ${b.vehicle}`,
    "",
    "🛠 *Services*",
    serviceLines,
    "",
    "⏱ *Estimated Duration*",
    `  ${formatDuration(b.durationMinutes)}`,
    "",
    "━━━━━━━━━━━━━━━━━━━━━━",
    `💰 *ESTIMATED TOTAL: Rs. ${formatPKR(b.totalPrice)}*`,
    "━━━━━━━━━━━━━━━━━━━━━━",
  ];

  if (b.notes) {
    lines.push("", "📝 *Your Note*", `  _${b.notes}_`);
  }

  lines.push(
    "",
    "⚠️ _This is a booking *request*, not a confirmed appointment. We will contact you on this number to confirm your slot._",
    "",
    "If you have any questions, feel free to reply to this message.",
    "",
    "— Ahmad",
    "*The Buff Detailing*",
    "📞 0321-4012924",
  );

  return lines.join("\n");
}

export async function sendBookingNotifications(
  b: BookingNotificationData,
): Promise<void> {
  const adminNumber = process.env.ADMIN_WHATSAPP;
  const userNumber = normalisePakistaniPhone(b.phone);

  const tasks: Promise<void>[] = [];

  if (adminNumber) {
    tasks.push(
      sendWhatsAppMessage(adminNumber, buildAdminMessage(b)).catch((err) =>
        console.error("Failed to send admin WhatsApp notification:", err),
      ),
    );
  }

  tasks.push(
    sendWhatsAppMessage(userNumber, buildUserMessage(b)).catch((err) =>
      console.error("Failed to send user WhatsApp notification:", err),
    ),
  );

  await Promise.all(tasks);
}
