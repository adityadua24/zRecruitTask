"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "@/contextApi/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [redirectTo, setRedirectTo] = useState("/");

  useEffect(() => {
    // Get the previous path from sessionStorage
    const previousPath = sessionStorage.getItem("previousPath");
    if (previousPath) {
      setRedirectTo(previousPath);
      sessionStorage.removeItem("previousPath");
    }

    // Check if user is already logged in
    const data = sessionStorage.getItem("userID");
    if (data) {
      router.push(redirectTo);
    }
    setIsLoading(false);
  }, [router, redirectTo]);

  const login = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.post("http://localhost:4500/api/v1/user/login", {
        email,
        password,
      });
      if (data) {
        toast.success(data.message);
        setAuth({
          ...auth,
          user: data.user,
          token: data.token,
        });
        sessionStorage.setItem("userID", JSON.stringify(data));
        router.push(redirectTo);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      setTimeout(async () => {
        await router.push("/register");
      }, 1500);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (auth?.user?._id) {
    return null; // Return nothing while redirecting
  }

  return (
    <div className="auth">
      <form action="" onSubmit={login}>
        <h1>Login page</h1>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
        <button type="submit">Login</button>
        <p>
          Don't have account ? <Link href={"/register"}>Register now</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
