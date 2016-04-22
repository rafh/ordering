<?php
header("Access-Control-Allow-Origin: *");

////////////////////// mysqli method /////////////////////

$dbhost = 'localhost';
$dbuser = 'roheard';
$dbpwd  = 'roheard';
$dbname = 'roheard_db';

$conn = mysqli_connect($dbhost, $dbuser, $dbpwd, $dbname);

if (!$conn) {
    die('Connect Error (' . mysqli_connect_errno() . ') '
        . mysqli_connect_error());
}else{
    //
}

if ( isset( $_REQUEST['barcode'] ) ) {

    $barcode = $_REQUEST['barcode'];

    $sql = "INSERT INTO ordered SELECT * FROM menu WHERE id LIKE '%$id%'";

    if ($result->num_rows > 0) {
        // output data of each row
        while ($row = $result->fetch_assoc()) {
    //            echo '<div class="item">Name: ' . $row["item_name"] . '<br> Barcode ' . $row["barcode"] . '<br><img src="' . $row["image"] . '" height="100px"></div>';
            $json_user = json_encode($row);
            echo $json_user;
        }
    } else {
        echo "0 results";
    }
}else{
    echo 'not set';
}

$conn->close();





