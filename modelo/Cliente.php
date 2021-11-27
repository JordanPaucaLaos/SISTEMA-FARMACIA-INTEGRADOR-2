<?php

include_once 'Conexion.php';
class Cliente{

    var $objetos;
    public function __construct()
    {
        $db = new Conexion();
        $this->acceso=$db->pdo;
        
    }

    function buscar()
    {
        if (!empty($_POST['consulta'])) {

            $consulta = $_POST['consulta'];
            $sql = "SELECT * FROM cliente where estado='A' and nombre LIKE :consulta";
            $query = $this->acceso->prepare($sql);
            $query->execute(array(':consulta' => "%$consulta%"));
            $this->objetos = $query->fetchall();
            return $this->objetos;
        } else {
            $sql = "SELECT * FROM cliente where estado='A' and nombre NOT LIKE '' ORDER BY id desc LIMIT 25";
            $query = $this->acceso->prepare($sql);
            $query->execute();
            $this->objetos = $query->fetchall();
            return $this->objetos;
        }
    }    

    function crear($nombre,$apellidos,$dni,$edad,$telefono,$correo,$sexo,$adicional,$avatar)
    {
        $mensaje="";
        $sql = "SELECT id,estado FROM cliente WHERE nombre=:nombre and apellidos=:apellidos and dni=:dni";
        $query = $this->acceso->prepare($sql);
        $query->execute(array(':nombre' => $nombre,':apellidos' => $apellidos,':dni' => $dni));
        $this->objetos = $query->fetchall();
        if (!empty($this->objetos)) {
            foreach ($this->objetos as $cli) {
                $cli_id = $cli->id;
                $cli_estado = $cli->estado;
            }
            if($cli_estado=='A'){
                echo 'noadd';
                $mensaje="nocreado";
            }
            else{
                $sql = "UPDATE cliente SET estado='A' where id=:id";
                $query = $this->acceso->prepare($sql);
                $query->execute(array(':id'=>$cli_id));
                echo 'add';
                $mensaje="creado";                
            }
        } else {
            $sql = "INSERT INTO cliente(nombre,apellidos,dni,edad,telefono,correo,sexo,adicional,avatar) values (:nombre,:apellidos,:dni,:edad,:telefono,:correo,:sexo,:adicional,:avatar)";
            $query = $this->acceso->prepare($sql);
            $query->execute(array(':nombre' => $nombre,':apellidos' => $apellidos,':dni' => $dni,':edad' => $edad,':telefono' => $telefono,':correo'=>$correo,':sexo'=>$sexo,':adicional'=>$adicional,':avatar'=>$avatar));
            echo 'add';
            $mensaje="creado";
        }
        return $mensaje;
    }

    function editar($id,$nombre,$apellidos,$telefono,$correo,$adicional){
        $mensaje="";
        $sql = "SELECT id FROM cliente WHERE id=:id"; 
        $query = $this->acceso->prepare($sql);
        $query->execute(array(':id'=>$id));
        $this->objetos = $query->fetchall();
        if (empty($this->objetos)) {
            echo 'noedit';
            $mensaje="noeditado";
        } else {
            $sql = "UPDATE cliente SET nombre=:nombre, apellidos=:apellidos, telefono=:telefono, correo=:correo, adicional=:adicional WHERE id=:id";
            $query = $this->acceso->prepare($sql);
            $query->execute(array(':id'=>$id,':nombre' => $nombre,':apellidos' => $apellidos,':telefono' => $telefono,':correo' => $correo,':adicional' => $adicional));
            echo 'edit';
            $mensaje="editado";
        } 
        return $mensaje;
    }

    function borrar($id){

            $mensaje="";
            $sql = "UPDATE cliente SET estado='I' WHERE id=:id";
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

    function rellenar_clientes(){
        
        $sql = "SELECT * FROM cliente WHERE estado='A' order by nombre asc";
        $query = $this->acceso->prepare($sql);
        $query->execute();
        $this->objetos = $query->fetchall();
        return $this->objetos;

    }

    function buscar_datos_cliente($id_cliente){
        
        $sql = "SELECT * FROM cliente WHERE id=:id_cliente";
        $query = $this->acceso->prepare($sql);
        $query->execute(array(':id_cliente'=>$id_cliente));
        $this->objetos = $query->fetchall();
        return $this->objetos;

    }

}
