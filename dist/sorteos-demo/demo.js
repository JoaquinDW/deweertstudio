'use strict';
// This entire demonstration is local. There are no payment, purchase or data APIs.
const packDialog = document.querySelector('#pack-dialog');
const closeDialog = document.querySelector('.close-dialog');
const simulate = document.querySelector('.simulate-button');
const confirmation = document.querySelector('#confirmation');
const exampleNumbers = ['1042', '2317', '4576', '6081', '7923', '8650', '0925', '1763', '3849', '5210', '6492', '7038', '9104', '9826'];
const priceFormatter = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 });
let selectedCount = 6;
let lastPackButton;
document.querySelectorAll('[data-count]').forEach(button => {
  button.addEventListener('click', () => {
    selectedCount = Number(button.dataset.count);
    lastPackButton = button;
    document.querySelector('#pack-quantity').textContent = `${selectedCount} chances`;
    document.querySelector('#pack-total').textContent = priceFormatter.format(Number(button.dataset.price));
    document.querySelector('#dialog-title').textContent = 'Tu pack, en un paso.';
    confirmation.hidden = true;
    simulate.hidden = false;
    document.querySelector('.checkout-steps').hidden = false;
    packDialog.showModal();
  });
});
closeDialog.addEventListener('click', () => packDialog.close());
packDialog.addEventListener('close', () => lastPackButton?.focus());
packDialog.addEventListener('click', event => {
  if (event.target !== packDialog) return;
  const bounds = packDialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) packDialog.close();
});
simulate.addEventListener('click', () => {
  const numbers = document.querySelector('#confirmed-numbers');
  numbers.replaceChildren();
  exampleNumbers.slice(0, selectedCount).forEach(value => {
    const number = document.createElement('span');
    number.textContent = value;
    numbers.append(number);
  });
  simulate.hidden = true;
  document.querySelector('.checkout-steps').hidden = true;
  confirmation.hidden = false;
  confirmation.scrollIntoView({ block: 'nearest', behavior: 'instant' });
});
document.querySelector('#lookup-form').addEventListener('submit', event => {
  event.preventDefault();
  document.querySelector('#lookup-results').hidden = false;
});
