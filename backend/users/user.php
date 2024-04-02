<?php
session_start();
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET');

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    if (!isset($_SESSION['user_id'])) {
        echo json_encode(['success' => false]);
        exit();
    }
    require_once __DIR__ . '/../database/Database.php';
    $db = new Database();
    $connection = $db->connect();

    $sql = 'SELECT * FROM users WHERE user_id = ?';

    $result = $connection->prepare($sql);

    $result->execute([
        $_SESSION['user_id']
    ]);

    $users = $result->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($users);
}
