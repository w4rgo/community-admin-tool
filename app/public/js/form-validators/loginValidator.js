//VALIDADOR DE LOGUEADO
function LoginValidator(){

//ENLAZA UNA VENTANA MODAL DE ALERTA CON ESTE CONTROLADOR PARA MOSTRAR LOS ERRORES 

	this.loginErrors = $('.modal-alert');
	this.loginErrors.modal({ show : false, keyboard : true, backdrop : true });

	this.showLoginError = function(t, m)
	{
		$('.modal-alert .modal-header h3').text(t);
		$('.modal-alert .modal-body p').text(m);
		this.loginErrors.modal('show');
	}

}

LoginValidator.prototype.validateForm = function()
{
	if ($('#user-tf').val() == ''){
		this.showLoginError('Whoops!', 'Please enter a valid username');
		return false;
	}	else if ($('#pass-tf').val() == ''){
		this.showLoginError('Whoops!', 'Please enter a valid password');
		return false;
	}	else{
		return true;
	}
}