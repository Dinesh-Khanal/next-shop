import Image from "next/image";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Login from "./components/login";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="text-blue-900 flex justify-between w-[50vw]">
        <h2>Hello Next Shop</h2>
      </div>
    </main>
  );
}
