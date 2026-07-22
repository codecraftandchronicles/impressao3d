/**
 * Medieval Crafts Forge - Single Page Application
 * Main application logic
 */

// Global state
let appState = {
    products: [],
    portfolio: [],
    materiais: [],
    testimonials: [],
    productsToShow: 12,
    currentPage: 1,
    services: [
        {
            id: 'impressao3d',
            icon: 'fa-cube',
            titulo: 'Impressão 3D',
            items: [                        
                'Peças funcionais e decorativas',
                'Prazo médio de produção: 1 a 3 dias úteis',
				'Levantamento no local',
				'Envio pelos CTT (1 a 3 dias úteis)',
				'Fazemos entregas aos sábados, mediante custo adicional'
            ]
        },
        {
            id: 'brindes',
            icon: 'fa-gift',
            titulo: 'Brindes Corporativos',
            items: [
                'Itens personalizados com marca',
                'Descontos especiais em volume',
                'Embalagem personalizada',
                'Integração de logo e identidade',
            ]
        },
        {
            id: 'personalizacao',
            icon: 'fa-pen-fancy',
            titulo: 'Personalização',
            items: [
                'Gravura de texto e logo',
                'Conversão de foto para 3D',
                'Placas de identificação e tags',
                'Materiais promocionais',
                'Brindes de casamento e eventos',
                'Peças com várias cores podem ter acréscimo no valor'
            ]
        },
        {
            id: 'pintura-dioramas',
            icon: 'fa-palette',
            titulo: 'Pintura & Dioramas',
            items: [
                'Pintura 100% à mão, camada a camada',
                'Maquetes temáticos personalizados',
                'Acabamentos com luz LED ou UV',
                'Peças de coleção, prontas a expor',
                'Traga a sua peça: pintamos miniaturas e bustos que já tem em casa'
            ]
        },
        {
            id: 'sinalética',
            icon: 'fa-signs-post',
            titulo: 'Sinalética e Displays',
            items: [
                'Sistemas de sinalética interior',
                'Unidades de display retail',
                'Componentes de wayfinding',
                'Acabamentos personalizados'
            ]
        },
        {
            id: 'trofeus',
            icon: 'fa-trophy',
            titulo: 'Troféus e Prémios',
            items: [
                'Troféus de todos os tamanhos e cores',
                'Bases e suportes customizáveis'
            ]
        }
    ],
    contactChannels: {
        whatsapp: {
            name: 'WhatsApp',
            url: 'https://wa.me/351910663727?text=Olá%20Medieval%20Crafts%20Forge%2C%20gostaria%20de%20um%20orçamento',
            icon: 'fab fa-whatsapp'
        },
        email: {
            name: 'Email',
            url: 'mailto:preciousabstraction@gmail.com',
            icon: 'fas fa-envelope'
        },
        instagram: {
            name: 'Instagram',
            url: 'https://instagram.com/medievalcraftsforge',
            icon: 'fab fa-instagram'
        }
    },
    deliveryInfo: 'Prazo médio de produção: 1 a 3 dias úteis, consoante a complexidade da peça e quantidade solicitada. Após produção, entregamos por levantamento no local ou envio pelos CTT (mais 1 a 3 dias úteis). Fazemos entregas aos sábados, mediante custo adicional'
};

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
    loadData();
    renderServices();
    renderDeliveryInfo();
    setupEventListeners();
});

/**
 * Load JSON data
 */
async function loadData() {
    try {
        // Load products
        const productsResponse = await fetch('data/products.json');
        const productsData = await productsResponse.json();
        appState.products = productsData.produtos;

        // Load materiais (dados técnicos de filamento)
        const materiaisResponse = await fetch('data/materials.json');
        const materiaisData = await materiaisResponse.json();
        appState.materiais = materiaisData.materiais;

        // Load portfolio (trabalhos personalizados sob encomenda)
        const portfolioResponse = await fetch('data/portfolio.json');
        const portfolioData = await portfolioResponse.json();
        appState.portfolio = portfolioData.portfolio;

        // Load testimonials
        const testimonialsResponse = await fetch('data/testimonials.json');
        const testimonialsData = await testimonialsResponse.json();
        appState.testimonials = testimonialsData.testemunhos;

        // Render sections
        renderProducts();
        renderPortfolio();
        renderTestimonials();
    } catch (error) {
        console.error('Erro ao carregar dados:', error);
    }
}

/**
 * Render Services Section
 */
