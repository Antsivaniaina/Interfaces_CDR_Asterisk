<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
$con=mysqli_connect('localhost','root','','gestion_des_notes');
if ($con) {
    // Récupère les données POST sous forme d'objet JSON
    $jsonData = file_get_contents("php://input");

    // Convertit les données JSON en tableau associatif
    $data = json_decode($jsonData, true);
    $matricule=$data['matricule'];
    $matiere = $data['matiere'];
    $niveau = $data['niveau'];
    $sql=" DELETE FROM note WHERE matricule = '$matricule' and niveau = '$niveau'  AND matiere = '$matiere'";
    $result=mysqli_query($con,$sql);
} else {
 die(mysqli_error($con));
 }
?>