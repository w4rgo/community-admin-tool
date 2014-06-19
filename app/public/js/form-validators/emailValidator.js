//CLASE VALIDADORA DE EMAIL
function EmailValidator(){

// ENLAZA ESTA FUNCION CON LA VARIABLE _LOCAL PARA FUNCIONES ANONIMAS
    var _local = this;

// VENTANA MODAL PARA PERMITIR QUE LOS USUARIOS PUEDAN RECUPERAR CREDENCIALES POR EMAIL
	_local.retrievePassword = $('#get-credentials');
	_local.retrievePassword.modal({ show : false, keyboard : true, backdrop : true });
	_local.retrievePasswordAlert = $('#get-credentials .alert');
	_local.retrievePassword.on('show', function(){ $('#get-credentials-form').resetForm(); _local.retrievePasswordAlert.hide();});

}
//FUNCIONES AUXILIARES
EmailValidator.prototype.validateEmail = function(e)
{
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(e);
}

EmailValidator.prototype.showEmailAlert = function(m)
{
	this.retrievePasswordAlert.attr('class', 'alert alert-error');
	this.retrievePasswordAlert.html(m);
	this.retrievePasswordAlert.show();
}

EmailValidator.prototype.hideEmailAlert = function()
{
    this.retrievePasswordAlert.hide();
}

EmailValidator.prototype.showEmailSuccess = function(m)
{
	this.retrievePasswordAlert.attr('class', 'alert alert-success');
	this.retrievePasswordAlert.html(m);
	this.retrievePasswordAlert.fadeIn(500);
}