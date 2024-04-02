import { FormEvent } from "react";

type ResponseData = {
    success: string;
};

export default function Login() {
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);
        const email = formData.get("email");
        const password = formData.get("password");

        const response = await fetch("http://localhost:9090/login/login.php", {
            method: "POST",
            body: JSON.stringify({ email, password }),
            credentials: "include",
        });

        const data: ResponseData = await response.json();

        if (data.success == "true") {
            window.location.href = "/";
        }
    };
    return (
        <>
            <section className="flex items-center justify-center h-screen">
                <form
                    onSubmit={handleSubmit}
                    className="flex items-center justify-center"
                >
                    <fieldset className="grid gap-4">
                        <legend className="w-full mb-8 text-3xl font-bold text-center">
                            Login
                        </legend>
                        <label htmlFor="email" className="grid gap-4">
                            <span className="font-bold">Email</span>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                className="w-[300px] border-2 border-black rounded-md p-2 px-2"
                            />
                        </label>
                        <label htmlFor="password" className="grid gap-4">
                            <span className="font-bold">Password</span>
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                className="w-[300px] border-2 border-black rounded-md p-2 px-2"
                            />
                        </label>
                        <button
                            type="submit"
                            className="w-[300px] bg-black text-white p-2 px-2"
                        >
                            Login
                        </button>
                        <div className="grid w-full gap-4 place-items-center">
                            <span>Don't have an account?</span>
                            <a href="/register" className="text-blue-500">
                                Register
                            </a>
                        </div>
                    </fieldset>
                </form>
            </section>
        </>
    );
}
