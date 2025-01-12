import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { logout } from "../Redux/authSlice";

const AdminLayout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
        Swal.fire({
            icon: "success",
            title: "Berhasil Logout",
        });
        navigate("/");
    };

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col">
            {/* Navbar */}
            <nav className="bg-emerald-700 text-white py-4 px-6">
                <div className="flex justify-between items-center">
                    <h2 className="font-bold text-xl mr-28">LongsorPost</h2>

                    {/* Navigation Links */}
                    <ul className="flex space-x-4 items-center">
                        <li>
                            <a
                                href="/admin"
                                className="hover:bg-emerald-800 px-4 py-2 rounded-md ml-2"
                            >
                                HOME
                            </a>
                        </li>
                        <li>
                            <a
                                href="/admin/longsor"
                                className="hover:bg-emerald-800 px-4 py-2 rounded-md"
                            >
                                POST
                            </a>
                        </li>
                    </ul>

                    {/* User and Logout */}
                    <div className="flex items-center space-x-4">
                        <p className="px-4 py-2">
                            Hello, {user.name}
                        </p>
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 px-4 py-2 rounded-md hover:bg-red-700"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </nav>

            {/* Content Area */}
            <div className="flex-1 flex flex-col">
                {/* Main Content */}
                <main className="flex-grow p-4 bg-blue-50">
                    <Outlet />
                </main>

                {/* Footer */}
                <footer className="bg-emerald-700 text-white p-4 text-center">
                    &copy; 2025 LongsorPost
                </footer>
            </div>
        </div>
    );
};

export default AdminLayout;
