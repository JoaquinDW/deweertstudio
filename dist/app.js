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
// Simulated hero activity. No customer data, live APIs, or notifications are used.
const activity = document.querySelector('.system-activity');
const notification = activity.querySelector('.notification-card');
const pauseActivity = activity.querySelector('.activity-pause');
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
const activityEvents = [
  { system: 'sorteos', name: 'Sorteos', icon: 'ticket', title: 'Compra de chances confirmada', detail: 'Pack de 6 chances · Pago acreditado' },
  { system: 'gym', name: 'MIGYM', icon: 'gym', title: 'Nuevo socio registrado', detail: 'Ficha creada · Membresía mensual' },
  { system: 'turnos', name: 'SmartTurnos', icon: 'calendar', title: 'Nuevo paciente registrado', detail: 'Datos de contacto listos para agendar' },
  { system: 'gym', name: 'MIGYM', icon: 'gym', title: 'Asistencia registrada', detail: 'Acceso habilitado · Socio al día' },
  { system: 'turnos', name: 'SmartTurnos', icon: 'calendar', title: 'Turno reprogramado', detail: 'Agenda actualizada · Nuevo horario confirmado' },
  { system: 'turnos', name: 'SmartTurnos', icon: 'calendar', title: 'Turno confirmado por WhatsApp', detail: 'Recordatorio respondido · Agenda al día' }
];
let activityIndex = 0;
let activityTimer;
let activitySwapTimer;
let activityVisible = false;
let activityPaused = false;
function clearActivityTimers() {
  window.clearTimeout(activityTimer);
  window.clearTimeout(activitySwapTimer);
  notification.classList.remove('is-changing');
}
function paintActivity(index) {
  activityIndex = index;
  const event = activityEvents[index];
  activity.dataset.system = event.system;
  notification.dataset.system = event.system;
  notification.setAttribute('aria-label', `Notificación de ejemplo de ${event.name}`);
  notification.querySelector('.notification-system').textContent = event.name;
  notification.querySelector('.notification-title').textContent = event.title;
  notification.querySelector('.notification-detail').textContent = event.detail;
  notification.querySelector('use').setAttribute('href', `#activity-${event.icon}`);
  activity.querySelectorAll('.system-node').forEach(node => {
    const active = node.dataset.system === event.system;
    node.classList.toggle('is-active', active);
    node.setAttribute('aria-pressed', String(active));
  });
  activity.querySelectorAll('.network-link').forEach(link => link.classList.toggle('is-active', link.dataset.system === event.system));
}
function scheduleActivity() {
  window.clearTimeout(activityTimer);
  const running = activityVisible && !document.hidden && !activityPaused && !motionPreference.matches;
  activity.classList.toggle('is-paused', !running);
  if (!running) return;
  activityTimer = window.setTimeout(() => {
    notification.classList.add('is-changing');
    activitySwapTimer = window.setTimeout(() => {
      paintActivity((activityIndex + 1) % activityEvents.length);
      notification.classList.remove('is-changing');
      scheduleActivity();
    }, 260);
  }, 5200);
}
function syncActivity() {
  clearActivityTimers();
  const paused = activityPaused || motionPreference.matches;
  pauseActivity.disabled = motionPreference.matches;
  pauseActivity.setAttribute('aria-pressed', String(paused));
  pauseActivity.setAttribute('aria-label', paused ? 'Reanudar notificaciones' : 'Pausar notificaciones');
  pauseActivity.querySelector('span').textContent = paused ? 'Reanudar' : 'Pausar';
  if (motionPreference.matches) {
    pauseActivity.setAttribute('aria-label', 'Animaciones desactivadas por tu preferencia de movimiento reducido');
    pauseActivity.querySelector('span').textContent = 'En pausa';
  }
  scheduleActivity();
}
pauseActivity.addEventListener('click', () => {
  activityPaused = !activityPaused;
  syncActivity();
});
activity.querySelectorAll('.system-node').forEach(node => {
  node.addEventListener('click', () => {
    clearActivityTimers();
    for (let step = 1; step <= activityEvents.length; step++) {
      const next = (activityIndex + step) % activityEvents.length;
      if (activityEvents[next].system === node.dataset.system) {
        paintActivity(next);
        break;
      }
    }
    scheduleActivity();
  });
});
document.addEventListener('visibilitychange', syncActivity);
motionPreference.addEventListener('change', syncActivity);
const activityObserver = new IntersectionObserver(entries => {
  activityVisible = entries[0].isIntersecting && entries[0].intersectionRatio >= 0.15;
  syncActivity();
}, { threshold: 0.15 });
activityObserver.observe(activity);
paintActivity(0);
syncActivity();
