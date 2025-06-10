document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeHeroAnimations();
    initializeScrollAnimations();
    initializeGallery();
    initializeTestimonials();
    initializeSmoothScrolling();
    initializeFormInteractions();
    initializeParallaxEffects();
});


function initializeNavigation() {
    const navbar = document.querySelector('.navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
   
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'hsla(var(--surface), 0.98)';
            navbar.style.boxShadow = 'var(--shadow-md)';
        } else {
            navbar.style.background = 'hsla(var(--surface), 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
    
   
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.innerHTML = navMenu.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
    }
    
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
    
    
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
}


function initializeHeroAnimations() {
    const heroButtons = document.querySelectorAll('.hero-buttons .btn');
    
    heroButtons.forEach((button, index) => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0) scale(1)';
        });
        
        
        button.addEventListener('click', () => {
            if (button.textContent.includes('Doação')) {
                showDonationModal();
            } else if (button.textContent.includes('Mídia')) {
                showMediaUploadModal();
            } else if (button.textContent.includes('Experiências')) {
                scrollToSection('testimonials');
            }
        });
    });
    
    
    const elements = document.querySelectorAll('.element');
    elements.forEach((element, index) => {
        const delay = index * 1000;
        const duration = 4000 + (index * 1000);
        
        setInterval(() => {
            element.style.transform = `translateY(-20px) rotate(${Math.random() * 10 - 5}deg)`;
            setTimeout(() => {
                element.style.transform = `translateY(0) rotate(0deg)`;
            }, duration / 2);
        }, duration);
    });
}


function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                
                if (entry.target.classList.contains('stat')) {
                    animateCounter(entry.target.querySelector('.stat-number'));
                }
                
                if (entry.target.classList.contains('help-card')) {
                    const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 200;
                    setTimeout(() => {
                        entry.target.style.transform = 'translateY(0)';
                        entry.target.style.opacity = '1';
                    }, delay);
                }
            }
        });
    }, observerOptions);
    
    
    const animatedElements = document.querySelectorAll('.help-card, .gallery-item, .testimonial-card, .stat, .visual-card');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}


function animateCounter(element) {
    const target = parseInt(element.textContent.replace(/\D/g, ''));
    const increment = target / 50;
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        if (element.textContent.includes('+')) {
            element.textContent = Math.floor(current) + '+';
        } else {
            element.textContent = Math.floor(current);
        }
    }, 30);
}


function initializeGallery() {
    const galleryBtns = document.querySelectorAll('.gallery-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            
            galleryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            galleryItems.forEach((item, index) => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || filter === category) {
                    setTimeout(() => {
                        item.classList.remove('hidden');
                        item.classList.add('visible');
                    }, index * 100);
                } else {
                    item.classList.add('hidden');
                    item.classList.remove('visible');
                }
            });
        });
    });
    
    
    galleryItems.forEach(item => {
        const overlay = item.querySelector('.gallery-overlay');
        const placeholder = item.querySelector('.gallery-placeholder');
        
        item.addEventListener('mouseenter', () => {
            if (placeholder) {
                placeholder.style.transform = 'scale(1.1)';
            }
            if (overlay) {
                overlay.style.transform = 'translateY(0)';
            }
        });
        
        item.addEventListener('mouseleave', () => {
            if (placeholder) {
                placeholder.style.transform = 'scale(1)';
            }
            if (overlay) {
                overlay.style.transform = 'translateY(100%)';
            }
        });
        
        
        const viewBtn = item.querySelector('.gallery-view');
        if (viewBtn) {
            viewBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const title = item.querySelector('h4') ? item.querySelector('h4').textContent : 'Item da Galeria';
                showImageModal(title);
            });
        }
    });
}


function initializeTestimonials() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    testimonialCards.forEach((card, index) => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
        
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 200);
                }
            });
        }, { threshold: 0.1 });
        
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        observer.observe(card);
    });
}


function initializeSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 70; 
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}


