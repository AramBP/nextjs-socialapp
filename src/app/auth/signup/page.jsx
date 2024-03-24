"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");

  async function onSubmit(event) {
    event.preventDefault();
    if (password === passwordConfirm) {
      try {
        const form = { email, password };
        const response = await fetch("http://localhost:3000/api/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (!response.ok) {
          setError("Failed to authenticate user");
          return;
        }
        const data = await response.json();
        alert("Your account is now created");
        router.push("/auth/login");
      } catch (err) {
        setEmail("Failed to authenticate user");
      }
    }
  }
  return (
    <div>
      <h1>Sign Up</h1>
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
        <div>
          {password === passwordConfirm ? (
            <></>
          ) : (
            <p className="text-red-600">Passwords must match</p>
          )}
          <label htmlFor="passwordConfirm">Confirm Password</label>
          <input
            type="password"
            id="passwordConfirm"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value || "")}
            className="text-black"
          />
        </div>
        <button type="submit">Sign Up</button>
        {error && <p className="error">{error}</p>}
      </form>

      <div>
        <div>
          <p>
            Already have an account? <Link href={"../auth/login"}>Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
