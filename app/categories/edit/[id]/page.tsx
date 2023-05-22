"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function EditCategory({ params }: { params: IParams }) {
  const [catName, setCatName] = useState("");
  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    fetchCategory(id);
  }, [id]);

  function fetchCategory(id: string) {
    axios.get("/api/categories/" + id).then((result) => {
      setCatName(result.data.category.name);
    });
  }
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    axios.put("/api/categories/" + id, { name: catName }).then((result) => {
      if (result.status === 200) {
        router.push("/categories");
        router.refresh();
      }
    });
    setCatName("");
  }
  return (
    <section>
      <h2 className="text-blue-900 font-semibold text-lg">
        Edit Category Name
      </h2>
      <form onSubmit={handleSubmit} className="flex gap-2 mb-2">
        <input
          type="text"
          placeholder="Category name"
          className="py-1 px-2 border-2 rounded"
          value={catName}
          onChange={(e) => setCatName(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-900 text-white text-sm py-1 px-2 rounded"
        >
          save
        </button>
      </form>
    </section>
  );
}
