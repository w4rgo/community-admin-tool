//FUNCION PARA REINICIAR EL PASSWORD
function ResetValidator(){
    
//VENTANA MODAL PARA QUE LOS USUARIOS REINICIEN SU PASSWORD
    this.setPassword = $('#set-password');
    this.setPassword.modal({ show : false, keyboard : false, backdrop : 'static' });
    this.setPasswordAlert = $('#set-password .alert');
}

ResetValidator.prototype.validatePassword = function(s)
{
	if (s.length >= 6){
		return true;
	}	else{
		this.showAlert('Password Should Be At Least 6 Characters');
		return false;
	}
}
//METODOS AUXILIARES
ResetValidator.prototype.showAlert = function(m)
{
	this.setPasswordAlert.attr('class', 'alert alert-error');
	this.setPasswordAlert.html(m);
	this.setPasswordAlert.show();
}

ResetValidator.prototype.hideAlert = function()
{
    this.setPasswordAlert.hide();
}

ResetValidator.prototype.showSuccess = function(m)
{
	this.setPasswordAlert.attr('class', 'alert alert-success');
	this.setPasswordAlert.html(m);
	this.setPasswordAlert.fadeIn(500);
}