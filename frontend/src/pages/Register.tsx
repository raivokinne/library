import { FormEvent } from "react";

type ResponseData = {
    success: string;
};

export default function Register() {
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);
        const name = formData.get("name");
        const email = formData.get("email");
        const password = formData.get("password");
        const confirm_password = formData.get("confirm_password");

        const response = await fetch(
            "http://localhost:9090/register/register.php",
            {
                method: "POST",
                body: JSON.stringify({
                    name,
                    email,
                    password,
                    confirm_password,
                }),
                credentials: "include",
            },
        );

        const data: ResponseData = await response.json();

        console.log(data);

        if (response.status === 200) {
            window.location.href = "/";
        }
    };
    return (
        <>
            <section className="flex items-center justify-center w-full h-screen">
                <form
                    onSubmit={handleSubmit}
                    className="flex justify-center items-center w-[600px] h-[800px]"
                >
                    <fieldset className="grid gap-4">
                        <legend className="w-full mb-8 text-3xl font-bold text-center">
                            Register
                        </legend>
                        <label htmlFor="name" className="grid gap-4">
                            <span className="font-bold">Name</span>
                            <input
                                type="text"
                                name="name"
                                placeholder="Username"
                                className="w-[300px] p-2 px-2 border-2 border-black rounded-lg"
                            />
                        </label>
                        <label htmlFor="email" className="grid gap-4">
                            <span className="font-bold">Email</span>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                className="w-[300px] p-2 px-2 border-2 border-black rounded-lg"
                            />
                        </label>
                        <label htmlFor="password" className="grid gap-4">
                            <span className="font-bold">Password</span>
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                className="w-[300px] p-2 px-2 border-2 border-black rounded-lg"
                            />
                        </label>
                        <label
                            htmlFor="confirm_password"
                            className="grid gap-4"
                        >
                            <span className="font-bold">Confirm Password</span>
                            <input
                                type="password"
                                name="confirm_password"
                                placeholder="Confirm Password"
                                className="w-[300px] p-2 px-2 border-2 border-black rounded-lg"
                            />
                        </label>
                        <button
                            type="submit"
                            className="w-[300px] p-2 px-2 rounded-lg bg-black text-white"
                        >
                            Register
                        </button>
                        <div className="flex justify-center w-full gap-4">
                            <p>Already have an account? </p>
                            <a href="/login" className="text-blue-500">
                                Login
                            </a>
                        </div>
                    </fieldset>
                </form>
            </section>
        </>
    );
}
