<?php
use PHPUnit\Framework\TestCase;

class LaboratorioTest extends TestCase{

    private $labo;
    
    public function setUp():void{
        
        $this->labo = new Laboratorio();

    }

    //prueba para crear un laboratorio
    public function testCrearLab()
    {
        $LabCreate = $this->labo->crear("PruebaUnit", "lab_default.jpg");
        $this->assertEquals("creado",$LabCreate);
    }

    //prueba para verificar si se edito un laboratorio
    public function testEditarLab()
    {
        $LabEdit = $this->labo->editar("Biotech2", 2);
        $this->assertEquals("editado",$LabEdit);
    }
    
     //prueba para verificar si existen laboratorios registrados en la base de datos
     public function testListarLaboratorios()
     {
         $LabList = $this->labo->rellenar_laboratorios();
         $this->assertGreaterThan(0, count($LabList), 'Se espera que exista almenos un laboratorio registrado');
     }

     //prueba para verificar si se muestra un listado de laboratorios
     public function testRellenarLaboratorios()
     {
         $LabList = $this->labo->buscar();
         $this->assertGreaterThan(1, count($LabList), 'Se espera que exista almenos un listado de laboratorios');
     }     
    
    //prueba para borrar un laboratorio
    public function testBorrarLab()
    {
        $LabEdit = $this->labo->borrar(10);
        $this->assertEquals("borrado",$LabEdit);
    }

    
}