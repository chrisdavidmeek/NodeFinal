var stripe = Stripe("pk_test_8mtVvSVfEXpC78hjgax6XzaP00dAI0itgv");
const elements = stripe.elements();

// Create our card inputspk_test_8mtVvSVfEXpC78hjgax6XzaP00dAI0itgv

var style = {
  base: {
    color: "#000",
  },
};

const card = elements.create("card", { style });
card.mount("#card-element");

const form = document.getElementById("payment-form");
const errorEl = document.querySelector("#card-errors");

// Give our token to our form
const stripeTokenHandler = (token) => {
  const hiddenInput = document.createElement("input");
  hiddenInput.setAttribute("type", "hidden");
  hiddenInput.setAttribute("name", "stripeToken");
  hiddenInput.setAttribute("value", token.id);
  form.appendChild(hiddenInput);

  form.submit();
};

// Create token from card data
form.addEventListener("submit", (e) => {
  e.preventDefault();

  stripe.createToken(card).then((res) => {
    if (res.error) errorEl.textContent = res.error.message;
    else stripeTokenHandler(res.token);
  });
});
