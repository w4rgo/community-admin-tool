
//VALIDADORES DE CUENTA
function AccountValidator(){

// CONSTRUYE UN ARRAY CON LOS CAMPOS A VALIDAR //
	this.formFields = [$('#name-tf'), $('#email-tf'), $('#user-tf'), $('#pass-tf')];
	this.controlGroups = [$('#name-cg'), $('#email-cg'), $('#user-cg'), $('#pass-cg')];
	
//ENLAZA LA VENTANA MODAL DE ERRORES DEL FORMULARIO CON ESTE CONTROLADOR PARA MOSTRAR CUALQUIER ERROR 
	
	this.alert = $('.modal-form-errors');
	this.alert.modal({ show : false, keyboard : true, backdrop : true});
	
	this.validateName = function(s)
	{
		return s.length >= 3;
	}
	
	this.validatePassword = function(s)
	{
	//if user is logged in and hasn't changed their password, return ok
		if ($('#userId').val() && s===''){
			return true;
		}	else{
			return s.length >= 6;
		}
	}
//METODO PARA VALIDACION DE EMAIL
	this.validateEmail = function(e)
	{
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(e);
	}
	
	this.showErrors = function(a)
	{
		$('.modal-form-errors .modal-body p').text('Por favor corrija los siguientes problemas :');
		var ul = $('.modal-form-errors .modal-body ul');
			ul.empty();
		for (var i=0; i < a.length; i++) ul.append('<li>'+a[i]+'</li>');
		this.alert.modal('show');
	}

}
//METODOS AUXILIARES
AccountValidator.prototype.showInvalidEmail = function()
{
	this.controlGroups[1].addClass('error');
	this.showErrors(['El email ya esta en uso.']);
}

AccountValidator.prototype.showInvalidUserName = function()
{
	this.controlGroups[2].addClass('error');
	this.showErrors(['El username ya esta en uso.']);
}

AccountValidator.prototype.validateForm = function()
{
	var e = [];
	for (var i=0; i < this.controlGroups.length; i++) this.controlGroups[i].removeClass('error');
	if (this.validateName(this.formFields[0].val()) == false) {
		this.controlGroups[0].addClass('error'); e.push('Por favor introduzca su nombre');
	}
	if (this.validateEmail(this.formFields[1].val()) == false) {
		this.controlGroups[1].addClass('error'); e.push('Por favor introduzca un email valido');
	}
	if (this.validateName(this.formFields[2].val()) == false) {
		this.controlGroups[2].addClass('error');
		e.push('Por favor introduzca un Username');
	}
	if (this.validatePassword(this.formFields[3].val()) == false) {
		this.controlGroups[3].addClass('error');
		e.push('El Password debe ser de 6 letras como minimo');
	}
	if (e.length) this.showErrors(e);
	return e.length === 0;
}

	