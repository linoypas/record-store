let removedDefaultSelect = false;

let genre = 'all';
let orderBy = 'default';
let showOnlyinStock = false;
let maxPrice = $('#maxPriceRange').attr('value');

function changeGenre(option){
    genre = option.value;
    showProducts();
}

function changeSortBy(option){
    sort(option.value);
    deleteDefaultSelect(option);
}

$('#maxPriceRange').on('input', function(){
    maxPrice = this.value;
    $('#rangeValue').text('מחיר מקסימלי: ' + this.value + '₪');
    $(this).attr('value', this.value)
    sort()
});


$("#inStock").on('change', function() {
    if ($(this).is(':checked')) {
      $(this).attr('value', 'true');
    } else {
      $(this).attr('value', 'false');
    }
  });

function changeShowOnlyinStock(){
    if ($("#inStock").is(':checked')) {
        showOnlyinStock = true;
      } else {
        showOnlyinStock = false;
      }
    showProducts();
}

function deleteDefaultSelect(option){
    if (!removedDefaultSelect){
        $(option).find('option').get(0).remove(); 
        removedDefaultSelect = true;
    }
}

function sort(value){
    window.location.pathname.split('/')
    if(value === "default")
        orderBy = "default";
    if (value == "date")
        orderBy = "newest";
    if (value == "price-high-to-low")
        orderBy = "priceDescending";
    if (value == "price-low-to-high")
        orderBy = "priceAscending";

    showProducts();
}

function showProducts(){
    $.ajax({
        type: "GET",
        url: '/products/' +(location.pathname.substring(location.pathname.lastIndexOf('/') + 1)) + `/${orderBy}`,
        data: { 
            genre: genre,
            showOnlyinStock: showOnlyinStock,
            maxPrice: maxPrice,
        },
    }).done(function(res){
        updateProducts(res)
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(jqXHR.responseText);
    });
}


function updateProducts(res){
    $('.product').remove();
    let productsHtml = '';
    for(let i=0; i< res.length; i++){
        const element = res[i];
        let product = document.getElementById('productTemplate').innerHTML;
        for(const key in element){
            product = product.replaceAll('{'+key+'}', element[key]);
        }
        const soldout= !element.inStock 
            ? '<img class="sold-out" src="../public/images/sold-out.png">' : ''; 

        product = product.replace('{soldout}', soldout);

        productsHtml += product;
        document.getElementById('products').innerHTML +=product;
    }
 }