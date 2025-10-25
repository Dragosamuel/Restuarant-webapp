// Internationalization (i18n) support for multi-language functionality

class I18n {
    constructor() {
        this.currentLanguage = this.detectLanguage();
        this.translations = {};
        this.init();
    }
    
    // Detect user's preferred language
    detectLanguage() {
        // Check URL parameter first
        const urlParams = new URLSearchParams(window.location.search);
        const langParam = urlParams.get('lang');
        if (langParam && this.isSupportedLanguage(langParam)) {
            return langParam;
        }
        
        // Check localStorage
        const savedLang = localStorage.getItem('preferredLanguage');
        if (savedLang && this.isSupportedLanguage(savedLang)) {
            return savedLang;
        }
        
        // Check browser language
        const browserLang = navigator.language || navigator.userLanguage;
        const shortLang = browserLang.split('-')[0];
        if (this.isSupportedLanguage(shortLang)) {
            return shortLang;
        }
        
        // Default to English
        return 'en';
    }
    
    // Check if language is supported
    isSupportedLanguage(lang) {
        const supported = ['en', 'es', 'fr', 'de', 'it', 'pt', 'zh', 'ja', 'ko'];
        return supported.includes(lang);
    }
    
    // Initialize i18n
    async init() {
        await this.loadTranslations();
        this.applyTranslations();
        this.createLanguageSelector();
    }
    
    // Load translations for current language
    async loadTranslations() {
        try {
            // In a real implementation, you would load translation files
            // For this example, we'll use a simple object
            this.translations = this.getTranslationsForLanguage(this.currentLanguage);
        } catch (error) {
            console.error('Error loading translations:', error);
            // Fallback to English
            this.currentLanguage = 'en';
            this.translations = this.getTranslationsForLanguage('en');
        }
    }
    
    // Get translations for a specific language
    getTranslationsForLanguage(lang) {
        const translations = {
            en: {
                'welcome': 'Welcome',
                'menu': 'Menu',
                'about': 'About',
                'contact': 'Contact',
                'reservations': 'Reservations',
                'order_online': 'Order Online',
                'our_menu': 'Our Menu',
                'appetizers': 'Appetizers',
                'main_courses': 'Main Courses',
                'desserts': 'Desserts',
                'drinks': 'Drinks',
                'specials': 'Specials',
                'view_details': 'View Details',
                'add_to_cart': 'Add to Cart',
                'ar_preview': 'AR Preview',
                'voice_order': 'Voice Order',
                'qr_order': 'QR Order',
                'accessibility_mode': 'Accessibility Mode',
                'high_contrast': 'High Contrast',
                'screen_reader': 'Screen Reader Support',
                'audio_description': 'Audio Description',
                'language': 'Language',
                'english': 'English',
                'spanish': 'Spanish',
                'french': 'French',
                'german': 'German',
                'italian': 'Italian',
                'portuguese': 'Portuguese',
                'chinese': 'Chinese',
                'japanese': 'Japanese',
                'korean': 'Korean'
            },
            es: {
                'welcome': 'Bienvenido',
                'menu': 'Menú',
                'about': 'Acerca de',
                'contact': 'Contacto',
                'reservations': 'Reservaciones',
                'order_online': 'Ordenar en línea',
                'our_menu': 'Nuestro Menú',
                'appetizers': 'Aperitivos',
                'main_courses': 'Platos Principales',
                'desserts': 'Postres',
                'drinks': 'Bebidas',
                'specials': 'Especiales',
                'view_details': 'Ver Detalles',
                'add_to_cart': 'Añadir al Carrito',
                'ar_preview': 'Vista Previa AR',
                'voice_order': 'Pedido por Voz',
                'qr_order': 'Pedido QR',
                'accessibility_mode': 'Modo de Accesibilidad',
                'high_contrast': 'Alto Contraste',
                'screen_reader': 'Soporte para Lector de Pantalla',
                'audio_description': 'Descripción de Audio',
                'language': 'Idioma',
                'english': 'Inglés',
                'spanish': 'Español',
                'french': 'Francés',
                'german': 'Alemán',
                'italian': 'Italiano',
                'portuguese': 'Portugués',
                'chinese': 'Chino',
                'japanese': 'Japonés',
                'korean': 'Coreano'
            },
            fr: {
                'welcome': 'Bienvenue',
                'menu': 'Menu',
                'about': 'À propos',
                'contact': 'Contact',
                'reservations': 'Réservations',
                'order_online': 'Commander en ligne',
                'our_menu': 'Notre Menu',
                'appetizers': 'Entrées',
                'main_courses': 'Plats Principaux',
                'desserts': 'Desserts',
                'drinks': 'Boissons',
                'specials': 'Spéciaux',
                'view_details': 'Voir les détails',
                'add_to_cart': 'Ajouter au panier',
                'ar_preview': 'Aperçu RA',
                'voice_order': 'Commande vocale',
                'qr_order': 'Commande QR',
                'accessibility_mode': 'Mode d\'accessibilité',
                'high_contrast': 'Contraste élevé',
                'screen_reader': 'Prise en charge du lecteur d\'écran',
                'audio_description': 'Description audio',
                'language': 'Langue',
                'english': 'Anglais',
                'spanish': 'Espagnol',
                'french': 'Français',
                'german': 'Allemand',
                'italian': 'Italien',
                'portuguese': 'Portugais',
                'chinese': 'Chinois',
                'japanese': 'Japonais',
                'korean': 'Coréen'
            }
        };
        
        return translations[lang] || translations['en'];
    }
    
