
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
        const formData = new FormData(a);
        const URL = $("#form-container").attr("action");
        $.ajax({
          url: URL,
          type: "POST",
          data: formData,
          processData: false,
          contentType: false,
        })
        .done(function(data, textStatus, jqXHR) {
            alert(data);
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

$("#inStock").on('change', function() {
    if ($(this).is(':checked')) {
      $(this).attr('value', 'true');
    } else {
      $(this).attr('value', 'false');
    }
  });
  