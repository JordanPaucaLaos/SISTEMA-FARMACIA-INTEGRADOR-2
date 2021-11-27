$(document).ready(function() {
    listar_compras();
    $('.select2').select2();
    var datatable;
    rellenar_estado_pago();
    //funcion que nos muestra las opciones de pago en un select
    function rellenar_estado_pago() {
        funcion = 'rellenar_estado';
        $.post('../controlador/EstadoController.php', { funcion }, (response) => {

            let estados = JSON.parse(response);
            let template = '';
            estados.forEach(estado => {
                template += `
                <option value="${estado.id}">${estado.nombre}</option>
                `;
            });
            $('#estado_compra').html(template);
        })
    }


    function listar_compras() {
        funcion = 'listar_compras';
        $.post('../controlador/ComprasController.php', { funcion }, (response) => {
            //console.log(response);
            let datos = JSON.parse(response);
            datatable = $('#compras').DataTable({
                data: datos,
                responsive: true,
                "columns": [
                    { "data": "numeracion" },
                    { "data": "codigo" },
                    { "data": "fecha_compra" },
                    { "data": "fecha_entrega" },
                    { "data": "total" },
                    { "data": "estado" },
                    { "data": "proveedor" },
                    { "defaultContent": `<button class="imprimir btn btn-secondary"><i class="fas fa-print"></i></button>
                                        <button class="ver btn btn-success" type="button" data-toggle="modal" data-target="#vista_compra"><i class="fas fa-search"></i></button>
                                        <button class="editar btn btn-warning" type="button" data-toggle="modal" data-target="#cambiarEstado"><i class="fas fa-pencil-alt"></i></button>` }
                ],
                "destroy": true,
                "language": espanol

            });

        })
    }

    $('#compras tbody').on('click', '.editar', function() {
        let datos = datatable.row($(this).parents()).data();
        let codigo = datos.codigo;
        codigo = codigo.split(' | ');
        let id = codigo[0];
        let estado = datos.estado;
        funcion = 'cambiar_estado';
        $('#id_compra').val(id);
        $.post('../controlador/EstadoController.php', { funcion, estado }, (response) => {
            let id_estado = JSON.parse(response);
            $('#estado_compra').val(id_estado[0]['id']).trigger('change');
        })

    })

    $('#form-editar').submit(e => {
        //evitar que la pagina se refresque cada vez que hagamos clic en el boton submit
        let id_compra = $('#id_compra').val();
        let id_estado = $('#estado_compra').val();
        funcion = 'editar_estado';
        $.post('../controlador/ComprasController.php', { funcion, id_compra, id_estado }, (response) => {
            if (response = 'edit') {
                $('form-editar').trigger('reset');
                $('#estado_compra').val('').trigger('change');
                $('#edit').hide('slow');
                $('#edit').show(1000);
                $('#edit').hide(2000);
                listar_compras();
            } else {

                $('#noedit').hide('slow');
                $('#noedit').show(1000);
                $('#noedit').hide(2000);
            }
        })
        e.preventDefault();
    })
    $('#compras tbody').on('click', '.ver', function() {
        let datos = datatable.row($(this).parents()).data();
        let codigo = datos.codigo;
        codigo = codigo.split(' | ');
        let id = codigo[0];
        funcion = "ver";
        $('#codigo_compra').html(datos.codigo);
        $('#fecha_compra').html(datos.fecha_compra);
        $('#fecha_entrega').html(datos.fecha_entrega);
        $('#estado').html(datos.estado);
        $('#proveedor').html(datos.proveedor);
        $('#total').html(datos.total);
        $.post('../controlador/LoteController.php', { funcion, id }, (response) => {
            console.log(response);
            let registros = JSON.parse(response);
            let template = "";
            $('#detalles').html(template);
            registros.forEach(registro => {
                template += `
                <tr>
                <td>${registro.numeracion}</td>
                <td>${registro.codigo}</td>
                <td>${registro.cantidad}</td>
                <td>${registro.vencimiento}</td>
                <td>${registro.precio_compra}</td>
                <td>${registro.producto}</td>
                <td>${registro.laboratorio}</td>
                <td>${registro.presentacion}</td>
                <td>${registro.tipo}</td>
                </tr>
                `;
                $('#detalles').html(template);

            });
        })
    })

    $('#compras tbody').on('click', '.imprimir', function() {
        let datos = datatable.row($(this).parents()).data();
        let codigo = datos.codigo;
        codigo = codigo.split(' | ');
        let id = codigo[0];
        funcion = 'imprimir';
        $.post('../controlador/ComprasController.php', { funcion, id }, (response) => {
            console.log(response);
            window.open('../pdf/pdf-compra-' + id + '.pdf', '_blank');
        })

    })

})

