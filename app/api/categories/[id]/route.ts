import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { deleteCategory, getCategoryById, editCategory } from "@/lib/category";

export async function GET(request: Request, { params }: { params: IParams }) {
  const { id } = params;
  if (!id) {
    return;
  }
  try {
    const category = await getCategoryById(id);
    return new Response(JSON.stringify(category), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ Error: "Something went wrong" }), {
      status: 500,
    });
  }
}

export async function PUT(request: Request, { params }: { params: IParams }) {
  const { id } = params;
  if (!id) {
    return;
  }
  try {
    const body = await request.json();
    await editCategory(id, body);
    return new Response(JSON.stringify({ message: "update successfully" }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ Error: "Something went wrong" }), {
      status: 500,
    });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const { id } = params;
  const session = getServerSession(authOptions);
  if (!session) {
    return new Response(
      JSON.stringify({
        Error: "Unauthorized!",
        message: "You must be logined to delete",
      }),
      { status: 401 }
    );
  }
  try {
    await deleteCategory(id);
    return new Response(
      JSON.stringify({ message: "Successfully deleted category" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ Error: "Internal server error" }), {
      status: 500,
    });
  }
}
