//VALIDADOR DE ARTICULOS
function PostValidator(){
    
    
    //Campos a validar
    this.formFields = [$('#postTitle')];
    this.formFields2 = [$('#searchField')];
	this.controlGroups = [$('#title-cg')];
    this.controlGroups2 = [$('#search-cg')];
    
    // ENLAZA LA VENTANA MODAL DE LOS ERRORES EN EL FORM CON ESTE CONTROLADORPARA MOSTRAR ERRORES
	
	this.alert = $('.modal-form-errors');
	this.alert.modal({ show : false, keyboard : true, backdrop : true});
	
	this.validateName = function(s)
	{
		return s.length >= 1;
	}


    	this.validateSearch = function(s)
	{
		return s.length >= 1;
	}


    this.showErrors = function(a)
	{
		$('.modal-form-errors .modal-body p').text('Please correct the following problems :');
		var ul = $('.modal-form-errors .modal-body ul');
			ul.empty();
		for (var i=0; i < a.length; i++) ul.append('<li>'+a[i]+'</li>');
		this.alert.modal('show');
	}

    
    }

//METODOS AUXILIARES
PostValidator.prototype.showInvalidSearch = function()
{
	this.controlGroups2[0].addClass('error');
	this.showErrors(['That Title is already in use.']);
}

PostValidator.prototype.showInvalidTitle = function()
{
	this.controlGroups[0].addClass('error');
	this.showErrors(['That Title is already in use.']);
}

PostValidator.prototype.validateSearchForm = function()
{
	var e = [];
	for (var i=0; i < this.controlGroups2.length; i++) this.controlGroups2[i].removeClass('error');
	if (this.validateSearch(this.formFields2[0].val()) == false) {
		this.controlGroups2[0].addClass('error'); e.push('Por favor introduce alguna palabra clave');
	}
	
	if (e.length) this.showErrors(e);
	return e.length === 0;
}



PostValidator.prototype.validateForm = function()
{
	var e = [];
	for (var i=0; i < this.controlGroups.length; i++) this.controlGroups[i].removeClass('error');
	if (this.validateName(this.formFields[0].val()) == false) {
		this.controlGroups[0].addClass('error'); e.push('Por favor introduzca un titlo');
	}
	
	if (e.length) this.showErrors(e);
	return e.length === 0;
}