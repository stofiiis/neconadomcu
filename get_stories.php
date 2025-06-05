<?php
header('Content-Type: application/json');

$host = 'localhost';
$db   = 'storydb';
$user = 'root';
$pass = ''; // Update with your MySQL password
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed']);
    exit;
}

try {
    $stmt = $pdo->query('SELECT story, anonymous FROM stories ORDER BY created_at DESC');
    $stories = $stmt->fetchAll();
    echo json_encode($stories);
} catch (\PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to fetch stories']);
}
?>
