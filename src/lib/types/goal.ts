
export interface Goal {
  id: number;
  name: string | null;
  targetAmount: number | null;
  currentAmount: number | null;
  deadline: string | null;
  categoryId: number | null;
  category: string | null;
  createdAt: string | null;
}
