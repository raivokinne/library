<?php

session_start();
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    if (!isset($_SESSION['user_id'])) {
        echo json_encode(['success' => false]);
        exit;
    }
    require_once __DIR__ . '/../database/Database.php';

    $db = new Database();

    $connection = $db->connect();

    $stmt = "SELECT * FROM books JOIN authors ON books.author_id = authors.author_id WHERE book_id = ?";

    $bookQuery = $connection->prepare($stmt);

    $bookQuery->execute([
        $_GET['book_id']
    ]);

    $book = $bookQuery->fetch(PDO::FETCH_ASSOC);

    if (!$book) {
        echo json_encode(['success' => false]);
        exit;
    }

    echo json_encode(['success' => true, 'book' => $book]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (!isset($_SESSION['user_id'])) {
        echo json_encode(['success' => false]);
        exit;
    }
    $data = json_decode(file_get_contents('php://input'));

    require_once __DIR__ . '/../database/Database.php';

    $db = new Database();

    $connection = $db->connect();

    $stmt = "UPDATE authors SET name = ? WHERE author_id = ?";

    $authorUpdateQuery = $connection->prepare($stmt);

    $authorUpdateQuery->execute([
        $data->name,
        $data->author_id
    ]);

    $stmt = "UPDATE books SET title = ?, author_id = ?, publication_year = ? WHERE book_id = ?";

    $bookQuery = $connection->prepare($stmt);

    $bookQuery->execute([
        $data->title,
        $data->author_id,
        $data->publication_year,
        $data->book_id
    ]);

    echo json_encode(['success' => true]);
    exit;
}
