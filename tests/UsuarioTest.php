<?php
use PHPUnit\Framework\TestCase;
class UsuarioTest extends TestCase{
    private $us;     
    public function setUp():void{
        $this->us = new Usuario();
    }
    //prueba para verificar si las credenciales de login son correctas
    public function testLogin(){
        $this->assertEquals("logueado",$this->us->Loguearse(48201920, 99669605));
    }    
    
    //prueba para verificar que existe al menos un usuario en la base de datos
    public function testListarUsuario()
    {
        $userList = $this->us->buscar();
        $this->assertGreaterThan(0, count($userList), 'Se espera que exista almenos un usuario registrado');
    }
    //verificamos si existe datos del usuario segun su dni
    public function testObtenerDatos()
    {               
        $userList = $this->us->obtener_datos_logueo(76354930);
        $this->assertGreaterThan(0, count($userList), 'Se espera que existan datos del usuario');
    }
}