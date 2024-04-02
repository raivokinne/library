CREATE DATABASE IF NOT EXISTS library;

USE library;

CREATE TABLE IF NOT EXISTS authors (
    author_id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL 
);

CREATE TABLE IF NOT EXISTS books (
    book_id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    author_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    publication_year INT NOT NULL,
    image BLOB,
    availability ENUM('Available', 'Not Available') DEFAULT 'Available',
    FOREIGN KEY (author_id) REFERENCES authors(author_id)
);

CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    is_admin BOOLEAN NOT NULL DEFAULT FALSE,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);
CREATE TABLE IF NOT EXISTS carts (
    cart_id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    user_id INT NOT NULL,
    book_id INT NOT NULL,
    quantity INT NOT NULL,
    return_date DATE,
    FOREIGN KEY (book_id) REFERENCES books(book_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

INSERT INTO authors (name) VALUES
('F. Scott Fitzgerald'),
('Harper Lee'),
('Jane Austen'),
('J.D. Salinger'),
('J.R.R. Tolkien');

INSERT INTO books (author_id, title, publication_year) VALUES
(1, 'The Great Gatsby', 1925),
(2, 'To Kill a Mockingbird', 1960),
(3, 'Pride and Prejudice', 1813);
