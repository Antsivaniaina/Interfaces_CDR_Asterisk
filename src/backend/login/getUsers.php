<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
include('../appel/connexionBase.php');
$jsonData = file_get_contents("php://input");

// Convertit les données JSON en tableau associatif
$data = json_decode($jsonData, true);
$pass = $data["password"];
$name = $data["username"];
// $pass = '1234';
// $name = 'rasta';

$sql = "SELECT * FROM users where nom = '$name' AND mdp = '$pass'";
try {
    $result= $conn->query($sql);
    header('Content-Type: application/json');
    if($result !== false){
        echo json_encode(array('success' => true, 'message' => 'Connexion réussie.'));
    }
    else {
        echo json_encode(array('success' => false, 'message' => 'Nom d\'utilisateur ou mot de passe invalide.'));
    }
} catch (PDOException $e) {
    die("erreur". $e);
    
}
?>