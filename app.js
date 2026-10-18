const { products, combos } = window.SP_DATA;
const featuredProductGrid = document.getElementById('featuredProductGrid');
const productGrid = document.getElementById('productGrid');
const comboGrid = document.getElementById('comboGrid');
const filters = document.getElementById('filters');
const waBase = 'https://wa.me/50766897862?text=';
const cart = [];
const cartOpenBtn = document.getElementById('cartOpenBtn');
const cartDialog = document.getElementById('cartDialog');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');
const cartCheckout = document.getElementById('cartCheckout');
const revealObserver = 'IntersectionObserver' in window
  ? new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -32px 0px' })
  : null;

function observeReveals(container) {
  if (!revealObserver) return;
  container.querySelectorAll('.section-head, .product-card, .combo-card, .event-card, .about-copy, .carousel-wrapper, .contact-actions')
    .forEach(element => {
      if (element.classList.contains('reveal')) return;
      element.classList.add('reveal');
      revealObserver.observe(element);
    });
}

function money(value) { return value == null ? 'Consultar' : `$${value.toFixed(2)}`; }

function productStatusClass(status = '') {
  const normalizedStatus = status.toLowerCase();
  if (normalizedStatus.includes('preventa')) return 'product-status--preorder';
  if (normalizedStatus.includes('encargo') || normalizedStatus.includes('pedido') || normalizedStatus.includes('disponible')) {
    return 'product-status--order';
  }
  return 'product-status--neutral';
}

function addToCart(type, id, card) {
  const itemData = (type === 'product' ? products : combos).find(item => item.id === id);
  if (!itemData) return;

  const selectedFlavor = type === 'product'
    ? card.querySelector('.flavor-select')?.selectedOptions[0]?.textContent.trim() || ''
    : '';
  const key = `${type}:${id}:${selectedFlavor}`;
  const existingItem = cart.find(item => item.key === key);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      key,
      name: itemData.name,
      presentation: itemData.presentation || '',
      price: itemData.price,
      flavor: selectedFlavor,
      quantity: 1
    });
  }

  renderCart(true);
  const addButton = card.querySelector('.add-to-cart-btn');
  if (addButton) {
    const originalText = addButton.textContent;
    addButton.textContent = '¡Agregado!';
    window.setTimeout(() => {
      if (addButton.isConnected) addButton.textContent = originalText;
    }, 1200);
  }
}

function renderCart(animate = false) {
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  cartCount.textContent = String(itemCount);
  if (animate) {
    cartOpenBtn.classList.remove('is-updated');
    void cartOpenBtn.offsetWidth;
    cartOpenBtn.classList.add('is-updated');
  }
  cartOpenBtn.setAttribute('aria-label', `Ver pedido, ${itemCount} ${itemCount === 1 ? 'producto' : 'productos'}`);
  cartTotal.textContent = money(total);
  cartCheckout.setAttribute('aria-disabled', String(cart.length === 0));
  cartCheckout.tabIndex = cart.length === 0 ? -1 : 0;

  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="cart-empty">Tu carrito está vacío. Agrega productos o combos para armar tu pedido.</p>';
    cartCheckout.removeAttribute('href');
    return;
  }

  cartItems.innerHTML = cart.map(item => `
    <article class="cart-item">
      <div class="cart-item-info">
        <h3>${item.name}</h3>
        <p>${[item.presentation, item.flavor].filter(Boolean).join(' · ')}</p>
        <strong>${money(item.price)} c/u</strong>
      </div>
      <div class="cart-item-controls" aria-label="Cantidad de ${item.name}">
        <button type="button" data-cart-action="decrease" data-key="${item.key}" aria-label="Disminuir cantidad" ${item.quantity === 1 ? 'disabled' : ''}>−</button>
        <span>${item.quantity}</span>
        <button type="button" data-cart-action="increase" data-key="${item.key}" aria-label="Aumentar cantidad">+</button>
        <button type="button" class="cart-remove" data-cart-action="remove" data-key="${item.key}" aria-label="Quitar ${item.name} del pedido">Quitar</button>
      </div>
      <strong class="cart-item-subtotal">${money(item.price * item.quantity)}</strong>
    </article>
  `).join('');

  const orderLines = cart.map(item => {
    const details = [item.presentation, item.flavor].filter(Boolean).join(' · ');
    return `• ${item.name}${details ? ` (${details})` : ''} × ${item.quantity} — ${money(item.price * item.quantity)}`;
  });
  const message = [
    'Hola, quiero hacer este pedido en Suplementos Pinzón:',
    '',
    ...orderLines,
    '',
    `Total estimado: ${money(total)}`,
    'Quedo pendiente de confirmar disponibilidad y coordinar la entrega.'
  ].join('\n');
  cartCheckout.href = waBase + encodeURIComponent(message);
}

