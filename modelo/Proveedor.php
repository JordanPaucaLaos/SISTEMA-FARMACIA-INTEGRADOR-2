<?php

include_once 'Conexion.php';
class Proveedor{

    var $objetos;
    public function __construct()
    {
        $db = new Conexion();
        $this->acceso=$db->pdo;
        
    }

    function crear($ruc,$nombre,$telefono,$correo,$direccion,$avatar)
    {
        $mensaje="";
        $sql = "SELECT id_proveedor,estado FROM proveedor WHERE ruc=:ruc and nombre=:nombre and telefono=:telefono and correo=:correo and direccion=:direccion";
        $query = $this->acceso->prepare($sql);
        $query->execute(array(':ruc' => $ruc,':nombre' => $nombre,':telefono' => $telefono,':correo' => $correo,':direccion' => $direccion));
        $this->objetos = $query->fetchall();
        if (!empty($this->objetos)) {
            foreach ($this->objetos as $prov) {
                $prov_id = $prov->id_proveedor;
                $prov_estado = $prov->estado;
            }
            if($prov_estado=='A'){
                echo 'noadd';
                $mensaje="nocreado";
            }
            else{
                $sql = "UPDATE proveedor SET estado='A' where id_proveedor=:id";
                $query = $this->acceso->prepare($sql);
                $query->execute(array(':id'=>$prov_id));
                echo 'add';  
                $mensaje="creado";              
            }
        } else {
            $sql = "INSERT INTO proveedor(ruc,nombre,telefono,correo,direccion,avatar) values (:ruc,:nombre,:telefono,:correo,:direccion,:avatar)";
            $query = $this->acceso->prepare($sql);
            $query->execute(array(':ruc' => $ruc,':nombre' => $nombre,':telefono' => $telefono,':correo' => $correo,':direccion' => $direccion,':avatar'=>$avatar));
            echo 'add';
            $mensaje="creado";
        }

        return $mensaje;
    }

    function buscar()
    {
        if (!empty($_POST['consulta'])) {

            $consulta = $_POST['consulta'];
            $sql = "SELECT * FROM proveedor where estado='A' and nombre LIKE :consulta";
            $query = $this->acceso->prepare($sql);
            $query->execute(array(':consulta' => "%$consulta%"));
            $this->objetos = $query->fetchall();
            return $this->objetos;
        } else {
            $sql = "SELECT * FROM proveedor where estado='A' and nombre NOT LIKE '' ORDER BY id_proveedor desc LIMIT 25";
            $query = $this->acceso->prepare($sql);
            $query->execute();
            $this->objetos = $query->fetchall();
            return $this->objetos;
        }
    }

    function cambiar_logo($id,$nombre){
        $sql="UPDATE proveedor SET avatar=:nombre WHERE id_proveedor=:id";
        $query=$this->acceso->prepare($sql);
        $query->execute(array(':id'=>$id,':nombre'=>$nombre));
    }

    function borrar($id){
        
            $mensaje="";
            $sql = "UPDATE proveedor SET estado='I' WHERE id_proveedor=:id";
            $query = $this->acceso->prepare($sql);
            $query->execute(array(':id' => $id));
            if(!empty($query->execute(array(':id' => $id)))){
                echo 'borrado';
                $mensaje="borrado";
            }else{
                echo 'noborrado';
                $mensaje="noborrado";
            }
            return $mensaje;
    }
    
    function editar($id,$ruc,$nombre,$telefono,$correo,$direccion){
        
        $mensaje="";
        $sql = "SELECT id_proveedor FROM proveedor WHERE id_proveedor!=:id AND ruc=:ruc OR nombre=:nombre"; 
        $query = $this->acceso->prepare($sql);
        $query->execute(array(':id'=>$id,':ruc' => $ruc,':nombre' => $nombre));
        $this->objetos = $query->fetchall();
        if (!empty($this->objetos)) {
            echo 'noedit';
            $mensaje="noeditado";
        } else {
            $sql = "UPDATE proveedor SET ruc=:ruc, nombre=:nombre, telefono=:telefono, correo=:correo, direccion=:direccion WHERE id_proveedor=:id";
            $query = $this->acceso->prepare($sql);
            $query->execute(array(':id'=>$id,':ruc' => $ruc,':nombre' => $nombre,':telefono' => $telefono,':correo' => $correo,':direccion' => $direccion));
            echo 'edit';
            $mensaje="editado";
        } 
        return $mensaje;
    }

    function rellenar_proveedores(){
        $sql = "SELECT * FROM proveedor where estado='A' order by nombre asc"; 
        $query = $this->acceso->prepare($sql);
        $query->execute();
        $this->objetos = $query->fetchall();
        return $this->objetos;
    }
}


?>