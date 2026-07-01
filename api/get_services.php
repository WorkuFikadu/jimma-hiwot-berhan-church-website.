<?php require_once __DIR__ . '/config.php';
$stmt = $pdo->query("SELECT id, name, day, time, description, sort_order FROM weekly_services ORDER BY sort_order");
echo json_encode($stmt->fetchAll());
?>
