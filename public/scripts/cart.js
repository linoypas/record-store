$(document).ready(function() {
    $(".delete-item").on("click", function() {
        const itemId = $(this).data('id'); 

        $.ajax({
          url: '/orders/cart/' + itemId,  
          type: 'DELETE',
          success: function(response) {
            console.log('Item removed from cart');
            $(this).closest('.item').remove();
            location.reload();
          },
          error: function(error) {
            console.log('Error removing item from cart', error);
          }
        });
    });
});
