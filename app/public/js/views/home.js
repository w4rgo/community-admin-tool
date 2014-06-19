
$(document).ready(function(){

	var hc = new HomeController();
	var av = new AccountValidator();
	
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

// customize the account settings form //
	
	$('#account-form h1').text('Propiedades de cuenta');
	$('#account-form #sub1').text('Aqui se muestran las propiedades de su cuenta.');
	$('#user-tf').attr('disabled', 'disabled');
	$('#account-form-btn1').html('Borrar');
	$('#account-form-btn1').addClass('btn-danger');
	$('#account-form-btn2').html('Actualizar');

// setup the confirm window that displays when the user chooses to delete their account //

	$('.modal-confirm').modal({ show : false, keyboard : true, backdrop : true });
	$('.modal-confirm .modal-header h3').text('Borrar Cuenta');
	$('.modal-confirm .modal-body p').html('¿Esta seguro de que desea borrar su cuenta?');
	$('.modal-confirm .cancel').html('Cancelar');
	$('.modal-confirm .submit').html('Borrar');
	$('.modal-confirm .submit').addClass('btn-danger');


// setup the confirm window that displays when the user chooses to add a comment //

	$('.addComment').modal({ show : false, keyboard : true, backdrop : true });
	$('.addComment .modal-header h3').text('Comentar');
	//$('.modal-addcomment .modal-body p').html('<textarea rows="4" cols="50">');
	$('.addComment .cancel').html('Cancelar');
	$('.addComment .submit').html('Enviar');
	$('.addComment .submit').addClass('btn-danger');
   // $('.addComment button#submit').click(function(){window.location.href = '/home';})




})