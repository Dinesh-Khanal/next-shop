import { NextResponse } from "next/server";
import { createProduct, getProducts } from "@/lib/product";
export async function GET(request: Request) {
  const products = await getProducts();
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  // const session = await getServerSession(authOptions);
  // if (!session) {
  //   return new NextResponse(
  //     JSON.stringify({ status: "fail", message: "You are not logged in" }),
  //     { status: 401 }
  //   );
  // }
  // const { user } = await getUserByEmail(session.user?.email as string);

  const body = await request.json();
  const newProduct = {
    title: body.title,
    description: body.description,
    price: body.price,
    category: body.category,
  };
  const product = await createProduct(newProduct);
  return NextResponse.json({ data: product });
}
