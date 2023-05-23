"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function EditCategory({ params }: { params: IParams }) {
  const [catName, setCatName] = useState("");
  const [parentName, setParentName] = useState("");
  const [categories, setCategories] = useState<ICategory[]>();
  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    fetchCategory(id);
    fetchCategories();
  }, [id]);

  function fetchCategory(id: string) {
    axios.get("/api/categories/" + id).then((result) => {
      setCatName(result.data.category.name);
      setParentName(result.data.category.parentName);
    });
  }
  function fetchCategories() {
    axios.get("/api/categories").then((result) => {
      setCategories(result.data.categories);
    });
  }
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    axios
      .put("/api/categories/" + id, { name: catName, parentName })
      .then((result) => {
        if (result.status === 200) {
          router.push("/categories");
          router.refresh();
        }
      });
    setCatName("");
    setParentName("");
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
        <select
          onChange={(ev) => setParentName(ev.target.value)}
          value={parentName}
          className="border-2"
        >
          <option value="">No parent category</option>
          {categories &&
            categories?.map((category) => (
              <option key={category._id} value={category.name}>
                {category.name}
              </option>
            ))}
        </select>
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
