'use strict';

const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() {
  menu.setAttribute('aria-expanded', 'false');
  menu.setAttribute('aria-label', 'Abrir menú');
  navigation.classList.remove('open');
}
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  navigation.classList.toggle('open', open);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menu.focus();
  }
});
document.addEventListener('click', event => {
  if (!event.target.closest('.nav-wrap')) closeMenu();
});
window.matchMedia('(min-width: 601px)').addEventListener('change', event => {
  if (event.matches) closeMenu();
});

const tabButtons = Array.from(document.querySelectorAll('[role="tab"]'));
function activateTab(tab, focus = false) {
  tabButtons.forEach(button => {
    const active = button === tab;
    button.setAttribute('aria-selected', String(active));
    button.tabIndex = active ? 0 : -1;
    document.getElementById(button.getAttribute('aria-controls')).hidden = !active;
  });
  if (focus) tab.focus();
}
tabButtons.forEach((tab, index) => {
  tab.addEventListener('click', () => activateTab(tab));
  tab.addEventListener('keydown', event => {
    let target;
    if (event.key === 'ArrowRight') target = tabButtons[(index + 1) % tabButtons.length];
    if (event.key === 'ArrowLeft') target = tabButtons[(index + tabButtons.length - 1) % tabButtons.length];
    if (event.key === 'Home') target = tabButtons[0];
    if (event.key === 'End') target = tabButtons[tabButtons.length - 1];
    if (target) {
      event.preventDefault();
      activateTab(target, true);
    }
  });
});

const numberGrid = document.querySelector('.numbers');
const selectedNumbers = new Set();
const unavailable = new Set([4, 9, 14, 19]);
const selectionStatus = document.querySelector('#selection-status');
function updateSelectionStatus() {
  const count = selectedNumbers.size;
  selectionStatus.textContent = count === 0 ? 'Seleccioná un número para probar' : `${count} ${count === 1 ? 'número seleccionado' : 'números seleccionados'} · demo`;
}
for (let index = 0; index < 24; index++) {
  const value = String(420 + index).padStart(4, '0');
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'number';
  button.textContent = value;
  button.setAttribute('aria-label', `Número ${value}${unavailable.has(index) ? ', no disponible en esta demo' : ''}`);
  if (unavailable.has(index)) {
    button.disabled = true;
  } else {
    button.setAttribute('aria-pressed', 'false');
    button.addEventListener('click', () => {
      if (selectedNumbers.has(value)) selectedNumbers.delete(value);
      else selectedNumbers.add(value);
      button.setAttribute('aria-pressed', String(selectedNumbers.has(value)));
      updateSelectionStatus();
    });
  }
  numberGrid.appendChild(button);
}
document.querySelector('#clear-numbers').addEventListener('click', () => {
  selectedNumbers.clear();
  numberGrid.querySelectorAll('[aria-pressed]').forEach(button => button.setAttribute('aria-pressed', 'false'));
  updateSelectionStatus();
});
