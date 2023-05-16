"use client";
import React from "react";
import { signIn } from "next-auth/react";

export default function Login() {
  return (
    <div className="p-4">
      <button
        onClick={() => signIn("google")}
        className="bg-blue-900 h-12 text-white p-2 px-4 rounded-full"
      >
        Login with Google
      </button>
    </div>
  );
}
