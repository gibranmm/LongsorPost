import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LongsorList = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("auth_token");
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        } else {
            console.error("Token tidak ditemukan. arahkan ke halaman login.");
            navigate("/");
        }

        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `https://api-disasters-reports.vercel.app/api/disasters`
                );
                setData(response.data.data || []);
            } catch (error) {
                console.error("Error fetching data:", error.response?.data || error.message);
                if (error.response?.status === 401) {
                    console.error("Unauthorized. Redirecting to login.");
                    navigate("/");
                }
            }
        };

        fetchData();
    }, [navigate]);

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        });
    };

    const truncateText = (text, maxLength) => {
        return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
    };

    return (
        <div className="container mx-auto">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {Array.isArray(data) && data.length > 0 ? (
            data.map((item) => (
                <div
                    key={item.id}
                    className="bg-white p-4 rounded-lg shadow-lg border border-emerald-700 transition-transform transform hover:scale-105 hover:shadow-xl"
                >
                    <h4 className="font-bold text-lg text-emerald-800">{item.reporterName}</h4>
                    <p className="text-sm text-gray-600">{item.location}</p>
                    <p className="text-sm text-emerald-600 mt-2">{item.disasterType}</p>
                    <p className="text-sm text-gray-700 mt-2">{truncateText(item.description, 127)}</p>
                    <p className="text-xs text-gray-500 mt-2">{formatDate(item.date)}</p>
                </div>
            ))
        ) : (
            <div className="col-span-full text-center text-gray-500">Yah belum ada postingan nih!</div>
        )}
    </div>
</div>
    );
};

export default LongsorList;
