<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

include('../appel/connexionBase.php');
if ($conn) {
    // Récupère les données POST sous forme d'objet JSON
    $jsonData = file_get_contents("php://input");

    // Convertit les données JSON en tableau associatif
    $data = json_decode($jsonData, true);
    $nom=$data['nom'];
    $mdp=$data['mdp'];
    $sql="DELETE FROM users WHERE nom = '$nom' AND mdp = '$mdp'";
    $conn->query($sql);
} else {
    //die(mysqli_error($con));
 }
?>