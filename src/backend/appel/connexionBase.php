<?php

$host = "192.168.43.209";
$port = "5432";
$dbname = "projetcdr";
$user = "postgres";
$mdp = "rasta";

try {
    $conn= new PDO("pgsql:host=$host;port=$port;dbname=$dbname; user=$user; password=$mdp");
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("erreur". $e);
    
}
?>