let espanol = {
    "processing": "Procesando...",
    "lengthMenu": "Mostrar _MENU_ registros",
    "zeroRecords": "No se encontraron resultados",
    "emptyTable": "Ningún dato disponible en esta tabla",
    "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
    "infoFiltered": "(filtrado de un total de _MAX_ registros)",
    "search": "Buscar:",
    "infoThousands": ",",
    "loadingRecords": "Cargando...",
    "paginate": {
        "first": "Primero",
        "last": "Último",
        "next": "Siguiente",
        "previous": "Anterior"
    },
    "aria": {
        "sortAscending": ": Activar para ordenar la columna de manera ascendente",
        "sortDescending": ": Activar para ordenar la columna de manera descendente"
    },
    "buttons": {
        "copy": "Copiar",
        "colvis": "Visibilidad",
        "collection": "Colección",
        "colvisRestore": "Restaurar visibilidad",
        "copyKeys": "Presione ctrl o u2318 + C para copiar los datos de la tabla al portapapeles del sistema. <br \/> <br \/> Para cancelar, haga clic en este mensaje o presione escape.",
        "copySuccess": {
            "1": "Copiada 1 fila al portapapeles",
            "_": "Copiadas %d fila al portapapeles"
        },
        "copyTitle": "Copiar al portapapeles",
        "csv": "CSV",
        "excel": "Excel",
        "pageLength": {
            "-1": "Mostrar todas las filas",
            "_": "Mostrar %d filas"
        },
        "pdf": "PDF",
        "print": "Imprimir"
    },
    "autoFill": {
        "cancel": "Cancelar",
        "fill": "Rellene todas las celdas con <i>%d<\/i>",
        "fillHorizontal": "Rellenar celdas horizontalmente",
        "fillVertical": "Rellenar celdas verticalmentemente"
    },
    "decimal": ",",
    "searchBuilder": {
        "add": "Añadir condición",
        "button": {
            "0": "Constructor de búsqueda",
            "_": "Constructor de búsqueda (%d)"
        },
        "clearAll": "Borrar todo",
        "condition": "Condición",
        "conditions": {
            "date": {
                "after": "Despues",
                "before": "Antes",
                "between": "Entre",
                "empty": "Vacío",
                "equals": "Igual a",
                "notBetween": "No entre",
                "notEmpty": "No Vacio",
                "not": "Diferente de"
            },
            "number": {
                "between": "Entre",
                "empty": "Vacio",
                "equals": "Igual a",
                "gt": "Mayor a",
                "gte": "Mayor o igual a",
                "lt": "Menor que",
                "lte": "Menor o igual que",
                "notBetween": "No entre",
                "notEmpty": "No vacío",
                "not": "Diferente de"
            },
            "string": {
                "contains": "Contiene",
                "empty": "Vacío",
                "endsWith": "Termina en",
                "equals": "Igual a",
                "notEmpty": "No Vacio",
                "startsWith": "Empieza con",
                "not": "Diferente de"
            },
            "array": {
                "not": "Diferente de",
                "equals": "Igual",
                "empty": "Vacío",
                "contains": "Contiene",
                "notEmpty": "No Vacío",
                "without": "Sin"
            }
        },
        "data": "Data",
        "deleteTitle": "Eliminar regla de filtrado",
        "leftTitle": "Criterios anulados",
        "logicAnd": "Y",
        "logicOr": "O",
        "rightTitle": "Criterios de sangría",
        "title": {
            "0": "Constructor de búsqueda",
            "_": "Constructor de búsqueda (%d)"
        },
        "value": "Valor"
    },
    "searchPanes": {
        "clearMessage": "Borrar todo",
        "collapse": {
            "0": "Paneles de búsqueda",
            "_": "Paneles de búsqueda (%d)"
        },
        "count": "{total}",
        "countFiltered": "{shown} ({total})",
        "emptyPanes": "Sin paneles de búsqueda",
        "loadMessage": "Cargando paneles de búsqueda",
        "title": "Filtros Activos - %d"
    },
    "select": {
        "cells": {
            "1": "1 celda seleccionada",
            "_": "%d celdas seleccionadas"
        },
        "columns": {
            "1": "1 columna seleccionada",
            "_": "%d columnas seleccionadas"
        },
        "rows": {
            "1": "1 fila seleccionada",
            "_": "%d filas seleccionadas"
        }
    },
    "thousands": ".",
    "datetime": {
        "previous": "Anterior",
        "next": "Proximo",
        "hours": "Horas",
        "minutes": "Minutos",
        "seconds": "Segundos",
        "unknown": "-",
        "amPm": [
            "AM",
            "PM"
        ],
        "months": {
            "0": "Enero",
            "1": "Febrero",
            "10": "Noviembre",
            "11": "Diciembre",
            "2": "Marzo",
            "3": "Abril",
            "4": "Mayo",
            "5": "Junio",
            "6": "Julio",
            "7": "Agosto",
            "8": "Septiembre",
            "9": "Octubre"
        },
        "weekdays": [
            "Dom",
            "Lun",
            "Mar",
            "Mie",
            "Jue",
            "Vie",
            "Sab"
        ]
    },
    "editor": {
        "close": "Cerrar",
        "create": {
            "button": "Nuevo",
            "title": "Crear Nuevo Registro",
            "submit": "Crear"
        },
        "edit": {
            "button": "Editar",
            "title": "Editar Registro",
            "submit": "Actualizar"
        },
        "remove": {
            "button": "Eliminar",
            "title": "Eliminar Registro",
            "submit": "Eliminar",
            "confirm": {
                "_": "¿Está seguro que desea eliminar %d filas?",
                "1": "¿Está seguro que desea eliminar 1 fila?"
            }
        },
        "error": {
            "system": "Ha ocurrido un error en el sistema (<a target=\"\\\" rel=\"\\ nofollow\" href=\"\\\">Más información&lt;\\\/a&gt;).<\/a>"
        },
        "multi": {
            "title": "Múltiples Valores",
            "info": "Los elementos seleccionados contienen diferentes valores para este registro. Para editar y establecer todos los elementos de este registro con el mismo valor, hacer click o tap aquí, de lo contrario conservarán sus valores individuales.",
            "restore": "Deshacer Cambios",
            "noMulti": "Este registro puede ser editado individualmente, pero no como parte de un grupo."
        }
    },
    "info": "Mostrando _START_ a _END_ de _TOTAL_ registros"
};