function initializeFormInteractions() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            button.style.position = 'relative';
            button.style.overflow = 'hidden';
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    
    const cardButtons = document.querySelectorAll('.card-button');
    cardButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const card = button.closest('.help-card');
            const title = card.querySelector('.card-title').textContent;
            
            
            if (title.includes('Doações') || title.includes('Doar')) {
                showDonationModal();
            } else if (title.includes('Fotos') || title.includes('Mídia')) {
                showMediaUploadModal();
            } else if (title.includes('Experiências') || title.includes('Escrever')) {
                showExperienceModal();
            }
        });
    });
    
    
    const ctaButtons = document.querySelectorAll('.cta .btn');
    ctaButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (button.textContent.includes('Doação')) {
                showDonationModal();
            } else if (button.textContent.includes('Mídia')) {
                showMediaUploadModal();
            }
        });
    });
    
    
    const socialLinks = document.querySelectorAll('.social-link, .social-icon');
    socialLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const icon = link.querySelector('i');
            
            if (icon.classList.contains('fa-facebook')) {
                window.open('https://facebook.com', '_blank');
            } else if (icon.classList.contains('fa-instagram')) {
                window.open('https://www.instagram.com/ma.luciano_?igsh=MTF1cGFhbTl6ZDJycQ%3D%3D&utm_source=qr', '_blank');
            } else if (icon.classList.contains('fa-twitter')) {
                window.open('https://x.com/maria01_0322?s=21', '_blank');
            } else if (icon.classList.contains('fa-whatsapp')) {
                window.open('https://wa.me/5543984293274?text=Olá! Gostaria de saber mais sobre a Feira Comunitária Viva.', '_blank');
            }
        });
    });
}


function showDonationModal() {
    const modal = createModal('Fazer Doação 💖', `
        <div class="modal-content">
            <h3>Apoie Nossa Comunidade</h3>
            <p>Sua doação ajuda a fortalecer nossa comunidade e apoiar famílias que mais precisam.</p>
            
            <div class="donation-options">
                <button class="donation-btn" data-amount="25">R$ 25</button>
                <button class="donation-btn" data-amount="50">R$ 50</button>
                <button class="donation-btn" data-amount="100">R$ 100</button>
                <button class="donation-btn" data-amount="custom">Outro valor</button>
            </div>
            
            <div class="custom-amount" style="display: none;">
                <label for="custom-value">Valor personalizado:</label>
                <input type="number" id="custom-value" placeholder="Digite o valor" min="1">
            </div>
            
            <div class="donation-methods">
                <h4>Formas de Pagamento:</h4>
                <div class="payment-options">
                    <button class="payment-btn">💳 Cartão de Crédito</button>
                    <button class="payment-btn">🏦 PIX</button>
                    <button class="payment-btn">📱 PayPal</button>
                </div>
            </div>
            
            <button class="btn btn-primary" style="width: 100%; margin-top: 1rem;">
                <i class="fas fa-heart"></i>
                Confirmar Doação
            </button>
        </div>
    `);
    
    
    const donationBtns = modal.querySelectorAll('.donation-btn');
    const customAmount = modal.querySelector('.custom-amount');
    
    donationBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            donationBtns.forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            
            if (btn.dataset.amount === 'custom') {
                customAmount.style.display = 'block';
            } else {
                customAmount.style.display = 'none';
            }
        });
    });
}

function showMediaUploadModal() {
    const modal = createModal('Enviar Fotos e Vídeos 📸', `
        <div class="modal-content">
            <h3>Compartilhe Sua Realidade</h3>
            <p>Envie fotos e vídeos do que você está vendo no campo ou na cidade.</p>
            
            <div class="upload-area">
                <div class="upload-zone" id="upload-zone">
                    <i class="fas fa-cloud-upload-alt"></i>
                    <p>Clique aqui ou arraste arquivos para fazer upload</p>
                    <small>Formatos aceitos: JPG, PNG, MP4, MOV (máx. 50MB)</small>
                </div>
                <input type="file" id="file-input" multiple accept="image/*,video/*" style="display: none;">
            </div>
            
            <div class="media-form">
                <label for="media-title">Título da mídia:</label>
                <input type="text" id="media-title" placeholder="Ex: Colheita de orgânicos">
                
                <label for="media-description">Descrição:</label>
                <textarea id="media-description" placeholder="Conte um pouco sobre esta foto/vídeo..."></textarea>
                
                <label for="media-location">Localização:</label>
                <input type="text" id="media-location" placeholder="Ex: Interior do Paraná">
                
                <label for="media-category">Categoria:</label>
                <select id="media-category">
                    <option value="campo">Campo</option>
                    <option value="cidade">Cidade</option>
                    <option value="feira">Feira</option>
                </select>
            </div>
            
            <button class="btn btn-primary" style="width: 100%; margin-top: 1rem;">
                <i class="fas fa-upload"></i>
                Enviar Mídia
            </button>
        </div>
    `);
    
    
    const uploadZone = modal.querySelector('#upload-zone');
    const fileInput = modal.querySelector('#file-input');
    
    uploadZone.addEventListener('click', () => fileInput.click());
    
    uploadZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadZone.classList.add('drag-over');
    });
    
    uploadZone.addEventListener('dragleave', () => {
        uploadZone.classList.remove('drag-over');
    });
    
    uploadZone.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadZone.classList.remove('drag-over');
        const files = e.dataTransfer.files;
        handleFileUpload(files);
    });
    
    fileInput.addEventListener('change', (e) => {
        handleFileUpload(e.target.files);
    });
}

