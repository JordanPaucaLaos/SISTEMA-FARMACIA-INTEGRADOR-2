$(document).ready(function() {
    buscar_tip();
    var funcion;
    var edit = false;
    //obtenemos el formulario
    $('#form-crear-tipo').submit(e => {
        //creamos variable local
        let nombre_tipo = $('#nombre-tipo').val();
        let id_editado = $('#id_editar_tip').val();
        if (edit == false) {
            funcion = 'crear';
        } else {
            funcion = 'editar';
        }

        //peticion ajax
        $.post('../controlador/TipoController.php', { nombre_tipo, id_editado, funcion }, (response) => {
            console.log(response);

            $('#add-tipo').hide('slow');
            $('#add-tipo').show(1000);
            $('#add-tipo').hide(2000);
            $('#form-crear-tipo').trigger('reset');
            buscar_tip();

            edit = false;
        });
        e.preventDefault();

    });

    function buscar_tip(consulta) {
        funcion = 'buscar';
        $.post('../controlador/TipoController.php', { consulta, funcion }, (response) => {
            const tipos = JSON.parse(response);
            let template = '';
            tipos.forEach(tipo => {
                template += `
                <tr tipId="${tipo.id}" tipNombre="${tipo.nombre}">
                <td>
                <button class="editar-tip btn btn-success" title="editar tipo" type="button" data-toggle="modal" data-target="#creartipo"><i class="fas fa-pencil-alt"></i></button>
                <button class="borrar-tip btn btn-danger" title="borrar tipo"><i class="fas fa-trash"></i></button>
                
                </td>
                
                <td><i class="fas fa-flask m-2"></i>${tipo.nombre}</td>
                
                

                </tr>
                `;
            });
            $('#tipos').html(template);
        })

    }

    $(document).on('keyup', '#buscar-tipo', function() {
        let valor = $(this).val();
        if (valor != '') {
            buscar_tip(valor);
        } else {

            buscar_tip();
        }
    })

    //capturar datos y enviar al modal




    $(document).on('click', '.borrar-tip', (e) => {
        funcion = "borrar";
        const elemento = $(this)[0].activeElement.parentElement.parentElement;
        const id = $(elemento).attr('tipId');
        const nombre = $(elemento).attr('tipNombre');



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
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si, borralo!',
            cancelButtonText: 'No, cancelalo!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                $.post('../controlador/TipoController.php', { id, funcion }, (response) => {
                    edit == false;
                    console.log(response);
                    $rpta = response;

                    swalWithBootstrapButtons.fire(
                        $rpta,
                        'El tipo ' + nombre + ' fue ' + $rpta,
                        'success'
                    )
                    buscar_tip();

                })


            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'Cancelado',
                    'El tipo ' + nombre + ' no fue borrado',
                    'error'
                )

            }
        })



    })

    $(document).on('click', '.editar-tip', (e) => {

        const elemento = $(this)[0].activeElement.parentElement.parentElement;
        const id = $(elemento).attr('tipId');
        const nombre = $(elemento).attr('tipNombre');
        $('#id_editar_tip').val(id);
        $('#nombre-tipo').val(nombre);
        edit = true;

    })

});