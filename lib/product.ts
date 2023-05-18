import clientPromise from "@/lib/mongodb";
import { Db, Collection } from "mongodb";

let client;
let db: Db;
let products: Collection<IProduct>;

async function init() {
  if (db) return;
  try {
    client = await clientPromise;
    db = client.db();
    products = db.collection("products");
  } catch (error) {
    throw new Error("Failed to connect to the database.");
  }
}

(async () => {
  await init();
})();

//// PRODUCTS /////

export async function getProducts() {
  try {
    if (!products) await init();

    const result = await products
      .find({})
      .map((product) => ({ ...product, _id: product._id }))
      .toArray();
    return { products: result };
  } catch (error) {
    return { error: "Failed to fetch products!" };
  }
}

export async function getProductById(id: string) {
  try {
    if (!products) await init();

    const todo = await products.findOne({ _id: id });
    if (!todo) throw new Error();
    return { todo: { ...todo, _id: todo._id } };
  } catch (error) {
    return { error: "Failed to get product!" };
  }
}

export async function createProduct(new_product: IProduct) {
  try {
    if (!products) await init();

    return await products.insertOne(new_product);
  } catch (error) {
    return { error: "Failed to create product!" };
  }
}

export async function deleteProduct(id: string) {}

export async function editProduct(id: string) {}
