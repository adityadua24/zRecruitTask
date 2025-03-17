"use client";
import React, { useState } from "react";
import { Footer } from "@/components/footer/Footer";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contextApi/auth";

const ContactCreator = () => {
  const router = useRouter();
  const [auth] = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validate form data
      if (!formData.name || !formData.number || !formData.address) {
        return toast.error("All fields are required");
      }

      // Validate phone number (must be at least 10 digits)
      if (formData.number.toString().length < 10) {
        return toast.error("Phone number must be at least 10 digits");
      }

      const { data } = await axios.post("http://localhost:4500/api/v1/contacts/create", formData, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });

      if (data.success) {
        toast.success(data.message);
        // Reset form
        setFormData({
          name: "",
          number: "",
          address: "",
        });
        // Redirect to contacts page
        router.push("/myContacts");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="auth">
      <form onSubmit={handleSubmit}>
        <h1>Create Contact</h1>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter contact name"
          required
        />
        <input
          type="number"
          name="number"
          value={formData.number}
          onChange={handleChange}
          placeholder="Enter phone number"
          required
        />
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Enter address"
          required
        />
        <button type="submit">Create Contact</button>
      </form>
      <Footer />
    </div>
  );
};

export default ContactCreator;
