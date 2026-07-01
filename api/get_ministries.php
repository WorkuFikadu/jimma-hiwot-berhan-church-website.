<?php require_once __DIR__ . '/config.php';
$stmt = $pdo->query("SELECT id, name, description, leader, meeting_day, icon FROM ministries ORDER BY id");
echo json_encode($stmt->fetchAll());
?>
