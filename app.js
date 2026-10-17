const { products, combos } = window.SP_DATA;
const featuredProductGrid = document.getElementById('featuredProductGrid');
const productGrid = document.getElementById('productGrid');
const comboGrid = document.getElementById('comboGrid');
const filters = document.getElementById('filters');
const waBase = 'https://wa.me/50766897862?text=';

function money(value) { return value == null ? 'Consultar' : `$${value.toFixed(2)}`; }

function whatsappFor(item, flavor = '') {
  const flavorText = flavor ? ` en sabor ${flavor}` : '';
  const msg = `Hola, vi ${item}${flavorText} en la página de Suplementos Pinzón y quiero consultar disponibilidad.`;
  return waBase + encodeURIComponent(msg);
}

// Función global para cambiar la foto y el enlace de WhatsApp al elegir un sabor
window.changeFlavor = function(selectEl, productId, productName) {
  const card = selectEl.closest('.product-card');
  const imgEl = card.querySelector('.product-image img');
  const btnEl = card.querySelector('.card-btn');
  const selectedOption = selectEl.options[selectEl.selectedIndex];
  
  const newImage = selectEl.value;
  const flavorName = selectedOption.text;

  if (imgEl && newImage) {
    imgEl.src = newImage;
  }
  if (btnEl) {
    btnEl.href = whatsappFor(productName, flavorName);
  }
};

function productCard(p) {
  // 1. Selector de sabores (si existen)
  const hasFlavors = p.flavors && p.flavors.length > 0;
  const defaultFlavor = hasFlavors ? p.flavors[0].name : '';
  
  const flavorsHTML = hasFlavors ? `
    <div class="flavor-select-wrap">
      <label for="flavor-${p.id}">Sabor:</label>
      <select id="flavor-${p.id}" class="flavor-select" onchange="changeFlavor(this, '${p.id}', '${p.name}')">
        ${p.flavors.map(f => `<option value="${f.image}">${f.name}</option>`).join('')}
      </select>
    </div>
  ` : '';

  // 2. Viñetas rápidas (highlights)
  const highlightsHTML = p.highlights && p.highlights.length > 0 ? `
    <ul class="product-highlights">
      ${p.highlights.map(h => `<li>✓ ${h}</li>`).join('')}
    </ul>
  ` : '';

  // 3. Desplegable de información y beneficios
  const detailsHTML = (p.description || p.benefits || p.usage) ? `
    <details class="product-details">
      <summary>Ver beneficios y uso</summary>
      <div class="details-body">
        ${p.description ? `<p class="details-desc">${p.description}</p>` : ''}
        ${p.benefits && p.benefits.length > 0 ? `
          <ul class="details-benefits">
            ${p.benefits.map(b => `<li>• ${b}</li>`).join('')}
          </ul>
        ` : ''}
        ${p.usage ? `<p class="details-usage"><strong>Uso:</strong> ${p.usage}</p>` : ''}
      </div>
    </details>
  ` : '';

  return `
    <article class="product-card" data-category="${p.category}">
      <div class="product-image ${p.id}">
        <img src="${p.image}" alt="${p.name}" loading="lazy" decoding="async" onerror="this.parentElement.innerHTML='<div class=\\'image-fallback\\'>${p.name}</div>'">
      </div>
      <div class="product-info">
        <div class="product-meta"><span>${p.category}</span><span>${p.presentation}</span></div>
        <h3>${p.name}</h3>
        
        ${highlightsHTML}
        ${flavorsHTML}
        ${detailsHTML}

        <div class="price-row">
          <span class="price-values">
            <strong>${money(p.price)}</strong>
            ${p.originalPrice != null ? `<del class="original-price">${money(p.originalPrice)}</del>` : ''}
          </span>
          <small>${p.status}</small>
        </div>
        <a class="card-btn" href="${whatsappFor(p.name, defaultFlavor)}" target="_blank" rel="noopener">Consultar por WhatsApp</a>
      </div>
    </article>`;
}

function renderFeaturedProducts() {
  featuredProductGrid.innerHTML = products
    .filter(p => p.featured)
    .map(productCard)
    .join('');
}

function renderProducts(category = 'Todos') {
  const list = category === 'Todos' ? products : products.filter(p => p.category === category);
  productGrid.innerHTML = list.map(productCard).join('');
}

const categories = ['Todos', 'Creatinas', 'Proteínas', 'Ganadores de peso', 'Otros'];
filters.innerHTML = categories.map((c, i) => `<button class="filter-btn ${i===0?'active':''}" data-filter="${c}">${c}</button>`).join('');

filters.addEventListener('click', e => {
  const btn = e.target.closest('.filter-btn'); if (!btn) return;
  filters.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active'); renderProducts(btn.dataset.filter);
});

renderFeaturedProducts();
renderProducts();

// Render de combos con soporte para lazy loading y decoding async
comboGrid.innerHTML = combos.map(c => `
  <article class="combo-card">
    ${c.image ? `
      <div class="combo-img-wrap">
        <img src="${c.image}" alt="${c.name}" class="combo-image" loading="lazy" decoding="async" onload="this.classList.add('is-loaded')">
      </div>
    ` : ''}
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

// =====================================================
// CONTROL DEL CARRUSEL DE CLIENTES
// =====================================================
const clientsTrack = document.getElementById('clientsTrack');
const prevClientBtn = document.getElementById('prevClientBtn');
const nextClientBtn = document.getElementById('nextClientBtn');

if (clientsTrack && prevClientBtn && nextClientBtn) {
  const getClientScrollDistance = () => {
    const card = clientsTrack.querySelector('.client-card');
    return card ? card.offsetWidth + 20 : 300;
  };

  prevClientBtn.addEventListener('click', () => {
    clientsTrack.scrollBy({ left: -getClientScrollDistance(), behavior: 'smooth' });
  });

  nextClientBtn.addEventListener('click', () => {
    clientsTrack.scrollBy({ left: getClientScrollDistance(), behavior: 'smooth' });
  });
}