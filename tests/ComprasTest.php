<?php
use PHPUnit\Framework\TestCase;

class ComprasTest extends TestCase{

    private $comp; 
    
    public function setUp():void{
        
        $this->comp = new Compras();

    }   
    
    //prueba para verificar si nos devuelve 'editado' al editar el estado de una compra
    public function testCrearCompra()
    {
        // crear($codigo,$fecha_compra,$fecha_entrega,$total,$id_estado,$id_proveedor)
        $CrearCompra = $this->comp->crear("145321","2021-11-01","2021-11-05",50,1,10);
        $this->assertEquals('creado',$CrearCompra);
    }
    

    //prueba para verificar si nos devuelve 'editado' al editar el estado de una compra
    public function testEditarEstadoCompra()
    {
        $EditarEstado = $this->comp->editar_estado(14,1);
        $this->assertEquals('editado',$EditarEstado);
    }

    public function testBuscarCompra()
    {
        $BuscarCompra = $this->comp->obtener_datos(14);
        $this->assertGreaterThan(0, count($BuscarCompra), 'Se espera que existan datos de la compra ');
    }
    
    
   
}