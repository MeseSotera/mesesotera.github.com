<?php
    include "connection.php";
    if (isset($_GET['id'])) {
        $id = $_GET['id'];
    
        $sql = "delete from staffs where id = '{$id}'";
        $run_sql = mysqli_query($conn, $sql);

        if ($run_sql) {
            echo json_encode(["success"=>true,"message"=>"Data deleted successfully!"]);
        } else {
            echo json_encode(["success"=>false,"message"=>"Data not deleted successfully!"]);
        }
    }
?>