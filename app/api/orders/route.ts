import { getOrders } from "@/lib/order";

export async function GET() {
  const orders = await getOrders();
  return new Response(JSON.stringify(orders), { status: 200 });
}
