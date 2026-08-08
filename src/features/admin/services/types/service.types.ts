export type AdminService = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  durationMinutes: number;
  isActive: boolean;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
};

export type ServiceFormValues = {
  name: string;
  description: string;
  price: string;
  durationMinutes: string;
  isActive: boolean;
  displayOrder: string;
};
