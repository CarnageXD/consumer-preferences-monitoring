export interface Product {
  name: string;
  tag: string;
  description: string;
  type: ProductType;
  image: string;
  netWeight: string;
  packaging: string;
  form: string;
  periodAndTermsOfStorage: string;
}

export type ProductType = "processed" | "weighted" | "packaged";
