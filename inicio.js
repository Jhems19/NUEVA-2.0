// Global variables
let currentImageIndex = 0;
let currentNewPage = 1;
let currentUsedPage = 1;
const machinesPerPage = 8;

// Background images
const backgroundImages = [
    'https://images.unsplash.com/photo-1582489851864-4b4bddaf6a1b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwzfHxpbmR1c3RyaWFsJTIwbWFpbnRlbmFuY2V8ZW58MHx8fGJsdWV8MTc1MjYxNTEyM3ww&ixlib=rb-4.1.0&q=85',
    'https://images.unsplash.com/photo-1601912552080-0fb89fd08042?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODB8MHwxfHNlYXJjaHwyfHx3YXJlaG91c2UlMjBpbXBvcnRzfGVufDB8fHxibHVlfDE3NTI2MTUxMzJ8MA&ixlib=rb-4.1.0&q=85',
    'https://images.unsplash.com/photo-1591307575125-1a7d07f12da4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODB8MHwxfHNlYXJjaHwzfHx3YXJlaG91c2UlMjBpbXBvcnRzfGVufDB8fHxibHVlfDE3NTI2MTUxMzJ8MA&ixlib=rb-4.1.0&q=85',
    'https://images.pexels.com/photos/1624694/pexels-photo-1624694.jpeg'
];

// Machine data
const newMachines = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    name: `Máquina Nueva ${i + 1}`,
    description: `Equipo industrial de última generación con tecnología avanzada`,
    price: `$${(50000 + i * 5000).toLocaleString()}`,
    rating: Math.floor(Math.random() * 2) + 4,
    comment: `Esta máquina cuenta con las últimas innovaciones tecnológicas del sector industrial, garantizando máxima eficiencia y durabilidad.`

}));

const usedMachines = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    name: `Máquina Segunda Mano ${i + 1}`,
    description: `Equipo industrial reacondicionado con garantía de calidad`,
    price: `$${(25000 + i * 2500).toLocaleString()}`,
    rating: Math.floor(Math.random() * 2) + 3,
    comment: `Máquina reacondicionada por nuestros expertos, manteniendo altos estándares de calidad y funcionamiento óptimo.`
    
}));
function renderMachines(machines, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    machines.forEach((machine, index) => {
        const card = document.createElement('div');
        card.className = 'machine-card';

        card.innerHTML = `
            <h3>${machine.name}</h3>
            <p>${machine.description}</p>
            <p><strong>Precio:</strong> ${machine.price}</p>
            <p><strong>Rating:</strong> ${'★'.repeat(machine.rating)}</p>
            <p>${machine.comment}</p>
            <div>
                <img id="img-preview-${containerId}-${index}" 
                     src="${machine.image || 'https://via.placeholder.com/150'}" 
                     alt="Imagen de ${machine.name}" width="150"/>
            </div>
            <input type="file" accept="image/*" onchange="loadImage(event, '${containerId}', ${index})" />
        `;

        container.appendChild(card);
    });
}

// Cargar imagen desde navegador y actualizar en la tarjeta
function loadImage(event, containerId, index) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const imgElement = document.getElementById(`img-preview-${containerId}-${index}`);
            imgElement.src = e.target.result;

            if (containerId === 'new-container') {
                newMachines[index].image = e.target.result;
            } else if (containerId === 'used-container') {
                usedMachines[index].image = e.target.result;
            }
        };
        reader.readAsDataURL(file);
    }
}

// Renderizar al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    renderMachines(newMachines, 'new-container');
    renderMachines(usedMachines, 'used-container');
});






























// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initBackgroundSlider();
    initParticles();
    initNavigation();
    initMachines();
    initContactForm();
    initAnimations();
});

// Background slider functionality
function initBackgroundSlider() {
    const images = document.querySelectorAll('.background-image');
    
    setInterval(() => {
        images[currentImageIndex].classList.remove('active');
        currentImageIndex = (currentImageIndex + 1) % images.length;
        images[currentImageIndex].classList.add('active');
    }, 5000);
}

// Particles animation
function initParticles() {
    const container = document.querySelector('.particles-container');
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 2 + 's';
        particle.style.animationDuration = (4 + Math.random() * 2) + 's';
        container.appendChild(particle);
    }
}

// Navigation functionality
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.getAttribute('data-section');
            showSection(section);
            
            // Update active nav link
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Handle footer links
    const footerLinks = document.querySelectorAll('.footer-links a');
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const section = href.substring(1);
                showSection(section);
                updateActiveNavLink(section);
            }
        });
    });
}

// Show section functionality
function showSection(sectionName) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    const targetSection = document.getElementById(sectionName);
    if (targetSection) {
        targetSection.classList.add('active');
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Initialize machines if needed
        if (sectionName === 'maquinas-nuevas' || sectionName === 'maquinas-usadas') {
            renderMachines(sectionName);
        }
    }
}

// Update active nav link
function updateActiveNavLink(section) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === section) {
            link.classList.add('active');
        }
    });
}

// Initialize machines
function initMachines() {
    renderMachines('maquinas-nuevas');
    renderMachines('maquinas-usadas');
}

