import clientPromise from "@/lib/mongodb";
import { Db, Collection, ObjectId } from "mongodb";

let client;
let db: Db;
let orders: Collection<IOrder>;

async function init() {
  if (db) return;
  try {
    client = await clientPromise;
    db = client.db();
    orders = db.collection("orders");
  } catch (error) {
    throw new Error("Failed to connect to the database.");
  }
}

(async () => {
  await init();
})();

//// ORDERS /////

export async function getOrders() {
  try {
    if (!orders) await init();

    const result = await orders
      .find({})
      .map((order) => ({ ...order, _id: order._id.toString() }))
      .toArray();
    return { orders: result };
  } catch (error) {
    return { Error: "Failed to fetch products!" };
  }
}
