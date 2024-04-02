import { useState, useEffect } from "react";
import { Book } from "../types";

type Data = {
    books: Book[];
};

export default function useFetchBooks() {
    const [data, setData] = useState<Data>({ books: [] });
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchBooks() {
            setLoading(true);
            try {
                const response = await fetch(
                    "http://localhost:9090/books/books.php",
                    {
                        method: "GET",
                        credentials: "include",
                    }
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch books");
                }

                const responseData = await response.json();
                setData(responseData);
            } catch (error) {
                setError(error as Error);
            } finally {
                setLoading(false);
            }
        }

        fetchBooks();
    }, []);

    return { data, error, loading };
}
