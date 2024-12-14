'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const [formData, setFormData] = useState({ email: "", password: "", name: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Password comparison
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const { confirmPassword, ...payload } = formData; 

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      router.push("/login"); 
    } else {
      const { message } = await response.json();
      setError(message || "Something went wrong.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form className="w-80 flex flex-col" onSubmit={handleSubmit}>
        <input
          className="p-2 mb-2 border rounded"
          type="text"
          placeholder="Name"
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          className="p-2 mb-2 border rounded"
          type="email"
          placeholder="Email"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          className="p-2 mb-2 border rounded"
          type="password"
          placeholder="Password"
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
        <input
          className="p-2 mb-4 border rounded"
          type="password"
          placeholder="Confirm Password"
          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
        />
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <button className="p-2 bg-blue-500 text-white rounded" type="submit">
          Register
        </button>
      </form>
    </div>
  );
}
