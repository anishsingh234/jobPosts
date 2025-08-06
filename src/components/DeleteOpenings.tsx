"use client";
import { Button } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteJobButton({ id }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this job?")) return;

    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3000/api/job/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (res.ok && data.success) {
        alert("Job deleted successfully.");
        router.refresh(); 
       
      } else {
        alert("Failed to delete job: " + (data.message || "Unknown error"));
      }
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button color="red" onClick={handleDelete} disabled={loading}>
      {loading ? "Deleting..." : "Delete Job"}
    </Button>
  );
}
