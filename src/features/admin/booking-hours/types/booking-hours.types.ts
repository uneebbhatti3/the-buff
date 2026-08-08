export type BusinessHour = {
  open: string;
  close: string;
  closed: boolean;
};

export type BusinessHoursRecord = Record<string, BusinessHour>;
