
/* Movie recommendation logic */

const recommendForm = document.getElementById("recommend-form");

if (recommendForm) {
    recommendForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const genre = document.getElementById("genre").value;
        const ageGroup = document.getElementById("age-group").value;
        const viewing = document.getElementById("viewing").value;
        const results = document.getElementById("recommend-results");

        const movies = [
            {
                id: "last-mission",
                title: "The Last Mission",
                genre: "Action",
                rating: "M",
                ageGroups: ["Teen", "Adult"],
                occasions: ["Friends", "Solo"],
                image: "images/movie1.jpg",
                price: 22
            },
            {
                id: "laugh-out-loud",
                title: "Laugh Out Loud",
                genre: "Comedy",
                rating: "PG",
                ageGroups: ["Child", "Teen", "Adult"],
                occasions: ["Family", "Friends", "Date Night"],
                image: "images/movie2.jpg",
                price: 18
            },
            {
                id: "galaxy-guardians",
                title: "Galaxy Guardians",
                genre: "Science Fiction",
                rating: "PG",
                ageGroups: ["Child", "Teen", "Adult"],
                occasions: ["Family", "Friends", "Solo"],
                image: "images/movie3.jpg",
                price: 20
            },
            {
                id: "hidden-promise",
                title: "The Hidden Promise",
                genre: "Drama",
                rating: "M",
                ageGroups: ["Teen", "Adult"],
                occasions: ["Date Night", "Solo"],
                image: "images/movie4.jpg",
                price: 19
            },
            {
                id: "little-dreamers",
                title: "Little Dreamers",
                genre: "Animation",
                rating: "G",
                ageGroups: ["Child", "Teen", "Adult"],
                occasions: ["Family", "Friends"],
                image: "images/movie5.jpg",
                price: 16
            },
            {
                id: "midnight-mystery",
                title: "Midnight Mystery",
                genre: "Thriller",
                rating: "M",
                ageGroups: ["Teen", "Adult"],
                occasions: ["Friends", "Solo"],
                image: "images/movie6.jpg",
                price: 21
            }
        ];

        const matches = movies.filter(function (movie) {
            const genreMatches = movie.genre === genre;
            const ageMatches = movie.ageGroups.includes(ageGroup);
            const occasionMatches = movie.occasions.includes(viewing);

            return genreMatches && ageMatches && occasionMatches;
        });

        results.replaceChildren();

        const heading = document.createElement("h2");
        heading.textContent = "Your Recommendations";
        results.appendChild(heading);

        if (matches.length === 0) {
            const message = document.createElement("p");
            message.textContent =
                "No exact match was found. Try another genre or viewing preference.";
            results.appendChild(message);
            return;
        }

        matches.forEach(function (movie) {
            const card = document.createElement("article");
            card.className = "recommended-movie";

            const image = document.createElement("img");
            image.src = movie.image;
            image.alt = "Poster for " + movie.title;

            const title = document.createElement("h3");
            title.textContent = movie.title;

            const details = document.createElement("p");
            details.textContent =
                "Genre: " + movie.genre +
                " | Rating: " + movie.rating +
                " | Ticket: $" + movie.price.toFixed(2);

            const bookLink = document.createElement("a");
            bookLink.className = "btn";
            bookLink.href = "booking.html?movie=" +
                encodeURIComponent(movie.id);
            bookLink.textContent = "Book This Movie";

            card.append(image, title, details, bookLink);
            results.appendChild(card);
        });
    });
}

/* Registration form validation */

const registerForm = document.getElementById("register-form");

