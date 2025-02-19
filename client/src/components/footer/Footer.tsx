'use client';
import Dock from "./Dock";
import React from "react";
import { VscHome, VscPersonAdd, VscSignOut } from "rocketicons/vsc";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAuth } from "@/contextApi/auth";

export function Footer() {
  const [auth, setAuth] = useAuth();
  const router = useRouter();
  const handleLogOut = async () => {
    await setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("userID");
    toast.success("Logout");
    await router.push("/");
  }
  const items = [
    { icon: <VscHome size={18} />, label: 'Home', onClick: () => router.push('/') },
    { icon: <VscPersonAdd size={18} />, label: 'Create Contact', onClick: () => router.push('createContact') },
    { icon: <VscSignOut size={18} />, label: 'Sign Out', onClick: handleLogOut },
  ];
  return (
    <Dock
      items={items}
      panelHeight={68}
      baseItemSize={50}
      magnification={70}
    />
  );
}
