<?php
header('Content-Type: application/json');

// Database connection parameters - update as needed
$host = 'localhost';
$dbname = 'your_database_name';
$user = 'your_db_user';
$pass = 'your_db_password';

// Connect to MySQL database
$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Database connection failed']);
    exit;
}

// Get POST data
$name = isset($_POST['name']) ? trim($_POST['name']) : '';
$story = isset($_POST['story']) ? trim($_POST['story']) : '';

if (empty($name) || empty($story)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Name and story are required']);
    exit;
}

// Prepare and bind
$stmt = $conn->prepare("INSERT INTO shared_stories (name, story, created_at) VALUES (?, ?, NOW())");
if (!$stmt) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Prepare statement failed']);
    exit;
}

$stmt->bind_param("ss", $name, $story);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Story saved successfully']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to save story']);
}

$stmt->close();
$conn->close();
?>
