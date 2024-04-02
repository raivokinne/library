import { Book } from "../types";

interface Props {
    book: Book;
}

export default function CartList({ book }: Props) {
    return (
        <article className="p-6 mb-4 bg-white rounded-lg shadow-md">
            <h2 className="mb-2 text-xl font-semibold">{book.title}</h2>
            <h3 className="mb-2 text-lg">{book.name}</h3>
            <p className="mb-1 text-gray-600">
                Publication Year: {book.publication_year}
            </p>
            <p className="mb-1 text-gray-600">
                Return Date: {book.return_date}
            </p>
            {book.image && (
                <img
                    src={"http://localhost:9090/books/" + book.image}
                    alt={book.title}
                    className="object-cover w-full h-64"
                />
            )}
            <p className="mb-1 text-gray-600">Quantity: {book.quantity}</p>
        </article>
    );
}
