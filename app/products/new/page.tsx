import React from "react";
import ProductForm from "../components/productForm";

export interface ICategory {
  _id: string;
  name: string;
}
export interface IProduct {
  _id: string;
  title: string;
  description: string;
  price: string;
  images: string[];
  category: ICategory;
}
export default function page() {
  return (
    <>
      <h2 className="text-xl font-bold">New Product</h2>
      <ProductForm />
    </>
  );
}
