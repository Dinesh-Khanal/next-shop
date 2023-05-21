"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductEditForm from "../../components/productEditForm";

export default function EditProductPage({ params }: { params: IParams }) {
  const [productInfo, setProductInfo] = useState<IProduct>();
  const id = params.id;
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/api/products/" + id).then((response) => {
      setProductInfo(response.data.product);
    });
  }, [id]);
  return (
    <div>
      <h1 className="text-blue-900 text-2xl font-bold">Edit product</h1>
      {productInfo && <ProductEditForm cProduct={productInfo} />}
    </div>
  );
}
