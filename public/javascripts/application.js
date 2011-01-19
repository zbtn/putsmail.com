var PutsMail = {
	showErrorsFor: function(errors){
		var msgError = '';
		for(var key in errors){
			if (key === '') {
				// Global
				msgError += ' * ' + errors[key] + '\n';
			} else {
				msgError += ' * ' + key + ' ' + errors[key] + '\n';
			}
		}
		if(msgError === ''){
			return false;
		} else {
			msgError = 'There were problems with the following fields:\n\n' + msgError;
			alert(msgError);
			return true;
		}		
	},
	preview: function(){
		var preview = window.open('', 'preview');
		preview.document.write($('#body').value);
	},
	sendToken: function(){
		$.ajaxSetup({async:false});
		var mailTo = $('#to').val();
		$('#sendToken').attr('disabled', true);
		$.post('/user', {mail: mailTo}, function(data) {
			$('#sendToken').attr('disabled', false);
			var errors = eval('(' + data + ')');
			if(!PutsMail.showErrorsFor(errors)){
				alert('The activation code was sent to ' + mailTo);
			}
		});
	},
	putsMail: function(){
		$.ajaxSetup({async:false});
		var mailTo = $('#to').val();
		var token = $('#token').val();
		var subject = $('#subject').val();
		var body = $('#body').val();
		$('#sendMail').attr('disabled', true);
		$.post('/puts_mail', {mail: mailTo, token: token, subject: subject, body: body}, function(data) {
			$('#sendMail').attr('disabled', false);
			var errors = eval('(' + data + ')');
			if(!PutsMail.showErrorsFor(errors)){
				alert('The mail was sent to ' + mailTo);
			}
		});		
	}		
};