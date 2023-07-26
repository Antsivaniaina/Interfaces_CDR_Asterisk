<?php
include('connexionBase.php');

$sql = "SELECT src,dst, calldate as ordre, DATE(calldate) as calldate, TO_CHAR(calldate, 'HH24:MI:SS') as heure, duration,disposition,amaflags,uniqueid, accountcode FROM cdr ORDER BY ordre DESC";
try {
    $result= $conn->query($sql);
    $data = array();
    if($result !== false){
        foreach ($result as $row) {
            $data[] = $row;
        }
      }
    header('Access-Control-Allow-Origin: http://localhost:3000');
    header('Content-Type: application/json');
    echo json_encode($data);
} catch (PDOException $e) {
    die("erreur". $e);
    
}
?>