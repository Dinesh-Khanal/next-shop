import clientPromise from "@/lib/mongodb";
import { Db, Collection, ObjectId } from "mongodb";

let client;
let db: Db;
let categories: Collection<ICategory>;

async function init() {
  if (db) return;
  try {
    client = await clientPromise;
    db = client.db();
    categories = db.collection("categories");
  } catch (error) {
    throw new Error("Failed to connect to the database.");
  }
}

(async () => {
  await init();
})();

//// CATEGORIES /////

export async function getCategories() {
  try {
    if (!categories) await init();

    const result = await categories
      .find({})
      .map((category) => ({ ...category, _id: category._id.toString() }))
      .toArray();
    return { categories: result };
  } catch (error) {
    return { Error: "Failed to fetch categories!" };
  }
}

export async function getCategoryById(id: string) {
  try {
    if (!categories) await init();
    const category = await categories.findOne(new ObjectId(id));
    if (!category)
      throw new Error("Something went wrong, category detail could not found");
    return { category: { ...category, _id: category._id.toString() } };
  } catch (error) {
    return { Error: "Failed to get category!" };
  }
}

export async function createCategory(new_category: ICategory) {
  try {
    if (!categories) await init();

    return await categories.insertOne(new_category);
  } catch (error) {
    return { Error: "Failed to create category!" };
  }
}

export async function deleteCategory(id: string) {
  try {
    if (!categories) await init();
    //@ts-ignore
    return await categories.deleteOne({ _id: new ObjectId(id) });
  } catch (error) {
    return { Error: "Failed to delete category!" };
  }
}

export async function editCategory(id: string, category: ICategory) {
  try {
    if (!categories) await init();
    return await categories.findOneAndReplace(
      //@ts-ignore
      { _id: new ObjectId(id) },
      category
    );
  } catch (error) {
    return { Error: "Fail to update the category!" };
  }
}
