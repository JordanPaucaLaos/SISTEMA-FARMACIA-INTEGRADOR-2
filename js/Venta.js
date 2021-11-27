$(document).ready(function() {
    mostrar_consultas();
    listar_ventas();
    var datatable;

    function mostrar_consultas() {
        let funcion = 'mostrar_consultas';
        $.post('../controlador/VentaController.php', { funcion }, (response) => {
            const vistas = JSON.parse(response);
            $('#venta_dia_vendedor').html(Number(vistas.venta_dia_vendedor).toFixed(2));
            $('#venta_diaria').html(Number(vistas.venta_diaria).toFixed(2));
            $('#venta_mensual').html(Number(vistas.venta_mensual).toFixed(2));
            $('#venta_anual').html(Number(vistas.venta_anual).toFixed(2));
            $('#ganancia_mensual').html(Number(vistas.ganancia_mensual).toFixed(2));

        })
    }

    function listar_ventas() {
        funcion = "listar";


        datatable = $('#tabla_venta').DataTable({
            responsive: true,
            "ajax": {
                "url": "../controlador/VentaController.php",
                "method": "POST",
                "data": { funcion: funcion }
            },
            "columns": [
                { "data": "id_venta" },
                { "data": "fecha" },
                { "data": "cliente" },
                { "data": "dni" },
                { "data": "total" },
                { "data": "vendedor" },
                { "defaultContent": `<button class="imprimir btn btn-secondary"><i class="fas fa-print"></i></button>
                                <button class="ver btn btn-success" type="button" data-toggle="modal" data-target="#vista_venta"><i class="fas fa-search"></i></button>
                                <button class="borrar btn btn-danger"><i class="fas fa-window-close"></i></button>` }
            ],
            "destroy": true, //destruimos la tabla para poder refresacar los datos
            "language": espanol

        });
    }


    $('#tabla_venta tbody').on('click', '.imprimir', function() {
        let datos = datatable.row($(this).parents()).data();
        let id = datos.id_venta;
        $.post('../controlador/PDFController.php', { id }, (response) => {
            console.log(response);
            window.open('../pdf/pdf-' + id + '.pdf', '_blank');
        })

    })

    $('#tabla_venta tbody').on('click', '.borrar', function() {
        let datos = datatable.row($(this).parents()).data();
        let id = datos.id_venta;
        funcion = "borrar_venta";
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success m-1',
                cancelButton: 'btn btn-danger m-1'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: 'Estas seguro que desea eliminar la venta: ' + id + '?',
            text: "No podras revertir esta accion!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si, borralo!',
            cancelButtonText: 'No, cancelar!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                $.post('../controlador/DetalleVentaController.php', { funcion, id }, (response) => {
                    console.log(response);
                    if (response == 'delete') {
                        swalWithBootstrapButtons.fire(
                            'Eliminado!',
                            'La venta: ' + id + ' ha sido eliminada.',
                            'success'
                        )
                        listar_ventas();
                    } else if (response == 'nodelete') {
                        swalWithBootstrapButtons.fire(
                            'Cancelado',
                            'No tienes prioridad para eliminar esta venta',
                            'error'
                        )
                    }
                })

            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'Cancelado',
                    'La venta no se elimino',
                    'error'
                )
            }
        })

    })

    $('#tabla_venta tbody').on('click', '.ver', function() {
        let datos = datatable.row($(this).parents()).data();
        let id = datos.id_venta;
        funcion = "ver";
        $('#codigo_venta').html(datos.id_venta);
        $('#fecha').html(datos.fecha);
        $('#cliente').html(datos.cliente);
        $('#dni').html(datos.dni);
        $('#vendedor').html(datos.vendedor);
        $('#total').html(datos.total);
        $.post('../controlador/VentaProductoController.php', { funcion, id }, (response) => {
            let registros = JSON.parse(response);
            let template = "";
            $('#registros').html(template);
            registros.forEach(registro => {
                template += `
                <tr>
                <td>${registro.cantidad}</td>
                <td>${registro.precio}</td>
                <td>${registro.producto}</td>
                <td>${registro.concentracion}</td>
                <td>${registro.adicional}</td>
                <td>${registro.laboratorio}</td>
                <td>${registro.presentacion}</td>
                <td>${registro.tipo}</td>
                <td>${registro.subtotal}</td>
                </tr>
                `;
                $('#registros').html(template);

            });
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