async function convertPrices() {
    const currency = document.getElementById("currency").value;
    const prices = document.querySelectorAll('.price');

    if (currency === "USD") {
        const conversionRate = await fetchConversionRate();
        if (!conversionRate) return; // Exit if no conversion rate is available

        // Convert NIS to USD and display
        prices.forEach(priceElement => {
            const nisPrice = parseFloat(priceElement.getAttribute('data-nis-price')); // Get original NIS price
            const usdPrice = (nisPrice * conversionRate).toFixed(2); // Convert to USD
            priceElement.textContent = `${usdPrice} $`; // Display USD price
        });
    } else {
        // Display prices in NIS without conversion
        prices.forEach(priceElement => {
            const nisPrice = parseFloat(priceElement.getAttribute('data-nis-price'));
            priceElement.textContent = `₪ ${nisPrice}`; // Display NIS price
        });
    }
}