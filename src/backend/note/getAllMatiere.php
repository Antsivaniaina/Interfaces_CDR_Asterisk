<?php
$con=mysqli_connect('localhost','root','','gestion_des_notes');
    if ($con) {
       $sql="SELECT matiere FROM matiere GROUP BY matiere;";
        $result=mysqli_query($con,$sql);
        $matricule = array();
        if ($result->num_rows > 0) {
            // Récupérer les matieres depuis le résultat de la requête
            while ($row = $result->fetch_assoc()) {
                $matiere[] = $row['matiere'];
            }
        }
    header('Access-Control-Allow-Origin: http://localhost:3000');
    header('Content-Type: application/json');
    
    // Envoyer la réponse JSON
    echo json_encode($matiere);
    }else {
        die(mysqli_error($con));
    }
?>