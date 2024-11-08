
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


$(document).on('click', '#edit-product', function(event) {
    event.stopPropagation();
    const id = $(this).attr('product-id')
    $.ajax({
        type: "GET",
        url: '/product/' + id,
    }).done(function(res){
        showForm(res);
    }).fail(function(jqXHR, textStatus, errorThrown) {
        alert(jqXHR.responseText);
    })
    
});

$("#form-inStock").on('change', function() {
    if ($(this).is(':checked')) {
      $(this).attr('value', 'true');
    } else {
      $(this).attr('value', 'false');
    }
  });
  

function showForm(res){
    for(const key in res){
        $(`input[name=${key}]`).val(res[key]);
    }
    $('#description').html(res['description'])
    $('#form-container').attr('product-id', res['_id']);
    $('image').attr('data', res['data']);
    $('image').attr('contentType', res['contentType']);
    if($("#form-inStock").val() == 'true')
        $("#form-inStock").prop("checked", true);
    $('#form-popup').css({"display": "block"});
    $('<div/>',{ id:"overlay"}).appendTo("body");
}

$("#exit-update-form").on('click', function(event){
    $('#form-popup').css({"display": "none"});
    $("#overlay").remove();
});

$("#image").on('change', function(event){
    $(this).css({"color": "black"});
});


$("#form-container").validate({ 
    errorClass: "error",
    ignore: '',
    rules: {
        name:{
            required: true
        },
        price: {
            required: true,
            number: true
        },
        artist:{
            required: true
        },
        year:{
            number: true,
            min: 1860,
            required: true
        },
        description: {
            required: true,
        },
    },
    messages: {
        name:{
            required: "Name is required"  
        },
        price: {
            required: "Price is required",
            number: "Price should be a number"
        },
        artist:{
            required: "Artist is required"
        },
        year:{
            number: "Year should be a number",
            min: "Year should be greater than 1860",
            required: "Year is required"
        },
        description: {
            required: "Description is required"
        },
    },
    submitHandler: function(a, e) {
        e.preventDefault();
        const formData = new FormData(a);
        const URL = $("#form-container").attr("action")+ $("#form-container").attr("product-id");
        $.ajax({
          url: URL,
          type: "PUT",
          data: formData,
          processData: false,
          contentType: false,
        })
        .done(function() {
            window.location.href = '/products/all'
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            alert(jqXHR.responseText);
        })
        .always(function(data, textStatus, jqXHR) {
            $('#form-container').each(function(){
                this.reset();
            });
            $('#description').html('');
        })
    }
}); 

$(document).on('click', '#addtocart', function(event) {
    event.stopPropagation();
    const id = $(this).attr('product-id');
    const quantity = $('#quantity').val() || 1;
    $.ajax({
        type: "PUT",
        url: '/order/cart' + id,
        data: {
            quantity :quantity
        }
    }).done(function(res){
        showForm(res);
    }).fail(function(jqXHR, textStatus, errorThrown) {
        alert(jqXHR.responseText);
    })
    
});