let removedDefaultSelect = false;

let genre = 'all';
let orderBy = 'default';
let showOnlyinStock = false;

function changeGenre(option){
    genre = option.value;
    showProducts();
}

function changeSortBy(option){
    sort(option.value);
    deleteDefaultSelect(option);
}


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
        },
    }).done(function(res){
        updateProducts(res)
    });
}


function updateProducts(res){
    $('.product').remove();
    for(let i=0; i< res.length; i++){
        const element = res[i];
        let product = document.getElementById('productTemplate').innerHTML;
        for(const key in element){
            product = product.replaceAll('{'+key+'}', element[key]);
        }
        document.getElementById('products').innerHTML +=product;
    }
 }