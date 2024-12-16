'use client';
import { useState, useEffect  } from "react";
import { useRouter, useSearchParams  } from "next/navigation";
import { useUser } from "@/context/UserContext";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const { setUser } = useUser();

  useEffect(() => {
    if (searchParams.get("registered") === "true") {
      setSuccess(true);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setError("");

      if (!formData.email || !formData.password) {
          setError("E-mail a heslo jsou povinné.");
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

          const data = await response.json();

          if (response.ok) {
              setUser(data.user);

              localStorage.setItem('user', JSON.stringify(data.user));
              router.push("/");
          } else {
              const { message } = data;
              setError(message || "Neplatný e-mail nebo heslo.");
          }
      } catch (error) {
          console.error("Fetch error:", error.message || error);
          setError( error.message || "Při přihlašování došlo k chybě. Zkuste to prosím znovu.");
      }
  };


  return (
    <div className="flex flex-col items-center justify-center min-h-min">
      {success && (
        <p className="text-green-500 mb-4">Registrace proběhla úspěšně! Nyní se múžete přihlásit.</p>
      )}
      <h1 className="text-2xl font-bold mb-4">Přihlášení</h1>
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
          placeholder="Heslo"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <button className="p-2 bg-blue-500 text-white rounded" type="submit">
          Přihlásit
        </button>
      </form>
    </div>
  );
}
