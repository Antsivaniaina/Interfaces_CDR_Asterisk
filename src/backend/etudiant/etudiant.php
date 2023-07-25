<?php
$con=mysqli_connect('localhost','root','','gestion_des_notes');
if ($con) {
$sql="SELECT * FROM etudiant order by id DESC";
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
 //die(mysqli_error($con));
 }
?>