function getRecords(collection){
    $.ajax({
        url: `/products/${collection}`,
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
            product = product.replace('{'+key+'}', element[key]);
        }
        document.getElementById('products').innerHTML +=product;
    }
}