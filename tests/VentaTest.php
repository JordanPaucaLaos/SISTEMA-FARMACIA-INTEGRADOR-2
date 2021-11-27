<?php
use PHPUnit\Framework\TestCase;
class VentaTest extends TestCase{

    private $venta;    
    public function setUp():void{
        
        $this->venta= new Venta();
    }
    //prueba para crear una venta
    public function testCrearVenta()
    {
        $VentaCrear = $this->venta->crear(7,5000.00,"2021-11-19 21:23:13",1);
        $this->assertEquals("creado",$VentaCrear);
    }

    //prueba para buscar una venta
    public function testBuscarVenta()
    {
        $VentaBuscar = $this->venta->buscar(23);
        $this->assertGreaterThan(0, count($VentaBuscar), 'Se espera que exista almenos una venta en el reporte de ventas');
    }

    //prueba para borrar una venta
    public function testBorrarVenta()
    {
        $VentaDel = $this->venta->borrar(25);
        $this->assertEquals("borrado",$VentaDel);
    }
    
}