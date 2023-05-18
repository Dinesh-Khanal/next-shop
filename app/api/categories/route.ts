import { NextResponse } from "next/server";
export async function GET(request: Request) {
  //both of following are valid
  //return new Response(JSON.stringify({ sender: "I am Dinesh Khanal" }));
  const categories = [
    { _id: "1", name: "Stationary" },
    { _id: "2", name: "Electronics" },
    { _id: "3", name: "Groceries" },
  ];
  return NextResponse.json(categories);
}
