<?php require_once __DIR__ . '/config.php';
$stmt = $pdo->query("SELECT id, title, speaker, description, date, video_url FROM sermons ORDER BY date DESC");
echo json_encode($stmt->fetchAll());
?>
