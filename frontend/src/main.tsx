import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import Home from "./pages/Home";
import Books from "./pages/Books";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Account from "./pages/Account";
import Cart from "./pages/Cart";
import { Route, Routes } from "react-router-dom";
import "./index.css";
import EditBook from "./pages/EditBook";
import ShowBook from "./pages/ShowBook";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/books" element={<Books />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/account" element={<Account />} />
                <Route path="/books/:bookId" element={<ShowBook />} />
                <Route path="/books/:bookId/edit" element={<EditBook />} />
                <Route path="*" element={<div>404</div>} />
            </Routes>
        </Router>
    </React.StrictMode>
);
