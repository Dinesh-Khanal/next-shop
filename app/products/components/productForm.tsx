"use client";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";

export default function ProductForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [pprc, setPprc] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [goToProducts, setGoToProducts] = useState(false);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const router = useRouter();
  useEffect(() => {
    axios.get("/api/categories").then((result) => {
      setCategories(result.data);
    });
  }, []);
  async function saveProduct(ev: FormEvent) {
    ev.preventDefault();
    const data = {
      title,
      description,
      price: Number(pprc),
      category,
    };
    await axios.post("/api/products", data);
    setGoToProducts(true);
  }
  if (goToProducts) {
    router.push("/products");
  }
  async function uploadImages(ev: React.ChangeEvent<HTMLInputElement>) {
    const files = ev.target?.files;
    if (files && files?.length > 0) {
      const data = new FormData();
      for (const file of files) {
        data.append("file", file);
      }
      const res = await axios.post("/api/upload", data);
      setImages((oldImages) => {
        return [...oldImages, ...res.data.links];
      });
    }
  }
  function updateImagesOrder(images: string[]) {
    setImages(images);
  }

  return (
    <form onSubmit={saveProduct} className="w-1/2 flex flex-col gap-2">
      <label>Product name</label>
      <input
        type="text"
        placeholder="product name"
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
        className="border-b-2 p-2"
      />
      <label>Category</label>
      <select
        value={category}
        onChange={(ev) => setCategory(ev.target.value)}
        className="w-1/2"
      >
        <option value="">Uncategorized</option>
        {categories.length > 0 &&
          categories.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
      </select>
      <label>Photos</label>
      <div className="mb-2 flex flex-wrap gap-1">
        {!!images?.length &&
          images.map((link) => (
            <div
              key={link}
              className="h-24 bg-white p-4 shadow-sm rounded-sm border border-gray-200"
            >
              <Image
                src={link}
                alt=""
                width={32}
                height={32}
                className="rounded-lg"
              />
            </div>
          ))}
        <label className="w-24 h-12 cursor-pointer text-center flex flex-col items-center justify-center text-sm gap-1 text-primary rounded-sm bg-white shadow-sm border border-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>
          <div>Add image</div>
          {/* <input type="file" onChange={uploadImages} className="hidden" /> */}
          <input type="file" className="hidden" />
        </label>
      </div>
      <label>Description</label>
      <textarea
        placeholder="description"
        value={description}
        onChange={(ev) => setDescription(ev.target.value)}
        className="border-2 p-2"
      />
      <label>Price (in USD)</label>
      <input
        type="number"
        placeholder="price"
        value={pprc}
        onChange={(ev) => setPprc(ev.target.value)}
        className="border-b-2 p-2"
      />
      <button
        type="submit"
        className="bg-blue-900 text-white text-sm rounded-full p-2 w-1/3"
      >
        Save
      </button>
    </form>
  );
}
