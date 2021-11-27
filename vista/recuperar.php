<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Recuperar contraseña</title>

  <!-- Google Font: Source Sans Pro -->
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback">
  <!-- Font Awesome -->
  <link rel="stylesheet" href="../css/all.min.css">
  <!-- Font Awesome -->
  <script src="https://kit.fontawesome.com/b1852eadb2.js" crossorigin="anonymous"></script>
  <!-- sweetalert2 -->
  <link rel="stylesheet" href="../css/sweetalert2.css">
    <!-- Theme style -->
  <link rel="stylesheet" href="../css/adminlte.min.css">
</head>
<body class="hold-transition login-page">
<div class="login-box">
  <div class="card card-outline card-primary">
    <div class="card-header text-center">
      <a href="../index.php" class="h1"><b>Farmacia</b> Universal</a>
    </div>
    <div class="card-body">
      <p class="login-box-msg">Olvidaste tu contraseña? Aqui puedes recuperar tu contraseña facilmente</p>
      <span id="aviso1" class="text-success text-bold">texto</span>
      <span id="aviso" class="text-danger text-bold">texto</span>
      <form id="form-recuperar" action="" method="post">
        <div class="input-group mb-3">
          <input type="text" class="form-control" id="dni-recuperar" placeholder="DNI">
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="far fa-address-card"></span>
            </div>
          </div>
        </div>
        <div class="input-group mb-3">
          <input type="email" class="form-control" id="email-recuperar" placeholder="Email">
          <div class="input-group-append">
            <div class="input-group-text">
              <i class="fas fa-envelope"></i>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <button type="submit" class="btn btn-primary btn-block">Enviar</button>
          </div>
          <!-- /.col -->
        </div>
      </form>
      <p class="login-box-msg mt-3">Se le enviara un codigo a su correo electronico</p>
      <p class="mt-3 mb-1">
        <a href="../index.php">Login</a>
      </p>
    </div>
    <!-- /.login-card-body -->
  </div>
</div>
<!-- /.login-box -->

<!-- jQuery -->
<script src="../js/jquery.min.js"></script>
<!-- Bootstrap 4 -->
<script src="../js/bootstrap.bundle.min.js"></script>
<!-- AdminLTE App -->
<script src="../js/adminlte.min.js"></script>
<script src="../js/recuperar.js"></script>
<!-- sweetalert2 -->
<script src="../js/sweetalert2.js"></script>
</body>
</html>
