
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

function showForm(res){
    for(const key in res){
        $(`input[name=${key}]`).val(res[key]);
    }
    $('#description').html(res['description'])
    $('#form-container').attr('product-id', res['_id']);
    $('#form-popup').css({"display": "block"});
    $('<div/>',{ id:"overlay"}).appendTo("body");
}

$("#exit-update-form").on('click', function(event){
    $('#form-popup').css({"display": "none"});
    $("#overlay").remove();
});


$("#form-container").validate({ 
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
        image: {
            required: true
        }
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
        image: {
            required: "Image is required"
        }
    },
    submitHandler: function(a, e) {
        e.preventDefault();
        const formData = $("#form-container").serialize();
        console.log(formData);
        const URL = $("#form-container").attr("action")+ $("#form-container").attr("product-id");
        console.log(URL)
        $.ajax({
          url: URL,
          type: "PUT",
          data: formData,
        })
        .done(function() {
            window.location.href = '/products/all'
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            console.log('fail')
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


  