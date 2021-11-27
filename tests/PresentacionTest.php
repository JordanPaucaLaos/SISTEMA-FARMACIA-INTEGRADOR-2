<?php
use PHPUnit\Framework\TestCase;
class PresentacionTest extends TestCase{

    private $pre;
    
    public function setUp():void{
        
        $this->pre = new Presentacion();

    }

    //prueba para crear una presentacion
    public function testCrearPre()
    {
        $PresCreate = $this->pre->crear("Blister");
        $this->assertEquals("creado",$PresCreate);
    }

    //prueba para editar una presentacion
    public function testEditarPre()
    {
        $PresEditar = $this->pre->editar("Jarabe",1);
        $this->assertEquals("editado",$PresEditar);
    }

    //prueba para borrar una presentacion
    public function testBorrarPre()
    {
        $PresEditar = $this->pre->borrar(9);
        $this->assertEquals("borrado",$PresEditar);
    }   

    
}