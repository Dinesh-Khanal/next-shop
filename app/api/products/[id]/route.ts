import { deleteProduct, editProduct, getProductById } from "@/lib/product";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(request: Request, ctx: { params: IParams }) {
  const id = ctx.params.id;
  try {
    const product = await getProductById(id);
    return new Response(JSON.stringify(product), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(null), { status: 500 });
  }
}

export async function PUT(request: Request, ctx: { params: IParams }) {
  const id = ctx.params.id;

  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response(
      JSON.stringify({
        error: "unauthorized",
        message: "You are not logged in",
      }),
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    await editProduct(id, body);
    return new Response(JSON.stringify(body), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(null), { status: 500 });
  }
}

export async function DELETE(request: Request, ctx: { params: IParams }) {
  const id = ctx.params.id;

  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response(
      JSON.stringify({
        error: "unauthorized",
        message: "You are not logged in",
      }),
      { status: 401 }
    );
  }
  try {
    const result = await deleteProduct(id);
    return new Response(JSON.stringify("Product deleted successfully."), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify(null), { status: 500 });
  }
}
