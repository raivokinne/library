<?php
session_start();
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST");

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents('php://input'));
    $name = $data->name;
    $email = $data->email;
    $password = $data->password;
    $confirm_password = $data->confirm_password;

    require_once __DIR__ . '/../database/Database.php';
    require_once __DIR__ .  '/register.class.php';
    require_once __DIR__ . '/register.controll.php';

    $signin = new RegisterController($name, $email, $password, $confirm_password);
    $signin->registerUser();

    $db = new Database();

    $connection = $db->connect();

    $stmt = "SELECT user_id FROM users WHERE email = ?";

    $userQuery = $connection->prepare($stmt);

    $userQuery->execute([
        $email
    ]);

    $userId = $userQuery->fetch(PDO::FETCH_ASSOC)['user_id'];

    $_SESSION['user_id'] = $userId;

    echo json_encode(["success" => "true"]);
    exit();
} else {
    echo json_encode(["success" => "false"]);
    exit();
}
