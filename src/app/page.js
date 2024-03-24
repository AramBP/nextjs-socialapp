"use client";
import db from "./db";
import { useRouter } from "next/navigation";

export default function Home() {
  let router = useRouter();
  async function logOut() {
    db.logout();
    await fetch("http://localhost:3000/api/clearCookie", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    router.push("http://localhost:3000/auth/login");
  }
  return (
    <div>
      <button onClick={logOut}>Logout</button>
    </div>
  );
}
