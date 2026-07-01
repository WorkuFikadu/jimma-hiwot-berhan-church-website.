<?php
require_once __DIR__ . '/config.php';
session_start();

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Unauthorized access. Please login.']);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'];
$data = json_decode(file_get_contents('php://input'), true);

$action = $_GET['action'] ?? ($data['action'] ?? '');
$model = $_GET['model'] ?? ($data['model'] ?? '');
$id = $_GET['id'] ?? ($data['id'] ?? null);

if (!$action || !$model) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing action or model']);
    exit;
}

$valid_models = ['events', 'sermons', 'weekly_services', 'ministries', 'testimonials', 'contact_messages', 'prayer_requests', 'users', 'settings'];

if (!in_array($model, $valid_models)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid model']);
    exit;
}

$idField = ($model === 'settings') ? 'setting_key' : 'id';

try {
    if ($action === 'create') {
        $payload = $data['payload'] ?? [];
        if (empty($payload)) {
             echo json_encode(['error' => 'Empty payload']); exit;
        }
        
        $fields = array_keys($payload);
        $values = array_values($payload);
        $placeholders = implode(',', array_fill(0, count($fields), '?'));
        
        $sql = "INSERT INTO $model (" . implode(',', $fields) . ") VALUES ($placeholders)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute($values);
        
        echo json_encode(['success' => true, 'id' => $pdo->lastInsertId(), 'message' => ucfirst($model) . ' created successfully.']);
    }
    elseif ($action === 'read') {
        $orderBy = 'id DESC';
        if ($model === 'events') $orderBy = 'event_date DESC';
        if ($model === 'sermons') $orderBy = 'date DESC';
        if ($model === 'weekly_services') $orderBy = 'sort_order ASC';

        $sql = "SELECT * FROM $model ORDER BY $orderBy";
        $stmt = $pdo->query($sql);
        echo json_encode($stmt->fetchAll());
    }
    elseif ($action === 'update') {
        $payload = $data['payload'] ?? [];
        if (!$id || empty($payload)) {
            echo json_encode(['error' => 'Missing id or payload']); exit;
        }
        
        $setParts = [];
        $values = [];
        foreach ($payload as $k => $v) {
            $setParts[] = "`$k` = ?";
            $values[] = $v;
        }
        $values[] = $id;
        
        $sql = "UPDATE $model SET " . implode(', ', $setParts) . " WHERE $idField = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute($values);
        
        echo json_encode(['success' => true, 'message' => ucfirst($model) . ' updated successfully.']);
    }
    elseif ($action === 'delete') {
        if (!$id) {
            echo json_encode(['error' => 'Missing id']); exit;
        }
        $sql = "DELETE FROM $model WHERE $idField = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$id]);
        
        echo json_encode(['success' => true, 'message' => ucfirst($model) . ' deleted successfully.']);
    } 
    elseif ($action === 'toggle_status') {
        if (!$id) {
            echo json_encode(['error' => 'Missing id']); exit;
        }
        $field = ($model === 'prayer_requests') ? 'is_answered' : 'is_read';
        
        // We might need to add is_read to contact_messages if it doesn't exist
        $sql = "UPDATE $model SET $field = 1 - $field WHERE $idField = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$id]);
        echo json_encode(['success' => true, 'message' => 'Status updated.']);
    }
    else {
        echo json_encode(['error' => 'Unknown action']);
    }
    
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
}
?>
