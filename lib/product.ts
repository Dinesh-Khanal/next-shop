import clientPromise from "@/lib/mongodb";
import { Db, Collection, ObjectId } from "mongodb";

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
      .map((product) => ({ ...product, _id: product._id.toString() }))
      .toArray();
    return { products: result };
  } catch (error) {
    return { Error: "Failed to fetch products!" };
  }
}

export async function getProductById(id: string) {
  try {
    if (!products) await init();
    const product = await products.findOne(new ObjectId(id));
    if (!product)
      throw new Error("Something went wrong, product detail could not found");
    return { product: { ...product, _id: product._id.toString() } };
  } catch (error) {
    return { Error: "Failed to get product!" };
  }
}

export async function createProduct(new_product: IProduct) {
  try {
    if (!products) await init();

    return await products.insertOne(new_product);
  } catch (error) {
    return { Error: "Failed to create product!" };
  }
}

export async function deleteProduct(id: string) {
  try {
    if (!products) await init();
    //@ts-ignore
    return await products.deleteOne({ _id: new ObjectId(id) });
  } catch (error) {
    return { Error: "Failed to delete product!" };
  }
}

export async function editProduct(id: string, product: IProduct) {
  try {
    if (!products) await init();
    //@ts-ignore
    return await products.findOneAndReplace({ _id: new ObjectId(id) }, product);
  } catch (error) {
    return { Error: "Fail to update the product!" };
  }
}
