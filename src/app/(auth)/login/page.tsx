"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e:React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (data.success) {
        router.push("/");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-sm bg-white border border-gray-300 rounded-md shadow-sm p-6">
        
        <div className="text-center mb-6">
         
          <span className="flex justify-center items-center">
             <img src="/logp.svg" alt="Logo" className="w-10 h-10 m-1" />
            <h1 className="text-3xl font-bold text-teal-600 ">JobPost</h1>
            
            </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Sign in</h2>

          {error && (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )}

          <div className="space-y-1">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email 
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full border border-gray-300 px-3 py-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="anish@gmail.com"
              required
            />
          </div>

          <div className="space-y-1">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full border border-gray-300 px-3 py-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-500 hover:bg-teal-600 text-white font-medium py-2 rounded-sm transition duration-150"
          >
            {loading ? "Logging in..." : "Continue"}
          </button>
        </form>

       
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300" />
          <span className="mx-4 text-gray-500 text-sm">New to us?</span>
          <div className="flex-grow border-t border-gray-300" />
        </div>

        <button
          className="w-full border border-gray-400 text-sm text-gray-800 py-2 rounded-sm hover:bg-gray-50"
          onClick={() => router.push("/signup")}
        >
          Create your account
        </button>
      </div>
    </div>
  );
}
