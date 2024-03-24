"use client";
import db from "./db";
import { useRouter } from "next/navigation";
import useVerified from "./hooks/useVerified";
import pb from "../lib/pocketbase";

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
  const { isVerified, requestVerification } = useVerified();
  return (
    <>
      <div>
        <h1>Logged In: {pb.authStore.model.email}</h1>
        <p>Verified: {isVerified.toString()}</p>
        {!isVerified && (
          <button onClick={requestVerification}>Send Verification Email</button>
        )}
        <button onClick={logOut}>Logout</button>
      </div>
    </>
  );
}