cartOpenBtn.addEventListener('click', () => cartDialog.showModal());
document.getElementById('cartCloseBtn').addEventListener('click', () => cartDialog.close());
cartDialog.addEventListener('click', event => {
  if (event.target === cartDialog) cartDialog.close();
});

document.addEventListener('click', event => {
  const addButton = event.target.closest('.add-to-cart-btn');
  if (addButton) {
    addToCart(addButton.dataset.cartType, addButton.dataset.cartId, addButton.closest('.product-card, .combo-card'));
    return;
  }

  const cartAction = event.target.closest('[data-cart-action]');
  if (!cartAction) return;
  const itemIndex = cart.findIndex(item => item.key === cartAction.dataset.key);
  if (itemIndex === -1) return;

  if (cartAction.dataset.cartAction === 'increase') cart[itemIndex].quantity += 1;
  if (cartAction.dataset.cartAction === 'decrease' && cart[itemIndex].quantity > 1) cart[itemIndex].quantity -= 1;
  if (cartAction.dataset.cartAction === 'remove') cart.splice(itemIndex, 1);
  renderCart(true);
});

renderCart();

// Actualiza la imagen y la descripción al elegir un sabor.
window.changeFlavor = function(selectEl) {
  const card = selectEl.closest('.product-card');
  const imgEl = card.querySelector('.product-image img');
  const noteEl = card.querySelector('.flavor-note');
  const selectedOption = selectEl.options[selectEl.selectedIndex];
  
  const newImage = selectEl.value;

  if (imgEl && newImage) {
    imgEl.src = newImage;
  }
  if (noteEl) {
    noteEl.textContent = selectedOption.dataset.description || '';
  }
};

function productCard(p) {
  // 1. Selector de sabores (si existen)
  const hasFlavors = p.flavors && p.flavors.length > 0;
  
  const flavorsHTML = hasFlavors ? `
    <div class="flavor-select-wrap">
      <label for="flavor-${p.id}">Sabor:</label>
      <select id="flavor-${p.id}" class="flavor-select" onchange="changeFlavor(this)">
        ${p.flavors.map(f => `<option value="${f.image}" data-description="${f.description || ''}">${f.name}</option>`).join('')}
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
  const detailsHTML = (p.description || p.benefits || p.usage || hasFlavors || p.flavorDescription) ? `
    <details class="product-details">
      <summary>¿Para qué te sirve?</summary>
      <div class="details-body">
        ${p.description ? `<p class="details-desc">${p.description}</p>` : ''}
        ${hasFlavors ? `<p class="flavor-note" aria-live="polite">${p.flavors[0].description || ''}</p>` : ''}
        ${!hasFlavors && p.flavorDescription ? `<p class="flavor-note">${p.flavorDescription}</p>` : ''}
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
    <article class="product-card${p.featured ? ' is-featured' : ''}" data-category="${p.category}">
      <div class="product-image ${p.id}">
        ${p.featured ? '<span class="product-badge">Destacado</span>' : ''}
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
          ${p.savings ? `<span class="savings-badge">Ahorras ${money(p.savings)}</span>` : ''}
          <small class="product-status ${productStatusClass(p.status)}">${p.status}</small>
        </div>
        <button class="card-btn add-to-cart-btn" type="button" data-cart-type="product" data-cart-id="${p.id}">Agregar al carrito</button>
      </div>
    </article>`;
}

function renderFeaturedProducts() {
  featuredProductGrid.innerHTML = products
    .filter(p => p.featured)
    .map(productCard)
    .join('');
  observeReveals(featuredProductGrid);
}

function renderProducts(category = 'Todos') {
  const list = category === 'Todos' ? products : products.filter(p => p.category === category);
  productGrid.innerHTML = list.map(productCard).join('');
  observeReveals(productGrid);
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
    <div class="combo-badges">
      <span class="combo-badge">${c.badge}</span>
      ${c.savings ? `<span class="savings-badge">Ahorras ${money(c.savings)}</span>` : ''}
    </div>
    <h3>${c.name}</h3>
    <p>${c.description}</p>
    <div class="combo-bottom">
      <strong>${money(c.price)}</strong>
      <button class="add-to-cart-btn" type="button" data-cart-type="combo" data-cart-id="${c.id}">Agregar combo</button>
    </div>
  </article>`).join('');
observeReveals(document);

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