function renderServices() {
    const grid = document.getElementById('services-grid');
    if (!grid) return;

    grid.innerHTML = appState.services.map(service => `
        <div class="service-card">
            <div class="service-icon">
                <i class="fas ${service.icon}"></i>
            </div>
            <h3 class="service-title">${service.titulo}</h3>
            <ul class="service-items">
                ${service.items.map(item => `<li>${item}</li>`).join('')}
            </ul>
        </div>
    `).join('');
}

/**
 * Render Delivery Info (prazo de entrega)
 */
function renderDeliveryInfo() {
    const el = document.getElementById('delivery-info');
    if (!el) return;
    el.innerHTML = `<i class="fas fa-truck"></i> ${appState.deliveryInfo}`;
}

/**
 * Render Portfolio Section (peças personalizadas, sem preço)
 */
function renderPortfolio() {
    const grid = document.getElementById('portfolio-grid');
    if (!grid) return;

    grid.innerHTML = appState.portfolio.map(item => {
        const material = appState.materiais.find(m => m.tipo === item.filamento);
        const tempInfo = material
            ? `Aguenta de ${material.tempMin}°C a ${material.tempMax}°C`
            : '';
        const nomeEscaped = item.nome.replace(/'/g, "\\'");
        const isUnique = !!(item.preco && item.preco > 0);

        return `
        <div class="product-card">
            <img src="${item.imagem}" alt="${item.nome}" class="product-image" onerror="this.src='img/error.png'">
            <div class="product-info">
                ${isUnique ? `<span class="unique-badge"><i class="fas fa-gem"></i> Peça Única</span>` : ''}
                <h3 class="product-name">${item.nome}</h3>
                <span class="product-dimensions">
                    <i class="fas fa-ruler-combined"></i>
                    ${(item.comprimento || item.largura || item.altura)
                        ? `${item.comprimento} x ${item.largura} x ${item.altura} mm`
                        : 'Diversos tamanhos'}
                </span>
                ${isUnique ? '' : `
                <span class="product-filament">
                    <i class="fas fa-thermometer-half"></i>
                    ${item.filamento}${tempInfo ? ` · ${tempInfo}` : ''}
                </span>`}
                <span class="product-usage">
                    <i class="fas fa-triangle-exclamation"></i>
                    ${(item.tags && item.tags.length) ? item.tags.join(' · ') : 'Peça decorativa'}
                </span>
                ${isUnique
                    ? `<div class="product-price">
                        <span class="price-tag">${item.preco}${item.moeda || '€'}</span>
                        <span class="price-note">Peça original, pintada à mão — apenas 1 disponível</span>
                       </div>
                       <button class="product-btn" onclick="requestUniquePiece('${nomeEscaped}', '${item.preco}${item.moeda || '€'}')">
                        Comprar esta peça única
                       </button>`
                    : `<button class="product-btn" onclick="requestCustomPiece('${nomeEscaped}')">
                        Também quero um personalizado para mim
                       </button>`
                }
            </div>
        </div>
    `;
    }).join('');
}

/**
 * Render Products Section (com Load More)
 */
function renderProducts() {
    const grid = document.getElementById('products-grid');
    if (!grid) return;

    // Ordena: primeiro por marketplace, depois por preço
    const sorted = [...appState.products].sort((a, b) => {
        if (a.marketplace === b.marketplace) {
            return a.precoRef - b.precoRef;
        }
        return a.marketplace - b.marketplace;
    });

    // Mostra apenas os produtos até productsToShow
    const visible = sorted.slice(0, appState.productsToShow);

    grid.innerHTML = visible.map(product => {
        const material = appState.materiais.find(m => m.tipo === product.filamento);
        const tempInfo = material
            ? `Aguenta de ${material.tempMin}°C a ${material.tempMax}°C`
            : '';
        const usoIcon = product.uso === 'Externo' ? 'fa-cloud-sun' : 'fa-house';

        return `
        <div class="product-card">
            <img src="${product.imagem}" alt="${product.nome}" class="product-image" onerror="this.src='img/error.png'">
            <div class="product-info">
                <span class="product-ref">Ref: ${product.id}</span>
                <h3 class="product-name">${product.nome} <span class="product-unit">(unidade)</span></h3>
                <span class="product-dimensions">
                    <i class="fas fa-ruler-combined"></i>
                    ${(product.comprimento || product.largura || product.altura)
                        ? `Tamanho padrão: ${product.comprimento} x ${product.largura} x ${product.altura} mm <br>(também fazemos à sua medida)`
                        : 'Diversos tamanhos (também fazemos à sua medida)'}
                </span>
                <span class="product-filament">
                    <i class="fas fa-thermometer-half"></i>
                    ${product.filamento}${tempInfo ? ` · ${tempInfo}` : ''}
                </span>
                <span class="product-usage">
                    <i class="fas ${usoIcon}"></i>
                    Uso ${product.uso}
                </span>
                <div class="product-price">
                    ${product.precoRef > 0
                        ? `<span class="price-tag">A partir de ${product.precoRef}${product.moeda}</span>`
                        : `<span class="price-tag price-oncall">Apenas sob encomenda</span>`}
                    <span class="price-discount">Descontos em volume</span>
                    <span class="price-note">Preço para 1 cor</span>
                </div>
                <button class="product-btn" onclick="openContactChannel('whatsapp')">
                    Solicitar Orçamento
                </button>
            </div>
        </div>
    `;
    }).join('');

    // Mostra/esconde botão "Carregar Mais"
    const loadMoreBtn = document.getElementById('load-more-btn');
    if (loadMoreBtn) {
        loadMoreBtn.style.display = appState.productsToShow < sorted.length ? 'block' : 'none';
    }
}

/**
 * Render Testimonials Section
 */
function renderTestimonials() {
    const grid = document.getElementById('testimonials-grid');
    if (!grid) return;

    grid.innerHTML = appState.testimonials.map(testimonial => {
        const initials = getInitials(testimonial.nome);
        const avatarUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${initials}&backgroundColor=ffc107&textColor=000000`;

        return `
            <div class="testimonial-card">
                <div class="testimonial-quote">${testimonial.descricao}</div>
                <img src="${avatarUrl}" alt="${testimonial.nome}" class="testimonial-avatar">
                <div class="testimonial-name">${testimonial.nome}</div>
                ${testimonial.empresa ? `<div class="testimonial-company">${testimonial.empresa}</div>` : ''}
            </div>
        `;
    }).join('');
}

/**
 * Carregar mais produtos
 */
function loadMoreProducts() {
    const previousCount = appState.productsToShow;
    appState.productsToShow += 12;
    renderProducts();

    // Scroll para o primeiro produto novo
    const cards = document.querySelectorAll('#products-grid .product-card');
    if (cards[previousCount]) {
        cards[previousCount].scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

/**
 * Extract initials from name
 */
function getInitials(name) {
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) {
        return parts[0].substring(0, 2).toUpperCase();
    }
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

/**
 * Setup event listeners
 */
function setupEventListeners() {
    // Header contact button
    const headerBtn = document.getElementById('btn-contact-header');
    if (headerBtn) {
        headerBtn.addEventListener('click', () => showContactModal());
    }

    // Hero buttons
    const heroQuoteBtn = document.getElementById('btn-quote-hero');
    if (heroQuoteBtn) {
        heroQuoteBtn.addEventListener('click', () => showContactModal());
    }

    const exploreBtn = document.getElementById('btn-explore');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', () => {
            document.getElementById('produtos')?.scrollIntoView({ behavior: 'smooth' });
        });
    }
}

/**
 * Open contact channel (WhatsApp, Email, Instagram)
 */
function openContactChannel(channel) {
    if (appState.contactChannels[channel]) {
        window.open(appState.contactChannels[channel].url, '_blank');
    }
}

/**
 * Solicitar peça personalizada a partir do Portfólio
 */
function requestCustomPiece(nomeReferencia) {
    const texto = encodeURIComponent(`Olá Medieval Crafts Forge, vi o trabalho "${nomeReferencia}" e também gostaria de um personalizado para mim.`);
    window.open(`https://wa.me/351910663727?text=${texto}`, '_blank');
}

/**
 * Solicitar compra de peça única (artesanato, não reproduzível)
 */
function requestUniquePiece(nomeReferencia, preco) {
    const texto = encodeURIComponent(`Olá Medieval Crafts Forge, tenho interesse em comprar a peça única "${nomeReferencia}" (${preco}). Ainda está disponível?`);
    window.open(`https://wa.me/351910663727?text=${texto}`, '_blank');
}

/**
 * Show contact modal with all channels
 */
function showContactModal() {
    // Scroll to contact section
    document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
}

/**
 * Smooth scroll for navigation links
 */
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

console.log('Medieval Crafts Forge - Aplicação carregada com sucesso! 🔨⚒️');