export const TIME_SLOTS = [
  {
    label: "10:00 AM - 12:00 PM",
    startTime: "10:00",
    endTime: "12:00",
  },
  {
    label: "12:30 PM - 2:30 PM",
    startTime: "12:30",
    endTime: "14:30",
  },
  {
    label: "3:00 PM - 5:00 PM",
    startTime: "15:00",
    endTime: "17:00",
  },
  {
    label: "5:30 PM - 7:30 PM",
    startTime: "17:30",
    endTime: "19:30",
  },
];

export function isPastDate(date: Date) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const selected = new Date(date);
  selected.setHours(0, 0, 0, 0);

  return selected < today;
}

export function isSunday(date: Date) {
  return date.getDay() === 0;
}
