
$(".register-form").validate({ 
    ignore: '',
    rules: {
        username:{
            required: true
        },
        password: {
            required: true,
            minlength: 8,
            regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/

        },
        address:{
            required: true
        },
        phonenumber:{
            tenDigits: true,
            required: true
        },
    },
    messages: {
        username:{
            required: "Username is required"  
        },
        password: {
            required: "Password is required",
            minlength: "Password must be at least 8 characters long",
            regex: "Password must contain at least one uppercase letter, one lowercase letter, and one number"
        },
        address:{
            required: "Address is required"
        },
        phonenumber:{
            required: "Phone number is required",
            tenDigits: "Phone number contain 10 digits"

        }
    },
    submitHandler: function(a, e) {
        e.preventDefault();
        const formData = new FormData(a);
        const URL = $(".register-form").attr("action");
        $.ajax({
          url: URL,
          type: "POST",
          data: formData,
          processData: false,
          contentType: false,
        })
        .done(function(data, textStatus, jqXHR) {
            alert(data);
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            alert(jqXHR.responseText);
        })
        .always(function(data, textStatus, jqXHR) {
            $('.register-form').each(function(){
                this.reset();
            });
        })
    }
}); 