import { useState } from "react";
import { useEffect } from "react";
import { User } from "../types";

export default function useFetchUsers() {
    const [data, setData] = useState<User[]>([]);
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchUser() {
            setLoading(true);
            try {
                const response = await fetch(
                    "http://localhost:9090/users/user.php",
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

        fetchUser();
    }, []);

    return { data, error, loading };
}
