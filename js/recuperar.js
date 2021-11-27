$(document).ready(function() {
    $('#aviso1').hide();
    $('#aviso').hide();
    $('#form-recuperar').submit(e => {
        $('#aviso1').hide();
        $('#aviso').hide();
        Mostrar_Loader('Recuperar_password');
        let email = $('#email-recuperar').val();
        let dni = $('#dni-recuperar').val();
        if (email == '' || dni == '') {
            $('#aviso').show();
            $('#aviso').text('Rellene todos los campos');
            Cerrar_Loader("");
        } else {
            $('#aviso').hide();
            let funcion = 'verificar';
            $.post('../controlador/RecuperarController.php', { funcion, email, dni }, (response) => {
                if (response == 'encontrado') {
                    let funcion = 'recuperar';
                    $('#aviso').hide();
                    $.post('../controlador/RecuperarController.php', { funcion, email, dni }, (response2) => {
                        $('#aviso').hide();
                        $('#aviso1').hide();

                        if (response2 == 'enviado') {
                            Cerrar_Loader('exito_envio');
                            $('#aviso1').show();
                            $('#aviso1').text('se restablecio la contraseña');
                            $('#form-recuperar').trigger('reset');


                        } else {
                            Cerrar_Loader('error_envio');
                            $('#aviso').show();
                            $('#aviso').text('no se puede restablecer');
                            $('#form-recuperar').trigger('reset');
                        }
                    })


                } else {
                    Cerrar_Loader('error_usuario');
                    $('#aviso').hide();
                    $('#aviso1').hide();
                    $('#aviso').show();
                    $('#aviso').text('El correo y dni no se encuentran asociados o no estan registrados en el sistema');


                }
            })
        }


        e.preventDefault();

    })

    function Mostrar_Loader(Mensaje) {
        var texto = null;
        var mostrar = false;
        switch (Mensaje) {
            case 'Recuperar_password':

                texto = 'Se esta enviando el correo, porfavor espere...';
                mostrar = true;
                break;
        }
        if (mostrar) {
            Swal.fire({

                title: 'Enviando correo',
                text: texto,

                showConfirmButton: false

            })

        }
    }

    function Cerrar_Loader(Mensaje) {
        var tipo = null;
        var texto = null;
        var mostrar = false;
        var timer = 0;
        switch (Mensaje) {
            case 'exito_envio':
                tipo = 'success';
                texto = 'Se envio el correo perfectamente';
                mostrar = true;
                break;

            case 'error_envio':
                tipo = 'error';
                texto = 'El correo no se pudo enviar, porfavor intentelo de nuevo';
                mostrar = true;
                break;

            case 'error_usuario':
                tipo = 'error';
                texto = 'El usuario no fue encontrado';
                mostrar = true;
                break;
            default:
                Swal.fire({

                        text: "Rellene los campos vacios!!",
                        icon: "warning",
                        timer: 2000
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
                timer: 4000,
                showConfirmButton: false

            })

        }
    }
})