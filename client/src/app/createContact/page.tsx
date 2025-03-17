"use client";

import ContactCreator from "@/components/ContactCreator";
import { useAuth } from "@/contextApi/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CreateContactPage() {
  const [auth] = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if we have data in sessionStorage
    const data = sessionStorage.getItem("userID");
    if (!data) {
      // Store the current path before redirecting
      sessionStorage.setItem("previousPath", "/createContact");
      router.push("/login");
    } else {
      setIsLoading(false);
    }
  }, [router]);

  // Don't render anything while checking auth state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // If we're not loading and there's no user, redirect to login
  if (!auth?.user?._id) {
    // Store the current path before redirecting
    sessionStorage.setItem("previousPath", "/createContact");
    router.push("/login");
    return null;
  }

  // Show the contact creator form only if user is authenticated
  return <ContactCreator />;
}
