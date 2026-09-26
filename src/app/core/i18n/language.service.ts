import { Injectable, computed, signal } from '@angular/core';

export type AppLanguage = 'es' | 'en';

// Las traducciones viven en un solo lugar para que todos los componentes usen el mismo idioma.
const translations = {
  es: {
    store: 'Tienda', orders: 'Mis pedidos', login: 'Iniciar sesión', register: 'Crear cuenta', logout: 'Cerrar sesión',
    activeSession: 'Sesión activa', cart: 'Carrito', language: 'Idioma', spanish: 'Español', english: 'English',
    digitalCatalog: 'CATÁLOGO DIGITAL', heroTitle: 'Tu próxima aventura comienza aquí',
    heroText: 'Clásicos inolvidables y nuevos mundos, reunidos en un catálogo preparado para jugar.',
    gamesAvailable: 'juegos disponibles', allGames: 'Todos los videojuegos', results: 'resultados',
    search: 'Buscar por nombre o categoría', available: 'disponibles', noResults: 'No encontramos resultados',
    tryAnother: 'Prueba con otro nombre o categoría.', backCatalog: 'Volver al catálogo', aboutGame: 'Acerca del juego',
    highlights: 'Lo que encontrarás', immersive: 'Una experiencia cuidada de principio a fin.',
    digitalDelivery: 'Entrega digital preparada para disfrutar sin esperas.', genreExperience: 'Jugabilidad representativa de su género.',
    addCart: 'Agregar al carrito', availability: 'Disponibilidad', units: 'unidades', release: 'Lanzamiento',
    loadingGame: 'Cargando videojuego...', gameMissing: 'No encontramos este videojuego.',
    welcome: 'Bienvenido a Pedidos360', createAccount: 'Crea tu cuenta', welcomeSubtitle: 'Ingresa para continuar con tus compras',
    registerSubtitle: 'Únete y guarda tus pedidos en un solo lugar', fullName: 'Nombre completo', email: 'Correo electrónico',
    password: 'Contraseña', passwordHint: 'La contraseña debe tener al menos 8 caracteres.', confirmPassword: 'Confirmar contraseña', repeatPassword: 'Repite tu contraseña', remember: 'Recordarme',
    forgot: '¿Olvidaste tu contraseña?', processing: 'Procesando...', createMyAccount: 'Crear mi cuenta', continueWith: 'o continúa con',
    providerContinue: 'Continuar con', noAccount: '¿Aún no tienes una cuenta?', hasAccount: '¿Ya tienes una cuenta?', backStore: 'Volver a la tienda',
    providerUnavailable: 'Este proveedor estará disponible cuando configures sus credenciales en el backend.', reviewFields: 'Revisa los campos marcados antes de continuar.', passwordsMismatch: 'Las contraseñas no coinciden.', recoveryReady: 'La recuperación por correo está preparada para conectar tu servicio SMTP en producción.',
    myPurchase: 'MI COMPRA', continueShopping: 'Seguir comprando', emptyCart: 'Tu carrito está vacío',
    emptyCartText: 'Explora el catálogo y encuentra tu próxima aventura.', viewGames: 'Ver videojuegos', remove: 'Eliminar', quantity: 'Cantidad',
    summary: 'Resumen', products: 'Productos', free: 'Gratis', total: 'Total', checkout: 'Continuar al pago', securePayment: 'PAGO SEGURO',
    finishPurchase: 'Finaliza tu compra', paymentInfo: 'Información de pago', demoCard: 'Usa la tarjeta de demostración incluida.',
    cardNumber: 'Número de tarjeta', expiration: 'Vencimiento', deliveryData: 'Datos de entrega', deliveryHint: 'Asociaremos estos datos a tu pedido.',
    address: 'Dirección completa', country: 'País', postalCode: 'Código postal', confirmPayment: 'Confirmar pago', yourOrder: 'Tu pedido',
    paymentDemo: 'Este proyecto no realiza cobros reales. El flujo de pago es demostrativo.',
    purchases: 'MIS COMPRAS', orderDetail: 'Detalle del pedido', orderHistory: 'Historial de pedidos', loadingOrders: 'Cargando pedidos...',
    noOrders: 'Aún no tienes pedidos', noOrdersText: 'Cuando finalices una compra aparecerá aquí.', exploreCatalog: 'Explorar catálogo',
    orderNumber: 'Número de pedido', date: 'Fecha', status: 'Estado', productsCodes: 'Productos y códigos digitales', deliveryPayment: 'Entrega y pago',
    method: 'Método', orderConfirmed: 'PEDIDO CONFIRMADO', thanks: '¡Gracias por tu compra!', codesAvailable: 'Tus códigos ya están disponibles',
    codesHint: 'Puedes revisarlos en el detalle de tu pedido.', viewOrder: 'Ver detalle del pedido', checkingOrder: 'Comprobando tu pedido...',
    footerTagline: 'Tu próxima aventura comienza aquí.', academic: 'Proyecto académico'
  },
  en: {
    store: 'Store', orders: 'My orders', login: 'Sign in', register: 'Create account', logout: 'Sign out',
    activeSession: 'Active session', cart: 'Cart', language: 'Language', spanish: 'Español', english: 'English',
    digitalCatalog: 'DIGITAL CATALOG', heroTitle: 'Your next adventure starts here',
    heroText: 'Unforgettable classics and new worlds, gathered in a catalog made for play.',
    gamesAvailable: 'games available', allGames: 'All video games', results: 'results',
    search: 'Search by name or category', available: 'available', noResults: 'No results found',
    tryAnother: 'Try another name or category.', backCatalog: 'Back to catalog', aboutGame: 'About this game',
    highlights: 'What you will find', immersive: 'A polished experience from beginning to end.',
    digitalDelivery: 'Digital delivery ready to enjoy without waiting.', genreExperience: 'Gameplay that represents its genre.',
    addCart: 'Add to cart', availability: 'Availability', units: 'units', release: 'Release date',
    loadingGame: 'Loading game...', gameMissing: 'We could not find this game.',
    welcome: 'Welcome to Pedidos360', createAccount: 'Create your account', welcomeSubtitle: 'Sign in to continue shopping',
    registerSubtitle: 'Join and keep your orders in one place', fullName: 'Full name', email: 'Email address',
    password: 'Password', passwordHint: 'The password must contain at least 8 characters.', confirmPassword: 'Confirm password', repeatPassword: 'Repeat your password', remember: 'Remember me',
    forgot: 'Forgot your password?', processing: 'Processing...', createMyAccount: 'Create my account', continueWith: 'or continue with',
    providerContinue: 'Continue with', noAccount: 'New to Pedidos360?', hasAccount: 'Already have an account?', backStore: 'Back to store',
    providerUnavailable: 'This provider will be available after its credentials are configured in the backend.', reviewFields: 'Review the highlighted fields before continuing.', passwordsMismatch: 'The passwords do not match.', recoveryReady: 'Email recovery is ready to connect to your production SMTP service.',
    myPurchase: 'MY PURCHASE', continueShopping: 'Continue shopping', emptyCart: 'Your cart is empty',
    emptyCartText: 'Explore the catalog and find your next adventure.', viewGames: 'View games', remove: 'Remove', quantity: 'Quantity',
    summary: 'Summary', products: 'Products', free: 'Free', total: 'Total', checkout: 'Continue to checkout', securePayment: 'SECURE PAYMENT',
    finishPurchase: 'Complete your purchase', paymentInfo: 'Payment information', demoCard: 'Use the included demo card.',
    cardNumber: 'Card number', expiration: 'Expiration date', deliveryData: 'Delivery details', deliveryHint: 'We will link these details to your order.',
    address: 'Full address', country: 'Country', postalCode: 'Postal code', confirmPayment: 'Confirm payment', yourOrder: 'Your order',
    paymentDemo: 'This project does not process real charges. The payment flow is for demonstration only.',
    purchases: 'MY PURCHASES', orderDetail: 'Order details', orderHistory: 'Order history', loadingOrders: 'Loading orders...',
    noOrders: 'You have no orders yet', noOrdersText: 'Completed purchases will appear here.', exploreCatalog: 'Explore catalog',
    orderNumber: 'Order number', date: 'Date', status: 'Status', productsCodes: 'Products and digital codes', deliveryPayment: 'Delivery and payment',
    method: 'Method', orderConfirmed: 'ORDER CONFIRMED', thanks: 'Thank you for your purchase!', codesAvailable: 'Your codes are now available',
    codesHint: 'You can review them in your order details.', viewOrder: 'View order details', checkingOrder: 'Checking your order...',
    footerTagline: 'Your next adventure starts here.', academic: 'Academic project'
  }
} as const;

