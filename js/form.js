$("#contact-form").validator().on("submit", function(event){
    if (event.isDefaultPrevented()) {
    	formError();
    	submitMSG(false, "Did you fill in the form correctly?");
    } else {
    	event.preventDefault();
    	submitForm();    	
    }
});

function submitForm(){
    // Initiate Variables With Form Content
    var name = $("#name").val();
    var email = $("#email").val();
    var message = $("#message").val();
 
    $.ajax({
        type: "POST",
        url: "php/email.php",
        data: "name=" + name + "&email=" + email + "&message=" + message,
        success : function(text){
            if (text == "success"){
                formSuccess();
            }else {
            	formError();
            	submitMSG(false, text);
            }
        }
    });
}

function formSuccess(){
    $("#contact-form")[0].reset();
    submitMSG(true, "Your Message has been Sumbitted!");
}

function formError (){
	$("#contact-form")[0].reset();

}

function submitMSG(valid, msg){
        var msgClasses;
    if(valid){
        msgClasses = "h3 text-center tada animated text-good";
    } else {
        msgClasses = "h3 text-center text-danger";
    }
    $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
}