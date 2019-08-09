 
function makeAjaxCall(){
   	var sendToSend = JSON.stringify(serializeObject($('#employeeForm')));
   	var contextRoot = "/" + window.location.pathname.split( '/' )[1];
       	
	$.ajax({
		url: contextRoot + '/employee/add',
		type: 'POST',
//		dataType: "json",           // Accepts
 		data:sendToSend,
 		contentType: 'application/json',   // Sends
		success: function(employee){
			$('#formInput').html("");
			$("#formInput").append( '<H3 align="center"> New Employee Information <H3>');                
			$('#formInput').append("<H4 align='center'>First Name:  " + employee.firstName + "</h4>"  );
			$('#formInput').append("<H4 align='center'>Last Name: " + employee.lastName  + "</h4>" );
			$('#formInput').append("<H4 align='center'>Email: " + employee.email  + "</h4>");
			$("#formInput").append('<h4 align="center"> <a href="#" onclick="toggle_visibility(\'formInput\');resetForm(\'employeeForm\');"><b>EXIT</b> </a> </h4>');
			$('#formInput').show();
			$('#errors').hide();
		},

		error: function(jqXHR,  textStatus,  exception ){	
			
			if (jqXHR.responseJSON.errorType == "ValidationError") {
	 			$('#errors').html("");
	 			$("#errors").append( '<H3 align="center"> Error(s)!! <H3>');                
	  			    $("#errors").append( '<p>');
	  	
	  			    var errorList = jqXHR.responseJSON.errors;
	 	 	        $.each(errorList,  function(i,error) {			   
	 		    		$("#errors").append( error.message + '<br>');
			    	});
	 	 	        $("#errors").append( '</p>');
	 				$('#errors').show();
			}
			else {
				alert(jqXHR.responseJSON.message);
			}
		}
	
	});
}

toggle_visibility = function(id) {
    var e = document.getElementById(id);
    if(e.style.display == 'block')
       e.style.display = 'none';
    else
       e.style.display = 'block';
 }	

make_hidden = function(id) {
    var e = document.getElementById(id);
        e.style.display = 'none';
        }	   

make_visible = function(id) {
    var e = document.getElementById(id);
    e.style.display = 'block';
 }	   

resetForm = function(id) {
    var e = document.getElementById(id);
    $(e)[0].reset();

    }	  

// Translate form to array
// Then put in JSON format
 function serializeObject (form)
{
    var jsonObject = {};
    var array = form.serializeArray();
    $.each(array, function() {
         	jsonObject[this.name] = this.value;
    });
    return jsonObject;

};

