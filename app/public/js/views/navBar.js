$(document).ready(function(){

	var hc = new navBarController();
    


    //CUSTOMIZACION DEL FORMULARIO PARA LAS PROPIEDADES DE LA CUENTA //
	
	$('#account-form h1').text('Propiedades Cuenta');
	$('#account-form #sub1').text('Aqui se muestran las propiedades de su cuenta.');
	$('#user-tf').attr('disabled', 'disabled');
	$('#account-form-btn1').html('Borrar');
	$('#account-form-btn1').addClass('btn-danger');
	$('#account-form-btn2').html('Actualizar');

// CONFIGURACION DE LOS MODALES PARA EL CASO DE QUE SE ELIJA BORRAR LA CUENTA 

	$('.modal-confirm').modal({ show : false, keyboard : true, backdrop : true });
	$('.modal-confirm .modal-header h3').text('Borrar Cuenta');
	$('.modal-confirm .modal-body p').html('¿Estas seguro de que deseas borrar tu cuenta?');
	$('.modal-confirm .cancel').html('Cancelar');
	$('.modal-confirm .submit').html('Borrar');
	$('.modal-confirm .submit').addClass('btn-danger');


 //METODO PARA DELOGUEARSE
    this.attemptLogout = function()
	{
		var that = this;
		$.ajax({
			url: "/home",
			type: "POST",
			data: {logout : true},
			success: function(data){
	 			that.showLockedAlert('Estas deslogueado.<br>Redirigiendo al Home.');
			},
			error: function(jqXHR){
				console.log(jqXHR.responseText+' :: '+jqXHR.statusText);
			}
		});
	}



})