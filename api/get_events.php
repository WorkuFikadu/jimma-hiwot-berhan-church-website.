<?php require_once __DIR__ . '/config.php';
$stmt = $pdo->query("SELECT id, title, description, event_date, location FROM events ORDER BY event_date DESC");
echo json_encode($stmt->fetchAll());
?>
