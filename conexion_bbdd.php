<?php
$variable = $_POST['miVariable'];

$conexion = mysqli_connect('localhost','root@localhost','0000','control_acceso');

$sql = "INSERT INTO `acceso`(`Usuario`) VALUES ('[$variable]')";
mysqli_query($conexion, $sql);

mysqli_close($conexion);
?>