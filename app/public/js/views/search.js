$(document).ready(function(){

    var pv = new PostValidator();

    //FORMULARIO AJAX PARA LA BUSQUEDA DE ARTICULOS
    $('#search-form').ajaxForm({
		beforeSubmit : function(formData, jqForm, options){
			return pv.validateSearchForm();
		},

		success	: function(responseText, status, xhr, $form){
			if (status == 'success') {

                //console.log("responseText: "+ responseText);               
                window.location.replace("/viewHome/"+responseText);
                           }
                                
                               
		},
		error : function(e){
			if (e.responseText == 'seachField-empty'){
                
			    pv.showInvalidSearch();
			}
		}
	});



    });

   