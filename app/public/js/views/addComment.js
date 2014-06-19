$(document).ready(function(){


    var ac = new addCommentController();

    //FORMULARIO AJAX PARA AÑADIR UN COMENTARIO
    	$('#add-comment-form').ajaxForm({
		    
		    beforeSubmit : function(formData, jqForm, options){
		        //console.log('BEFORESUBMIT_formData: '+ formData.commentBody);
                    //formData.push($('#commentBody').val());
                console.log('BODY en la funcion ajax: '+ $('#commentBody').val() );
                return true;//prueba
		    },
		    success	: function(responseText, status, xhr, $form){
                //console.log('SUCCESS EN FORM AJAX, variable status: '+ status);
			    //console.log('mostrando modal');
                $('.modal-alert').modal('show');
                   // ev.showEmailSuccess("Check your email on how to reset your password.");
		    },
		    error : function(e){
                console.log('ERROR EN EL FORMULARIO DE ADDCOMMENT');
			    //ev.showEmailAlert("Sorry. There was a problem, please try again later.");
		}
	});




    $('#account-form-btn2').addClass('btn-primary');
// CONFIGURACION DE MODAL DE CONFIRMACION //

	$('.modal-alert').modal({ show : false, keyboard : false, backdrop : 'static' });
	$('.modal-alert .modal-header h3').text('Exito!');
	$('.modal-alert .modal-body p').html('Tu Comentario ha sido creado.</br>Pulsa OK para volver a la pagina principal.');




})