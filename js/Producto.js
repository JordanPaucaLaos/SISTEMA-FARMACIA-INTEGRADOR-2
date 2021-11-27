$('.modal').on('hidden.bs.modal', function() {
    $(this).find('form').trigger('reset');
})

$('#crearproducto').on('shown.bs.modal', function() {
    $('#nombre_producto').focus()
})

$(document).ready(function() {
    var funcion;
    var edit = false;
    $('.select2').select2();
    rellenar_laboratorios();
    rellenar_tipos();
    rellenar_presentaciones();
    buscar_producto();
    rellenar_proveedores();


    function rellenar_proveedores() {
        funcion = "rellenar_proveedores";
        $.post('../controlador/ProveedorController.php', { funcion }, (response) => {
            const proveedores = JSON.parse(response);
            let template = '';
            proveedores.forEach(proveedor => {
                template += `
                <option value="${proveedor.id}">${proveedor.nombre}</option>
                `;
            });
            $('#proveedor').html(template);
        })
    }

    function rellenar_laboratorios() {
        funcion = "rellenar_laboratorios";
        $.post('../controlador/LaboratorioController.php', { funcion }, (response) => {
            const laboratorios = JSON.parse(response);
            let template = '';
            laboratorios.forEach(laboratorio => {
                template += `
                <option value="${laboratorio.id}">${laboratorio.nombre}</option>
                `;
            });
            $('#laboratorio').html(template);
        })
    }

    function rellenar_tipos() {
        funcion = "rellenar_tipos";
        $.post('../controlador/TipoController.php', { funcion }, (response) => {
            const tipos = JSON.parse(response);
            let template = '';
            tipos.forEach(tipo => {
                template += `
                <option value="${tipo.id}">${tipo.nombre}</option>
                `;
            });
            $('#tipo').html(template);
        })
    }





    function rellenar_presentaciones() {
        funcion = "rellenar_presentaciones";
        $.post('../controlador/PresentacionController.php', { funcion }, (response) => {
            const presentaciones = JSON.parse(response);
            let template = '';
            presentaciones.forEach(presentacion => {
                template += `
                <option value="${presentacion.id}">${presentacion.nombre}</option>
                `;
            });
            $('#presentacion').html(template);
        })
    }
    $('#form-crear-producto').submit(e => {

        let id = $('#id_edit_prod').val();
        let nombre = $('#nombre_producto').val();
        let concentracion = $('#concentracion').val();
        let adicional = $('#adicional').val();
        let precio = $('#precio').val();
        let laboratorio = $('#laboratorio').val();
        let tipo = $('#tipo').val();
        let presentacion = $('#presentacion').val();
        if (edit == true) {
            funcion = "editar";
        } else {
            funcion = "crear";
        }
        $.post('../controlador/ProductoController.php', { funcion, id, nombre, concentracion, adicional, precio, laboratorio, tipo, presentacion }, (response) => {

            if (response == 'add') {
                $('#add').hide('slow');
                $('#add').show(1000);
                $('#add').hide(2000);
                $('#form-crear-producto').trigger('reset');
                $('#laboratorio').val('').trigger('change');
                $('#tipo').val('').trigger('change');
                $('#presentacion').val('').trigger('change');
                buscar_producto();
            }
            if (response == 'edit') {
                $('#edit_prod').hide('slow');
                $('#edit_prod').show(1000);
                $('#edit_prod').hide(2000);
                $('#form-crear-producto').trigger('reset');
                $('#laboratorio').val('').trigger('change');
                $('#tipo').val('').trigger('change');
                $('#presentacion').val('').trigger('change');
                buscar_producto();
            }
            if (response == 'noadd') {
                $('#noadd').hide('slow');
                $('#noadd').show(1000);
                $('#noadd').hide(2000);
                $('#form-crear-producto').trigger('reset');
            }
            if (response == 'noedit') {
                $('#noadd').hide('slow');
                $('#noadd').show(1000);
                $('#noadd').hide(2000);
                $('#form-crear-producto').trigger('reset');
            }
            edit = false;

        });
        e.preventDefault();


    });

    function buscar_producto(consulta) {
        funcion = "buscar";
        $.post('../controlador/ProductoController.php', { consulta, funcion }, (response) => {

            const productos = JSON.parse(response);
            let template = '';
            productos.forEach(producto => {
                template += `
                <div prodId="${producto.id}" prodNombre="${producto.nombre}" prodPrecio="${producto.precio}" prodConcentracion="${producto.concentracion}" prodAdicional="${producto.adicional}" prodLaboratorio="${producto.laboratorio_id}" prodTipo="${producto.tipo_id}" prodPresentacion="${producto.presentacion_id}" prodAvatar="${producto.avatar}" class="col-12 col-sm-6 col-md-4 d-flex align-items-stretch flex-column">
              <div class="card bg-light d-flex flex-fill">
                <div class="card-header text-muted border-bottom-0">
                  <i class="fas fa-lg fa-cubes mr-1"></i>${producto.stock}
                </div>
                <div class="card-body pt-0">
                  <div class="row">
                    <div class="col-7">
                      <h2 class="lead"><b>${producto.nombre}</b><i class="fas fa-notes-medical ml-1"></i></h2>
                      <h4 class="lead"><b><i class="fas fa-money-bill-alt mr-1"></i>${producto.precio}</b></h4>
                      
                      <ul class="ml-4 mb-0 fa-ul text-muted">
                        <li class="small"><span class="fa-li"><i class="fas fa-lg fa-mortar-pestle"></i></span> Concentracion: ${producto.concentracion}</li>
                        <li class="small"><span class="fa-li"><i class="fas fa-lg fa-prescription-bottle-alt"></i></span> Adicional: ${producto.adicional}</li>
                        <li class="small"><span class="fa-li"><i class="fas fa-lg fa-flask"></i></span> Laboratorio: ${producto.laboratorio}</li>
                        <li class="small"><span class="fa-li"><i class="fas fa-lg fa-copyright"></i></span> Tipo: ${producto.tipo}</li>
                        <li class="small"><span class="fa-li"><i class="fas fa-lg fa-pills"></i></span> Presentacion: ${producto.presentacion}</li>
                      
                      </ul>
                    </div>
                    <div class="col-5 text-center">
                      <img src="${producto.avatar}" alt="user-avatar" class="img-circle img-fluid">
                    </div>
                  </div>
                </div>
                <div class="card-footer">
                  <div class="text-right">
                    <button class="avatar btn btn-sm bg-teal" type="button" title="cambiar logo producto" data-toggle="modal" data-target="#cambiologo">
                      <i class="fas fa-image"></i>
                    </button>
                    <button class="editar btn btn-sm btn-success" type="button" data-toggle="modal" data-target="#crearproducto">
                      <i class="fas fa-pencil-alt mr-1"></i>Editar
                    </button>                    
                    <button class="borrar btn btn-sm btn-danger">
                      <i class="fas fa-trash-alt"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>`;

            });
            $('#productos').html(template);
        })

    }

    $(document).on('keyup', '#buscar-producto', function() {
        let valor = $(this).val();
        if (valor != "") {
            buscar_producto(valor);

        } else {
            buscar_producto();
        }

    });


    $(document).on('click', '.avatar', (e) => {
        funcion = "cambiar_avatar";
        const elemento = $(this)[0].activeElement.parentElement.parentElement.parentElement.parentElement;
        const id = $(elemento).attr('prodId');
        const avatar = $(elemento).attr('prodAvatar');
        const nombre = $(elemento).attr('prodNombre');
        $('#funcion').val(funcion);
        $('#id_logo_prod').val(id);
        $('#avatar').val(avatar);
        $('#logoactual').attr('src', avatar);
        $('#nombre_logo').html(nombre);

    });

    $('#form-logo').submit(e => {
        let formData = new FormData($('#form-logo')[0]);
        $.ajax({
            url: '../controlador/ProductoController.php',
            type: 'POST',
            data: formData,
            cache: false,
            processData: false,
            contentType: false

        }).done(function(response) {
            const json = JSON.parse(response);
            if (json.alert == 'edit') {
                $('#logoactual').attr('src', json.ruta);
                $('#edit').hide('slow');
                $('#edit').show(1000);
                $('#edit').hide(2000);
                $('#form-logo').trigger('reset');
                buscar_producto();

            } else {
                $('#noedit').hide('slow');
                $('#noedit').show(1000);
                $('#noedit').hide(2000);
                $('#form-logo').trigger('reset');

            }
        });
        e.preventDefault();
    });

    $(document).on('click', '.editar', (e) => {

        const elemento = $(this)[0].activeElement.parentElement.parentElement.parentElement.parentElement;
        const id = $(elemento).attr('prodId');
        const nombre = $(elemento).attr('prodNombre');
        const concentracion = $(elemento).attr('prodConcentracion');
        const adicional = $(elemento).attr('prodAdicional');
        const precio = $(elemento).attr('prodPrecio');
        const laboratorio = $(elemento).attr('prodLaboratorio');
        const tipo = $(elemento).attr('prodTipo');
        const presentacion = $(elemento).attr('prodPresentacion');

        $('#id_edit_prod').val(id);
        $('#nombre_producto').val(nombre);
        $('#concentracion').val(concentracion);
        $('#adicional').val(adicional);
        $('#precio').val(precio);
        $('#laboratorio').val(laboratorio).trigger('change');
        $('#tipo').val(tipo).trigger('change');
        $('#presentacion').val(presentacion).trigger('change');
        edit = true;
    });


    $(document).on('click', '.borrar', (e) => {
        funcion = "borrar";
        const elemento = $(this)[0].activeElement.parentElement.parentElement.parentElement.parentElement;
        const id = $(elemento).attr('prodId');
        const nombre = $(elemento).attr('prodNombre');
        const avatar = $(elemento).attr('prodAvatar');


        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger mr-1'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: 'Desea eliminar ' + nombre + '?',
            text: "No podra revertir esta accion!",
            imageUrl: '' + avatar + '',
            imageWidth: 100,
            imageHeight: 100,
            showCancelButton: true,
            confirmButtonText: 'Si, borralo!',
            cancelButtonText: 'No, cancelalo!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                $.post('../controlador/ProductoController.php', { id, funcion }, (response) => {
                    console.log(response);
                    edit == false;
                    if (response == 'borrado') {
                        swalWithBootstrapButtons.fire(
                            'Borrado!',
                            'El producto ' + nombre + ' fue borrado',
                            'success'
                        )
                        buscar_producto();
                    } else {
                        swalWithBootstrapButtons.fire(
                            'No se pudo borrar!',
                            'El producto ' + nombre + ' no fue borrado porque tiene stock disponible',
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
                    'El producto ' + nombre + ' no fue borrado',
                    'error'
                )

            }
        })

    })

    $(document).on('click', '#button-reportePDF', (e) => {

        Mostrar_Loader('generarReportePDF');
        funcion = 'reporte_productosPDF';
        $.post('../controlador/ProductoController.php', { funcion }, (response) => {
            console.log(response);
            if (response == "") {
                Cerrar_Loader("exito_reporte");

                window.open('../pdf/pdf-' + funcion + '.pdf', '_blank')

            } else {
                Cerrar_Loader("error_reporte");
            }


        })
    });

    $(document).on('click', '#button-reporteExcel', (e) => {

        //Mostrar_Loader('generarReportePDF');
        funcion = 'reporte_productosExcel';
        $.post('../controlador/ProductoController.php', { funcion }, (response) => {
            console.log(response);
            if (response == "") {
                //Cerrar_Loader("exito_reporte");
                window.open('../Excel/reporte_productos.xlsx', '_blank')

            } else {
                //Cerrar_Loader("error_reporte");
            }


        })
    });

    function Mostrar_Loader(Mensaje) {
        var texto = null;
        var mostrar = false;
        var timer = 0;
        switch (Mensaje) {
            case 'generarReportePDF':

                texto = 'Se esta generando el reporte en formato PDF, porfavor espere...';
                mostrar = true;
                timer = 2000;
                break;
        }
        if (mostrar) {
            Swal.fire({

                    title: 'Generando Reporte',
                    text: texto,

                    timer: timer

                },
                function() {

                    swal.close();

                });

        }
    }

    function Cerrar_Loader(Mensaje) {
        var tipo = null;
        var texto = null;
        var mostrar = false;
        var timer = 0;
        switch (Mensaje) {
            case 'exito_reporte':
                tipo = 'success';
                texto = 'El reporte fue generado correctamente';
                mostrar = true;
                timer = 4000;
                break;

            case 'error_reporte':
                tipo = 'error';
                texto = 'El reporte no pudo generarse, comuniquese con el personal de sistemas ';
                mostrar = true;
                timer = 3000;
                break;

            case 'error_usuario':
                tipo = 'error';
                texto = 'El usuario no fue encontrado';
                mostrar = true;
                break;
            default:
                Swal.fire({

                        text: "error!!",
                        icon: "error",
                        timer: 1000
                    },
                    function() {

                        swal.close();

                    });
                break;
        }
        if (mostrar) {
            Swal.fire({
                position: 'center',
                icon: tipo,
                text: texto,
                timer: timer,
                showConfirmButton: false

            })

        }
    }
})