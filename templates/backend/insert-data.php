<?php
    include "connection.php";

    $inputs =file_get_contents("php://input");
    $data = json_decode( $inputs,true);

    $name = $data['name'];
    $age = $data['age'];
    $country = $data['country'];

    $sql = "insert into staffs (name,age,country) values ('{$name}','{$age}','{$country}')";
    $run_sql = mysqli_query($conn,$sql);

    if ($run_sql) {
        echo json_encode(["success"=>true,"message"=>"Data inserted successfully!"]);
    } else {
        echo json_encode(["success"=>false,"message"=>"Data not inserted successfully!"]);
    }
    
?>