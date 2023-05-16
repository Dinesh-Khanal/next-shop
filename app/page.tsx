import Image from "next/image";
//import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Login from "./components/login";

export default async function Home() {
  //const session = await getServerSession(authOptions);
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="text-blue-900 flex justify-between w-[50vw]">
        <h2>
          Hello Next Shop
          {/* Hello, <b>{session?.user?.name}</b> */}
        </h2>
        {/* {session ? (
          <div className="flex bg-gray-300 gap-1 text-black rounded-lg overflow-hidden">
            <Image
              src={session?.user?.image as string}
              alt=""
              width={24}
              height={24}
            />
            <span className="px-2">{session?.user?.name}</span>
          </div>
        ) : (
          <div className="bg-bgGray w-screen h-screen flex items-center">
            <div className="text-center w-full">
              <Login />
            </div>
          </div>
        )} */}
      </div>
    </main>
  );
}
