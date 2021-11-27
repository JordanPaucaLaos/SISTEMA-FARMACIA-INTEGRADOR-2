<?php
use PHPUnit\Framework\TestCase;

class ClienteTest extends TestCase{

    private $cli;  
    
    public function setUp():void{
        
        $this->cli = new Cliente();

    }   
    
    //prueba para verificar si existe clientes registrados en la base de datos
    public function testListarCliente()
    {
        $ClienteList = $this->cli->buscar();
        $this->assertGreaterThan(0, count($ClienteList), 'Se espera que exista almenos un cliente registrado');
    }

    //prueba para verificar si se crea un cliente
    public function testCrearCliente()
    {
        $ClientCreate = $this->cli->crear("steve","met",98753217,"1993-05-16",987643218,"steve@steve.com","masculino","ninguno","prod_default.png");
        $this->assertEquals("creado",$ClientCreate);
    }

    //prueba para verificar si se edita un cliente
    public function testEditarCliente()
    {
        $ClienteEdit = $this->cli->editar(5,"steve","Apaza",123456789,"mandujano@gmail.com","nn");
        $this->assertEquals("editado",$ClienteEdit);
    }

    //prueba para verificar si se borra un cliente
    public function testBorrarCliente()
    {
        $ClienteDel = $this->cli->borrar(12);
        $this->assertEquals("borrado",$ClienteDel);
    }
  

    
}