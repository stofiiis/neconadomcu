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

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['story']) || trim($data['story']) === '') {
    http_response_code(400);
    echo json_encode(['error' => 'Story text is required']);
    exit;
}

$story = trim($data['story']);
$anonymous = isset($data['anonymous']) && $data['anonymous'] ? 1 : 0;

$stmt = $pdo->prepare('INSERT INTO stories (story, anonymous) VALUES (?, ?)');
try {
    $stmt->execute([$story, $anonymous]);
    echo json_encode(['message' => 'Story saved']);
} catch (\PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to save story']);
}
?>
