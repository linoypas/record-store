
$(document).on('click', '.user', function(event) {
    event.stopPropagation();
    const id = $(this).attr('id');
    window.location.href = "/profile" + id;
});

$(document).on('click', '#delete-user', function(event) {
    event.stopPropagation();
    const id = $(this).attr('id')
    $.ajax({
        type: "DELETE",
        url: '/user/' + id,
    }).done(function(data, textStatus, jqXHR) {
        $(`#${id}`).remove();
        alert(data);
    }).fail(function(jqXHR, textStatus, errorThrown) {
        alert(jqXHR.responseText);
    })
});


$(document).on('click', '#edit-user', function(event) {
    event.stopPropagation();
    const id = $(this).attr('id')
    $.ajax({
        type: "GET",
        url: '/user/' + id,
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
    if($("#form-isAdmin").val() == 'true')
        $("#form-isAdmin").prop("checked", true);
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
        password: {
            required: true,
        },
        address:{
            required: true
        },
        phonenumber:{
            number: true,
            required: true
        },
    },
    messages: {
        name:{
            required: "Name is required"  
        },
        password: {
            required: "Password is required",
        },
        address:{
            required: "Address is required"
        },
        phonenumber:{
            number: "phone nummber should be a number",
            required: "phone number is required"
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
            window.location.href = '/users/'
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            alert(jqXHR.responseText);
        })
        .always(function(data, textStatus, jqXHR) {
            $('#form-container').each(function(){
                this.reset();
            });
        })
    }
}); 