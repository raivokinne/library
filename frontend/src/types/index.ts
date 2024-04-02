export type Book = {
    book_id: number;
    author_id: number;
    title: string;
    name: string;
    publication_year: string;
    availability: string;
    quantity: number;
    return_date: string;
    image: File;
    description: string;
};

export type User = {
    user_id: number;
    name: string;
    email: string;
    password: string;
    is_admin: number;
};
