import { getCategories } from "@/lib/category";
import Link from "next/link";
import AddCategory from "./components/addCategory";
import DeleteCategory from "./components/deleteCategory";

export default async function Categories() {
  const { categories } = await getCategories();
  return (
    <section>
      <AddCategory />
      <h1 className="text-blue-900 font-bold text-xl">Categories</h1>
      <table className="w-1/2">
        <tbody>
          {categories?.map((category) => (
            <tr key={category._id} className="strip">
              <td className="py-1 px-3 w-2/3">{category.name}</td>
              <td className="py-1 px-3 w-2/3">{category.parentName}</td>
              <td className="flex gap-2 items-center justify-between py-1 px-3">
                <Link
                  href={`/categories/edit/${category._id}`}
                  className="btn-primary flex"
                >
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
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                  Edit
                </Link>
                <DeleteCategory category={category} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
