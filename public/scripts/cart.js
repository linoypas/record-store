$(document).on('change', '.item-quantity', function() {
    const itemId = $(this).data('id');
    const newQuantity = parseInt($(this).val(), 10);
    
    if (newQuantity < 1) {
        alert('Quantity must be at least 1');
        return;
    }
    
    $.ajax({
        type: "PUT",
        url: '/order/cart/' + itemId,
        data: { quantity: newQuantity },
        success: function(response) {
            location.reload(); // Reload to get the updated cart state
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert("Error updating quantity");
        }
    });
});
