import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

interface User {
  name: string;
  email: string;
  status: string;
  telegramChatId: string;
}

interface Weather {
  city: string;
  temperature: number;
  humidity: number;
  condition: string;
}

export default function Dashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState<User>(
    JSON.parse(localStorage.getItem("user") || "{}")
  );

  const [weather, setWeather] = useState<Weather | null>(null);

  useEffect(() => {
    loadWeather();
  }, []);

  const loadWeather = async () => {
    try {
      const res = await api.get("/weather");
      setWeather(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
  const interval = setInterval(() => {
    window.location.reload();
  }, 5000);

  return () => clearInterval(interval);
}, []);

  const requestAccess = async () => {
    try {
      const res = await api.post("/auth/request-access", {
        email: user.email,
      });

      setUser(res.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Access Request Sent");
    } catch (err) {
      console.log(err);
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const badgeColor =
    user.status === "approved"
      ? "bg-green-100 text-green-700"
      : user.status === "pending"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-gray-200 text-gray-700";

  return (
    <div className="min-h-screen bg-slate-100">

      {/* Header */}

      <div className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white">

        <div className="max-w-7xl mx-auto px-8 py-8 flex justify-between items-center">

          <div>

            <h1 className="text-4xl font-bold">
              WeatherGuard
            </h1>

            <p className="text-blue-100 mt-2">
              Welcome back, {user.name}
            </p>

          </div>

          <button
            onClick={logout}
            className="bg-white text-blue-700 px-5 py-2 rounded-xl font-semibold hover:bg-slate-100"
          >
            Logout
          </button>

        </div>

      </div>

      <div className="max-w-7xl mx-auto p-8">

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* Status */}

          <div className="bg-white rounded-2xl shadow-lg p-6">

            <h3 className="text-gray-500">
              Account Status
            </h3>

            <span
              className={`inline-block mt-4 px-4 py-2 rounded-full font-semibold ${badgeColor}`}
            >
              {user.status}
            </span>

            {user.status === "new" && (
              <button
                onClick={requestAccess}
                className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl"
              >
                Request Access
              </button>
            )}

          </div>

          {/* Telegram */}

         {/* Telegram */}

<div className="bg-white rounded-2xl shadow-lg p-6">

  <h3 className="text-gray-500 text-lg font-semibold">
    🤖 Telegram
  </h3>

  <p className="mt-4">
    {user.telegramChatId ? (
      <span className="text-green-600 font-bold">
        ✅ Connected
      </span>
    ) : (
      <span className="text-red-600 font-bold">
        ❌ Not Connected
      </span>
    )}
  </p>

  <button
    onClick={() =>
      window.open(
        "https://t.me/weatherguard_Vaibhav_bot",
        "_blank"
      )
    }
    className="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
  >
    {user.telegramChatId ? "Open Telegram Bot" : "Connect Telegram"}
  </button>

  {!user.telegramChatId && (
    <p className="text-sm text-gray-500 mt-4">
      Click the button, open the bot, and press <strong>Start</strong> to connect your Telegram account.
    </p>
  )}

</div>

          {/* Alerts */}

          <div className="bg-white rounded-2xl shadow-lg p-6">

            <h3 className="text-gray-500">
              Alerts
            </h3>

            <p className="mt-4 text-blue-600 font-bold">
              Automatic
            </p>

          </div>

          {/* Weather */}

          <div className="bg-white rounded-2xl shadow-lg p-6">

            <h3 className="text-gray-500">
              Weather
            </h3>

            {weather && (
              <>
                <p className="text-2xl font-bold mt-4">
                  {weather.temperature}°C
                </p>

                <p className="mt-2">
                  {weather.city}
                </p>

                <p className="mt-2 text-gray-600">
                  {weather.condition}
                </p>
              </>
            )}

          </div>

        </div>

        {/* Weather Details */}

        {weather && (

          <div className="bg-white rounded-2xl shadow-lg mt-8 p-8">

            <h2 className="text-2xl font-bold mb-6">
              Today's Weather
            </h2>

            <div className="grid md:grid-cols-3 gap-6">

              <div className="bg-blue-50 rounded-xl p-5">

                <h3 className="text-gray-500">
                  Temperature
                </h3>

                <p className="text-3xl font-bold mt-3">
                  🌡 {weather.temperature}°C
                </p>

              </div>

              <div className="bg-green-50 rounded-xl p-5">

                <h3 className="text-gray-500">
                  Humidity
                </h3>

                <p className="text-3xl font-bold mt-3">
                  💧 {weather.humidity}%
                </p>

              </div>

              <div className="bg-yellow-50 rounded-xl p-5">

                <h3 className="text-gray-500">
                  Condition
                </h3>

                <p className="text-3xl font-bold mt-3">
                  ☁ {weather.condition}
                </p>

              </div>

            </div>

          </div>

        )}

      </div>

    </div>
  );
}
