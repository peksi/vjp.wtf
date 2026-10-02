// Filter + keyboard selection for the link console. The links work without this script;
// it only reveals the search prompt and section menu, and wires the window buttons.

const search = document.getElementById('search');
const rows = [...document.querySelectorAll('.row')];
const groups = [...document.querySelectorAll('.group')];
const menu = document.getElementById('menu');
const count = document.getElementById('count');
const empty = document.getElementById('empty');
const win = document.getElementById('window');
const openIcon = document.getElementById('open');

const labels = rows.map((row) => row.querySelector('.label').textContent);
let section = '';
let visible = rows;
let selected = 0;

document.getElementById('prompt').hidden = false;
menu.hidden = false;

function highlight(label, term) {
  const el = document.createDocumentFragment();
  const i = term ? label.toLowerCase().indexOf(term) : -1;
  if (i < 0) return document.createTextNode(label);
  const mark = document.createElement('mark');
  mark.textContent = label.slice(i, i + term.length);
  el.append(label.slice(0, i), mark, label.slice(i + term.length));
  return el;
}

function update() {
  const term = search.value.trim().toLowerCase();
  visible = [];
  rows.forEach((row, i) => {
    const group = row.closest('.group');
    const haystack = (labels[i] + ' ' + row.querySelector('.dest').textContent + ' ' + group.querySelector('h2').textContent).toLowerCase();
    const show = (!section || group.dataset.section === section) && (!term || haystack.includes(term));
    row.parentElement.hidden = !show;
    row.querySelector('.label').replaceChildren(highlight(labels[i], show ? term : ''));
    if (show) visible.push(row);
  });
  groups.forEach((group) => {
    group.hidden = !group.querySelector('li:not([hidden])');
  });
  empty.hidden = visible.length > 0;
  document.getElementById('empty-query').textContent = search.value;
  count.textContent = visible.length + ' kohdetta';
  select(0);
}

function select(i) {
  rows.forEach((row) => row.classList.remove('selected'));
  if (!visible.length) return;
  selected = (i + visible.length) % visible.length;
  visible[selected].classList.add('selected');
}

function scrollToSelected() {
  visible[selected]?.scrollIntoView({ block: 'nearest' });
}

search.addEventListener('input', update);

document.getElementById('results').addEventListener('pointermove', (e) => {
  const row = e.target.closest('.row');
  if (row && row !== visible[selected]) select(visible.indexOf(row));
});

document.addEventListener('keydown', (e) => {
  if (e.metaKey || e.ctrlKey || e.altKey || win.hidden) return;
  const inSearch = e.target === search;
  // Arrows only drive the list from the search field or the page itself, so they still scroll elsewhere.
  const listFocus = inSearch || e.target === document.body;
  if (listFocus && e.key === 'ArrowDown') { e.preventDefault(); select(selected + 1); scrollToSelected(); }
  else if (listFocus && e.key === 'ArrowUp') { e.preventDefault(); select(selected - 1); scrollToSelected(); }
  else if (listFocus && e.key === 'Enter' && visible.length) { e.preventDefault(); visible[selected].click(); }
  else if (e.key === 'Escape') { search.value = ''; update(); search.blur(); }
  else if (e.key === '/' && !inSearch) { e.preventDefault(); search.focus(); }
});

menu.addEventListener('click', (e) => {
  const button = e.target.closest('button');
  if (!button) return;
  menu.querySelectorAll('button').forEach((b) => b.setAttribute('aria-pressed', b === button));
  section = button.dataset.section;
  update();
});

// Window buttons; the desktop icon reopens.
document.getElementById('minimize').addEventListener('click', () => {
  win.hidden = true;
  openIcon.focus();
});

document.getElementById('close').addEventListener('click', () => {
  win.hidden = true;
  win.classList.remove('maximized');
  search.value = '';
  update();
  openIcon.focus();
});

document.getElementById('maximize').addEventListener('click', (e) => {
  const on = win.classList.toggle('maximized');
  e.currentTarget.setAttribute('aria-label', on ? 'Palauta' : 'Suurenna');
  e.currentTarget.textContent = on ? '❐' : '□';
});

openIcon.addEventListener('click', () => {
  win.hidden = false;
  search.focus();
});

update();
