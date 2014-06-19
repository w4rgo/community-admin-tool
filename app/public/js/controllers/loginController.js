/*
LoginController: Controlador para la pagina de logueo

*/
function LoginController()
{

// Vincula EventListeners a clicks de botones //
	
	$('#login-form #forgot-password').click(function(){ $('#get-credentials').modal('show');});
	
//Automaticamente cambia el enfoque desde la ventana modal del email y el formulario de logueo

    $('#get-credentials').on('shown', function(){ $('#email-tf').focus(); });
	$('#get-credentials').on('hidden', function(){ $('#user-tf').focus(); });

}


