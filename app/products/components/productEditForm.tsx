"use client";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";

interface IProps {
  cProduct: IProduct;
}
export default function ProductEditForm({ cProduct }: IProps) {
  const [title, setTitle] = useState(cProduct.title);
  const [description, setDescription] = useState(cProduct.description);
  const [category, setCategory] = useState(cProduct.category);
  const [pprc, setPprc] = useState(cProduct.price?.toString() || "");
  const [images, setImages] = useState<string[]>(cProduct.images as string[]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const CLOUD_NAME = "dkhanal";
  const UPLOAD_PRESET = "nextblog_preset_jkri3j4";
  const router = useRouter();
  useEffect(() => {
    axios.get("/api/categories").then((result) => {
      setCategories(result.data.categories);
    });
  }, []);
  function saveProduct(ev: FormEvent) {
    ev.preventDefault();
    const data = {
      title,
      description,
      price: Number(pprc),
      images,
      category,
    };
    axios.put("/api/products/" + cProduct._id, data).then((result) => {
      if (result.status === 200) {
        router.push("/products");
        router.refresh();
      }
    });
  }

  async function uploadImages(ev: React.ChangeEvent<HTMLInputElement>) {
    const files = ev.target?.files;
    if (files && files?.length > 0) {
      const data = new FormData();
      for (const file of files) {
        data.append("file", file);
        data.append("upload_preset", UPLOAD_PRESET);
      }
      try {
        //const res = await axios.post("/api/upload", data);
        const res = await axios.post(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
          data
        );
        setImages((oldImages) => {
          return [...oldImages, res.data["secure_url"]];
        });
      } catch (error) {
        console.log(error);
      }
    }
  }
  function updateImagesOrder(images: string[]) {
    setImages(images);
  }

  return (
    <form onSubmit={saveProduct} className="w-1/2 flex flex-col gap-2">
      <label className="text-blue-900 text-lg font-semibold">
        Product name
      </label>
      <input
        type="text"
        placeholder="product name"
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
        className="border-2 p-2"
      />
      <label className="text-blue-900">Category</label>
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
      <label className="text-blue-900">Photos</label>
      <div className="mb-2 flex flex-wrap gap-1">
        {!!images?.length &&
          images.map((link, i) => (
            <div
              key={i}
              className="bg-white w-20 h-12 p-4 shadow-sm rounded-sm border border-gray-200 relative"
            >
              <Image
                src={link}
                alt=""
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 30vw, 20vw"
                className="rounded-lg object-contain"
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
          <input type="file" onChange={uploadImages} className="hidden" />
          <input type="file" className="hidden" />
        </label>
      </div>
      <label className="text-blue-900">Description</label>
      <textarea
        placeholder="description"
        value={description}
        onChange={(ev) => setDescription(ev.target.value)}
        className="border-2 p-2"
      />
      <label className="text-blue-900">Price (in USD)</label>
      <input
        type="number"
        placeholder="price"
        value={pprc}
        onChange={(ev) => setPprc(ev.target.value)}
        className="border-b-2 p-2"
      />
      <button type="submit" className="btn-primary w-1/3">
        Save
      </button>
    </form>
  );
}
