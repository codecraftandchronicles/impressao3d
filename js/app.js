/**
 * Medieval Crafts Forge - Single Page Application
 * Main application logic
 */

// Global state
let appState = {
    products: [],
    testimonials: [],
    productsToShow: 12,
    currentPage: 1,
    services: [
        {
            id: 'impressao3d',
            icon: 'fa-cube',
            titulo: 'Impressão 3D',
            items: [
                'Tecnologias FDM & Resina',
                'Materiais: PLA, ABS, PETG, Resina',
                'Resolução de layer a partir de 0.05 mm',
                'Peças funcionais e decorativas',
                'Entrega express (24h disponível)'
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
                'Entrega em Portugal'
            ]
        },
        {
            id: 'trofeus',
            icon: 'fa-trophy',
            titulo: 'Troféus e Prémios',
            items: [
                'Troféus em acrílico com gravura laser',
                'Figurines customizadas',
                'Séries para desporto e eventos',
                'Personalização a cores completas',
                'Bases e suportes customizáveis'
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
                'Presentes de casamento e eventos'
            ]
        },
        {
            id: 'prototipagem',
            icon: 'fa-flask',
            titulo: 'Prototipagem',
            items: [
                'Conceito para objeto em tempo real',
                'Tolerâncias de precisão industrial',
                'Assembly multi-material',
                'Projetos protegidos por NDA',
                'Suporte iterativo e revisões'
            ]
        },
        {
            id: 'sinalética',
            icon: 'fa-signs-post',
            titulo: 'Sinalética e Displays',
            items: [
                'Sistemas de sinalética interior',
                'Estruturas para exposições',
                'Unidades de display retail',
                'Componentes de wayfinding',
                'Acabamentos personalizados'
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
    }
};

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
    loadData();
    renderServices();
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

        // Load testimonials
        const testimonialsResponse = await fetch('data/testimonials.json');
        const testimonialsData = await testimonialsResponse.json();
        appState.testimonials = testimonialsData.testemunhos;

        // Render sections
        renderProducts();
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

    grid.innerHTML = visible.map(product => `
        <div class="product-card">
            <img src="${product.imagem}" alt="${product.nome}" class="product-image" onerror="this.src='img/error.png'">
            <div class="product-info">
                <span class="product-ref">Ref: ${product.id}</span>
                <h3 class="product-name">${product.nome}</h3>
                <div class="product-price">
                    <span class="price-tag">A partir de ${product.precoRef}${product.moeda}</span>
                    <span class="price-discount">Descontos em volume</span>
                </div>
                <button class="product-btn" onclick="openContactChannel('whatsapp')">
                    Solicitar Orçamento
                </button>
            </div>
        </div>
    `).join('');

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
