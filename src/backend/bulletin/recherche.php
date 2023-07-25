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
$matricule = $data["matricule"];

$sql="SELECT note.matiere, matiere.coefficient, note.note FROM note,matiere WHERE (note.matiere = matiere.matiere) AND (note.niveau = matiere.niveau) AND note.matricule = '$matricule'";
$result=mysqli_query($con,$sql);
$data = array();
    while ($row = mysqli_fetch_assoc($result)) {
        $data[] = $row;
    }
    header('Content-Type: application/json');
    echo json_encode($data);
}
else{
 die(mysqli_error($con));
 }
?>