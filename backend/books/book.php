<?php
session_start();
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: GET');

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $book_id = $_GET['book_id'];

    require_once __DIR__ . '/../database/Database.php';
    $db = new Database();
    $connection = $db->connect();

    $stmt = "SELECT books.book_id, books.author_id, books.title, books.publication_year, books.image, books.availability, authors.name 
    FROM books 
    JOIN authors ON books.author_id = authors.author_id
    WHERE books.book_id = ?";

    $bookQuery = $connection->prepare($stmt);

    $bookQuery->execute([
        $book_id
    ]);

    $book = $bookQuery->fetch();

    echo json_encode($book);

    exit();
}
