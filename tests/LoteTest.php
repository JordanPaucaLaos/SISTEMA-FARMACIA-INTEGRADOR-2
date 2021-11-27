<?php
use PHPUnit\Framework\TestCase;

class LoteTest extends TestCase{

    private $lote; 
    
    public function setUp():void{
        
        $this->lote = new Lote();        

    }   
    
    //prueba para verificar si se crea un lote para un producto 
    public function testCrearLote()
    {
        //($codigo,$cantidad,$vencimiento,$precio_compra,$id_compra,$id_producto)
        $CrearLote = $this->lote->crear_lote("125678",50,"2022-07-16",8,15,7);
        $this->assertEquals('creado',$CrearLote);
    }

    //prueba para verificar si se edita el stock de un lote para un producto 
    public function testEditarLote()
    {        
        $EditarLote = $this->lote->editar(6,100);
        $this->assertEquals('editado',$EditarLote);
    }

    //prueba para verificar si se borra un lote
    public function testBorrarLote()
    {        
        $BorrarLote = $this->lote->borrar(7);
        $this->assertEquals('borrado',$BorrarLote);
    }

    //prueba para buscar lotes
    public function testBuscarLote()
    {
        $BuscarLote = $this->lote->buscar();
        $this->assertGreaterThan(0, count($BuscarLote), 'Se espera que existan datos de lotes ');
    }
    
}