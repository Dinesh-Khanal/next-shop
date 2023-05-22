"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

export default function DeleteProductPage({ params }: { params: IParams }) {
  const router = useRouter();
  const [productInfo, setProductInfo] = useState<IProduct>();
  const { id } = params;
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/api/products/" + id).then((result) => {
      setProductInfo(result.data.product);
    });
  }, [id]);
  function deleteProduct() {
    axios.delete("/api/products/" + id).then((result) => {
      if (result.status === 200) {
        goBack();
        router.refresh();
      }
    });
  }
  function goBack() {
    router.push("/products");
  }
  return (
    <div>
      <h1 className="text-center">
        {`Do you really want to delete " ${productInfo?.title}"?`}
      </h1>
      <div className="flex gap-2 justify-center">
        <button
          onClick={deleteProduct}
          className="bg-red-700 text-white text-sm py-1 px-3 rounded-full"
        >
          Yes
        </button>
        <button
          className="bg-blue-900 text-white py-1 px-3 rounded-full text-sm"
          onClick={goBack}
        >
          NO
        </button>
      </div>
    </div>
  );
}
