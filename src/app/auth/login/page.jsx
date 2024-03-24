"use client";
import React, { useState, useEffect } from "react";
import PocketBase from "pocketbase";
import db from "../../db";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const pb = new PocketBase("http://localhost:8090");
  pb.autoCancellation(false);

  const router = useRouter();
  const [providers, setProviders] = useState([]);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //useEffect to get al providers from the database
  useEffect(() => {
    async function getProviders() {
      const provs = await db.oAuthMethods();
      setProviders(provs);
    }
    getProviders();
  }, []);

  async function loginOAuth(providerName) {
    try {
      const result = await pb
        .collection("users")
        .authWithOAuth2({ provider: providerName });
      if (!result?.token) {
        throw new Error("could not authenticate user");
      }
      // set the cookie with an api endpoint
      const isAuth = pb.authStore.isValid;
      const url = "http://localhost:3000/api/setCookie";
      await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(isAuth),
      });
      router.push("/");
      return result;
    } catch (err) {
      setError(err);
      console.error(err);
    }
  }

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const result = await pb
        .collection("users")
        .authWithPassword(email, password);
      // set the cookie with an api endpoint
      const isAuth = pb.authStore.isValid;
      if (!result?.token) {
        setError("Invalid email or password");
        return;
      }
      const url = "http://localhost:3000/api/setCookie";
      await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(isAuth),
      });
      router.push("/");
      return result;
    } catch (error) {
      setError(error);
      console.error(error);
    }
  }

  return (
    <>
      <div>Login Page</div>
      <div>
        <form onSubmit={onSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value || "")}
              className="text-black"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value || "")}
              className="text-black"
            />
          </div>
          <button type="submit">Login</button>
          {error && <p>{error}</p>}
        </form>
      </div>
      <div>
        {providers?.map((provider) => (
          <div key={provider.name}>
            <button
              key={provider.name}
              onClick={() => loginOAuth(provider.name)}
            >
              Login with {provider.name}
            </button>
          </div>
        ))}
      </div>
      <div>
        <p>
          Dont have an account? <Link href={"../auth/signup"}>Sign Up</Link>
        </p>
      </div>
    </>
  );
}
