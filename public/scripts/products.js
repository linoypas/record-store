
$(document).on('click', '.product', function(event) {
    event.stopPropagation();
    const id = $(this).attr('id');
    window.location.href = "/product?id=" + id;
});

$(document).on('click', '#delete-product', function(event) {
    event.stopPropagation();
    const id = $(this).attr('product-id')
    $.ajax({
        type: "DELETE",
        url: '/product/' + id,
    }).done(function(data, textStatus, jqXHR) {

        $(`#${id}`).remove();
        alert(data);
    }).fail(function(jqXHR, textStatus, errorThrown) {
        alert(jqXHR.responseText);
    })
});
