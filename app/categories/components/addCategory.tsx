"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

function AddCategory() {
  const [catName, setCatName] = useState("");
  const router = useRouter();
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    axios.post("/api/categories", { name: catName }).then((result) => {
      if (result.status === 200) {
        router.refresh();
      }
    });
    setCatName("");
  }
  return (
    <section>
      <h2 className="text-blue-900 font-semibold text-lg">New Category Name</h2>
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

export default AddCategory;
