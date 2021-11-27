<?php
use PHPUnit\Framework\TestCase;
class TipoTest extends TestCase{

    private $tipo;
    
    public function setUp():void{
        
        $this->tipo= new Tipo();

    }

    //prueba para crear un tipo
    public function testCrearTipo()
    {
        $TipCrear = $this->tipo->crear("generico2");
        $this->assertEquals("creado",$TipCrear);
    }

    //prueba para editar una tipo
    public function testEditarTipo()
    {
        $TipEditar = $this->tipo->editar("TEST",6);
        $this->assertEquals("editado",$TipEditar);
    }

    //prueba para borrar un tipo
    public function testBorrarTipo()
    {
        $TipBorrar = $this->tipo->borrar(5);
        $this->assertEquals("borrado",$TipBorrar);
    }   

    
}