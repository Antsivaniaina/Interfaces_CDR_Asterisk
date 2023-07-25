<?php
$con=mysqli_connect('localhost','root','','gestion_des_notes');
if ($con) {
    $sql="SELECT * FROM note ";
//$sql="SELECT note.matricule , note.niveau, note.matiere, note.note FROM note,etudiant, matiere WHERE (note.matricule = etudiant.matricule) AND (note.matiere = matiere.matiere) AND (matiere.niveau = etudiant.niveau) ";
$result=mysqli_query($con,$sql);
$data = array();
    while ($row = mysqli_fetch_assoc($result)) {
        $data[] = $row;
    }
    header('Access-Control-Allow-Origin: http://localhost:3000');
    header('Content-Type: application/json');
    echo json_encode($data);
}
else{
 die(mysqli_error($con));
 }
?>