function showExperienceModal() {
    const modal = createModal('Compartilhar Experiência ✍️', `
        <div class="modal-content">
            <h3>Conte Sua História</h3>
            <p>Compartilhe suas experiências, aprendizados e inspire outras pessoas.</p>
            
            <div class="experience-form">
                <label for="exp-title">Título da experiência:</label>
                <input type="text" id="exp-title" placeholder="Ex: Minha primeira horta urbana">
                
                <label for="exp-content">Sua experiência:</label>
                <textarea id="exp-content" rows="8" placeholder="Conte sua história, os desafios enfrentados, as lições aprendidas..."></textarea>
                
                <label for="exp-name">Seu nome:</label>
                <input type="text" id="exp-name" placeholder="Como gostaria de ser identificado?">
                
                <label for="exp-role">Sua ocupação/papel:</label>
                <input type="text" id="exp-role" placeholder="Ex: Jardineiro urbano, Produtor rural, etc.">
                
                <label for="exp-location">Localização (opcional):</label>
                <input type="text" id="exp-location" placeholder="Ex: São Paulo, SP">
            </div>
            
            <button class="btn btn-primary" style="width: 100%; margin-top: 1rem;">
                <i class="fas fa-paper-plane"></i>
                Enviar Experiência
            </button>
        </div>
    `);
}

function showImageModal(title) {
    const modal = createModal('Visualização de Mídia', `
        <div class="modal-content">
            <h3>${title}</h3>
            <div class="image-viewer">
                <div class="placeholder-image">
                    <i class="fas fa-image"></i>
                    <p>Imagem não disponível</p>
                    <small>Esta é uma demonstração do visualizador de mídia</small>
                </div>
            </div>
            <div class="image-info">
                <p><strong>Enviado por:</strong> Membro da comunidade</p>
                <p><strong>Data:</strong> ${new Date().toLocaleDateString('pt-BR')}</p>
                <p><strong>Categoria:</strong> Galeria comunitária</p>
            </div>
        </div>
    `);
}

