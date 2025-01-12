import Swal from "sweetalert2";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Longsor = () => {
    const [data, setData] = useState([]);
    const [form, setForm] = useState({
        reporterName: "",
        location: "",
        disasterType:"",
        description: "",
        date: "",
    });

    const [editId, setEditId] = useState(null);
    const navigate = useNavigate();

    useEffect( () => {
        const token = localStorage.getItem("auth_token");
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        } else {
            console.error("Token tidak ditemukan. arahkan ke halaman login.");
            navigate("/");
        }
    }, [navigate]);

    const handleCancel = () => {
        setForm({
            reporterName: "",
            location: "",
            disasterType: "",
            description: "",
            date: ""
        })
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            reporterName: form.reporterName,
            location: form.location,
            disasterType: form.disasterType,
            description: form.description,
            date: new Date(form.date).toISOString(),
        }
        console.log("Payload create:", payload)
        try {
            if (editId) {
                const response = await axios.put(
                    `https://api-disasters-reports.vercel.app/api/disasters/${editId}`,
                    payload
                )
                console.log("Response Update:", response.data)
                setData((prevData) =>
                    prevData.map((item) =>
                        item.id === editId ? response.data.data : item
                    )
                )
                Swal.fire({
                    title: "Berhasil",
                    text: "Data berhasil diperbarui!",
                    icon: "success",
                    confirmButtonText: "OK",
                })
            } else {
                const response = await axios.post(
                    `https://api-disasters-reports.vercel.app/api/disasters`,
                    payload
                )
                console.log("Response Update:", response.data)
                setData((prevData) => [...prevData, response.data.data]);
                Swal.fire({
                    title: "Berhasil",
                    text: "Data berhasil ditambahkan!",
                    icon: "success",
                    confirmButtonText: "OK",
                })
            }
            setForm({
                reporterName: "",
                location: "",
                disasterType: "",
                description: "",
                date: ""
            })
            setEditId(null)
        } catch (error) {
            console.error("Error submiting data:", error.response?.data || error.message)
            Swal.fire({
                title: "Gagal",
                text: error.response?.data?.message || "Terjadi kesalahan!",
                icon: "error",
                confirmButtonText: "OK",
            })
            if (error.response?.status === 401) {
                console.error("Unauthorized. Redirecting to login.")
                navigate("/")
            }
        }
    }

    const handleEdit = (item) => {
        setEditId(item.id)
        setForm({
            reporterName: item.reporterName,
            location: item.location,
            disasterType: item.disasterType,
            description: item.description,
            date: item.date.slice(0, 10),
        })
    }

    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: "Hapus Data",
            text: "Apakah Anda yakin ingin menghapus data laporan ini?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya, hapus",
            cancelButtonText: "Batal"
        })

        if (confirm.isConfirmed) {
            try {
                await axios.delete(`https://api-disasters-reports.vercel.app/api/disasters/${id}`)
                setData(data.filter((item) => item.id !== id))
                Swal.fire({
                    title: "Berhasil",
                    text: "Data berhasil dihapus!",
                    icon: "success",
                    confirmButtonText: "OK",
                })
            } catch (error) {
                Swal.fire({
                    title: "Gagal",
                    text: error.response?.data?.message || "Terjadi kesalahan!",
                    icon: "error",
                    confirmButtonText: "OK",
                })
            }
        }
    }

    useEffect( () => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://api-disasters-reports.vercel.app/api/disasters`)
                console.log("Fetched data:", response.data)
                setData(response.data.data || []);
            } catch (error) {
                console.error("Error fetching data:", error.response?.data || error.message)
                if (error.response?.status === 401) {
                    console.error("Unauthorized. Redirecting to login.")
                    navigate("/")
                }
            }
        }
        fetchData()
    }, [navigate])

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        })
    }

    return (
        <div className="p-4 bg-white flex-grow rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Post Tanah Longsor</h2>
            <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded shadow-md bg-white">
                <div className="mb-6">
                    <label 
                        className="block text-sm font-medium text-gray-700" 
                        htmlFor="reporterName">
                        Nama
                    </label>
                    <input 
                        type="text" 
                        name="reporterName"
                        value={form.reporterName}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-emerald-700"
                    />
                </div> 
                <div className="mb-4">
                    <label 
                        className="block text-sm font-medium text-gray-700" 
                        htmlFor="location">
                        Lokasi
                    </label>
                    <input 
                        type="text" 
                        name="location"
                        value={form.location}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-emerald-700"
                    />
                </div> 
                <div className="mb-4">
                    <label 
                        className="block text-sm font-medium text-gray-700" 
                        htmlFor="disasterType">
                        Skala Kejadian
                    </label>
                    <input 
                        type="text" 
                        name="disasterType"
                        value={form.disasterType}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-emerald-700"
                    />
                </div> 
                <div className="mb-4">
                    <label 
                        className="block text-sm font-medium text-gray-700" 
                        htmlFor="description">
                        Deskripsi
                    </label>
                    <input 
                        type="text" 
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-emerald-700"
                    />
                </div> 
                <div className="mb-4">
                    <label 
                        className="block text-sm font-medium text-gray-700" 
                        htmlFor="date">
                        Tanggal
                    </label>
                    <input 
                        type="date" 
                        name="date"
                        value={form.date}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-emerald-700"
                    />
                </div> 
                <div className="mt-6">
                    <button type="submit" className="bg-blue-500 transition duration-200 hover:bg-blue-700 text-white px-4 py-2 rounded">
                        {editId? "Update" : "Submit"}
                    </button>
                    <button type="button" onClick={handleCancel} className="bg-gray transition duration-200 text-black px-4 py-2 rounded"> 
                        Batal
                    </button>
                </div>
            </form>

            <h2 className="text-2xl font-bold mb-4">List Post</h2>
            <table className="table-auto w-full border border-gray-300 shadow-md rounded-lg overflow-hidden">
                <thead>
                    <tr className="bg-gray-300">
                        <th className="border px-4 py-2">No.</th>
                        <th className="border px-4 py-2">Nama</th>
                        <th className="border px-4 py-2">Lokasi</th>
                        <th className="border px-4 py-2">Skala Kejadian</th>
                        <th className="border px-4 py-2">Deskripsi</th>
                        <th className="border px-4 py-2">Tanggal</th>
                        <th className="border px-4 py-2">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(data) && data.map((item, index) => (
                        <tr key={item.id} className={index % 2 === 1 ? "bg-gray=100" : "bg-white"}>
                            <td className="border px-4 py-2 text-center">{index +1}</td>
                            <td className="border px-4 py-2 text-center">{item.reporterName}</td>
                            <td className="border px-4 py-2 text-center">{item.location}</td>
                            <td className="border px-4 py-2 text-center">{item.disasterType}</td>
                            <td className="border px-4 py-2 text-center">{item.description}</td>
                            <td className="border px-4 py-2 text-center">{formatDate(item.date)}</td>
                            <td className="border px-4 py-2 text-center">
                                <button onClick={ () => handleEdit(item)} className="px-2 py-1 bg-yellow-500 text-white hover:bg-yellow-700 transition duration-200 mr-2 rounded">
                                    Edit
                                </button>
                                <button onClick={ () => handleDelete(item.id)} className="px-2 py-1 bg-red-600 text-white hover:bg-red-900 transition duration-200 mr-2 rounded">
                                    Hapus
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Longsor;