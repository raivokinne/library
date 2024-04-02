import Navbar from "../components/ui/Navbar";

export default function Home() {
    return (
        <>
            <Navbar />
            <section className="relative flex items-center justify-center h-screen">
                <article className="absolute z-20 grid gap-4 transform -translate-x-1/2 -translate-y-1/2 place-items-center top-1/2 left-1/2">
                    <h1 className="text-4xl font-bold sm:text-7xl md:text-8xl lg:text-9xl">
                        LibroSys
                    </h1>
                    <h3 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl">
                        Library Management System
                    </h3>
                    <p className="sm:text-xl md:text-2xl lg:text-3xl">
                        Simplify book management with LibroSys.
                    </p>
                </article>
            </section>
        </>
    );
}
