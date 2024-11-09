
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
        const updateSection = button.closest('.orders').querySelector('.update-section');
        
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
    const itemsData = [];
    $(`.update-order[order-id="${id}"]`).each(function(index) {
        const itemName = $(this).find(`input[type="text"]`).val();  
        const itemQuantity = $(this).find(`input[type="number"]`).val();  

        if (itemName && itemQuantity) {
            itemsData.push({
                name: itemName,
                quantity: itemQuantity
            });
        }
    });
    $.ajax({
        type: "PUT",
        url: '/order/' + id,
        data: JSON.stringify({ items: itemsData }),
        contentType: "application/json",  
        processData: false,     
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