$(document).ready(function(){

    var pv = new PostValidator();


    $('#search-form').ajaxForm({
		beforeSubmit : function(formData, jqForm, options){
			return pv.validateSearchForm();
		},
		success	: function(responseText, status, xhr, $form){
			if (status == 'success') $('.modal-alert').modal('show');
		},
		error : function(e){
			if (e.responseText == 'seachField-empty'){
                
			    pv.showInvalidSearch();
			}
		}
	});




    });