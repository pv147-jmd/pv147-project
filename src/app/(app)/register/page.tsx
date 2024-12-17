'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    nickname: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // console.log("Form data on submit:", formData);

    // Check for empty fields
    if (!formData.email || !formData.password || !formData.nickname) {
      setError("Všechna pole jsou povinná.");
      return;
    }

    // Password comparison
    if (formData.password !== formData.confirmPassword) {
      setError("Hesla se neshodují.");
      return;
    }

    // Remove confirmPassword from payload
    const { confirmPassword, ...payload } = formData;

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      router.push("/login?registered=true");
    } catch (error) {
      console.error("Fetch error:", error.message || error);
      setError("Něco se pokazilo. Zkuste to prosím znovu.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-min">
      <h1 className="text-2xl font-bold mb-4">Registrace</h1>
      <form className="w-80 flex flex-col" onSubmit={handleSubmit}>
        <input
          className="p-2 mb-2 border rounded"
          type="text"
          placeholder="Uživatelské jméno"
          value={formData.nickname}
          onChange={(e) =>
            setFormData({ ...formData, nickname: e.target.value })
          }
        />
        <input
          className="p-2 mb-2 border rounded"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
        />
        <input
          className="p-2 mb-2 border rounded"
          type="password"
          placeholder="Heslo"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <input
          className="p-2 mb-4 border rounded"
          type="password"
          placeholder="Potvrďte heslo"
          value={formData.confirmPassword}
          onChange={(e) =>
            setFormData({ ...formData, confirmPassword: e.target.value })
          }
        />
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <button className="p-2 bg-blue-500 text-white rounded" type="submit">
          Registrovat
        </button>
      </form>
    </div>
  );
}
