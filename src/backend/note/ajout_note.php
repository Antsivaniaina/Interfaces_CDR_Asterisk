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
    $matiere=$data['matiere'];
    $niveau=$data['niveau'];
    $note = $data['note'];

    $sql="INSERT INTO note ( matricule, matiere,niveau, note)  VALUES('$matricule','$matiere','$niveau','$note')";
    mysqli_query($con,$sql);
} else {
    die(mysqli_error($con));
 }
?>