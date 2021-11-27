<?php

include_once 'Conexion.php';
class Producto{

    var $objetos;
    public function __construct()
    {
        $db = new Conexion();
        $this->acceso=$db->pdo;
        
    }

    function crear($nombre, $concentracion, $adicional, $precio, $laboratorio, $tipo, $presentacion, $avatar)
    {
        $mensaje="";
        $sql = "SELECT id_producto,estado FROM producto WHERE nombre=:nombre and concentracion=:concentracion and adicional=:adicional and prod_lab=:laboratorio and prod_tip_prod=:tipo and prod_present=:presentacion";
        $query = $this->acceso->prepare($sql);
        $query->execute(array(':nombre' => $nombre,':concentracion' => $concentracion,':adicional' => $adicional,':laboratorio' => $laboratorio,':tipo' => $tipo,':presentacion' => $presentacion));
        $this->objetos = $query->fetchall();
        if (!empty($this->objetos)) {
            foreach ($this->objetos as $prod) {
                $prod_id_producto = $prod->id_producto;
                $prod_estado = $prod->estado;
            }
            if($prod_estado=='A'){
                echo 'noadd';
                $mensaje="nocreado";
            }
            else{
                $sql = "UPDATE producto SET estado='A' where id_producto=:id";
                $query = $this->acceso->prepare($sql);
                $query->execute(array(':id'=>$prod_id_producto));
                echo 'add'; 
                $mensaje="creado";               
            }
        } else {
            $sql = "INSERT INTO producto(nombre,concentracion,adicional,precio,prod_lab,prod_tip_prod,prod_present,avatar) values (:nombre,:concentracion,:adicional,:precio,:laboratorio,:tipo,:presentacion,:avatar);";
            $query = $this->acceso->prepare($sql);
            $query->execute(array(':nombre' => $nombre,':concentracion' => $concentracion,':adicional' => $adicional,':laboratorio' => $laboratorio,':tipo' => $tipo,':presentacion' => $presentacion,':precio' => $precio,':avatar' => $avatar));
            echo 'add';
            $mensaje="creado";
        }
        
        return $mensaje;
    }

    function editar($id,$nombre, $concentracion, $adicional, $precio, $laboratorio, $tipo, $presentacion)
    {
        $mensaje="";
        $sql = "SELECT id_producto FROM producto WHERE id_producto!=:id AND nombre=:nombre and concentracion=:concentracion and adicional=:adicional and prod_lab=:laboratorio and prod_tip_prod=:tipo and prod_present=:presentacion";
        $query = $this->acceso->prepare($sql);
        $query->execute(array(':id'=>$id,':nombre' => $nombre,':concentracion' => $concentracion,':adicional' => $adicional,':laboratorio' => $laboratorio,':tipo' => $tipo,':presentacion' => $presentacion));
        $this->objetos = $query->fetchall();
        if (!empty($this->objetos)) {
            echo 'noedit';
            $mensaje="noeditado";
        } else {
            $sql = "UPDATE producto SET nombre=:nombre, concentracion=:concentracion, adicional=:adicional, prod_lab=:laboratorio, prod_tip_prod=:tipo, prod_present=:presentacion, precio=:precio WHERE id_producto=:id";
            $query = $this->acceso->prepare($sql);
            $query->execute(array(':id'=>$id,':nombre' => $nombre,':concentracion' => $concentracion,':adicional' => $adicional,':laboratorio' => $laboratorio,':tipo' => $tipo,':presentacion' => $presentacion,':precio' => $precio));
            echo 'edit';
            $mensaje="editado";
        }
        return $mensaje;
    }


