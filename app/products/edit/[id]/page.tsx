"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductForm from "../../components/productForm";

export default function EditProductPage({ params }: { params: IParams }) {
  const [productInfo, setProductInfo] = useState<IProduct>();
  const id = params.id;
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/api/products/" + id).then((response) => {
      setProductInfo(response.data);
    });
  }, [id]);
  return (
    <div>
      <h1>Edit product</h1>
      {productInfo && <ProductForm />}
    </div>
  );
}
