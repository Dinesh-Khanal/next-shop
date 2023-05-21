import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { createCategory, getCategories } from "@/lib/category";

export async function GET(request: Request) {
  const categories = await getCategories();
  return NextResponse.json(categories);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response(
      JSON.stringify({
        Error: "Unauthorized!",
        message: "You should login to add category",
      }),
      { status: 401 }
    );
  }

  const body = await request.json();
  try {
    const category = await createCategory(body);
    return new Response(JSON.stringify(category), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ Error: "Internal server error" }), {
      status: 500,
    });
  }
}
