"use client";
import React, { useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '@/contextApi/auth';
import { useRouter } from "next/navigation";
import Link from "next/link";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const router = useRouter();
  const login = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.post("http://localhost:4500/api/v1/login", {
        email, password
      })
      if (data) {
        toast.success(data.message);
        setAuth({
          ...auth,
          user: data.user,
          token: data.token,

        });
        localStorage.setItem("userID", JSON.stringify(data));
        //   console.log(data)
        await router.push("/")
      }


    } catch (error) {
      toast.error(error.response.data.message)
      setTimeout(async () => {
        await router.push("/register")
      }, 1500)
    }
  }

  return (
    <div className='auth'>
      <form action="" onSubmit={login}>
        <h1>Login page</h1>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Enter your email'
        />
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Enter your password'
        />
        <button type='submit'>
          Login
        </button>
        <p>
          Don't have account ? <Link href={"/register"}>Register now</Link>
        </p>
      </form>
    </div>
  )
}

export default Login
