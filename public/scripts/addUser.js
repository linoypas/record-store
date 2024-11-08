
$.validator.addMethod("regex", function(value, element, param) {
    return this.optional(element) || param.test(value);
}, "Please check your input.");

$.validator.addMethod("tenDigits", function(value) {
    return /^\d{10}$/.test(value);
}, "Phone number must contain exactly 10 digits.");
$(document).ready(function() {

    $("#addUser-form").validate({ 
        errorClass: "error",
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
        submitHandler: function(form) {
            const isChecked = $('#isAdmin').is(':checked');
            $('input[name="isAdmin"]').val(isChecked ? 'true' : 'false');
            const formData = $(form).serialize();
            const URL = $("#addUser-form").attr("action");

            $.ajax({    
                url: URL,
                type: "POST",
                data: formData,
                success: function(data) {
                    window.location.href = '/users/'
                },
                error: function(jqXHR) {
                    alert(jqXHR.responseText);
                }
            });
        }
    }); 
});
