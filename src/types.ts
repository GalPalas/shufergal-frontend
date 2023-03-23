import { ReactNode } from "react";

export type LayoutProps = {
  title: string;
  children: ReactNode;
};

export type Data = {
  products: Product[];
};

export type Product = {
  _id: string;
  name?: string;
  price?: number;
  quantity?: number;
  brand?: string;
  image?: string;
  category?: Category;
  description?: string;
  numberInStock?: number;
  liked?: boolean;
  images?: Array<string>;
};

export type Category = {
  _id?: string;
  name: string;
};

export type SortType = {
  _id?: string;
  name: string;
  lable?: string;
  order?: any;
};

export type ShippingAddress = {
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
};

export type User = {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
};
