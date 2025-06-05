<?php
// Database connection parameters - update as needed
$host = 'localhost';
$dbname = 'your_database_name';
$user = 'your_db_user';
$pass = 'your_db_password';

// Connect to MySQL database
$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch stories
$sql = "SELECT name, story, created_at FROM shared_stories ORDER BY created_at DESC";
$result = $conn->query($sql);
?>
<!DOCTYPE html>
<html lang="cs">
<head>
    <meta charset="UTF-8">
    <title>Sdílené příběhy</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            max-width: 800px;
            margin: 2rem auto;
            padding: 1rem;
            background-color: #f4f4f4;
        }
        h1 {
            text-align: center;
            color: #2c3e50;
        }
        .story {
            background: white;
            padding: 1rem;
            margin-bottom: 1rem;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        .story h3 {
            margin: 0 0 0.5rem 0;
            color: #e74c3c;
        }
        .story p {
            white-space: pre-wrap;
            color: #333;
        }
        .story time {
            font-size: 0.8rem;
            color: #777;
        }
    </style>
</head>
<body>
    <h1>Sdílené příběhy</h1>
    <?php
    if ($result && $result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $name = htmlspecialchars($row['name']);
            $story = htmlspecialchars($row['story']);
            $date = date('j. n. Y H:i', strtotime($row['created_at']));
            echo "<div class='story'>";
            echo "<h3>$name</h3>";
            echo "<time>$date</time>";
            echo "<p>$story</p>";
            echo "</div>";
        }
    } else {
        echo "<p>Žádné příběhy nebyly dosud sdíleny.</p>";
    }
    $conn->close();
    ?>
</body>
</html>
