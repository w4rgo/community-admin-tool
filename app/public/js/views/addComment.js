$(document).ready(function(){


    var ac = new addCommentController();

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
	//$('#addComment').modal('show');
	//$('#addComment').on('shown', function(){})



    $('#account-form-btn2').addClass('btn-primary');
// setup the alert that displays when an account is successfully created //

	$('.modal-alert').modal({ show : false, keyboard : false, backdrop : 'static' });
	$('.modal-alert .modal-header h3').text('Success!');
	$('.modal-alert .modal-body p').html('Tu Comentario ha sido creado.</br>Pulsa OK para volver a la pagina principal.');




})