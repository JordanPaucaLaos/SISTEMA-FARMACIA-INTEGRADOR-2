<?php
use PHPUnit\Framework\TestCase;
class ProductoTest extends TestCase{
    private $producto;    
    public function setUp():void{        
        $this->producto = new Producto();
    }
    //prueba para verificar si se crea un producto
    public function testCrearProducto()
    {
        $ProductoCreate = $this->producto->crear("Amoxicilina","500 mg","ninguno",2,5,2,4,"prod_default.png");
        $this->assertEquals("creado",$ProductoCreate);
    }
    //prueba para verificar si se edita un producto
    public function testEditarProducto()
    {
        $ProdEdit = $this->producto->editar(10,"paracetamol","200 mg", "blister", 8, 5,2,4);
        $this->assertEquals("editado",$ProdEdit);
    }
    //prueba para verificar si se borra un producto
    public function testBorrarProducto()
    {
        $ClienteDel = $this->producto->borrar(11);
        $this->assertEquals("borrado",$ClienteDel);
    }
     //prueba para verificar que existe un reporte de productos en la base de datos
     public function testReporteProdutos()
     {
         $ReporteProd = $this->producto->reporte_productos();
         $this->assertGreaterThan(0, count($ReporteProd), 'Se espera que exista almenos un articulo en el reporte de productos');
     }
     //prueba para verificar que existe stock de un determinado producto en la base de datos
     public function testStockProduto()
     {
         $StockProd = $this->producto->obtener_stock(9);
         $this->assertGreaterThan(0, count($StockProd), 'Se espera que exista stock del producto');
     }
    

    
}