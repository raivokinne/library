<?php
session_start();
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST, DELETE');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (!isset($_SESSION['user_id'])) {
        echo json_encode(['success' => false, 'message' => 'User not authenticated']);
        exit;
    }

    if (!isset($_FILES['image']) || $_FILES['image']['error'] !== UPLOAD_ERR_OK) {
        echo json_encode(['success' => false, 'message' => 'No file uploaded or file upload error']);
        exit;
    }

    $imageFolder = 'images/';

    if (!file_exists($imageFolder)) {
        mkdir($imageFolder);
    }

    $imagePath = $imageFolder . basename($_FILES['image']['name']);

    if (!move_uploaded_file($_FILES['image']['tmp_name'], $imagePath)) {
        echo json_encode(['success' => false, 'message' => 'Failed to move uploaded file']);
        exit;
    }

    require_once __DIR__ . '/../database/Database.php';
    $db = new Database();
    $connection = $db->connect();

    $stmt = "INSERT INTO authors (name) VALUES (?)";
    $authorQuery = $connection->prepare($stmt);
    $authorQuery->execute([
        $_POST['author']
    ]);

    $stmt = "SELECT author_id FROM authors WHERE name = ?";
    $authorIdQuery = $connection->prepare($stmt);
    $authorIdQuery->execute([
        $_POST['author']
    ]);
    $authorId = $authorIdQuery->fetch(PDO::FETCH_ASSOC)['author_id'];

    if (!$authorId) {
        echo json_encode(['success' => false, 'message' => 'Failed to get author ID']);
        exit;
    }

    $stmt = "INSERT INTO books (author_id, title, publication_year, image, availability, description) VALUES (?, ?, ?, ?, ? , ?)";
    $bookQuery = $connection->prepare($stmt);
    $bookQuery->execute([
        $authorId,
        $_POST['title'],
        $_POST['publication_year'],
        $imagePath,
        $_POST['availability'],
        $_POST['description']
    ]);

    echo json_encode(['success' => true]);
} else if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    require_once __DIR__ . '/../database/Database.php';
    $db = new Database();
    $connection = $db->connect();

    try {
        $sql = 'SELECT * FROM books JOIN authors ON books.author_id = authors.author_id';

        $result = $connection->prepare($sql);
        $result->execute();

        $books = $result->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode(['books' => $books, 'success' => true]); // Return both books and success status in a single JSON object
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
    }

    exit;
} else if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
    if (!isset($_SESSION['user_id'])) {
        echo json_encode(['success' => false, 'message' => 'User not authenticated']);
        exit;
    }

    $data = json_decode(file_get_contents('php://input'));

    require_once __DIR__ . '/../database/Database.php';
    $db = new Database();
    $connection = $db->connect();

    $bookId = $data->book_id;
    $authorId = $data->author_id;

    $connection->beginTransaction();

    try {

        $stmt = "DELETE FROM books WHERE author_id = ?";
        $bookQuery = $connection->prepare($stmt);
        $bookQuery->execute([$authorId]);

        $stmt = "DELETE FROM authors WHERE author_id = ?";
        $authorQuery = $connection->prepare($stmt);
        $authorQuery->execute([$authorId]);

        $stmt = "DELETE FROM carts WHERE book_id = ?";
        $cartQuery = $connection->prepare($stmt);
        $cartQuery->execute([$bookId]);

        $connection->commit();
        $connection->commit();

        echo json_encode(['success' => true]);
    } catch (PDOException $e) {
        $connection->rollBack();

        echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
    }

    exit;
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}
