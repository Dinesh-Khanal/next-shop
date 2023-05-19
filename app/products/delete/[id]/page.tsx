"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

export default function DeleteProductPage({ params }: { params: IParams }) {
  const router = useRouter();
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
  function goBack() {
    router.push("/products");
  }
  async function deleteProduct() {
    await axios.delete("/api/products/" + id);
    goBack();
  }
  return (
    <div>
      <h1 className="text-center">
        Do you really want to delete &nbsp;&quot;{productInfo?.title}&quot;?
      </h1>
      <div className="flex gap-2 justify-center">
        <button onClick={deleteProduct} className="btn-red">
          Yes
        </button>
        <button className="btn-default" onClick={goBack}>
          NO
        </button>
      </div>
    </div>
  );
}
