<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link rel="icon" href="imagenes/icono_farmacia.png" type="image/png">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap" rel="stylesheet">
    <script src="https://kit.fontawesome.com/b1852eadb2.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" type="text/css" href="css/estilos.css">

</head>
<?php
session_start();
if(!empty($_SESSION['us_tipo'])){
    header('Location: controlador/LoginController.php');
}
else{
    session_destroy();
?>

<body>
    <img class="wave" src="imagenes/wave.png" alt="">
    <div class="contenedor">
        <div class="img">
            <img src="imagenes/fondo.svg" alt="">
        </div>
        <div class="contenido-login">
            <form action="controlador/LoginController.php" method="post">
                <img src="imagenes/doctor.png" alt="">
                <h2>Farmacia</h2>
                <div class="input-div dni">
                    <div class="i">
                        <i class="fas fa-user"></i>
                    </div>
                    <div class="div">
                        <h5>DNI</h5>
                        <input type="text" name="user" class="input" required>
                    </div>
                </div>
                <div class="input-div pass">
                    <div class="i">
                        <i class="fas fa-lock"></i>
                    </div>
                    <div class="div">
                        <h5>Contraseña</h5>
                        <input type="password" name="pass" class="input" required>
                    </div>
                </div>
                <a href="vista/recuperar.php">Recuperar contraseña</a>
                <input type="submit" class="btn" value="Iniciar Sesion">
            </form>
        </div>
    </div>

</body>
<script src="js/login.js"></script>

</html>
<?php
}
?>