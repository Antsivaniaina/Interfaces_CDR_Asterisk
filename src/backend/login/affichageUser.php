<?php
include('../appel/connexionBase.php');

$sql = "SELECT * FROM users ";
try {
    $result= $conn->query($sql);
    $data = array();
    if($result !== false){
        foreach ($result as $row) {
            $data[] = $row;
        }
      }
    header('Access-Control-Allow-Origin: http://localhost:3000');
    header('Content-Type: application/json');
    echo json_encode($data);
} catch (PDOException $e) {
    die("erreur". $e);
    
}
?>