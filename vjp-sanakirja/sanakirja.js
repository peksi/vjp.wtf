// Search, Sisältö / Hakemisto tabs and the "current term" marker for the sidebar.
// Every term is plain HTML; without this script the page still reads top to bottom.

const search = document.getElementById('search');
const content = document.getElementById('content');
const count = document.getElementById('count');
const empty = document.getElementById('empty');
const navBox = document.getElementById('nav-box');
const navToggle = document.getElementById('nav-toggle');
const tabs = [...document.querySelectorAll('.tab')];
const navs = [...document.querySelectorAll('.nav')];
const navEmpty = document.getElementById('nav-empty');
const entries = [...content.querySelectorAll('.entry[id]')];
const xrefs = [...content.querySelectorAll('.entry.xref')];
const sections = [...content.querySelectorAll('section')];
const narrow = matchMedia('(max-width: 820px)');

// Original text, so highlighting can be redone from scratch on every keystroke.
const originals = entries.map((entry) => ({
  term: entry.querySelector('dt').textContent,
  def: entry.querySelector('.def').textContent,
}));
const total = entries.length;
const initialCount = count.textContent;

search.hidden = false;
document.querySelector('.tabs').hidden = false;
navToggle.hidden = false;
navBox.dataset.open = 'false';

function highlight(text, term) {
  const fragment = document.createDocumentFragment();
  if (!term) {
    fragment.append(text);
    return fragment;
  }
  const lower = text.toLowerCase();
  let from = 0;
  let at;
  while ((at = lower.indexOf(term, from)) >= 0) {
    const mark = document.createElement('mark');
    mark.textContent = text.slice(at, at + term.length);
    fragment.append(text.slice(from, at), mark);
    from = at + term.length;
  }
  fragment.append(text.slice(from));
  return fragment;
}

function filter() {
  const term = search.value.trim().toLowerCase();
  let shown = 0;
  entries.forEach((entry, i) => {
    const { term: name, def } = originals[i];
    const match = !term || (name + ' ' + def).toLowerCase().includes(term);
    entry.hidden = !match;
    entry.querySelector('dt').replaceChildren(highlight(name, match ? term : ''));
    entry.querySelector('.def').replaceChildren(highlight(def, match ? term : ''));
    navs.forEach((nav) => {
      nav.querySelector(`a[data-id="${entry.id}"]`).parentElement.hidden = !match;
    });
    if (match) shown++;
  });
  xrefs.forEach((xref) => { xref.hidden = !!term; });
  sections.forEach((section) => {
    section.hidden = !section.querySelector('.entry:not([hidden])');
  });
  navs.forEach((nav) => {
    nav.querySelectorAll('h2').forEach((heading) => {
      heading.hidden = !heading.nextElementSibling.querySelector('li:not([hidden])');
    });
  });
  empty.hidden = shown > 0;
  navEmpty.hidden = shown > 0;
  document.getElementById('empty-query').textContent = search.value;
  count.textContent = term ? `${shown} / ${total} sanaa` : initialCount;
  updateCurrent();
}

search.addEventListener('input', filter);

document.addEventListener('keydown', (e) => {
  if (e.metaKey || e.ctrlKey || e.altKey) return;
  if (e.key === '/' && e.target !== search) {
    e.preventDefault();
    search.focus();
  }
  if (e.key === 'Escape' && search.value) {
    search.value = '';
    filter();
  }
});

// Tabs
tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    tabs.forEach((t) => t.setAttribute('aria-selected', t === tab));
    // Switching lists must not scroll the sidebar.
    navs.forEach((nav) => { nav.hidden = nav.id !== tab.getAttribute('aria-controls'); });
  });
});

// Phones: the navigation folds behind one button and closes after a jump.
navToggle.addEventListener('click', () => {
  const open = navBox.dataset.open !== 'true';
  navBox.dataset.open = open;
  navToggle.setAttribute('aria-expanded', open);
});

navs.forEach((nav) => nav.addEventListener('click', (e) => {
  if (e.target.closest('a') && narrow.matches) {
    navBox.dataset.open = 'false';
    navToggle.setAttribute('aria-expanded', 'false');
  }
}));

// Current term: follows scrolling, except right after a jump to #term,
// which wins until the reader scrolls on their own (the last terms can't reach the top).
let currentId = null;
let pinned = false;

// Only Sisältö follows the reading position: it's in the same order as the page, while
// Hakemisto is A–Ö, so a marker there would jump around.
const contentsNav = document.getElementById('nav-sisalto');

function markCurrent(id) {
  currentId = id;
  contentsNav.querySelectorAll('a').forEach((a) => a.setAttribute('aria-current', a.dataset.id === id));
  if (contentsNav.hidden || narrow.matches) return;
  contentsNav.querySelector('[aria-current="true"]')?.scrollIntoView({ block: 'nearest' });
}

// The current term is the last visible one whose top has passed this line (px from the top of
// the window). main's bottom padding in sanakirja.css leaves room for the last term to reach it.
const LINE = 96;
let frame = 0;

function updateCurrent() {
  frame = 0;
  if (pinned) return;
  let id = null;
  for (const entry of entries) {
    if (entry.hidden) continue;
    if (entry.getBoundingClientRect().top <= LINE) id = entry.id;
    else break;
  }
  id ??= entries.find((entry) => !entry.hidden)?.id ?? null;
  if (id !== currentId) markCurrent(id);
}

addEventListener('scroll', () => { frame ||= requestAnimationFrame(updateCurrent); }, { passive: true });
addEventListener('resize', () => { frame ||= requestAnimationFrame(updateCurrent); });
updateCurrent();

function unpin() {
  pinned = false;
}

function jumpTo(id) {
  if (!document.getElementById(id)?.classList.contains('entry')) return;
  pinned = true;
  markCurrent(id);
  setTimeout(() => {
    ['wheel', 'touchmove', 'keydown'].forEach((type) => addEventListener(type, unpin, { once: true }));
  }, 50);
}

addEventListener('hashchange', () => jumpTo(location.hash.slice(1)));
if (location.hash) jumpTo(location.hash.slice(1));
