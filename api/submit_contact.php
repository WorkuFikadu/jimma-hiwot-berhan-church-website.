<?php require_once __DIR__ . '/config.php';
$data = json_decode(file_get_contents('php://input'), true);
if (!$data || empty($data['name']) || empty($data['email']) || empty($data['message'])) {
    http_response_code(400); echo json_encode(['error' => 'All fields are required.']); exit;
}
$stmt = $pdo->prepare("INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)");
$stmt->execute([htmlspecialchars($data['name']), htmlspecialchars($data['email']), htmlspecialchars($data['subject'] ?? ''), htmlspecialchars($data['message'])]);
echo json_encode(['success' => true, 'message' => 'Thank you for reaching out! We will respond soon.']);
?>
