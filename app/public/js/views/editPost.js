$(document).ready(function(){

    var ep = new editPostController();

        $('#editPost-form').ajaxForm({
		    
		    beforeSubmit : function(formData, jqForm, options){
		        //console.log('BEFORESUBMIT_formData: '+ formData.commentBody);
                    //formData.push($('#commentBody').val());
                //console.log('BODY en la funcion ajax: '+ $('#editBody').val() );
                return true;//prueba
		    },
		    success	: function(responseText, status, xhr, $form){
                
                $('.modal-alert').modal('show');
                   // ev.showEmailSuccess("Check your email on how to reset your password.");
		    },
		    error : function(e){
                console.log('ERROR EN EL FORMULARIO DE EDIT POST');
			    //ev.showEmailAlert("Sorry. There was a problem, please try again later.");
		}
	});
    
   //CONFIGURACION DEL MODAL DE MODIFICACION REALIZADA

	$('.modal-alert').modal({ show : false, keyboard : false, backdrop : 'static' });
	$('.modal-alert .modal-header h3').text('Exito!');
	$('.modal-alert .modal-body p').html('Su articulo ha sido modificado.</br>Pulse OK para volver a la pagina de Login.');

 
    
    
    
    
    })