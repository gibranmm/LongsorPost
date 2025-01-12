import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../Redux/authSlice";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `https://api-disasters-reports.vercel.app/api/login`,
        form,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const { user, token, message } = response.data;

        console.log("Token diterima:", token); // debug token
        localStorage.setItem("auth_token", token); // simpan token
        localStorage.setItem("auth_user", JSON.stringify(user)); // simpan user
        dispatch(login({ user, token })); // set redux

        Swal.fire({
          icon: "success",
          title: "Login Berhasil",
          text: message,
        });
        navigate("/admin");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Gagal",
        text: error.response?.data?.message || "Silahkan coba lagi!",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-96">
        <h1 className="font-bold text-2xl text-center mb-6">Login guys</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-emerald-700"
              required
              name="email"
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-emerald-700"
              required
              name="password"
              value={form.password}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center mb-4">
            <button
              type="submit"
              className="bg-emerald-700 text-white px-4 py-2 rounded hover:bg-emerald-900 transition duration-200"
            >
              Login
            </button>
          </div>
          <p className="text-sm text-gray-600">
            Belum punya akun?{" "}
            <Link to="/register" className="text-emerald-800 hover:underline">
              Register disini
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
