<?php
$con=mysqli_connect('localhost','root','','gestion_des_notes');
$niveau = $_POST['recherche1'];
$matricule = $_POST['recherche2'];
    if ($con) {
        $sql="SELECT * FROM note WHERE niveau = '$niveau' AND matricule ='$matricule';";
        $result=mysqli_query($con,$sql);
        while ($row = mysqli_fetch_assoc($result)) {
            ob_start();  //Capturer le tableau html
            echo '<tr class="tr-shadow">';
            echo "<td>" . $row["matricule"] . "</td>";
            echo '<td><span class="block-email">' . $row["niveau"] . "</span></td>";
            echo '<td class="desc">' . $row["matiere"] . "</td>";
            echo "<td>" . $row["note"] . "</td>";
            echo '<td>
            <div class="table-data-feature">
                <button class="item btn_modifier" id="btn_modifier" data-toggle="modal" data-target="#scrollmodal_modif">
                    <i class="zmdi zmdi-edit"></i>
                </button>
                <button class="item btn_supprimer" data-toggle="tooltip" data-placement="top" title="Supprimer" id="btn_supprimer">
                    <i class="zmdi zmdi-delete"></i>
                </button>
            </div>
        </td>';
            echo '</tr>
            <tr class="spacer"></tr>';
        }
        $tableau_html = ob_get_clean(); //Obtenir le contenue de la capture
        echo $tableau_html;
    } else {
    die(mysqli_error($con));
    }
?>