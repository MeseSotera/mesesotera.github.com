<?php
    include "connection.php";

    $inputs =file_get_contents("php://input");
    $data = json_decode( $inputs,true);

    $id = $data['id'];
    $name = $data['name'];
    $age = $data['age'];
    $country = $data['country'];

    $sql = "update staffs set name = '{$name}', age = '{$age}', country = '{$country}' where id = '{$id}'";
    $run_sql = mysqli_query($conn,$sql);

    if ($run_sql) {
        echo json_encode(["success"=>true,"message"=>"Data updated successfully!"]);
    } else {
        echo json_encode(["success"=>false,"message"=>"Data not updated successfully!"]);
    }
    
?>