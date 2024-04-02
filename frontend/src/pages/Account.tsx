import CreateBook from "../components/CreateBook";
import Navbar from "../components/ui/Navbar";
import UserList from "../components/UserList";
import useFetchUsers from "../hooks/useFetchUsers";

export default function Account() {
    const { data, error, loading } = useFetchUsers();

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <>
            <Navbar />
            <div className="container mx-auto px-4 py-8 mt-12">
                {loading ? (
                    <div>Loading...</div>
                ) : data.length > 0 ? (
                    <div>
                        {data.map((user) => (
                            <>
                                <UserList user={user} />
                                {user.is_admin === 1 && <CreateBook />}
                            </>
                        ))}
                    </div>
                ) : (
                    <div>No users found</div>
                )}
            </div>
        </>
    );
}
