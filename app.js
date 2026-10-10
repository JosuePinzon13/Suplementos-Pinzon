const { products, combos } = window.SP_DATA;
const productGrid = document.getElementById('productGrid');
const comboGrid = document.getElementById('comboGrid');
const filters = document.getElementById('filters');
const waBase = 'https://wa.me/50766897862?text=';

function money(value) { return value == null ? 'Consultar' : `$${value.toFixed(2)}`; }
function whatsappFor(item) {
  const msg = `Hola, vi ${item} en la página de Suplementos Pinzón y quiero consultar disponibilidad.`;
  return waBase + encodeURIComponent(msg);
}
function productCard(p) {
  return `
    <article class="product-card" data-category="${p.category}">
      <div class="product-image">
        <img src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.parentElement.innerHTML='<div class=\\'image-fallback\\'>${p.name}</div>'">
      </div>
      <div class="product-info">
        <div class="product-meta"><span>${p.category}</span><span>${p.presentation}</span></div>
        <h3>${p.name}</h3>
        <div class="price-row"><strong>${money(p.price)}</strong><small>${p.status}</small></div>
        <a class="card-btn" href="${whatsappFor(p.name)}" target="_blank" rel="noopener">Consultar por WhatsApp</a>
      </div>
    </article>`;
}
function renderProducts(category = 'Todos') {
  const list = category === 'Todos' ? products : products.filter(p => p.category === category);
  productGrid.innerHTML = list.map(productCard).join('');
}
const categories = ['Todos', ...new Set(products.map(p => p.category))];
filters.innerHTML = categories.map((c, i) => `<button class="filter-btn ${i===0?'active':''}" data-filter="${c}">${c}</button>`).join('');
filters.addEventListener('click', e => {
  const btn = e.target.closest('.filter-btn'); if (!btn) return;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active'); renderProducts(btn.dataset.filter);
});
renderProducts();
comboGrid.innerHTML = combos.map(c => `
  <article class="combo-card">
    <span class="combo-badge">${c.badge}</span>
    <h3>${c.name}</h3>
    <p>${c.description}</p>
    <div class="combo-bottom">
      <strong>${money(c.price)}</strong>
      <a href="${whatsappFor(c.name)}" target="_blank" rel="noopener">Pedir combo →</a>
    </div>
  </article>`).join('');
const menuBtn = document.getElementById('menuBtn');
const navMenu = document.getElementById('navMenu');
menuBtn.addEventListener('click', () => {
  const open = navMenu.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', String(open));
});
navMenu.addEventListener('click', e => {
  if (e.target.tagName === 'A') { navMenu.classList.remove('open'); menuBtn.setAttribute('aria-expanded', 'false'); }
});
document.getElementById('year').textContent = new Date().getFullYear();
