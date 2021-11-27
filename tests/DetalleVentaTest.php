<?php
use PHPUnit\Framework\TestCase;

class DetalleVentaTest extends TestCase{

    private $dv; 
    
    public function setUp():void{
        
        $this->dv = new DetalleVenta();        

    }   
    
    //prueba para verificar si se borra el detalle de una venta ingresando un id    
    public function testBorrarDetalleVenta()
    {
        $BorrarDetVen = $this->dv->borrar(22);        
        $this->assertEquals('borrado',$BorrarDetVen);
    }

}