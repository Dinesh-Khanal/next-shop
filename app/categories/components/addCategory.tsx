"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

function AddCategory() {
  const [catName, setCatName] = useState("");
  const [parentName, setParentName] = useState("");
  const [categories, setCategories] = useState<ICategory[]>();
  const [properties, setProperties] = useState<
    { name: string; value: string }[]
  >([]);
  const router = useRouter();
  useEffect(() => {
    fetchCategories();
  }, []);
  function fetchCategories() {
    axios.get("/api/categories").then((result) => {
      setCategories(result.data.categories);
    });
  }
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (catName === "") return;
    axios
      .post("/api/categories", { name: catName, parentName, properties })
      .then((result) => {
        if (result.status === 200) {
          router.refresh();
        }
      });
    setCatName("");
  }
  function addProperties() {
    setProperties((prev) => [...prev, { name: "", value: "" }]);
  }
  function propertyNameChange(index: number, newName: string) {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].name = newName;
      return properties;
    });
  }
  function propertyValueChange(index: number, newValue: string) {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].value = newValue;
      return properties;
    });
  }
  function deleteProperty(index: number) {
    const newProperties = properties.filter((p, i) => i !== index);
    setProperties(newProperties);
  }
  return (
    <section>
      <h2 className="text-blue-900 font-semibold text-lg">New Category Name</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex gap-2 mb-2">
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
              categories.map((category) => (
                <option key={category._id} value={category.name}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>
        <h2 className="text-blue-900 text-lg font-semibold">Properties</h2>
        <button type="button" onClick={addProperties} className="btn-default">
          Add new property
        </button>
        {properties.map((property, index) => (
          <div key={index} className="block my-2">
            <input
              type="text"
              placeholder="Property name"
              value={property.name}
              onChange={(e) => propertyNameChange(index, e.target.value)}
            />
            <input
              type="text"
              placeholder="Property value"
              value={property.value}
              onChange={(e) => propertyValueChange(index, e.target.value)}
            />
            <button
              className="btn-red ml-1"
              onClick={() => deleteProperty(index)}
            >
              Delete
            </button>
          </div>
        ))}
        <button
          type="submit"
          className="bg-blue-900 text-white text-sm py-1 px-2 rounded block mt-2"
        >
          save
        </button>
      </form>
    </section>
  );
}

export default AddCategory;
