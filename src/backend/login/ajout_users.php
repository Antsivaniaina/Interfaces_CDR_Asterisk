<?php
// Connection à la base de données PostgreSQL
$host = 'localhost'; // L'hôte de votre base de données PostgreSQL
$dbname = 'nom_de_la_base_de_donnees'; // Le nom de votre base de données PostgreSQL
$username = 'nom_utilisateur'; // Le nom d'utilisateur de votre base de données PostgreSQL
$password = 'mot_de_passe'; // Le mot de passe de votre base de données PostgreSQL

try {
    $db = new PDO("pgsql:host=$host;dbname=$dbname", $username, $password);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo 'Erreur de connexion : ' . $e->getMessage();
    exit;
}

// Vérifier si les données de connexion ont été envoyées via POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Récupérer les données de connexion depuis la requête POST
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Hasher le mot de passe avant de le stocker dans la base de données (optionnel, mais recommandé pour la sécurité)
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // Insérer les données de connexion dans la base de données
    try {
        $stmt = $db->prepare('INSERT INTO users (username, password) VALUES (:username, :password)');
        $stmt->bindParam(':username', $username);
        $stmt->bindParam(':password', $hashedPassword);
        $stmt->execute();
        echo json_encode(array('success' => true, 'message' => 'Utilisateur ajouté avec succès'));
    } catch (PDOException $e) {
        echo json_encode(array('success' => false, 'message' => 'Erreur lors de l\'ajout de l\'utilisateur : ' . $e->getMessage()));
    }
} else {
    echo json_encode(array('success' => false, 'message' => 'Mauvaise méthode de requête'));
}
?>