function createModal(title, content) {
    
    const existingModal = document.querySelector('.modal-overlay');
    if (existingModal) {
        existingModal.remove();
    }
    
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    modalOverlay.innerHTML = `
        <div class="modal">
            <div class="modal-header">
                <h2>${title}</h2>
                <button class="modal-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                ${content}
            </div>
        </div>
    `;
    
    document.body.appendChild(modalOverlay);
    
    
    if (!document.querySelector('#modal-styles')) {
        const modalStyles = document.createElement('style');
        modalStyles.id = 'modal-styles';
        modalStyles.textContent = `
            .modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                animation: fadeIn 0.3s ease-out;
            }
            
            .modal {
                background: white;
                border-radius: var(--radius-xl);
                max-width: 500px;
                width: 90%;
                max-height: 90vh;
                overflow-y: auto;
                animation: slideUp 0.3s ease-out;
            }
            
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: var(--space-6);
                border-bottom: 1px solid hsl(var(--border));
            }
            
            .modal-header h2 {
                margin: 0;
                color: hsl(var(--text-primary));
            }
            
            .modal-close {
                background: none;
                border: none;
                font-size: var(--font-size-xl);
                color: hsl(var(--text-muted));
                cursor: pointer;
                transition: var(--transition);
            }
            
            .modal-close:hover {
                color: hsl(var(--text-primary));
            }
            
            .modal-body {
                padding: var(--space-6);
            }
            
            .modal-content h3 {
                color: hsl(var(--text-primary));
                margin-bottom: var(--space-4);
            }
            
            .modal-content p {
                color: hsl(var(--text-secondary));
                margin-bottom: var(--space-6);
            }
            
            .donation-options {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: var(--space-3);
                margin-bottom: var(--space-6);
            }
            
            .donation-btn {
                padding: var(--space-3);
                border: 2px solid hsl(var(--border));
                background: white;
                border-radius: var(--radius);
                cursor: pointer;
                transition: var(--transition);
                font-weight: 500;
            }
            
            .donation-btn:hover,
            .donation-btn.selected {
                border-color: hsl(var(--primary));
                background: hsl(var(--primary) / 0.1);
                color: hsl(var(--primary));
            }
            
            .custom-amount {
                margin-bottom: var(--space-6);
            }
            
            .custom-amount label {
                display: block;
                margin-bottom: var(--space-2);
                font-weight: 500;
                color: hsl(var(--text-primary));
            }
            
            .custom-amount input {
                width: 100%;
                padding: var(--space-3);
                border: 2px solid hsl(var(--border));
                border-radius: var(--radius);
                font-size: var(--font-size-base);
            }
            
            .payment-options {
                display: grid;
                gap: var(--space-2);
                margin-top: var(--space-3);
            }
            
            .payment-btn {
                padding: var(--space-3);
                border: 1px solid hsl(var(--border));
                background: white;
                border-radius: var(--radius);
                cursor: pointer;
                transition: var(--transition);
                text-align: left;
            }
            
            .payment-btn:hover {
                background: hsl(var(--surface-light));
            }
            
            .upload-area {
                margin-bottom: var(--space-6);
            }
            
            .upload-zone {
                border: 2px dashed hsl(var(--border));
                border-radius: var(--radius-lg);
                padding: var(--space-10);
                text-align: center;
                cursor: pointer;
                transition: var(--transition);
            }
            
            .upload-zone:hover,
            .upload-zone.drag-over {
                border-color: hsl(var(--primary));
                background: hsl(var(--primary) / 0.05);
            }
            
            .upload-zone i {
                font-size: var(--font-size-4xl);
                color: hsl(var(--text-muted));
                margin-bottom: var(--space-4);
            }
            
            .media-form,
            .experience-form {
                display: flex;
                flex-direction: column;
                gap: var(--space-4);
            }
            
            .media-form label,
            .experience-form label {
                font-weight: 500;
                color: hsl(var(--text-primary));
            }
            
            .media-form input,
            .media-form select,
            .media-form textarea,
            .experience-form input,
            .experience-form textarea {
                padding: var(--space-3);
                border: 2px solid hsl(var(--border));
                border-radius: var(--radius);
                font-size: var(--font-size-base);
                font-family: inherit;
            }
            
            .media-form textarea,
            .experience-form textarea {
                resize: vertical;
                min-height: 100px;
            }
            
            .image-viewer {
                margin-bottom: var(--space-6);
            }
            
            .placeholder-image {
                background: hsl(var(--surface-light));
                border-radius: var(--radius-lg);
                padding: var(--space-10);
                text-align: center;
                color: hsl(var(--text-muted));
            }
            
            .placeholder-image i {
                font-size: var(--font-size-5xl);
                margin-bottom: var(--space-4);
            }
            
            .image-info p {
                margin-bottom: var(--space-2);
                color: hsl(var(--text-secondary));
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes slideUp {
                from {
                    opacity: 0;
                    transform: translateY(50px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(modalStyles);
    }
    
    
    const closeBtn = modalOverlay.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => {
        modalOverlay.remove();
    });
    
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.remove();
        }
    });
    
    return modalOverlay;
}

function handleFileUpload(files) {
    Array.from(files).forEach(file => {
        console.log('Arquivo selecionado:', file.name);
        showNotification(`Arquivo "${file.name}" pronto para upload!`);
    });
}


function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: hsl(var(--primary));
        color: white;
        padding: 1rem 1.5rem;
        border-radius: var(--radius);
        box-shadow: var(--shadow-lg);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}


function initializeParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.hero-decoration, .floating-elements');
    
    const throttledScrollHandler = throttle(() => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        parallaxElements.forEach(element => {
            element.style.transform = `translateY(${rate}px)`;
        });
    }, 16);
    
    window.addEventListener('scroll', throttledScrollHandler);
}


function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}


const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100%);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100%);
        }
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
    }
    
    .btn:active {
        animation: pulse 0.3s ease-in-out;
    }
    
    .gallery-item:hover .gallery-placeholder {
        animation: pulse 2s infinite;
    }
`;
document.head.appendChild(additionalStyles);


document.addEventListener('DOMContentLoaded', () => {
    console.log('🌱 Feira Comunitária Viva - Site carregado com sucesso!');
    
    
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in-out';
        document.body.style.opacity = '1';
    }, 100);
});
