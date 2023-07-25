<?php
$con=mysqli_connect('localhost','root','','gestion_des_notes');
if ($con) {
$niveau = $_POST["niveau"];
// $niveau ='Seconde';
$sql="SELECT classement.matricule, etudiant.nom, classement.moyenne FROM etudiant, classement WHERE (classement.matricule = etudiant.matricule) AND etudiant.niveau = '$niveau' ORDER BY classement.moyenne DESC;";
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