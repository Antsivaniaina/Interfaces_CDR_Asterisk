<?php
$con=mysqli_connect('localhost','root','','gestion_des_notes');
    if ($con) {
        $sql="SELECT matricule FROM etudiant;";
        $result=mysqli_query($con,$sql);
        $matricule = array();
        if ($result->num_rows > 0) {
            // Récupérer les matieres depuis le résultat de la requête
            while ($row = $result->fetch_assoc()) {
                $matricule[] = $row['matricule'];
            }
        }
    header('Access-Control-Allow-Origin: http://localhost:3000');
    header('Content-Type: application/json');
    
    // Envoyer la réponse JSON
    echo json_encode($matricule);
    }else {
        die(mysqli_error($con));
    }
?>