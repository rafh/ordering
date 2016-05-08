<?php
header("Access-Control-Allow-Origin: *");

////////////////////// mysqli method /////////////////////

$dbhost = 'localhost';
$dbuser = 'rafaelh1_app';
$dbpwd  = 'Jayden1708!!#';
$dbname = 'rafaelh1_db';

$conn = mysqli_connect($dbhost, $dbuser, $dbpwd, $dbname);

if (!$conn) {
    die('Connect Error (' . mysqli_connect_errno() . ') '
        . mysqli_connect_error());
}else{
    //
}



$sql = "SELECT * FROM menu";
$result = $conn->query($sql);


$rows = array();

if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {

        $rows[] = $row;

    }
} else {
    echo "0 results";
}
echo json_encode($rows);

$conn->close();