if (registerForm) {
    registerForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const username = document.getElementById("username").value.trim();
        const email = document.getElementById("register-email").value.trim();
        const phone = document.getElementById("register-phone").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword =
            document.getElementById("confirm-password").value;
        const gender = registerForm.querySelector(
            'input[name="gender"]:checked'
        );
        const genres = registerForm.querySelectorAll(
            'input[name="genres"]:checked'
        );
        const country = document.getElementById("country").value;

        let valid = true;

        function showError(fieldId, message) {
            document.getElementById(fieldId + "-error").textContent = message;
            if (message !== "") {
                valid = false;
            }
        }

        // Clear old error messages
        document.querySelectorAll("#register-form .field-error")
            .forEach(function (element) {
                element.textContent = "";
            });

        document.getElementById("register-message").textContent = "";

        // Username: at least 5 letters, numbers or underscores
        if (!/^[A-Za-z0-9_]{5,}$/.test(username)) {
            showError(
                "username",
                "Use at least 5 characters: letters, numbers or underscores."
            );
        } else {
            showError("username", "");
        }

        // Email format
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showError("register-email", "Enter a valid email address.");
        } else {
            showError("register-email", "");
        }

        // Phone: 8 to 15 digits
        if (!/^\d{8,15}$/.test(phone)) {
            showError("register-phone", "Enter 8–15 digits only.");
        } else {
            showError("register-phone", "");
        }

        // Password: 10 characters with upper/lowercase,
        // a number and a special character
        const strongPassword =
            password.length >= 10 &&
            /[A-Z]/.test(password) &&
            /[a-z]/.test(password) &&
            /\d/.test(password) &&
            /[^A-Za-z0-9]/.test(password);

        if (!strongPassword) {
            showError(
                "password",
                "Use at least 10 characters, including uppercase, lowercase, a number and a special character."
            );
        } else {
            showError("password", "");
        }

        // Confirm password
        if (confirmPassword === "" || confirmPassword !== password) {
            showError("confirm-password", "Passwords must match.");
        } else {
            showError("confirm-password", "");
        }

        // Gender
        if (!gender) {
            showError("gender", "Please select a gender option.");
        } else {
            showError("gender", "");
        }

        // At least one preferred genre
        if (genres.length === 0) {
            showError("genres", "Select at least one movie genre.");
        } else {
            showError("genres", "");
        }

        // Country or region
        if (country === "") {
            showError("country", "Please select a country/region.");
        } else {
            showError("country", "");
        }

        if (valid) {
            document.getElementById("register-message").textContent =
                "Registration form validated successfully! This demo does not create a real account.";
            document.getElementById("register-message").style.color =
                "#80e0a0";
        } else {
            document.getElementById("register-message").textContent =
                "Please correct the errors above and try again.";
            document.getElementById("register-message").style.color =
                "#ff858d";
        }
    });
}

/* Booking form: prices, pre-selection and validation */

const bookingForm = document.getElementById("booking-form");

