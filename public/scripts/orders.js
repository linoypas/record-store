
document.querySelectorAll('#details-order').forEach(button => {
    button.addEventListener('click', () => {
        const details_section = button.nextElementSibling;
        const isVisible = details_section.style.display === 'block';
        
        document.querySelectorAll('.details-section').forEach(content => {
            content.style.display = 'none';
        });

        details_section.style.display = isVisible ? 'none' : 'block';
    });
});

document.querySelectorAll('#edit-order').forEach(button => {
    button.addEventListener('click', () => {
        const orderId = button.getAttribute('order-id');
        const updateSection = document.querySelector(`.update-section`).parentElement;
        
        if (updateSection.style.display === 'none' || updateSection.style.display === '') {
            updateSection.style.display = 'block';
        } else {
            updateSection.style.display = 'none';
        }
    });
});

$(document).on('click', '.save-update', function(event) {
    event.stopPropagation();
    const id = $(this).attr('order-id')
    const username = $('#username-input-' + id).val();
    const password = $('#password-input-' + id).val();
    const address = $('#address-input-' + id).val();
    const phonenumber = $('#phone-input-' + id).val();
    const isAdmin = $('#is-admin-input-' + id).is(':checked'); 
    $.ajax({
        type: "PUT",
        url: '/order/' + id,
    data: {
        username: username,
        password: password,
        address: address,
        phonenumber: phonenumber,
        isAdmin: isAdmin
    },
    }).done(function(updatedorder){
        location.reload();

        }).fail(function(jqXHR, textStatus, errorThrown) {
        alert(jqXHR.responseText);
    })
});
$(document).on('click', '#delete-order', function(event) {
    event.stopPropagation();
    const id = $(this).attr('order-id')
    $.ajax({
        type: "DELETE",
        url: '/order/' + id,
    }).done(function(data, textStatus, jqXHR) {
        $(`#${id}`).remove();
        location.reload();
    }).fail(function(jqXHR, textStatus, errorThrown) {
        alert(jqXHR.responseText);
    })
});
$(document).on('click', '.product', function(event) {
    event.stopPropagation();
    const id = $(this).attr('id');
    window.location.href = "/product?id=" + id;
});