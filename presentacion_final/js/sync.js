// js/sync.js
// Canal de comunicación local y clave de almacenamiento para sincronización
const SYNC_CHANNEL_NAME = 'ppm_presentation_sync';
const SYNC_STORAGE_KEY = 'ppm_presentation_state';

// Estado global de navegación compartida
let currentSlideIndex = 0;
let currentFragmentIndex = -1; // -1 significa que no hay fragmentos revelados aún

// Intentar inicializar BroadcastChannel para comunicación en tiempo real
let presentationChannel = null;
try {
    presentationChannel = new BroadcastChannel(SYNC_CHANNEL_NAME);
} catch (e) {
    console.warn("BroadcastChannel no soportado en este entorno. Usando LocalStorage como backup.", e);
}

/**
 * Difunde el estado de navegación actual a todas las pantallas abiertas.
 * @param {number} slideIndex Índice de la diapositiva activa
 * @param {number} fragmentIndex Índice del fragmento activo
 */
function broadcastSlideState(slideIndex, fragmentIndex) {
    currentSlideIndex = slideIndex;
    currentFragmentIndex = fragmentIndex;

    const state = {
        slideIndex: currentSlideIndex,
        fragmentIndex: currentFragmentIndex,
        timestamp: Date.now()
    };

    // 1. Enviar por BroadcastChannel
    if (presentationChannel) {
        presentationChannel.postMessage(state);
    }

    // 2. Guardar en localStorage para disparar eventos 'storage' (respaldo multiplataforma)
    localStorage.setItem(SYNC_STORAGE_KEY, JSON.stringify(state));

    // 3. Ejecutar renderizado en el contexto local
    if (typeof renderCurrentSlide === 'function') {
        renderCurrentSlide();
    }
}

/**
 * Maneja los cambios de estado recibidos desde otra pantalla.
 * @param {object} state Objeto de estado {slideIndex, fragmentIndex}
 */
function handleIncomingState(state) {
    if (state && typeof state.slideIndex === 'number' && typeof state.fragmentIndex === 'number') {
        // Solo actualizar si hay un cambio real
        if (state.slideIndex !== currentSlideIndex || state.fragmentIndex !== currentFragmentIndex) {
            currentSlideIndex = state.slideIndex;
            currentFragmentIndex = state.fragmentIndex;
            
            if (typeof renderCurrentSlide === 'function') {
                renderCurrentSlide();
            }
        }
    }
}

// Escuchar mensajes en el canal BroadcastChannel
if (presentationChannel) {
    presentationChannel.onmessage = (event) => {
        handleIncomingState(event.data);
    };
}

// Escuchar eventos de cambio en el LocalStorage
window.addEventListener('storage', (event) => {
    if (event.key === SYNC_STORAGE_KEY && event.newValue) {
        try {
            const state = JSON.parse(event.newValue);
            handleIncomingState(state);
        } catch (e) {
            console.error("Error al procesar el estado desde localStorage:", e);
        }
    }
});

// Cargar el estado inicial guardado recientemente (dentro de los últimos 10 minutos)
(function loadInitialState() {
    const savedStateStr = localStorage.getItem(SYNC_STORAGE_KEY);
    if (savedStateStr) {
        try {
            const savedState = JSON.parse(savedStateStr);
            if (Date.now() - savedState.timestamp < 600000) {
                currentSlideIndex = savedState.slideIndex;
                currentFragmentIndex = savedState.fragmentIndex;
            }
        } catch (e) {
            console.error("Error al cargar el estado inicial sincronizado:", e);
        }
    }
})();
