import { useEffect, useMemo, useState } from "react";
import api from "../services/api";
import { Navigate } from "react-router-dom";

interface User {
  _id: string;
  name: string;
  email: string;
  status: string;
}



export default function AdminDashboard() {

const user = JSON.parse(localStorage.getItem("user") || "{}");

if (user.role !== "admin") {
  return <Navigate to="/" />;
}

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  

  const loadUsers = async () => {
    try {
      const res = await api.get("/admin/pending-users");
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const approve = async (id: string) => {
    await api.patch(`/admin/approve/${id}`);
    alert("✅ User Approved Successfully");
    loadUsers();
  };

  const totalPending = useMemo(() => users.length, [users]);

  return (
    <div className="min-h-screen bg-slate-100">

      {/* Header */}

      <div className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white shadow-lg">

        <div className="max-w-7xl mx-auto px-8 py-8 flex justify-between items-center">

          <div>
            <h1 className="text-4xl font-bold">
              WeatherGuard Admin
            </h1>

            <p className="text-blue-100 mt-2">
              Manage weather alert access requests
            </p>
          </div>

          <div className="bg-white/20 rounded-xl px-6 py-3">
            <p className="text-sm">Administrator</p>
          </div>

        </div>

      </div>

      <div className="max-w-7xl mx-auto p-8">

        {/* Stats */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

          <div className="bg-white rounded-2xl shadow-lg p-6">

            <p className="text-gray-500">
              Pending Requests
            </p>

            <h2 className="text-5xl font-bold text-orange-500 mt-3">
              {totalPending}
            </h2>

          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">

            <p className="text-gray-500">
              Weather Alerts
            </p>

            <h2 className="text-4xl font-bold text-blue-600 mt-3">
              Active
            </h2>

          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">

            <p className="text-gray-500">
              Telegram Bot
            </p>

            <h2 className="text-4xl font-bold text-green-600 mt-3">
              Online
            </h2>

          </div>

        </div>

        {/* Table */}

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

          <div className="px-6 py-5 border-b">

            <h2 className="text-2xl font-bold">
              Pending User Requests
            </h2>

          </div>

          {loading ? (

            <div className="p-10 text-center text-gray-500">
              Loading...
            </div>

          ) : users.length === 0 ? (

            <div className="p-10 text-center text-green-600 font-semibold">
              🎉 No Pending Requests
            </div>

          ) : (

            <table className="w-full">

              <thead className="bg-slate-100">

                <tr>

                  <th className="text-left px-6 py-4">
                    User
                  </th>

                  <th className="text-left px-6 py-4">
                    Email
                  </th>

                  <th className="text-left px-6 py-4">
                    Status
                  </th>

                  <th className="text-left px-6 py-4">
                    Action
                  </th>

                </tr>

              </thead>

              <tbody>

                {users.map((user) => (

                  <tr
                    key={user._id}
                    className="border-t hover:bg-slate-50 transition"
                  >

                    <td className="px-6 py-5">

                      <div className="flex items-center gap-4">

                        <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">

                          {user.name.charAt(0).toUpperCase()}

                        </div>

                        <div>

                          <p className="font-semibold">
                            {user.name}
                          </p>

                        </div>

                      </div>

                    </td>

                    <td className="px-6 py-5">
                      {user.email}
                    </td>

                    <td className="px-6 py-5">

                      <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-sm font-semibold">
                        Pending
                      </span>

                    </td>

                    <td className="px-6 py-5">

                      <button
                        onClick={() => approve(user._id)}
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition"
                      >
                        Approve
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          )}

        </div>

      </div>

    </div>
  );
}