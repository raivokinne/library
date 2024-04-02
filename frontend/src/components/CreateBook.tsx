import { FormEvent, useState } from "react";

export default function CreateBook() {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [publicationYear, setPublicationYear] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState<File | null>(null);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", title);
        formData.append("author", author);
        formData.append("publication_year", publicationYear);
        formData.append("image", image as File);
        formData.append("availability", "Available");
        formData.append("description", description);

        const response = await fetch("http://localhost:9090/books/books.php", {
            method: "POST",
            body: formData,
            credentials: "include",
        });

        const data = await response.json();
        console.log(data);

        setTitle("");
        setAuthor("");
        setPublicationYear("");
        setImage(null);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex items-center justify-center w-full"
            encType="multipart/form-data"
        >
            <fieldset className="grid w-full max-w-md gap-2 p-6 bg-white rounded-lg shadow-md">
                <legend className="mb-4 text-lg font-semibold">
                    Create Book
                </legend>
                <div className="flex flex-col mb-4">
                    <label htmlFor="title" className="mb-1 text-gray-700">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title"
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="flex flex-col mb-4">
                    <label htmlFor="author" className="mb-1 text-gray-700">
                        Author
                    </label>
                    <input
                        type="text"
                        id="author"
                        name="author"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
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
                        onChange={(e) => setPublicationYear(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="flex flex-col gap-4">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={description}
                        className="px-4 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:border-blue-500 h-[150px]"
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                </div>
                <div className="flex flex-col mb-4">
                    <label htmlFor="image">Image</label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        onChange={(e) => {
                            const selectedFile = e.target.files
                                ? e.target.files[0]
                                : null;
                            if (selectedFile) {
                                setImage(selectedFile);
                            }
                        }}
                    />
                </div>
                <button
                    type="submit"
                    className="px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                    Create
                </button>
            </fieldset>
        </form>
    );
}
