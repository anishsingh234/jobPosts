"use client";
import { Button } from "@radix-ui/themes";
import { useState } from "react";

export default function ApplyToJob({ jobId }: { jobId: string }) {
  const [loading, setLoading] = useState(false);
  const [applied, setApplied] = useState(false);

  async function handleApply() {
    if (!confirm("Do you want to apply for this job?")) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/apply/${jobId}`);
      const data = await res.json();

      if (res.ok && data.success) {
        alert("Applied successfully!");
        setApplied(true);
      } else {
        alert(data.message || "Failed to apply");
      }
    } catch (err) {
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button onClick={handleApply} disabled={loading || applied}>
      {applied ? "Applied" : loading ? "Applying..." : "Apply"}
    </Button>
  );
}
