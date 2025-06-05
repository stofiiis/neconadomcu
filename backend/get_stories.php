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

// Fetch stories
$sql = "SELECT name, story, created_at FROM shared_stories ORDER BY created_at DESC";
$result = $conn->query($sql);

$stories = [];

if ($result && $result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $stories[] = [
            'name' => $row['name'],
            'story' => $row['story'],
            'created_at' => $row['created_at']
        ];
    }
}

$conn->close();

echo json_encode(['success' => true, 'stories' => $stories]);
?>
