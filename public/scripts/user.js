
$(document).on('click', '.username', function(event) {
    event.stopPropagation();
    const id = $(this).attr('user-id');
    window.location.href = "/profile?id=" + id;
});


document.querySelectorAll('#details-user').forEach(button => {
    button.addEventListener('click', () => {
        const details_section = button.nextElementSibling;
        const isVisible = details_section.style.display === 'block';
        
        // Hide all other dropdowns
        document.querySelectorAll('.details-section').forEach(content => {
            content.style.display = 'none';
        });

        // Toggle the current dropdown
        details_section.style.display = isVisible ? 'none' : 'block';
    });
});

document.querySelectorAll('#edit-user').forEach(button => {
    button.addEventListener('click', () => {
        const userId = button.getAttribute('user-id');
        const updateSection = document.querySelector(`.update-section #username-input-${userId}`).parentElement;
        
        // Toggle visibility of the update section
        if (updateSection.style.display === 'none' || updateSection.style.display === '') {
            updateSection.style.display = 'block';
        } else {
            updateSection.style.display = 'none';
        }
    });
});

$(document).on('click', '.save-update', function(event) {
    event.stopPropagation();
    const id = $(this).attr('user-id')
    const username = $('#username-input-' + id).val();
    const password = $('#password-input-' + id).val();
    const address = $('#address-input-' + id).val();
    const phonenumber = $('#phone-input-' + id).val();
    const isAdmin = $('#is-admin-input-' + id).is(':checked'); 
    $.ajax({
        type: "PUT",
        url: '/user/' + id,
    data: {
        username: username,
        password: password,
        address: address,
        phonenumber: phonenumber,
        isAdmin: isAdmin
    },
    }).done(function(updatedUser){
        location.reload();

        }).fail(function(jqXHR, textStatus, errorThrown) {
        alert(jqXHR.responseText);
    })
});
$(document).on('click', '#delete-user', function(event) {
    event.stopPropagation();
    const id = $(this).attr('user-id')
    $.ajax({
        type: "DELETE",
        url: '/user/' + id,
    }).done(function(data, textStatus, jqXHR) {
        $(`#${id}`).remove();
        location.reload();
    }).fail(function(jqXHR, textStatus, errorThrown) {
        alert(jqXHR.responseText);
    })
});