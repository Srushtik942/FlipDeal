let express = require('express');
let cors = require('cors');
const { resolve } = require('path');

let app = express();
app.use(cors());
const port = 3000;

// Calculate the total price of items in the cart

function totalCartPrice(newItemPrice, cartTotal) {
  let result = newItemPrice + cartTotal;
  return result.toString();
}

app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);

  res.send(totalCartPrice(newItemPrice, cartTotal));
});

// Apply a discount based on membership status

function discountPercent(cartTotal, isMember) {
  if (isMember) {
    let result = (cartTotal * 90) / 100;
    return result.toString();
  } else {
    return cartTotal.toString();
  }
}

app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember === 'true';

  res.send(discountPercent(cartTotal, isMember));
});

// Calculate tax on the cart total

function taxOnCart(cartTotal) {
  let result = (cartTotal * 5) / 100;
  return result.toString();
}

app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  res.send(taxOnCart(cartTotal));
});

// Estimate delivery time based on shipping method

function deliveryTime(shippingMethod, distance) {
  if (shippingMethod === 'Standard') {
    let result = distance / 50;
    return result.toString();
  } else {
    let result = distance / 100;
    return result.toString();
  }
}

app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);

  res.send(deliveryTime(shippingMethod, distance));
});

// Endpoint 5 : Calculate the shipping cost based on weight and distance

function shippingCost(weight, distance) {
  let result = weight * distance * 0.1;
  return result.toString();
}

app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);

  res.send(shippingCost(weight, distance));
});

// Calculate loyalty points earned from a purchase

function loyaltyPoints(purchaseAmount) {
  let result = purchaseAmount * 2;
  return result.toString();
}

app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  res.send(loyaltyPoints(purchaseAmount));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
