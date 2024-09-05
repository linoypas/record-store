function showProduct(product) {
    console.log(product);
    const id = product.getAttribute("id");
    window.location.href = "/product?id=" + id;
}