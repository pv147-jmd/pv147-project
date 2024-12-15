'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();
  const { setUser } = useUser();

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setError("");

      if (!formData.email || !formData.password) {
          setError("Email and password are required.");
          return;
      }

      // Send the payload with correct field names
      // const payload = { email: formData.email, password: formData.password };
      const { ...payload } = formData;

      try {
          const response = await fetch("/api/auth/login", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload), // Ensure keys match API expectations
          });

          // Check if the response is OK
          if (!response.ok) {
              const errorText = await response.text();
              console.error("Response error:", errorText);
              throw new Error(`Request failed: ${response.status}`);
          }

          const data = await response.json();

          if (response.ok) {
              setUser(data.user);

              localStorage.setItem('user', JSON.stringify(data.user));
              router.push("/");
          } else {
              const { message } = data;
              setError(message || "Invalid email or password.");
          }
      } catch (error) {
          console.error("Fetch error:", error.message || error);
          setError("An error occurred during login. Please try again.");
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
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          className="p-2 mb-4 border rounded"
          type="password"
          placeholder="Password"
          value={formData.password}
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
