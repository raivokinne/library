import { Book } from "../types";

interface Props {
    book: Book;
}

export default function BookList({ book }: Props) {
    return (
        <>
            <article
                key={Math.random()}
                className="p-6 mb-4 grid place-items-center bg-white rounded-lg shadow-md w-[500px] border-2 border-gray-200 gap-4 h-[900px]"
            >
                <h2 className="mb-2 text-2xl font-bold">{book.title}</h2>
                <h3 className="mb-2 text-lg font-semibold">{book.name}</h3>
                <p className="mb-2 text-gray-600">
                    Publication Year: {book.publication_year}
                </p>

                {book.image && (
                    <img
                        src={"http://localhost:9090/books/" + book.image}
                        alt={book.title}
                        className="object-cover w-full h-full"
                    />
                )}
                <a
                    className="grid w-full px-4 py-2 mt-4 text-white bg-black rounded place-items-center"
                    href={`/books/${book.book_id}`}
                >
                    View
                </a>
            </article>
        </>
    );
}
