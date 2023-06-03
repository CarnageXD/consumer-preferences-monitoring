import { User } from "./user";

export interface Product {
  id: number;
  createdAt: Date;
  name: string;
  tag: string;
  description: string;
  type: ProductType;
  image: string;
  netWeight: string;
  packaging: string;
  form: string;
  periodAndTermsOfStorage: string;

  rating: Rating[];
  review: Review[];
}

export interface Rating {
  id: number;
  createdAt: Date;
  rating: number;
  user: User;
  product: Product;
}

export interface Review {
  id: number;
  createdAt: Date;
  name: string;
  content: string;
  recommended: boolean;
  user: User;
  product: Product;
}

export type ProductType = "processed" | "weighted" | "packaged";
