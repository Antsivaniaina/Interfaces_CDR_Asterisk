<?php
$matricule = $_POST['matricule'];
$con=mysqli_connect('localhost','root','','gestion_des_notes');
    if ($con) {
        $sql="SELECT niveau FROM etudiant WHERE matricule = '$matricule';";
        $result=mysqli_query($con,$sql);
        if ($result->num_rows > 0) {
            // Récupérer le niveau depuis le résultat de la requête
            $row = $result->fetch_assoc();
            $niveau = $row['niveau'];
        } else {
            $niveau = '';
        }
    
    $response = array('niveau' => $niveau);
    // Envoyer la réponse JSON
    echo json_encode($response);
    }else {
        die(mysqli_error($con));
    }
?>