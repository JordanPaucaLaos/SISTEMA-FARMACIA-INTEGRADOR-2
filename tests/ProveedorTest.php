<?php
use PHPUnit\Framework\TestCase; 

class ProveedorTest extends TestCase{

    private $prov;
    
    public function setUp():void{
        
        $this->prov = new Proveedor();
    }

    //prueba para verificar si se crea un proveedor
    public function testCrearProveedor()
    {
        $ProvCrear = $this->prov->crear("20457890631","steve mot",9098543218,"apaza@motivos.com","Av. Los heroes 1096","prov_default.png");
        $this->assertEquals("creado",$ProvCrear);
    }

    //prueba para verificar si se edita un proveedor
    public function testEditarProveedor()
    {
        $ProvEdit = $this->prov->editar(16,"20987653210","Quimica Nava",998765432,"quimica@gmail.com","Av. arequipa 145");
        $this->assertEquals("noeditado",$ProvEdit);
    }

    //prueba para verificar si se borra un proveedor
    public function testBorrarProveedor()
    {
        $ProvDel = $this->prov->borrar(24);
        $this->assertEquals("borrado",$ProvDel);
    }

    //prueba para verificar si se listan los proveedores
    public function testListarProveedor()
    {
        $ProvList = $this->prov->buscar();
        $this->assertGreaterThan(0, count($ProvList), 'Se espera que exista almenos un proveedor registrado');
    }


   
    

    
}