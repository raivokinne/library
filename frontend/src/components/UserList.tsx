import { User } from "../types";

interface Props {
    user: User;
}

export default function UserList({ user }: Props) {
    return (
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <h1 className="text-xl font-bold mb-2">{user.name}</h1>
            <p className="text-gray-700 mb-1">{user.email}</p>
            <p className="text-gray-700">{user.is_admin === 1 ? "Admin" : "User"}</p>
        </div>
    );
}