export type TranslationKey = keyof typeof translations.es;

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly current = signal<AppLanguage>(this.readInitialLanguage());
  readonly language = this.current.asReadonly();
  readonly locale = computed(() => this.current() === 'es' ? 'es-CL' : 'en-US');

  // Cambiar el idioma también actualiza el atributo lang para lectores de pantalla.
  setLanguage(language: AppLanguage): void {
    this.current.set(language);
    localStorage.setItem('pedidos360.language', language);
    document.documentElement.lang = language;
  }

  t(key: TranslationKey): string { return translations[this.current()][key]; }

  // Las categorías entregadas por el backend se traducen sin alterar los datos originales.
  category(value: string): string {
    if (this.current() === 'es') return value;
    const categories: Record<string, string> = {
      'Aventura': 'Adventure', 'Carreras': 'Racing', 'Sandbox': 'Sandbox', 'Lucha': 'Fighting',
      'Plataformas': 'Platformer', 'Acción y aventura': 'Action adventure', 'RPG': 'RPG',
      'RPG de acción': 'Action RPG', 'Metroidvania': 'Metroidvania', 'Aventura clásica': 'Classic adventure', 'RPG clásico': 'Classic RPG'
    };
    return categories[value] ?? value;
  }

  // El catálogo conserva su contenido español en la API y ofrece la descripción inglesa en la vista.
  productDescription(name: string, fallback: string): string {
    if (this.current() === 'es') return fallback;
    const descriptions: Record<string, string> = {
      'ASTRO BOT': 'Travel with Astro across galaxies filled with platforms, secrets and creative challenges. Every planet brings colorful worlds and playful abilities made for exploration.',
      'Mario Kart 8 Deluxe': 'Race through imaginative circuits with iconic Nintendo characters, items and local or online multiplayer modes.',
      'Minecraft': 'Build, explore and survive in an open world made of blocks where every adventure is shaped by your imagination.',
      'Street Fighter II Ultra': 'Enjoy classic arcade combat with legendary fighters, special moves and competitive matches.',
      'Super Mario Bros. 3': 'Run and jump through memorable worlds packed with power-ups, secrets and timeless platforming challenges.',
      'Red Dead Redemption 2': 'Explore a richly detailed open world set during the final years of the American Wild West.',
      'The Witcher 3: Wild Hunt': 'Guide Geralt of Rivia through a vast continent of contracts, difficult choices and unforgettable stories.',
      'Super Mario Odyssey': 'Travel across surprising kingdoms with Mario and Cappy in a joyful 3D platforming adventure.',
      'Elden Ring': 'Explore a vast fantasy world filled with demanding battles, mysterious characters and hidden stories.',
      'God of War Ragnarök': 'Join Kratos and Atreus on a journey across the Nine Realms as Ragnarök draws near.',
      'Tekken 8': 'Experience fast next-generation 3D battles, deep combos and a cast of iconic fighters.',
      'The Legend of Zelda: Tears of the Kingdom': 'Explore the land and skies of Hyrule using new abilities to solve puzzles and overcome enemies.',
      'Hollow Knight': 'Explore the mysterious underground kingdom of Hallownest through precise combat and atmospheric discovery.',
      'The Legend of Zelda: Ocarina of Time': 'Join Link on a timeless quest to save Hyrule. Explore dungeons, solve puzzles, learn magical melodies and face legendary creatures.',
      'Sonic the Hedgehog 2': 'Race with Sonic and Tails through alternate routes, rings and secrets. Master the Spin Dash and stop Dr. Robotnik.',
      'Final Fantasy VII': 'Join Cloud Strife and AVALANCHE in an epic story of exploration, turn-based battles and unforgettable characters.'
    };
    return descriptions[name] ?? fallback;
  }

  private readInitialLanguage(): AppLanguage {
    const saved = typeof localStorage === 'undefined' ? null : localStorage.getItem('pedidos360.language');
    const language: AppLanguage = saved === 'en' ? 'en' : 'es';
    if (typeof document !== 'undefined') document.documentElement.lang = language;
    return language;
  }
}
