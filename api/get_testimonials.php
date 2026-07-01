<?php require_once __DIR__ . '/config.php';
$stmt = $pdo->query("SELECT id, name, role, content FROM testimonials ORDER BY id");
echo json_encode($stmt->fetchAll());
?>
