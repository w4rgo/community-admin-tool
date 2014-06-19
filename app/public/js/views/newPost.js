$(document).ready(function(){

    
    
    var hc = new videoController();
    var npc = new newPostController();
    var pv = new PostValidator();

    //FORMULARIO AJAX PARA AÑADIR NUEVO ARTICULO
    $('#newPost-form').ajaxForm({
		beforeSubmit : function(formData, jqForm, options){
			return pv.validateForm();
		},
		success	: function(responseText, status, xhr, $form){
			if (status == 'success') $('.modal-alert').modal('show');
		},
		error : function(e){
			if (e.responseText == 'title-taken'){
                
			    pv.showInvalidTitle();
			}
		}
	});
    
    
    //CONFIGURACUION DE LAS ALERTAS MODALES CUANDO SE CREA LA CUENTA //

	$('.modal-alert').modal({ show : false, keyboard : false, backdrop : 'static' });
	$('.modal-alert .modal-header h3').text('Success!');
	$('.modal-alert .modal-body p').html('Su articulo ha sido creado</br>Pulse OK para volver a la pagina de Login.');




    })

