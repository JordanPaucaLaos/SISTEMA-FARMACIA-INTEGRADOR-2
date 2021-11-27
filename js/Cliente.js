$('.modal').on('hidden.bs.modal', function() {
    $(this).find('form').trigger('reset');
})
$(document).ready(function() {

    buscar_cliente();
    var funcion;

    function buscar_cliente(consulta) {
        funcion = 'buscar';
        $.post('../controlador/ClienteController.php', { consulta, funcion }, (response) => {

            console.log(response);

            const clientes = JSON.parse(response);
            let template = '';
            clientes.forEach(cliente => {

                template += `
                <div cliId="${cliente.id}" cliNombre="${cliente.nombre}" cliApellidos="${cliente.apellidos}" cliTelefono="${cliente.telefono}" cliCorreo="${cliente.correo}" cliAdicional="${cliente.adicional}" class="col-12 col-sm-6 col-md-4 d-flex align-items-stretch flex-column">
              <div class="card bg-light d-flex flex-fill">
                <div class="card-header text-muted border-bottom-0">
                  <h1 class="badge badge-info">Cliente</h1>
                </div>
                <div class="card-body pt-0">
                  <div class="row">
                    <div class="col-7">
                      <h2 class="lead"><b>${cliente.nombre} ${cliente.apellidos}</b></h2>
                      
                      <ul class="ml-4 mb-0 fa-ul text-muted">
                      <li class="small"><span class="fa-li"><i class="far fa-id-card"></i></span> DNI: ${cliente.dni}</li>
                      <li class="small"><span class="fa-li"><i class="fas fa-birthday-cake"></i></span> Edad: ${cliente.edad}</li>  
                      <li class="small"><span class="fa-li"><i class="fas fa-lg fa-phone"></i></span> Telefono: ${cliente.telefono}</li>
                        <li class="small"><span class="fa-li"><i class="fas fa-lg fa-at"></i></span> Correo #: ${cliente.correo}</li>
                        <li class="small"><span class="fa-li"><i class="fas fa-venus-mars"></i></span> Sexo: ${cliente.sexo}</li>
                        <li class="small"><span class="fa-li"><i class="fas fa-sticky-note"></i></span> Adicional: ${cliente.adicional}</li>
                     
                      </ul>
                    </div>
                    <div class="col-5 text-center">
                      <img src="${cliente.avatar}" alt="user-avatar" class="img-circle img-fluid">
                    </div>
                  </div>
                </div>
                <div class="card-footer">
                  <div class="text-right">
                    
                    <button class="editar btn btn-sm btn-success" title="editar cliente" type="button" data-toggle="modal" data-target="#editarcliente">
                      <i class="fas fa-pencil-alt"></i>
                    </button>
                    <button class="borrar btn btn-sm btn-danger" title="borrar cliente">
                      <i class="fas fa-trash-alt"></i>
                    </button>
                    
                  </div>
                </div>
              </div>
            </div>`;
            });
            $('#clientes').html(template);

        });

    }
    $(document).on('keyup', '#buscar_cliente', function() {
        let valor = $(this).val();
        if (valor != '') {
            buscar_cliente(valor);
        } else {
            buscar_cliente();
        }
    });


    $('#form-crear-cliente').submit(e => {


        let nombre = $('#nombre').val();
        let apellidos = $('#apellidos').val();
        let dni = $('#dni').val();
        let edad = $('#edad').val();
        let telefono = $('#telefono').val();
        let correo = $('#correo').val();
        let sexo = $('#sexo').val();
        let adicional = $('#adicional').val();
        funcion = "crear";

        $.post('../controlador/ClienteController.php', { nombre, apellidos, dni, edad, telefono, correo, sexo, adicional, funcion }, (response) => {
            if (response == 'add') {
                $('#add-cli').hide('slow');
                $('#add-cli').show(1000);
                $('#add-cli').hide(2000);
                $('#form-crear-cliente').trigger('reset');
                buscar_cliente();

            }
            if (response == 'noadd' || response == 'noedit') {
                $('#noadd-cli').hide('slow');
                $('#noadd-cli').show(1000);
                $('#noadd-cli').hide(2000);
                $('#form-crear-cliente').trigger('reset');
            }

        })
        e.preventDefault();
    });

    $(document).on('click', '.editar', (e) => {
        let elemento = $(this)[0].activeElement.parentElement.parentElement.parentElement.parentElement;
        let nombre = $(elemento).attr('cliNombre');
        let apellidos = $(elemento).attr('cliApellidos');
        let telefono = $(elemento).attr('cliTelefono');
        let correo = $(elemento).attr('cliCorreo');
        let adicional = $(elemento).attr('cliAdicional');
        let id = $(elemento).attr('cliId');
        $('#nombre_edit').val(nombre);
        $('#apellidos_edit').val(apellidos);
        $('#telefono_edit').val(telefono);
        $('#correo_edit').val(correo);
        $('#adicional_edit').val(adicional);
        $('#id_cliente').val(id);

    });

    $('#form-editar').submit(e => {

        let id = $('#id_cliente').val();
        let nombre = $('#nombre_edit').val();
        let apellidos = $('#apellidos_edit').val();
        let telefono = $('#telefono_edit').val();
        let correo = $('#correo_edit').val();
        let adicional = $('#adicional_edit').val();
        funcion = "editar";

        $.post('../controlador/ClienteController.php', { id, nombre, apellidos, telefono, correo, adicional, funcion }, (response) => {
            console.log(response);
            if (response == 'edit') {
                $('#edit-cli').hide('slow');
                $('#edit-cli').show(1000);
                $('#edit-cli').hide(2000);
                $('#form-editar').trigger('reset');
                buscar_cliente();

            }
            if (response == 'noedit' || response == 'noedit') {
                $('#noedit-cli').hide('slow');
                $('#noedit-cli').show(1000);
                $('#noedit-cli').hide(2000);
                $('#form-editar').trigger('reset');
            }

        })
        e.preventDefault();
    });

    $(document).on('click', '.borrar', (e) => {
        funcion = "borrar";
        let elemento = $(this)[0].activeElement.parentElement.parentElement.parentElement.parentElement;
        let id = $(elemento).attr('cliId');
        let nombre = $(elemento).attr('cliNombre');
        let apellidos = $(elemento).attr('cliApellidos');
        let avatar = '../imagenes/cliente/cliente_default.png';


        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger mr-1'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: 'Desea eliminar ' + nombre + ' ' + apellidos + '?',
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
                $.post('../controlador/ClienteController.php', { id, funcion }, (response) => {

                    if (response == 'borrado') {
                        swalWithBootstrapButtons.fire(
                            'Borrado!',
                            'El cliente ' + nombre + ' ' + apellidos + ' fue borrado',
                            'success'
                        )
                        buscar_cliente();
                    } else {
                        swalWithBootstrapButtons.fire(
                            'No se pudo borrar!',
                            'El cliente ' + nombre + ' ' + apellidos + ' no fue borrado',
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
                    'El cliente ' + nombre + ' ' + apellidos + ' no fue borrado',
                    'error'
                )

            }
        })



    })
})