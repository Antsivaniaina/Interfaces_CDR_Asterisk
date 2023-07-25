<?php
$con=mysqli_connect('localhost','root','','gestion_des_notes');
if ($con) {
    $matricule=$_POST['matricule'];
    $moyenne=$_POST['moyenne'];

    $sql1 = "SELECT matricule FROM classement WHERE matricule = '$matricule' ";
    $result = mysqli_query($con,$sql1);
        if ($result->num_rows > 0) {
            $sql="UPDATE classement SET moyenne = $moyenne WHERE matricule = '$matricule'";
            mysqli_query($con,$sql);
        }else {
            $sql="INSERT INTO classement ( matricule, moyenne)  VALUES('$matricule','$moyenne')";
            mysqli_query($con,$sql);
        }
} else {
    die(mysqli_error($con));
 }
?>