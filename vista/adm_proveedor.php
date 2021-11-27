<?php
session_start();
if ($_SESSION['us_tipo'] == 1 || $_SESSION['us_tipo'] == 3) {
    include_once 'layouts/header.php';
?>


    <title>Admin | Proveedores</title>
    <?php
    include_once 'layouts/nav.php';
    ?>
    <!-- Modal logo proveedor -->
    <div class="modal fade" id="cambiologo" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Cambiar logo</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="text-center">
                        <img id="logoactual" src="../imagenes/avatar.png" class="profile-user-img img-fluid img-circle">
                    </div>
                    <div class="text-center">
                        <b id="nombre_logo">
                        </b>
                    </div>
                    <!-- formulario -->

                    <div class="alert alert-success text-center" id="edit-prov" style="display:none;">
                        <span><i class="fas fa-check m-1"></i>Se edito el logo</span>
                    </div>
                    <div class="alert alert-danger text-center" id="noedit-prov" style="display:none;">
                        <span><i class="fas fa-times m-1"></i>formato no soportado</span>
                    </div>

                    <form id="form-logo" enctype="multipart/form-data">
                        <div class="input-group mb-3 ml-5 mt-2">
                            <input type="file" name="photo" class="input-group">
                            <input type="hidden" name="funcion" id="funcion">
                            <input type="hidden" name="id_logo_prov" id="id_logo_prov">
                            <input type="hidden" name="avatar" id="avatar">
                        </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">Cerrar</button>
                    <button type="submit" class="btn bg-gradient-primary">Guardar</button>
                    </form>
                </div>
            </div>
        </div>
    </div>


    <!-- Modal 2 -->
    <div class="modal fade" id="crearproveedor" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="card card-success">
                    <div class="card-header">
                        <h3 class="card-title">Crear proveedor</h3>
                        <button data-dismiss="modal" aria-label="close" class="close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="card-body">
                        <div class="alert alert-success text-center" id="add-prov" style="display:none;">
                            <span><i class="fas fa-check m-1"></i>Se agrego correctamente</span>
                        </div>
                        <div class="alert alert-danger text-center" id="noadd-prov" style="display:none;">
                            <span><i class="fas fa-times m-1"></i>El proveedor ya existe</span>
                        </div>
                        <div class="alert alert-success text-center" id="edit-prov-data" style="display:none;">
                            <span><i class="fas fa-check m-1"></i>Se modifico correctamente</span>
                        </div>
                        <form id="form-crear-proveedor">

                            <div class="form-group">
                                <label for="ruc">Ruc</label>
                                <input id="ruc" oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" type="number" maxlength = "11" class="form-control" placeholder="ingrese ruc" required>
                            </div>

                            <div class="form-group">
                                <label for="nombre">Nombres</label>
                                <input id="nombre" type="text" class="form-control" placeholder="ingrese nombre" required>
                            </div>

                            <div class="form-group">
                                <label for="telefono">Telefono</label>
                                <input id="telefono" oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" type="number" maxlength = "14" class="form-control" placeholder="ingrese telefono" required>
                            </div>

                            <div class="form-group">
                                <label for="correo">Correo</label>
                                <input id="correo" type="email" class="form-control" placeholder="ingrese correo">
                            </div>

                            <div class="form-group">
                                <label for="direccion">Direccion</label>
                                <input id="direccion" type="text" class="form-control" placeholder="ingrese direccion" required>
                            </div>
                            <input type="hidden" id="id_edit_prov">


                    </div>
                    <div class="card-footer">
                        <button type="submit" class="btn bg-gradient-primary float-right m-1">Guardar</button>
                        <button type="button" data-dismiss="modal" class="btn btn-outline-secondary float-right m-1">Cerrar</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <section class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1>Gestion Proveedores <button type="button" data-toggle="modal" data-target="#crearproveedor" class="btn bg-gradient-primary ml-2">
                                Crear Proveedor
                            </button></h1>

                    </div>
                    <div class="col-sm-6">
                        <ol class="breadcrumb float-sm-right">
                            <li class="breadcrumb-item"><a href="adm_catalogo.php">Home</a></li>
                            <li class="breadcrumb-item active">Gestion Proveedor</li>
                        </ol>
                    </div>
                </div>
            </div><!-- /.container-fluid -->
        </section>
        <section>

            <div class="container-fluid">
                <div class="card card-info">
                    <div class="card-header">
                        <h3 class="card-title">Buscar Proveedor</h3>
                        <div class="input-group">
                            <input type="text" id="buscar_proveedor" class="form-control float-left" placeholder="Ingrese nombre de proveedor">
                            <div class="input-group-append"><button class="btn btn-default"><i class="fas fa-search"></i></button></div>
                        </div>
                    </div>
                    <div class="card-body">
                        <div id="proveedores" class="row">

                        </div>

                    </div>
                    <div class="card footer">

                    </div>
                </div>
            </div>
        </section>


    </div>
    <!-- /.content-wrapper -->



<?php
    include_once 'layouts/footer.php';
} else {
    header('Location: ../index.php');
}
?>
<script src="../js/Proveedor.js"></script>