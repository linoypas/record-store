function Sort(orderBy){
    if(orderBy === "default")
        showAllProducts();
    if (orderBy == "date")
        sortProductsByYear()
    if (orderBy == "price-high-to-low")
        sortProductsByPriceDesc();
    if (orderBy == "price-low-to-high")
        sortProductsByPriceAsc();
}

function showAllProducts(){
    $.ajax({
        url: '/default',
    }).done(function(res){
        updateProducts(res)
    });}


function sortProductsByPriceDesc(){
    $.ajax({
        url: '/priceDescending'
    }).done(function(res){
        updateProducts(res)
    });}

function sortProductsByYear(){
    $.ajax({
        url: '/newest',
    }).done(function(res){
        updateProducts(res)
    });}

function sortProductsByPriceAsc(){
    $.ajax({
        url: '/priceAscending'
    }).done(function(res){
        updateProducts(res)
    });
}


function updateProducts(res){
    console.log(res);
    $('.product').each( (index, element) => {
        const product = res[index];
        $(element).children().each((index, element)=> {
            const htmlElementClass = $(element).attr('class')
            if(htmlElementClass == "price")
                $(element).html(product[htmlElementClass]+"₪");
            else
                $(element).html(product[htmlElementClass]);
        });
    });
}