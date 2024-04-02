import Navbar from "../components/ui/Navbar";
import BookList from "../components/BookList";
import useFetchBooks from "../hooks/useFetchBooks";

export default function Books() {
    const {
        data: booksData,
        error: booksError,
        loading: booksLoading,
    } = useFetchBooks();

    if (booksError) {
        console.error("Books error:", booksError);
        return <div>Error: {booksError?.message}</div>;
    }

    if (booksLoading || !booksData) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Navbar />
            <section className="grid place-items-center grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 mt-[8rem]">
                {booksData.books.length > 0 ? (
                    booksData.books.map((book) => (
                        <article key={book.book_id}>
                            <BookList key={`${book.book_id}`} book={book} />
                        </article>
                    ))
                ) : (
                    <div>No books found</div>
                )}
            </section>
        </>
    );
}
