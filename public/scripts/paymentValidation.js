function validateForm() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const city = document.getElementById('city').value;
    const streetName = document.getElementById('streetName').value;
    const houseNumber = document.getElementById('houseNumber').value;
    const phoneNumber = document.getElementById('phoneNumber').value;

    const nameRegex = /^[a-zA-Z\s]+$/;  // Allows only letters and spaces
    const houseNumberRegex = /^[0-9]+$/;  // Allows only numbers
    const phoneNumberRegex = /^[0-9]{10}$/;  // Exactly 10 digits

    // Validate first name, last name, city, and street name
    if (!nameRegex.test(firstName)) {
        alert("First name should only contain letters and spaces.");
        return false;
    }
    if (!nameRegex.test(lastName)) {
        alert("Last name should only contain letters and spaces.");
        return false;
    }
    if (!nameRegex.test(city)) {
        alert("City should only contain letters and spaces.");
        return false;
    }
    if (!nameRegex.test(streetName)) {
        alert("Street name should only contain letters and spaces.");
        return false;
    }

    // Validate house number
    if (!houseNumberRegex.test(houseNumber)) {
        alert("House number should only contain numbers.");
        return false;
    }

    // Validate phone number (exactly 10 digits)
    if (!phoneNumberRegex.test(phoneNumber)) {
        alert("Phone number should be exactly 10 digits.");
        return false;
    }

    // Payment validation
    const cardNumber = document.getElementById('cardNumber').value;
    const expiryDate = document.getElementById('expiryDate').value;
    const cvv = document.getElementById('cvv').value;

    const cardNumberRegex = /^[0-9]{16}$/;  // Exactly 16 digits
    const expiryDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;  // Format MM/YY
    const cvvRegex = /^[0-9]{3}$/;  // Exactly 3 digits

    // Validate card number (exactly 16 digits)
    if (!cardNumberRegex.test(cardNumber)) {
        alert("Card number should be exactly 16 digits.");
        return false;
    }

    // Validate expiry date (MM/YY format)
    if (!expiryDateRegex.test(expiryDate)) {
        alert("Expiry date should be in MM/YY format.");
        return false;
    }

    // Validate CVV (exactly 3 digits)
    if (!cvvRegex.test(cvv)) {
        alert("CVV should be exactly 3 digits.");
        return false;
    }

    // Expiry Date Validation (check if the card is expired)
    const [expMonth, expYear] = expiryDate.split('/');
    const currentYear = new Date().getFullYear().toString().slice(-2);  // Get last two digits of the current year
    const currentMonth = new Date().getMonth() + 1;  // Get current month (1-based)

    // Convert month and year to numbers
    const expMonthNum = parseInt(expMonth);
    const expYearNum = parseInt(expYear);

    if (expYearNum < currentYear) {
        alert("Card has expired. Please use a valid card.");
        return false;
    }

    if (expYearNum === currentYear && expMonthNum < currentMonth) {
        alert("Card has expired. Please use a valid card.");
        return false;
    }

    // If all validations pass, return true
    return true;
}
