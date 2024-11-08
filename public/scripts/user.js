
$(document).on('click', '.username', function(event) {
    event.stopPropagation();
    const id = $(this).attr('user-id');
    window.location.href = "/profile?id=" + id;
});

$(document).on('click', '#add-user', function(event) {
    event.stopPropagation();
    window.location.href = "/users/addUser"
});

document.querySelectorAll('#details-user').forEach(button => {
    button.addEventListener('click', () => {
        const details_section = button.nextElementSibling;
        const isVisible = details_section.style.display === 'block';
                document.querySelectorAll('.details-section').forEach(content => {
            content.style.display = 'none';
        });
        details_section.style.display = isVisible ? 'none' : 'block';
    });
});

document.querySelectorAll('#edit-user').forEach(button => {
    button.addEventListener('click', () => {
        const userId = button.getAttribute('user-id');
        const updateSection = button.closest('.users').querySelector('.update');
                if (updateSection.style.display === 'none' || updateSection.style.display === '') {
            updateSection.style.display = 'block';
        } else {
            updateSection.style.display = 'none';
        }
    });
});


$(document).on('click', '#delete-user', function(event) {
    event.stopPropagation();
    const id = $(this).attr('user-id')
    $.ajax({
        type: "DELETE",
        url: '/user/' + id,
    }).done(function(data, textStatus, jqXHR) {
        location.reload();
    }).fail(function(jqXHR, textStatus, errorThrown) {
        alert(jqXHR.responseText);
    })
});


$(document).ready(function() {
    $.validator.addMethod("complexPassword", function(value) {
        return /[A-Z]/.test(value) && /[0-9]/.test(value); 
    }, "Password must contain at least one uppercase letter and one number.");
    $.validator.addMethod("tenDigits", function(value) {
        return /^\d{10}$/.test(value); 
    }, "Phone number must contain exactly 10 digits.");

    $(".update-section").each(function() {
        const form = $(this);
        form.validate({ 
            errorClass: "error",
            ignore: '',
            rules: {
                username: {
                    required: true
                },
                password: {
                    required: true,
                    minlength: 8,
                    complexPassword: true 
                },
                address: {
                    required: true
                },
                phonenumber: {
                    required: true,
                    tenDigits: true 
                }
            },
            messages: {
                username: {
                    required: "Username is required."
                },
                password: {
                    required: "Password is required.",
                    minlength: "Password must be at least 8 characters long."
                },
                address: {
                    required: "Address is required."
                },
                phonenumber: {
                    required: "Phone number is required.",
                    tenDigits: "Phone number must contain exactly 10 digits."
                }
            },
            submitHandler: function(form) {
                const userId = $(form).attr("user-id");
                const isChecked = $('#isAdmin').is(':checked');
                $('input[name="isAdmin"]').val(isChecked ? 'true' : 'false');
                const formData = $(form).serialize();
                $.ajax({
                    type: 'PUT',
                    url: `/user/${userId}`,
                    data: formData,
                    success: function(data) {
                        alert('User updated successfully!');
                        location.reload();
                    },
                    error: function(jqXHR) {
                        alert(jqXHR.responseText);
                    }
                });
            }
        });
    });
});