export interface Product {
  id: number;
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
  rating: number;
  user: {
    id: number;
  };
}

export interface Review {
  id: number;
  name: string;
  content: string;
  recommended: boolean;
}

export type ProductType = "processed" | "weighted" | "packaged";
