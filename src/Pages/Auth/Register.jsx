import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleCancel = () => {
    setForm({ name: "", email: "", password: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `https://api-disasters-reports.vercel.app/api/register`,
        form,
        {
          headers: {
            "Conctent-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Registrasi Berhasil",
          text: response.data.message,
        });
        setForm({
          name: "",
          email: "",
          password: "",
        });
        navigate("/");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Registrasi Gagal",
        text: error.response?.data?.message || "Silahkan coba lagi!",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-96">
        <h1 className="font-bold text-2xl text-center mb-6">
          Register dulu guys
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Nama
            </label>
            <input
              type="text"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-emerald-700"
              required
              name="name"
              value={form.name}
              onChange={handleChange}
            />
          </div>
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
              Register
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="text-gray-500 px-4 py-2 hover:text-gray-700"
            >
              Batal
            </button>
          </div>
          <p className="text-sm text-gray-600">
            Sudah punya akun?{" "}
            <Link to="/" className="text-emerald-800 hover:underline">
              Login disini
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
