import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const logout = async () => {
        const response = await fetch(
            "http://localhost:9090/logout/logout.php",
            {
                method: "GET",
                credentials: "include",
            }
        );

        const data = await response.json();

        if (data.success === "true") {
            navigate("/login");
        }
    };

    const toggleMenu = () => {
        setOpen(!open);
    };
    return (
        <>
            <nav className="flex justify-center items-center h-[80px] absolute w-full font-semibold text-xl top-0 z-50">
                <div className="flex justify-center md:justify-between items-center w-full mx-[150px]">
                    <div>
                        <a href="/" className="text-2xl font-bold md:text-3xl">
                            LibroSys
                        </a>
                    </div>

                    <div className="absolute z-50 md:hidden right-8 top-6">
                        <button
                            type="button"
                            onClick={toggleMenu}
                            className="text-black hovers:text-gray-400 focus:outline-none focus:text-gray-400"
                        >
                            <svg
                                className="w-10 h-10 fill-current"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                            >
                                <path d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
                            </svg>
                        </button>
                    </div>

                    {open && (
                        <div className="md:hidden absolute top-[80px] w-full h-[830px] flex justify-center items-center bg-black">
                            <ul className="flex flex-col items-center justify-center gap-4 text-white">
                                <li className="text-2xl font-bold">
                                    <a href="/">Home</a>
                                </li>
                                <li className="text-2xl font-bold">
                                    <a href="/books">Books</a>
                                </li>
                                <li className="text-2xl font-bold">
                                    <a href="/cart">Cart</a>
                                </li>
                                <li className="text-2xl font-bold">
                                    <a href="/account">Account</a>
                                </li>
                                <li className="text-2xl font-bold">
                                    <button onClick={logout}>Logout</button>
                                </li>
                            </ul>
                        </div>
                    )}

                    <ul className="hidden gap-4 md:flex">
                        <li>
                            <a href="/">Home</a>
                        </li>
                        <li>
                            <a href="/books">Books</a>
                        </li>
                        <li>
                            <a href="/cart">Cart</a>
                        </li>
                        <li>
                            <a href="/account">Account</a>
                        </li>
                        <li>
                            <button onClick={logout}>Logout</button>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
}
