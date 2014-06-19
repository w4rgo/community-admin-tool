
$(document).ready(function(){
	
	var av = new AccountValidator();
	var sc = new SignupController();
	
    //FORMUALRIO AJAX PARA CREACION DE CUENTAS
	$('#account-form').ajaxForm({
		beforeSubmit : function(formData, jqForm, options){
			return av.validateForm();
		},
		success	: function(responseText, status, xhr, $form){
			if (status == 'success') $('.modal-alert').modal('show');
		},
		error : function(e){
			if (e.responseText == 'email-taken'){
			    av.showInvalidEmail();
			}	else if (e.responseText == 'username-taken'){
			    av.showInvalidUserName();
			}
		}
	});
	$('#name-tf').focus();
	
// CODIGO PARA CUSTOMIZAR EL FORMULARIO DE REGISTRO //
	$('#account-form h1').text('Crear Cuenta');
	$('#account-form #sub1').text('Por favor cuentenos algo acerca de usted');
	$('#account-form #sub2').text('Introduzca su username & password');
	$('#account-form-btn1').html('Cancelar');
	$('#account-form-btn2').html('Submit');
	$('#account-form-btn2').addClass('btn-primary');
	
// CODIGO PARA EL MOSTRAR POP-UPS MODALES //
	$('.modal-alert').modal({ show : false, keyboard : false, backdrop : 'static' });
	$('.modal-alert .modal-header h3').text('Exito!');
	$('.modal-alert .modal-body p').html('Su cuenta ha sido creada.</br>Pulse OK para volver a la pagina de login.');

})