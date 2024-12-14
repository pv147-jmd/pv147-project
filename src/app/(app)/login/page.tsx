'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      router.push("/"); // Redirect to home page on success
    } else {
      const { message } = await response.json();
      setError(message || "Invalid email or password.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form className="w-80 flex flex-col" onSubmit={handleSubmit}>
        <input
          className="p-2 mb-2 border rounded"
          type="email"
          placeholder="Email"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          className="p-2 mb-4 border rounded"
          type="password"
          placeholder="Password"
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <button className="p-2 bg-blue-500 text-white rounded" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
