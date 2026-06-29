import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const login = async () => {
    try {
      const result = await signInWithPopup(auth, provider);

      const response = await api.post("/auth/login", {
        name: result.user.displayName,
        email: result.user.email,
        provider: "google",
      });

      localStorage.setItem("user", JSON.stringify(response.data));

      if (response.data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      console.log(err);
      alert("Login Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-600 via-blue-700 to-indigo-900 flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10">

        <div className="text-center">

          <div className="text-6xl mb-4">
            🌦️
          </div>

          <h1 className="text-4xl font-extrabold text-slate-800">
            WeatherGuard
          </h1>

          <p className="text-slate-500 mt-3">
            Secure Invite-only Weather Alert Platform
          </p>

        </div>

        <div className="mt-10">

          <button
            onClick={login}
            className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white rounded-xl py-4 font-semibold text-lg shadow-lg hover:shadow-xl"
          >
            Continue with Google
          </button>

        </div>

        <div className="mt-10 border-t pt-6 text-center">

          <p className="text-sm text-gray-500">
            ✔ Google Authentication
          </p>

          <p className="text-sm text-gray-500 mt-2">
            ✔ Admin Approval Workflow
          </p>

          <p className="text-sm text-gray-500 mt-2">
            ✔ Telegram Weather Alerts
          </p>

        </div>

      </div>

    </div>
  );
}