if (bookingForm) {
    const movieSelect = document.getElementById("movie");
    const screeningInput = document.getElementById("screening");
    const ticketInput = document.getElementById("tickets");
    const ticketTypeSelect = document.getElementById("ticket-type");
    const paymentSelect = document.getElementById("payment-method");
    const voucherSection = document.getElementById("voucher-section");
    const cardSection = document.getElementById("card-section");
    const cardTypeSelect = document.getElementById("card-type");
    const cardNumberInput = document.getElementById("card-number");
    const voucherInput = document.getElementById("voucher-code");
    const emailInput = document.getElementById("booking-email");
    const billingEmailInput = document.getElementById("billing-email");
    const sameEmailCheckbox = document.getElementById("same-email");

    const moviePrices = {
        "last-mission": 22,
        "laugh-out-loud": 18,
        "galaxy-guardians": 20,
        "hidden-promise": 19,
        "little-dreamers": 16,
        "midnight-mystery": 21
    };

    function showBookingError(fieldId, message) {
        document.getElementById(fieldId + "-error").textContent = message;
    }

    // Set the earliest permitted screening time to the current local time.
    function setMinimumScreeningTime() {
        const now = new Date();
        now.setSeconds(0, 0);

        const localDateTime = new Date(
            now.getTime() - now.getTimezoneOffset() * 60000
        ).toISOString().slice(0, 16);

        screeningInput.min = localDateTime;
    }

    // Update the displayed ticket price and total cost.
    function updateBookingCost() {
        const price = moviePrices[movieSelect.value] || 0;
        const quantity = Number(ticketInput.value);
        const safeQuantity = Number.isInteger(quantity) && quantity > 0
            ? quantity
            : 0;

        document.getElementById("ticket-price").textContent =
            "$" + price.toFixed(2);

        document.getElementById("booking-total").textContent =
            "$" + (price * safeQuantity).toFixed(2);
    }

    // Read the selected movie from the incoming URL.
    function preselectMovie() {
        const params = new URLSearchParams(window.location.search);
        const selectedMovie = params.get("movie");

        if (
            selectedMovie &&
            Object.prototype.hasOwnProperty.call(moviePrices, selectedMovie)
        ) {
            movieSelect.value = selectedMovie;
        }

        updateBookingCost();
    }

    // Show the correct payment fields.
    function updatePaymentFields() {
        const paymentMethod = paymentSelect.value;
        const useVoucher = paymentMethod === "Voucher";
        const useCard = paymentMethod === "Online";

        voucherSection.hidden = !useVoucher;
        cardSection.hidden = !useCard;

        voucherInput.required = useVoucher;
        cardTypeSelect.required = useCard;
        cardNumberInput.required = useCard;

        showBookingError("card-type", "");
        showBookingError("card-number", "");
    }

    // Copy the booking email into the billing email when requested.
    function updateBillingEmail() {
        if (sameEmailCheckbox.checked) {
            billingEmailInput.value = emailInput.value;
            billingEmailInput.readOnly = true;
        } else {
            billingEmailInput.readOnly = false;
        }
    }

    movieSelect.addEventListener("change", updateBookingCost);
    ticketInput.addEventListener("input", updateBookingCost);
    paymentSelect.addEventListener("change", updatePaymentFields);
    sameEmailCheckbox.addEventListener("change", updateBillingEmail);

    emailInput.addEventListener("input", function () {
        if (sameEmailCheckbox.checked) {
            billingEmailInput.value = emailInput.value;
        }
    });

    setMinimumScreeningTime();
    preselectMovie();
    updatePaymentFields();
    updateBillingEmail();

    bookingForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // Clear previous error messages.
        bookingForm.querySelectorAll(".field-error").forEach(function (item) {
            item.textContent = "";
        });

        document.getElementById("booking-message").textContent = "";

        let valid = true;

        function check(fieldId, condition, message) {
            if (!condition) {
                showBookingError(fieldId, message);
                valid = false;
            }
        }

        const fullName = document.getElementById("full-name").value.trim();
        const email = emailInput.value.trim();
        const phone = document.getElementById("booking-phone").value.trim();
        const billingEmail = billingEmailInput.value.trim();
        const screeningValue = screeningInput.value;
        const ticketCount = Number(ticketInput.value);
        const paymentMethod = paymentSelect.value;

        check("full-name", fullName.length > 0, "Please enter your full name.");

        check(
            "booking-email",
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
            "Please enter a valid email address."
        );

        check(
            "booking-phone",
            /^\d{10,}$/.test(phone),
            "Enter a phone number containing at least 10 digits."
        );

        check(
            "movie",
            movieSelect.value !== "",
            "Please select a movie."
        );

        const chosenDate = screeningValue ? new Date(screeningValue) : null;

        check(
            "screening",
            chosenDate !== null &&
                !Number.isNaN(chosenDate.getTime()) &&
                chosenDate.getTime() >= Date.now(),
            "Choose a valid screening date and time that is not in the past."
        );

        check(
            "tickets",
            Number.isInteger(ticketCount) && ticketCount > 0,
            "Enter a whole number of tickets greater than zero."
        );

        check(
            "ticket-type",
            ticketTypeSelect.value !== "",
            "Please choose a ticket type."
        );

        check(
            "payment-method",
            paymentMethod !== "",
            "Please select a payment method."
        );

        check(
            "billing-email",
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(billingEmail),
            "Enter a valid billing email address."
        );

        if (paymentMethod === "Voucher") {
            check(
                "voucher-code",
                /^\d{12}$/.test(voucherInput.value),
                "Enter a 12-digit voucher code."
            );
        }

        if (paymentMethod === "Online") {
            const cardType = cardTypeSelect.value;
            const cardNumber = cardNumberInput.value.trim();

            const requiredDigits = cardType === "Amex" ? 15 : 16;

            check(
                "card-type",
                ["Visa", "Mastercard", "Amex"].includes(cardType),
                "Please select a card type."
            );

            check(
                "card-number",
                ["Visa", "Mastercard", "Amex"].includes(cardType) &&
                    new RegExp("^\\d{" + requiredDigits + "}$").test(cardNumber),
                cardType === "Amex"
                    ? "Amex numbers must contain exactly 15 digits."
                    : "Visa and Mastercard numbers must contain exactly 16 digits."
            );
        }

        if (!valid) {
            document.getElementById("booking-message").textContent =
                "Please correct the errors above before submitting.";
            document.getElementById("booking-message").style.color =
                "#ff858d";
            return;
        }

        // Update the total immediately before submission.
        updateBookingCost();

        // Submit valid data to the assignment's Mercury test endpoint.
        document.getElementById("booking-message").textContent =
            "Your form is valid. Submitting to the Mercury test server.";

        bookingForm.submit();
    });
}
