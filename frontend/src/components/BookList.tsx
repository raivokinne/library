import { Book } from "../types";

interface Props {
    book: Book;
}

export default function BookList({ book }: Props) {
    return (
        <>
            <article
                key={Math.random()}
                className="p-6 mb-4 grid place-items-center bg-white rounded-md shadow-md w-[300px] border border-gray-200 gap-4 h-[700px] lg:w-[500px] lg:h-[900px]"
            >
                <h2 className="mb-2 text-3xl font-bold border-b-2 border-black text-center">
                    {book.title}
                </h2>

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
