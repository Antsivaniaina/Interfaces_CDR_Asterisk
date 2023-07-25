<?php
include('connexionBase.php');

$sql = "SELECT EXTRACT(HOUR FROM calldate) AS heure, COUNT(*) AS nombre_appels FROM cdr GROUP BY EXTRACT(HOUR FROM calldate)";

try {
  // Exécutez la requête SQL avec PDO
  $stmt = $conn->query($sql);

  // Initialiser un tableau pour stocker les données par heure (de 0 H à 23 H)
  $appels_par_heure = array_fill(0, 24, 0);

  // Parcourir les résultats de la requête et mettre à jour les valeurs correspondantes dans le tableau
  while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    $heure = intval($row['heure']);
    $nombre_appels = intval($row['nombre_appels']);
    $appels_par_heure[$heure] = $nombre_appels;
  }

  // Convertir le tableau en un format approprié pour le renvoyer au frontend
  $resultat_final = array();
  for ($heure = 0; $heure <= 23; $heure++) {
    $resultat_final[] = array("heure" => $heure, "nombreAppels" => $appels_par_heure[$heure]);
  }
 header('Access-Control-Allow-Origin: http://localhost:3000');
    header('Content-Type: application/json');
  echo json_encode($resultat_final); // Renvoyer les données au format JSON
} catch (PDOException $e) {
  // En cas d'erreur lors de l'exécution de la requête
  echo "Erreur lors de l'exécution de la requête : " . $e->getMessage();
}

// Fermez la connexion à PostgreSQL
$conn = null;