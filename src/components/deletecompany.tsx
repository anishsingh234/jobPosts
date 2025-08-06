// @ts-nocheck
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteCompany({ id }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    setLoading(true);
    try {
      const res = await fetch(`/api/company/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      console.log("Delete response:", data);

      if (data.success) {
        alert("Company deleted");
        router.push("/");
        router.refresh();
      } else {
        alert(data.message || "Failed to delete company");
      }
    } catch (err) {
      console.log("Error deleting company:", err);
      alert("Error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className={`px-4 py-2 rounded-lg text-white font-semibold transition duration-200 ${
        loading ? "bg-red-300 cursor-not-allowed" : "bg-red-500 hover:bg-red-600"
      }`}
    >
      {loading ? "Deleting..." : "Delete Company"}
    </button>
  );
}
