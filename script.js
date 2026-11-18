const searchInput = document.getElementById('gameSearch');
const filterButtons = [...document.querySelectorAll('.filter')];
const cards = [...document.querySelectorAll('.game-card')];
const count = document.getElementById('gameCount');
const empty = document.getElementById('emptyState');
let selectedCategory = 'All';

function updateGames() {
  const term = searchInput.value.trim().toLowerCase();
  let visible = 0;
  cards.forEach(card => {
    const matchesCategory = selectedCategory === 'All' || card.dataset.category === selectedCategory;
    const matchesSearch = card.dataset.name.toLowerCase().includes(term) || card.textContent.toLowerCase().includes(term);
    const show = matchesCategory && matchesSearch;
    card.hidden = !show;
    if (show) visible++;
  });
  count.textContent = visible;
  empty.hidden = visible !== 0;
}
searchInput.addEventListener('input', updateGames);
filterButtons.forEach(button => button.addEventListener('click', () => {
  selectedCategory = button.dataset.filter;
  filterButtons.forEach(item => item.classList.toggle('active', item === button));
  updateGames();
}));
document.getElementById('menuToggle').addEventListener('click', () => {
  document.querySelector('.nav-links').classList.toggle('open');
});
document.querySelectorAll('.nav-links a').forEach(link => link.addEventListener('click', () => {
  document.querySelector('.nav-links').classList.remove('open');
}));
updateGames();
