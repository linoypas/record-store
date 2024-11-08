export async function fetchConversionRates() {
    try {
        console.log("Fetching conversion rates from CurrencyAPI...");

        const response = await fetch(`https://api.currencyapi.com/v3/latest?apikey=${process.env.CURRENCY_API_KEY}&base_currency=ILS&currencies=USD,EUR`);
        
        // Log response status to check if the request is successful
        console.log("Response status:", response.status);

        const data = await response.json();

        // Log the entire data object to inspect the received data
        console.log("Received data:", data);

        // Extract USD and EUR conversion rates
        const usdRate = data.data.USD.value;
        const eurRate = data.data.EUR.value;
        
        console.log("USD conversion rate:", usdRate);
        console.log("EUR conversion rate:", eurRate);

        return { USD: usdRate, EUR: eurRate };
    } catch (error) {
        console.error("Error fetching conversion rates:", error);
        throw new Error("Failed to fetch conversion rates.");
    }
}

export async function convertPrices() {
    console.log("convertPrices function called");

    const currency = document.getElementById("currency").value;
    console.log("Selected currency:", currency);

    const prices = document.querySelectorAll('.price');
    console.log("Number of prices found:", prices.length);

    if (currency === "USD") {
        console.log("Converting prices to USD...");

        const conversionRate = await fetchConversionRate();
        console.log("Conversion rate obtained:", conversionRate);

        if (!conversionRate) {
            console.warn("Conversion rate not available, exiting conversion.");
            return; // Exit if no conversion rate is available
        }

        // Convert NIS to USD and display
        prices.forEach(priceElement => {
            const nisPrice = parseFloat(priceElement.getAttribute('data-nis-price')); // Get original NIS price
            const usdPrice = (nisPrice * conversionRate).toFixed(2); // Convert to USD
            
            // Log each conversion
            console.log(`Converting ${nisPrice} NIS to ${usdPrice} USD`);
            
            priceElement.textContent = `${usdPrice} $`; // Display USD price
        });
    } else {
        console.log("Displaying prices in NIS...");

        // Display prices in NIS without conversion
        prices.forEach(priceElement => {
            const nisPrice = parseFloat(priceElement.getAttribute('data-nis-price'));
            
            // Log each original price
            console.log(`Displaying ${nisPrice} NIS`);

            priceElement.textContent = `${nisPrice} ₪`; // Display NIS price
        });
    }
}