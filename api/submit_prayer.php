<?php require_once __DIR__ . '/config.php';
$data = json_decode(file_get_contents('php://input'), true);

// 'prayer_request' is the field name sent by the HTML form
$name         = isset($data['name'])           ? trim($data['name'])           : '';
$email        = isset($data['email'])          ? trim($data['email'])          : '';
$request      = isset($data['prayer_request']) ? trim($data['prayer_request']) : '';
$confidential = isset($data['confidential'])   ? 1 : 0;

// Only name and the prayer request are required; email is optional
if (empty($name) || empty($request)) {
    http_response_code(400);
    echo json_encode(['error' => 'Please provide your name and prayer request.']);
    exit;
}

$stmt = $pdo->prepare("INSERT INTO prayer_requests (name, email, request, is_confidential) VALUES (?, ?, ?, ?)");
$stmt->execute([
    htmlspecialchars($name),
    htmlspecialchars($email),   // may be empty — column allows it
    htmlspecialchars($request),
    $confidential
]);
echo json_encode(['success' => true, 'message' => 'Your prayer request has been submitted. God bless you!']);
?>
