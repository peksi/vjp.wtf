// Window buttons: minimize and close hide the window; the desktop icon brings it back.
const win = document.getElementById('window');
const openIcon = document.getElementById('open');

function hide() {
  win.hidden = true;
  openIcon.focus();
}

document.getElementById('minimize').addEventListener('click', hide);
document.getElementById('close').addEventListener('click', hide);

openIcon.addEventListener('click', () => {
  win.hidden = false;
  win.querySelector('.row').focus();
});

// ↑/↓ move focus between the links (focus inverts the row); Enter opens a focused link natively.
const rows = [...win.querySelectorAll('.row')];

document.addEventListener('keydown', (e) => {
  if (win.hidden || e.metaKey || e.ctrlKey || e.altKey) return;
  if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
  // Leave arrows alone on other controls (title buttons, desktop icons) so they behave normally.
  const current = rows.indexOf(document.activeElement);
  if (current < 0 && document.activeElement !== document.body) return;
  e.preventDefault();
  const step = e.key === 'ArrowDown' ? 1 : -1;
  const next = current < 0 ? (step > 0 ? 0 : rows.length - 1) : (current + step + rows.length) % rows.length;
  rows[next].focus();
});

// Drag the window by its title bar, on big screens with a mouse. It moves with a transform
// and stays fully inside the viewport, so dragging never adds scrollbars.
const titleBar = win.querySelector('.title-bar');
const canDrag = matchMedia('(pointer: fine) and (min-width: 641px)');
let offsetX = 0;
let offsetY = 0;

function moveTo(x, y) {
  if (win.hidden) return;
  // Where the window sits in the layout, before any drag offset.
  const rect = win.getBoundingClientRect();
  const left = rect.left - offsetX;
  const top = rect.top - offsetY;
  offsetX = Math.min(Math.max(x, -left), Math.max(-left, innerWidth - rect.width - left));
  offsetY = Math.min(Math.max(y, -top), Math.max(-top, innerHeight - rect.height - top));
  win.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
}

titleBar.addEventListener('pointerdown', (e) => {
  if (!canDrag.matches || e.button !== 0 || e.target.closest('button')) return;
  const startX = e.clientX - offsetX;
  const startY = e.clientY - offsetY;
  titleBar.setPointerCapture(e.pointerId);
  win.classList.add('dragging');

  const onMove = (move) => moveTo(move.clientX - startX, move.clientY - startY);
  const onUp = () => {
    win.classList.remove('dragging');
    titleBar.removeEventListener('pointermove', onMove);
    titleBar.removeEventListener('pointerup', onUp);
    titleBar.removeEventListener('pointercancel', onUp);
  };
  titleBar.addEventListener('pointermove', onMove);
  titleBar.addEventListener('pointerup', onUp);
  titleBar.addEventListener('pointercancel', onUp);
});

// Keep a moved window on screen when the browser is resized; drop the offset when the
// layout switches to the small-screen one, where the window can't be dragged.
addEventListener('resize', () => {
  if (canDrag.matches && (offsetX || offsetY)) moveTo(offsetX, offsetY);
});

canDrag.addEventListener('change', () => {
  if (canDrag.matches) return;
  offsetX = offsetY = 0;
  win.style.transform = '';
});
