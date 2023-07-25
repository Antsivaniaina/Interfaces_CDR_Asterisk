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
                $response = array('matricule' => $matricule);
            }
        }
    
    // Envoyer la réponse JSON
    echo json_encode($response);
    }else {
        die(mysqli_error($con));
    }
?>