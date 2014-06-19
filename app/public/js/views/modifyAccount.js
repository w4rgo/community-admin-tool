
$(document).ready(function(){

	var maController = new modifyAccountController();
	var av = new AccountValidator();
	
    //FORMULARIO AJAX PARA MODIFICAR UNA CUENTA
	$('#account-form').ajaxForm({
		beforeSubmit : function(formData, jqForm, options){
			if (av.validateForm() == false){
				return false;
			} 	else{
			// push the disabled username field onto the form data array //
				formData.push({name:'user', value:$('#user-tf').val()})
				return true;
			}
		},
		success	: function(responseText, status, xhr, $form){
			if (status == 'success') hc.onUpdateSuccess();
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
	$('#github-banner').css('top', '41px');

// CUSTOMIZACION DEL FORMULARIO MODIFICADO DE CUENTA
	
	$('#account-form h1').text('Modificacion de cuenta');
	$('#account-form #sub1').text('A continuacion se muestran las propiedades de su cuenta.');
	$('#user-tf').attr('disabled', 'disabled');
	$('#account-form-btn1').html('Borrar');
	$('#account-form-btn1').addClass('btn-danger');
	$('#account-form-btn2').html('Actualizar');

// CUSTOMIZACION DE LA VENTANA MODAL DE CONFIRMACION EN EL CASO DE BORRADO DE CUENTA 

	$('.modal-confirm').modal({ show : false, keyboard : true, backdrop : true });
	$('.modal-confirm .modal-header h3').text('Borrar Cuenta');
	$('.modal-confirm .modal-body p').html('¿Esta seguro de que desea eliminar su cuenta?');
	$('.modal-confirm .cancel').html('Cancelar');
	$('.modal-confirm .submit').html('Borrar');
	$('.modal-confirm .submit').addClass('btn-danger');

})