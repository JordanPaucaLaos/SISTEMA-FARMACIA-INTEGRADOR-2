<?php

include_once 'Conexion.php';
class Tipo{

    var $objetos;
    public function __construct()
    {
        $db = new Conexion();
        $this->acceso=$db->pdo;
        
    }

    function crear($nombre)
    {
        $mensaje="";
        $sql = "SELECT id_tip_prod,estado FROM tipo_producto WHERE nombre=:nombre";
        $query = $this->acceso->prepare($sql);
        $query->execute(array(':nombre' => $nombre));
        $this->objetos = $query->fetchall();
        if (!empty($this->objetos)) {
            foreach ($this->objetos as $tip) {
                $tip_id = $tip->id_tip_prod;
                $tip_estado = $tip->estado;
            }
            if($tip_estado=='A'){
                echo 'noadd';
                $mensaje="nocreado";
            }
            else{
                $sql = "UPDATE tipo_producto SET estado='A' where id_tip_prod=:id";
                $query = $this->acceso->prepare($sql);
                $query->execute(array(':id'=>$tip_id));
                echo 'add';
                $mensaje="creado";                
            }
        } else {
            $sql = "INSERT INTO tipo_producto(nombre) values (:nombre);";
            $query = $this->acceso->prepare($sql);
            $query->execute(array(':nombre' => $nombre));
            echo 'add';
            $mensaje="creado";
        }
        return $mensaje;
    }

    function buscar()
    {
        if (!empty($_POST['consulta'])) {

            $consulta = $_POST['consulta'];
            $sql = "SELECT * FROM tipo_producto where estado='A' and nombre LIKE :consulta";
            $query = $this->acceso->prepare($sql);
            $query->execute(array(':consulta' => "%$consulta%"));
            $this->objetos = $query->fetchall();
            return $this->objetos;
        } else {
            $sql = "SELECT * FROM tipo_producto where estado='A' and nombre NOT LIKE '' ORDER BY id_tip_prod LIMIT 25";
            $query = $this->acceso->prepare($sql);
            $query->execute();
            $this->objetos = $query->fetchall();
            return $this->objetos;
        }
    }

    

    function borrar($id){
        
        $mensaje="";
        $sql = "SELECT * FROM producto WHERE prod_tip_prod=:id";
        $query = $this->acceso->prepare($sql);
        $query->execute(array(':id' => $id));
        $tip=$query->fetchall();
        if(!empty($tip)){
            echo 'noborrado';
            $mensaje="noborrado";
        }
        else{
            $sql = "UPDATE tipo_producto SET estado='I' WHERE id_tip_prod=:id";
            $query = $this->acceso->prepare($sql);
            $query->execute(array(':id' => $id));
            if(!empty($query->execute(array(':id' => $id)))){
                echo 'borrado';
                $mensaje="borrado";
            }else{
                echo 'noborrado';
                $mensaje="noborrado";
            }
        }  
        return $mensaje;
    }

    function editar($nombre,$id_editado){
        $sql = "UPDATE tipo_producto SET nombre=:nombre WHERE id_tip_prod=:id";
        $query = $this->acceso->prepare($sql);
        $query->execute(array(':id' => $id_editado,':nombre'=>$nombre));
        echo 'edit';
        return "editado";
        
    }


    function rellenar_tipos(){
        $sql = "SELECT * from tipo_producto WHERE estado='A' order by nombre asc";
        $query = $this->acceso->prepare($sql);
        $query->execute();
        $this->objetos = $query->fetchall();
        return $this->objetos;

    }
}
