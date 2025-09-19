export interface IProduct {
  id: number;
  name: string;
  price: number;
  quantity: number;
  categoryId: number;
  img: string;
  description: string;
  color?: string;
  material?: string;
  model?: string;
  dateAdded?: Date;
}
