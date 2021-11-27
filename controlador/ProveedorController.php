<?php

include '../modelo/Proveedor.php';
$proveedor = new Proveedor();
if($_POST['funcion']=='crear'){
   
    $ruc = $_POST['ruc'];
    $nombre = $_POST['nombre'];
    $telefono = $_POST['telefono'];
    $correo = $_POST['correo'];
    $direccion = $_POST['direccion'];
    $avatar ='prov_default.png';

    $proveedor->crear($ruc,$nombre,$telefono,$correo,$direccion,$avatar);
}

if($_POST['funcion']=='editar'){
   $id= $_POST['id'];
    $ruc = $_POST['ruc'];
    $nombre = $_POST['nombre'];
    $telefono = $_POST['telefono'];
    $correo = $_POST['correo'];
    $direccion = $_POST['direccion'];
    
    $proveedor->editar($id,$ruc,$nombre,$telefono,$correo,$direccion);
}

if($_POST['funcion']=='buscar'){
   
    $proveedor->buscar();
    $json = array();
    foreach ($proveedor->objetos as $objeto) {
        $json[] = array(
            'id' => $objeto->id_proveedor,
            'ruc' => $objeto->ruc,
            'nombre' => $objeto->nombre,
            'telefono' => $objeto->telefono,
            'correo' => $objeto->correo,
            'direccion' => $objeto->direccion,
            'avatar' => '../imagenes/prov/' . $objeto->avatar

        );
    }
    $jsonstring = json_encode($json);
    echo $jsonstring;
}

if ($_POST['funcion'] == 'cambiar_logo') {
    $id = $_POST['id_logo_prov'];
    $avatar = $_POST['avatar'];
    if (($_FILES['photo']['type'] == 'image/jpeg') || ($_FILES['photo']['type'] == 'image/png') || ($_FILES['photo']['type'] == 'image/gif')) {
        $nombre = uniqid() . '-' . $_FILES['photo']['name'];
        $ruta = '../imagenes/prov/' . $nombre;
        move_uploaded_file($_FILES['photo']['tmp_name'], $ruta);
        $proveedor->cambiar_logo($id, $nombre);

        if ($avatar != '../imagenes/prov/prov_default.png') {
            unlink($avatar);
        }

        $json = array();
        $json[] = array(
            'ruta' => $ruta,
            'alert' => 'edit'

        );
        $jsonstring = json_encode($json[0]);
        echo $jsonstring;
    } else {
        $json = array();
        $json[] = array(
            'alert' => 'noedit'
        );
        $jsonstring = json_encode($json[0]);
        echo $jsonstring;
    }
}

if ($_POST['funcion'] == 'borrar') {
$id=$_POST['id'];
$proveedor->borrar($id);

}


if ($_POST['funcion'] == 'rellenar_proveedores') {
    $proveedor->rellenar_proveedores();
    $json = array();
    foreach ($proveedor->objetos as $objeto) {
        $json[] = array(
            'id' => $objeto->id_proveedor,
            'nombre' => $objeto->nombre
        );
    }
    $jsonstring=json_encode($json);
    echo $jsonstring;
}


?>