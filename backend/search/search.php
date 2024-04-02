<?php
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: GET');

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    require_once __DIR__ . '/../database/Database.php';

    if (!isset($_GET['searchTerm'])) {
        $searchTearm = $_GET['search'];
        echo json_encode($searchTearm);
    }

    $db = new Database();

    $connection = $db->connect();

    $stmt = "SELECT * FROM books JOIN authors ON books.author_id = authors.author_id WHERE title LIKE ?";

    $searchQuery = $connection->prepare($stmt);

    $searchQuery->execute([
        '%' . $_GET['searchTerm'] . '%'
    ]);

    $books = $searchQuery->fetchAll();

    echo json_encode($books);
}
