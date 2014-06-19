
$(document).ready(function(){
	
	var lv = new LoginValidator();
	var lc = new LoginController();

//FORMULARIO PRINCIPAL DE LOGIN
	$('#login-form').ajaxForm({
		beforeSubmit : function(formData, jqForm, options){
			if (lv.validateForm() == false){
				return false;
			} 	else{
			// append 'remember-me' option to formData to write local cookie //
				formData.push({name:'remember-me', value:$("input:checkbox:checked").length == 1})
				return true;
			}
		},
		success	: function(responseText, status, xhr, $form){
			if (status == 'success') window.location.href = '/home';
		},
		error : function(e){
            lv.showLoginError('Fallo Login', 'Por favor revise su Username y/o Password');
		}
	}); 
	$('#user-tf').focus();
	
//OBTENCION DEL LOGIN EN BASE AL EMAIL
	
	var ev = new EmailValidator();
	
	$('#get-credentials-form').ajaxForm({
		url: '/lost-password',
		beforeSubmit : function(formData, jqForm, options){
			if (ev.validateEmail($('#email-tf').val())){
				ev.hideEmailAlert();
				return true;
			}	else{
				ev.showEmailAlert("<b> Error!</b> Por favor introduzca un Email valido");
				return false;
			}
		},
		success	: function(responseText, status, xhr, $form){
			ev.showEmailSuccess("Compruebe su email para restablecer su password.");
		},
		error : function(){
			ev.showEmailAlert("Vaya. Se ha producido un error, por favor intentelo de nuevo mas tarde.");
		}
	});
	
})