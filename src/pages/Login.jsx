import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      navigate("/admin");

    } catch (err) {
      alert("Invalid Email or Password");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">

      <form
        onSubmit={login}
        className="bg-slate-900 w-[400px] rounded-2xl border border-orange-500/20 p-8 shadow-2xl"
      >

        <h1 className="text-3xl font-bold text-center text-orange-400 mb-2">
          LAKAFX
        </h1>

        <p className="text-slate-400 text-center mb-8">
          Admin Dashboard Login
        </p>

        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          className="w-full mb-4 p-3 rounded-lg bg-slate-800 text-white outline-none border border-slate-700 focus:border-orange-400"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          className="w-full mb-6 p-3 rounded-lg bg-slate-800 text-white outline-none border border-slate-700 focus:border-orange-400"
        />

        <button
          className="w-full py-3 rounded-lg bg-orange-500 hover:bg-orange-600 font-bold text-white transition"
        >
          {loading ? "Logging in..." : "LOGIN"}
        </button>

      </form>

    </div>
  );
}