import React from "react";
import ProductForm from "../components/productForm";

export default function page() {
  return (
    <>
      <h2 className="text-blue-900 text-xl font-bold">New Product</h2>
      <ProductForm />
    </>
  );
}
