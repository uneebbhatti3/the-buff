export function isPastDate(date: Date) {
  const today = new Date();

  today.setHours(0, 0, 0, 0);

  const selectedDate = new Date(date);
  selectedDate.setHours(0, 0, 0, 0);

  return selectedDate < today;
}

export function isSunday(date: Date) {
  return date.getDay() === 0;
}
