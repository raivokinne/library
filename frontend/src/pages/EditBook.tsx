import { useParams } from "react-router-dom";
import { Book } from "../types";
import { FormEvent, useEffect, useState } from "react";
import Navbar from "../components/ui/Navbar";

type Data = {
    success: boolean;
    book: Book;
} | null;

export default function EditBook() {
    const [data, setData] = useState<Data>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const { bookId } = useParams();
    const [title, setTitle] = useState(() => {
        if (!data) {
            return "";
        }
        return data.book.name;
    });
    const [author, setAuthor] = useState(() => {
        if (!data) {
            return "";
        }
        return data.book.name;
    });
    const [publicationYear, setPublicationYear] = useState(() => {
        if (!data) {
            return "";
        }
        return data.book.publication_year;
    });

    useEffect(() => {
        async function fetchBook() {
            setLoading(true);
            try {
                const response = await fetch(
                    `http://localhost:9090/bookedit/book.php?book_id=${bookId}`,
                    {
                        method: "GET",
                        credentials: "include",
                    }
                );
                const data = await response.json();
                setData(data);
            } catch (error) {
                setError(error as Error);
            } finally {
                setLoading(false);
            }
        }

        fetchBook();
    }, [bookId]);

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const response = await fetch(
            `http://localhost:9090/bookedit/book.php`,
            {
                method: "POST",
                body: JSON.stringify({
                    title,
                    name: author,
                    publication_year: publicationYear,
                    book_id: bookId,
                    author_id: data?.book.author_id,
                }),
                credentials: "include",
            }
        );
        const responseData = await response.json();
        if (responseData.success) {
            setTitle("");
            setAuthor("");
            setPublicationYear("");
            setData(null);
        } else {
            console.log(responseData.error);
        }
    };

    return (
        <>
            <Navbar />
            <section className="grid h-screen place-items-center">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <form
                        onSubmit={handleSubmit}
                        className="flex items-center justify-center w-full"
                    >
                        <fieldset className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
                            <legend className="mb-4 text-lg font-semibold">
                                Edit Book
                            </legend>
                            {data && data.book && (
                                <>
                                    <div className="flex flex-col mb-4">
                                        <label
                                            htmlFor="title"
                                            className="mb-1 text-gray-700"
                                        >
                                            Title
                                        </label>
                                        <input
                                            type="text"
                                            id="title"
                                            name="title"
                                            value={title}
                                            onChange={(e) =>
                                                setTitle(e.target.value)
                                            }
                                            placeholder="Title"
                                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                        />
                                    </div>
                                    <div className="flex flex-col mb-4">
                                        <label
                                            htmlFor="author"
                                            className="mb-1 text-gray-700"
                                        >
                                            Author
                                        </label>
                                        <input
                                            type="text"
                                            id="author"
                                            name="author"
                                            value={author}
                                            onChange={(e) =>
                                                setAuthor(e.target.value)
                                            }
                                            placeholder="Author"
                                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                        />
                                    </div>
                                    <div className="flex flex-col mb-4">
                                        <label
                                            htmlFor="publication_year"
                                            className="mb-1 text-gray-700"
                                        >
                                            Publication Year
                                        </label>
                                        <input
                                            type="number"
                                            id="publication_year"
                                            name="publication_year"
                                            value={publicationYear}
                                            onChange={(e) =>
                                                setPublicationYear(
                                                    e.target.value
                                                )
                                            }
                                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                        />
                                    </div>
                                </>
                            )}
                            <button
                                type="submit"
                                className="px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                            >
                                Update
                            </button>
                        </fieldset>
                    </form>
                )}
            </section>
        </>
    );
}
