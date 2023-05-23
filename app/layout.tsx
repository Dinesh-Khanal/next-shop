import "./globals.css";
import { Inter } from "next/font/google";
import Login from "./components/login";
import Nav from "./components/nav";
import Logo from "./components/logo";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Next Shop Application",
  description: "A shopping cart application created in next js 13.4",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="bg-bgGray min-h-screen ">
          <div className="md:hidden flex items-center p-4">
            <div className="flex grow justify-center mr-6">
              <Logo />
            </div>
          </div>
          <div className="flex">
            {session ? <Nav /> : <Login />}
            <div className="flex grow p-4 pt-8">{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}
