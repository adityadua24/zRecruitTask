"use client";
import React, { useState, useEffect } from "react";
import { Footer } from "@/components/footer/Footer";
import { useAuth } from "@/contextApi/auth";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const MyContacts = () => {
  const [auth] = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [contactData, setContactData] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [modal, setModal] = useState(false);
  const [updateForm, setUpdateForm] = useState({
    name: "",
    number: "",
    address: "",
  });

  // Fetch contacts when component mounts
  useEffect(() => {
    if (!auth?.token) {
      router.push("/login");
      return;
    }
    fetchContacts();
  }, [auth?.token, router]);

  const fetchContacts = async () => {
    try {
      const { data } = await axios.get("http://localhost:4500/api/v1/contacts/all", {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      setContactData(data.contacts);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Error fetching contacts");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    // Show a loading toast while deleting
    const loadingToast = toast.loading("Deleting contact...");

    try {
      const { data } = await axios.delete(`http://localhost:4500/api/v1/contacts/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });

      if (data.success) {
        // Dismiss the loading toast
        toast.dismiss(loadingToast);
        // Show success toast
        toast.success("Contact deleted successfully!");
        // Refresh contacts list
        fetchContacts();
      }
    } catch (error) {
      // Dismiss the loading toast
      toast.dismiss(loadingToast);
      console.error(error);
      toast.error(error.response?.data?.message || "Error deleting contact");
    }
  };

  const openModal = (contact) => {
    setSelectedContact(contact);
    setUpdateForm({
      name: contact.name,
      number: contact.number,
      address: contact.address,
    });
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
    setSelectedContact(null);
    setUpdateForm({
      name: "",
      number: "",
      address: "",
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      // Validate phone number
      if (updateForm.number.toString().length < 10) {
        return toast.error("Phone number must be at least 10 digits");
      }

      const { data } = await axios.put(
        `http://localhost:4500/api/v1/contacts/update/${selectedContact._id}`,
        updateForm,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        closeModal();
        // Refresh contacts list
        fetchContacts();
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Error updating contact");
    }
  };

  if (isLoading) {
    return <div className="profile">Loading...</div>;
  }

  return (
    <div className="profile">
      <h2>My Contacts</h2>
      {contactData.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Number</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {contactData.map((contact) => (
              <tr key={contact._id}>
                <td>{contact.name}</td>
                <td>{contact.number}</td>
                <td>{contact.address}</td>
                <td className="btn">
                  <button className="edit" onClick={() => openModal(contact)}>
                    Edit
                  </button>
                  <button
                    className="delete"
                    onClick={() => {
                      // Show confirmation toast before deleting
                      toast(
                        (t) => (
                          <div>
                            <p>Are you sure you want to delete this contact?</p>
                            <div style={{ display: "flex", gap: "8px", marginTop: "8px", justifyContent: "flex-end" }}>
                              <button
                                onClick={() => {
                                  toast.dismiss(t.id);
                                  handleDelete(contact._id);
                                }}
                                style={{
                                  background: "#dc3545",
                                  color: "white",
                                  border: "none",
                                  padding: "4px 8px",
                                  borderRadius: "4px",
                                  cursor: "pointer",
                                }}
                              >
                                Delete
                              </button>
                              <button
                                onClick={() => toast.dismiss(t.id)}
                                style={{
                                  background: "#6c757d",
                                  color: "white",
                                  border: "none",
                                  padding: "4px 8px",
                                  borderRadius: "4px",
                                  cursor: "pointer",
                                }}
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ),
                        {
                          duration: Infinity,
                          style: {
                            background: "#fff",
                            color: "#000",
                            padding: "16px",
                          },
                        }
                      );
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p style={{ textAlign: "center", color: "black" }}>No contacts found! Add some contacts.</p>
      )}

      {modal && selectedContact && (
        <div className="updateDetails">
          <h2>Update Contact</h2>
          <form onSubmit={handleUpdate}>
            <input
              type="text"
              value={updateForm.name}
              onChange={(e) => setUpdateForm({ ...updateForm, name: e.target.value })}
              placeholder="Enter contact name"
              required
            />
            <input
              type="number"
              value={updateForm.number}
              onChange={(e) => setUpdateForm({ ...updateForm, number: e.target.value })}
              placeholder="Enter phone number"
              required
            />
            <input
              type="text"
              value={updateForm.address}
              onChange={(e) => setUpdateForm({ ...updateForm, address: e.target.value })}
              placeholder="Enter address"
              required
            />
            <div className="btn">
              <button type="submit" className="edit">
                Update
              </button>
              <button type="button" className="delete" onClick={closeModal}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default MyContacts;
