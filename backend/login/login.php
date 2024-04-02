<?php
session_start();
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST");

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents('php://input'));

    $email = $data->email;
    $password = $data->password;

    require_once __DIR__ . '/../database/Database.php';
    require_once __DIR__ . '/login.class.php';
    require_once __DIR__ . '/login.controll.php';

    $login = new LoginController($email, $password);
    $login->loginUser();

    $db = new Database();

    $connection = $db->connect();

    $stmt = "SELECT user_id FROM users WHERE email = ?";

    $userQuery = $connection->prepare($stmt);

    $userQuery->execute([
        $email
    ]);

    $userRow = $userQuery->fetch();
    if ($userRow) {
        $userId = $userRow['user_id'];
        $_SESSION['user_id'] = $userId;
        echo json_encode(["success" => "true"]);
        exit();
    } else {
        echo json_encode(["success" => "false", "error" => "No user found with the provided email"]);
        exit();
    }
} else {
    echo json_encode(["success" => "false"]);
    exit();
}