    // Apply translations to the page
    applyTranslations() {
        // Find all elements with data-i18n attribute and translate them
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (this.translations[key]) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = this.translations[key];
                } else {
                    element.textContent = this.translations[key];
                }
            }
        });
    }
    
    // Change language
    async changeLanguage(lang) {
        if (!this.isSupportedLanguage(lang)) return;
        
        this.currentLanguage = lang;
        localStorage.setItem('preferredLanguage', lang);
        await this.loadTranslations();
        this.applyTranslations();
        this.updateLanguageSelector();
    }
    
    // Create language selector dropdown
    createLanguageSelector() {
        // Create language selector element
        const langSelector = document.createElement('div');
        langSelector.className = 'lang-selector dropdown';
        langSelector.innerHTML = `
            <button class="btn btn-outline-light dropdown-toggle" type="button" id="languageDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="fas fa-globe"></i> ${this.getLanguageName(this.currentLanguage)}
            </button>
            <ul class="dropdown-menu" aria-labelledby="languageDropdown">
                <li><a class="dropdown-item" href="#" data-lang="en">English</a></li>
                <li><a class="dropdown-item" href="#" data-lang="es">Español</a></li>
                <li><a class="dropdown-item" href="#" data-lang="fr">Français</a></li>
                <li><a class="dropdown-item" href="#" data-lang="de">Deutsch</a></li>
                <li><a class="dropdown-item" href="#" data-lang="it">Italiano</a></li>
                <li><a class="dropdown-item" href="#" data-lang="pt">Português</a></li>
                <li><a class="dropdown-item" href="#" data-lang="zh">中文</a></li>
                <li><a class="dropdown-item" href="#" data-lang="ja">日本語</a></li>
                <li><a class="dropdown-item" href="#" data-lang="ko">한국어</a></li>
            </ul>
        `;
        
        // Add to page (you might want to add it to a specific location)
        document.body.appendChild(langSelector);
        
        // Add event listeners
        langSelector.addEventListener('click', (e) => {
            if (e.target.classList.contains('dropdown-item')) {
                e.preventDefault();
                const lang = e.target.getAttribute('data-lang');
                this.changeLanguage(lang);
            }
        });
    }
    
    // Update language selector display
    updateLanguageSelector() {
        const langButton = document.querySelector('#languageDropdown');
        if (langButton) {
            langButton.innerHTML = `<i class="fas fa-globe"></i> ${this.getLanguageName(this.currentLanguage)}`;
        }
    }
    
    // Get language name for display
    getLanguageName(langCode) {
        const names = {
            'en': 'English',
            'es': 'Español',
            'fr': 'Français',
            'de': 'Deutsch',
            'it': 'Italiano',
            'pt': 'Português',
            'zh': '中文',
            'ja': '日本語',
            'ko': '한국어'
        };
        return names[langCode] || 'English';
    }
    
    // Get translated string
    t(key) {
        return this.translations[key] || key;
    }
}

// Initialize i18n when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.i18n = new I18n();
});