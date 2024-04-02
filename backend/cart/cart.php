<?php
session_start();
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST, DELETE, PUT');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (!isset($_SESSION['user_id'])) {
        echo json_encode(['success' => false]);
        exit;
    }
    $data = json_decode(file_get_contents('php://input'));

    require_once __DIR__ . '/../database/Database.php';
    require_once __DIR__ . '/cart.class.php';
    require_once __DIR__ . '/cart.controll.php';

    $cart = new CartController($data->quantity, $_SESSION['user_id'], $data->book_id, $data->return_date, $data->available);

    $cart->addToCart();

    echo json_encode(['success' => true]);
}

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    if (!isset($_SESSION['user_id'])) {
        echo json_encode(['success' => false]);
        exit;
    }

    require_once __DIR__ . '/../database/Database.php';

    $db = new Database();

    $connection = $db->connect();

    $stmt = "SELECT * FROM carts JOIN books ON carts.book_id = books.book_id WHERE user_id = ?";

    $cartQuery = $connection->prepare($stmt);

    $cartQuery->execute([
        $_SESSION['user_id']
    ]);

    $cart = $cartQuery->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($cart);
}

if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
    if (!isset($_SESSION['user_id'])) {
        echo json_encode(['success' => false]);
    }
    $data = json_decode(file_get_contents('php://input'));
    require_once __DIR__ . '/../database/Database.php';
    require_once __DIR__ . '/cart.class.php';
    require_once __DIR__ . '/cart.controll.php';

    $cart = new CartController($data->quantity, $_SESSION['user_id'], $data->book_id, null, null);

    $cart->removeFromCart();

    echo json_encode(['success' => true]);
}
