'use client';
import { useState, useEffect  } from "react";
import { useRouter, useSearchParams  } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { signIn } from "next-auth/react";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const { setUser } = useUser();

  const handleGoogleLogin = async () => {
    await signIn("google", { redirectTo: "/"});
  };

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
      
      const { ...payload } = formData;

      try {
          const response = await fetch("/api/auth/login", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload), 
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
        <br/>
        <div className="px-6 sm:px-0 max-w-sm mt-2">
          <button type="button" 
            onClick={handleGoogleLogin}
            className="text-white w-full  bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between mr-2 mb-2">
              <svg className="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
                Přihlásit se přes Google
              <div></div></button>
        </div>
      </form>
    </div>
  );
}