// Render machines
function renderMachines(type) {
    const isNew = type === 'maquinas-nuevas';
    const machines = isNew ? newMachines : usedMachines;
    const currentPage = isNew ? currentNewPage : currentUsedPage;
    const gridId = isNew ? 'new-machines-grid' : 'used-machines-grid';
    const paginationId = isNew ? 'new-machines-pagination' : 'used-machines-pagination';
    
    const grid = document.getElementById(gridId);
    const pagination = document.getElementById(paginationId);
    
    if (!grid || !pagination) return;
    
    // Calculate pagination
    const startIndex = (currentPage - 1) * machinesPerPage;
    const endIndex = startIndex + machinesPerPage;
    const currentMachines = machines.slice(startIndex, endIndex);
    const totalPages = Math.ceil(machines.length / machinesPerPage);
    
    // Render machines
    grid.innerHTML = currentMachines.map((machine, index) => {
        return createMachineCard(machine, index);
    }).join('');
    
    // Render pagination
    pagination.innerHTML = createPagination(currentPage, totalPages, type);
    
    // Add event listeners
    addMachineEventListeners(grid);
    addPaginationEventListeners(pagination, type);
}

// Create machine card
function createMachineCard(machine, index) {
    const stars = Array.from({ length: 5 }, (_, i) => 
        `<span class="star ${i < machine.rating ? '' : 'empty'}">★</span>`
    ).join('');
    
    return `
        <div class="machine-card-container" style="animation-delay: ${index * 0.1}s">
            <div class="machine-card">
                <div class="card-face card-front">
                    <div class="image-placeholder">
                        <div class="placeholder-icon">⚙️</div>
                        <div class="placeholder-text">
                            <p><strong>Imagen de Máquina</strong></p>
                            <p>1080p+ Alta Resolución</p>
                        </div>
                    </div>
                    
                    <div class="card-content">
                        <h3 class="machine-name">${machine.name}</h3>
                        <p class="machine-description">${machine.description}</p>
                        
                        <div class="machine-details">
                            <span class="machine-price">${machine.price}</span>
                            <div class="machine-rating">${stars}</div>
                        </div>
                        
                        <div class="machine-actions">
                            <button class="btn-details" onclick="flipCard(this)">
                                <span>👁️</span>
                                <span>Ver Detalles</span>
                            </button>
                            <button class="btn-cart">
                                <span>🛒</span>
                            </button>
                        </div>
                    </div>
                </div>
                
                <div class="card-face card-back">
                    <div class="back-content">
                        <h3 class="back-title">Características Destacadas</h3>
                        
                        <div class="details-grid">
                            <div class="detail-item">
                                <div class="detail-icon">🔧</div>
                                <p class="detail-text">Mantenimiento especializado</p>
                            </div>
                            
                            <div class="detail-item">
                                <div class="detail-icon">⚙️</div>
                                <p class="detail-text">Instalación profesional</p>
                            </div>
                            
                            <div class="detail-item">
                                <div class="detail-icon">📦</div>
                                <p class="detail-text">Garantía extendida</p>
                            </div>
                        </div>
                        
                        <div class="machine-comment">
                            <p class="comment-label">Comentario:</p>
                            <p class="comment-text">${machine.comment}</p>
                        </div>
                        
                        <button class="btn-back" onclick="flipCard(this)">
                            Volver
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Create pagination
function createPagination(currentPage, totalPages, type) {
    const prevDisabled = currentPage === 1 ? 'disabled' : '';
    const nextDisabled = currentPage === totalPages ? 'disabled' : '';
    
    const numbers = Array.from({ length: totalPages }, (_, i) => {
        const pageNum = i + 1;
        const active = pageNum === currentPage ? 'active' : '';
        return `<button class="pagination-number ${active}" onclick="goToPage(${pageNum}, '${type}')">${pageNum}</button>`;
    }).join('');
    
    return `
        <button class="pagination-btn" onclick="goToPage(${currentPage - 1}, '${type}')" ${prevDisabled}>
            <span>◀</span>
            <span>Anterior</span>
        </button>
        
        <div class="pagination-numbers">
            ${numbers}
        </div>
        
        <button class="pagination-btn" onclick="goToPage(${currentPage + 1}, '${type}')" ${nextDisabled}>
            <span>Siguiente</span>
            <span>▶</span>
        </button>
    `;
}

// Add machine event listeners
function addMachineEventListeners(grid) {
    const cards = grid.querySelectorAll('.machine-card-container');
    
    cards.forEach((card, index) => {
        // Add entrance animation
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
        
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Add pagination event listeners
function addPaginationEventListeners(pagination, type) {
    // Event listeners are handled by onclick attributes in the HTML
}

// Go to page function
function goToPage(page, type) {
    const isNew = type === 'maquinas-nuevas';
    const machines = isNew ? newMachines : usedMachines;
    const totalPages = Math.ceil(machines.length / machinesPerPage);
    
    if (page < 1 || page > totalPages) return;
    
    if (isNew) {
        currentNewPage = page;
    } else {
        currentUsedPage = page;
    }
    
    renderMachines(type);
}

// Flip card function
function flipCard(button) {
    const card = button.closest('.machine-card');
    card.classList.toggle('flipped');
}

// Contact form functionality
function initContactForm() {
    const form = document.querySelector('.contact-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Simulate form submission
            alert('¡Gracias por tu mensaje! Te contactaremos pronto.');
            form.reset();
        });
    }
}

// Initialize animations
function initAnimations() {
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.service-card, .contact-info, .contact-form-container');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// Mobile menu functionality
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// Service card hover effects
document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.service-icon');
            icon.style.transform = 'scale(1.1) rotate(360deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.service-icon');
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Button hover effects
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('button, .btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Window resize handler
window.addEventListener('resize', function() {
    // Recalculate any responsive elements if needed
    initParticles();
});

// Preload images
function preloadImages() {
    backgroundImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize preloading
preloadImages();