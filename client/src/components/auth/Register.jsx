"use client";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Register = () => {
  // all state management
  const [load, setLoad] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setcpassword] = useState("");

  const router = useRouter();

  const register = async (e) => {
    try {
      e.preventDefault();

      if (email.trim() === "" || password.trim() === "") {
        toast.error("empty values are not allowed");
      } else if (password !== cpassword) {
        toast.error("password and confirm password do not match");
      } else {
        const { data } = await axios.post("http://localhost:4500/api/v1/user/register", {
          email,
          password,
          cpassword,
        });
        if (data.existingUser) {
          toast.error(data.message);
          setTimeout(async () => {
            await router.push("/login");
          }, 1500);
        } else if (data.status === 500) {
          toast.error(data.message);
        } else {
          toast.success(data.message);
          setTimeout(async () => {
            await router.push("/login");
          }, 1500);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error(error);
      setLoad(false);
    }
  };
  return (
    <div className="auth">
      <form action="" onSubmit={register}>
        <h1>Register page</h1>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
        <input
          type="password"
          required
          value={cpassword}
          onChange={(e) => setcpassword(e.target.value)}
          placeholder="Enter confirm password"
        />
        <button type="submit">Register</button>
        <p>
          Already have an account ? <Link href={"/login"}>Login now</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