    function buscar()
    {
        if (!empty($_POST['consulta'])) {

            $consulta = $_POST['consulta'];
            $sql = "SELECT id_producto,producto.nombre as nombre, concentracion, adicional,precio,laboratorio.nombre as laboratorio, tipo_producto.nombre as tipo, presentacion.nombre as presentacion, producto.avatar as avatar, prod_lab,prod_tip_prod,prod_present
            FROM producto JOIN laboratorio on prod_lab=id_laboratorio
            JOIN tipo_producto on prod_tip_prod=id_tip_prod
            JOIN presentacion on prod_present=id_presentacion WHERE producto.estado='A' and producto.nombre LIKE :consulta LIMIT 25";
            $query = $this->acceso->prepare($sql);
            $query->execute(array(':consulta' => "%$consulta%"));
            $this->objetos = $query->fetchall();
            return $this->objetos;
        } else {
            $sql = "SELECT id_producto,producto.nombre as nombre, concentracion, adicional,precio,laboratorio.nombre as laboratorio, tipo_producto.nombre as tipo, presentacion.nombre as presentacion, producto.avatar as avatar
            , prod_lab,prod_tip_prod,prod_present FROM producto JOIN laboratorio on prod_lab=id_laboratorio JOIN tipo_producto on prod_tip_prod=id_tip_prod JOIN presentacion on prod_present=id_presentacion WHERE producto.estado='A' and producto.nombre NOT LIKE '' ORDER BY producto.nombre LIMIT 25";
            $query = $this->acceso->prepare($sql);
            $query->execute();
            $this->objetos = $query->fetchall();
            return $this->objetos;
        }
    }

    function cambiar_logo($id,$nombre){
        $sql="UPDATE producto SET avatar=:nombre WHERE id_producto=:id";
        $query=$this->acceso->prepare($sql);
        $query->execute(array(':id'=>$id,':nombre'=>$nombre));
    }
    
function borrar($id){
    
    $mensaje="";
    $sql="SELECT * FROM lote WHERE id_producto=:id and estado='A'";
    $query=$this->acceso->prepare($sql);
    $query->execute(array(':id'=>$id));
    $lote=$query->fetchall();
    if(!empty($lote)){
        echo 'noborrado';
        $mensaje="noborrado";
    }
    else{
        $sql="UPDATE producto SET estado='I' WHERE id_producto=:id";
        $query=$this->acceso->prepare($sql);
        $query->execute(array(':id'=>$id));
        if(!empty($query->execute(array(':id'=>$id)))){
            echo 'borrado';
            $mensaje="borrado";


        }else{

            echo 'noborrado';
            $mensaje="noborrado";

        }
    }   
    return $mensaje;
}

function obtener_stock($id){
    $sql="SELECT SUM(cantidad_lote) as total FROM lote WHERE id_producto=:id and estado='A'";
    $query=$this->acceso->prepare($sql);
    $query->execute(array(':id'=>$id));
    $this->objetos = $query->fetchall();
    return $this->objetos;
    
}

function buscar_id($id){
    $sql = "SELECT id_producto,producto.nombre as nombre, concentracion, adicional,precio,laboratorio.nombre as laboratorio, tipo_producto.nombre as tipo, presentacion.nombre as presentacion, producto.avatar as avatar
            , prod_lab,prod_tip_prod,prod_present FROM producto JOIN laboratorio on prod_lab=id_laboratorio JOIN tipo_producto on prod_tip_prod=id_tip_prod JOIN presentacion on prod_present=id_presentacion where id_producto=:id";
            $query = $this->acceso->prepare($sql);
            $query->execute(array(':id'=>$id));
            $this->objetos = $query->fetchall();
            return $this->objetos;
}

function reporte_productos(){

    $sql = "SELECT id_producto,producto.nombre as nombre, concentracion, adicional,precio,laboratorio.nombre as laboratorio, tipo_producto.nombre as tipo, presentacion.nombre as presentacion, producto.avatar as avatar
            , prod_lab,prod_tip_prod,prod_present FROM producto JOIN laboratorio on prod_lab=id_laboratorio JOIN tipo_producto on prod_tip_prod=id_tip_prod JOIN presentacion on prod_present=id_presentacion and producto.nombre NOT LIKE '' ORDER BY producto.nombre LIMIT 25";
            $query = $this->acceso->prepare($sql);
            $query->execute();
            $this->objetos = $query->fetchall();
            return $this->objetos;

}

function rellenar_productos(){
        
    $sql = "SELECT id_producto,producto.nombre as nombre, concentracion, adicional,precio,laboratorio.nombre as laboratorio, tipo_producto.nombre as tipo, presentacion.nombre as presentacion  
            FROM producto JOIN laboratorio on prod_lab=id_laboratorio and producto.estado='A'
            JOIN tipo_producto on prod_tip_prod=id_tip_prod 
            JOIN presentacion on prod_present=id_presentacion
            order by nombre asc";
    $query = $this->acceso->prepare($sql);
    $query->execute();
    $this->objetos = $query->fetchall();
    return $this->objetos;

}

}
?>