"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);
    const company = {
      name,
      description,
    };
    const res = await fetch("http://localhost:3000/api/company", {
      method: "POST",
      body: JSON.stringify(company),
    });
    const data = await res.json();
    setLoading(false);
    if (data.success) {
      router.push("/");
    }
  }

  return (
    <div className="min-h-screen bg-[#f2f2f2] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white border border-gray-300 rounded-sm px-8 py-6 shadow-md">
          <h1 className="text-2xl font-medium mb-4 text-gray-800">Add Company</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="name" className="text-sm font-semibold text-gray-700 mb-1">
                Company Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Meta"
                className="border border-gray-400 rounded-sm px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="description" className="text-sm font-semibold text-gray-700 mb-1">
                Description
              </label>
              <input
                id="description"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g. Social giant"
                className="border border-gray-400 rounded-sm px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full text-sm font-medium text-white py-2 rounded-sm transition ${
                loading
                  ? "bg-teal-300 cursor-not-allowed"
                  : "bg-teal-500 hover:bg-teal-800"
              }`}
            >
              {loading ? "Submitting..." : "Continue"}
            </button>
          </form>

          <div className="mt-5 text-xs text-blue-600 hover:underline cursor-pointer">
            Need help?
          </div>
        </div>

        
      </div>
    </div>
  );
}
