// js/app.js
// Inicialización de Mermaid para diagramas oscuros
if (typeof mermaid !== 'undefined') {
    mermaid.initialize({
        startOnLoad: false,
        theme: 'dark',
        securityLevel: 'loose',
        themeVariables: {
            background: '#1E293B',
            primaryColor: '#1E293B',
            primaryTextColor: '#F8FAFC',
            primaryBorderColor: '#3B82F6',
            lineColor: '#10B981',
            secondaryColor: '#0F172A',
            tertiaryColor: '#1E293B'
        }
    });
}

// Reloj flotante en el proyector
let clockInterval = null;
function updateClock() {
    const clockEl = document.getElementById('index-clock');
    if (!clockEl) return;
    const now = new Date();
    const hrs = String(now.getHours()).padStart(2, '0');
    const mins = String(now.getMinutes()).padStart(2, '0');
    const secs = String(now.getSeconds()).padStart(2, '0');
    clockEl.innerText = `${hrs}:${mins}:${secs}`;
}

function toggleClock() {
    const clockEl = document.getElementById('index-clock');
    if (!clockEl) return;
    if (clockEl.style.display === 'block') {
        clockEl.style.display = 'none';
        clearInterval(clockInterval);
    } else {
        clockEl.style.display = 'block';
        updateClock();
        clockInterval = setInterval(updateClock, 1000);
    }
}

// Función de inicialización del zoom sobre diagramas
function initZoomableDiagrams() {
    // Buscar o inyectar modal de zoom
    let modal = document.getElementById('zoom-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'zoom-modal';
        modal.className = 'zoom-modal';
        modal.innerHTML = `
            <div class="zoom-controls">
                <button class="zoom-btn" id="zoom-out-btn">&minus;</button>
                <button class="zoom-btn" id="zoom-reset-btn">Ajustar</button>
                <button class="zoom-btn" id="zoom-in-btn">&plus;</button>
            </div>
            <div id="zoom-container" class="zoom-content"></div>
        `;
        document.body.appendChild(modal);

        let scale = 1;
        let isDragging = false;
        let startX, startY, translateX = 0, translateY = 0;
        const container = document.getElementById('zoom-container');

        // Cerrar modal al hacer clic en el fondo
        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.id === 'zoom-modal') {
                modal.classList.remove('active');
            }
        });

        // Controles de botón
        document.getElementById('zoom-in-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            scale += 0.2;
            applyTransform();
        });

        document.getElementById('zoom-out-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            if (scale > 0.4) scale -= 0.2;
            applyTransform();
        });

        document.getElementById('zoom-reset-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            scale = 1;
            translateX = 0;
            translateY = 0;
            applyTransform();
        });

        // Eventos de arrastre
        container.addEventListener('mousedown', (e) => {
            e.preventDefault();
            isDragging = true;
            startX = e.clientX - translateX;
            startY = e.clientY - translateY;
        });

        window.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            translateX = e.clientX - startX;
            translateY = e.clientY - startY;
            applyTransform();
        });

        window.addEventListener('mouseup', () => {
            isDragging = false;
        });

        // Zoom con rueda de ratón
        container.addEventListener('wheel', (e) => {
            e.preventDefault();
            const delta = e.deltaY * -0.005;
            scale += delta;
            scale = Math.min(Math.max(0.3, scale), 4);
            applyTransform();
        });

        function applyTransform() {
            container.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
        }
    }

    // Hacer los diagramas de Mermaid e imágenes clickeables para zoom
    const targetDiagrams = document.querySelectorAll('.mermaid, img');
    targetDiagrams.forEach(diag => {
        diag.style.cursor = 'zoom-in';
        diag.addEventListener('click', (e) => {
            e.stopPropagation();
            const modalEl = document.getElementById('zoom-modal');
            const containerEl = document.getElementById('zoom-container');
            containerEl.innerHTML = '';
            
            // Detectar si es un contenedor de Mermaid y obtener el SVG interno
            const isMermaid = diag.classList.contains('mermaid');
            const targetNode = isMermaid ? diag.querySelector('svg') : diag;
            
            if (!targetNode) return;
            
            // Clonar nodo para evitar sacarlo del DOM de la slide
            const clone = targetNode.cloneNode(true);
            clone.style.cursor = 'grab';
            
            // Solo remover el ID si no es un SVG (los SVG de Mermaid necesitan su ID para los estilos)
            if (clone.tagName.toLowerCase() !== 'svg') {
                clone.removeAttribute('id');
            }
            
            containerEl.appendChild(clone);
            
            // Reset de zoom/pan
            containerEl.style.transform = 'translate(0px, 0px) scale(1)';
            modalEl.classList.add('active');
        });
    });
}

// Renderizar la diapositiva en index.html
function renderCurrentSlide() {
    const slide = presentationData.slides[currentSlideIndex];
    if (!slide) return;

    // Actualizar Título y Subtítulo
    document.getElementById('slide-title').innerText = slide.title;
    document.getElementById('slide-subtitle').innerText = slide.subtitle;

    // Actualizar Contenido Principal
    const bodyEl = document.getElementById('slide-body');
    bodyEl.innerHTML = slide.content;

    // Barra de Progreso
    const totalSlides = presentationData.slides.length;
    const progress = ((currentSlideIndex + 1) / totalSlides) * 100;
    const progressEl = document.getElementById('progress-bar');
    if (progressEl) {
        progressEl.style.width = `${progress}%`;
    }

    // Configurar y destacar bloques de código con Prism
    document.querySelectorAll('pre').forEach(pre => {
        pre.classList.add('line-numbers');
    });

    if (typeof Prism !== 'undefined') {
        Prism.highlightAllUnder(bodyEl);
    }

    // Renderizar Mermaid si existen diagramas
    if (slide.content.includes('class="mermaid"') || slide.content.includes('<div class="mermaid">')) {
        if (typeof mermaid !== 'undefined') {
            try {
                mermaid.run({
                    nodes: bodyEl.querySelectorAll('.mermaid')
                }).then(() => {
                    // Inicializar zoom sobre los diagramas recién dibujados por Mermaid
                    initZoomableDiagrams();
                });
            } catch (err) {
                console.error("Error al renderizar Mermaid:", err);
            }
        }
    } else {
        // Inicializar zoom para imágenes convencionales
        initZoomableDiagrams();
    }

    // Manejar lógica de Fragmentos (Bloques secuenciales)
    const fragments = bodyEl.querySelectorAll('.fragment');
    const numFragments = fragments.length;

    // Si venimos navegando hacia atrás (el sync seteó 999), revelar todos los fragments
    if (currentFragmentIndex === 999 || currentFragmentIndex >= numFragments) {
        currentFragmentIndex = numFragments - 1;
    }

    fragments.forEach((frag, idx) => {
        if (idx <= currentFragmentIndex) {
            frag.classList.add('visible');
        } else {
            frag.classList.remove('visible');
        }
    });
}

// Avanzar un paso (Fragmento o Diapositiva)
function nextStep() {
    const fragments = document.querySelectorAll('#slide-body .fragment');
    if (currentFragmentIndex < fragments.length - 1) {
        broadcastSlideState(currentSlideIndex, currentFragmentIndex + 1);
    } else {
        if (currentSlideIndex < presentationData.slides.length - 1) {
            broadcastSlideState(currentSlideIndex + 1, -1);
        }
    }
}

// Retroceder un paso (Fragmento o Diapositiva)
function prevStep() {
    if (currentFragmentIndex >= 0) {
        broadcastSlideState(currentSlideIndex, currentFragmentIndex - 1);
    } else {
        if (currentSlideIndex > 0) {
            // Mapeamos a 999 para que la slide anterior comience con todos sus fragmentos revelados
            broadcastSlideState(currentSlideIndex - 1, 999);
        }
    }
}

// Modo Pantalla Completa
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            console.error(`Error al habilitar Pantalla Completa: ${err.message}`);
        });
    } else {
        document.exitFullscreen();
    }
}

// Pantalla en Blanco / Negro
function toggleBlankScreen(color) {
    const overlay = document.getElementById('blank-overlay');
    if (!overlay) return;

    if (overlay.classList.contains(color)) {
        overlay.className = 'blank-overlay';
        overlay.style.display = 'none';
    } else {
        overlay.className = `blank-overlay ${color}`;
        overlay.style.display = 'block';
    }
}

// Navegar a slide específico
function goToSlidePrompt() {
    const total = presentationData.slides.length;
    const slideNum = prompt(`Ir a diapositiva (1 - ${total}):`, currentSlideIndex + 1);
    if (slideNum) {
        const parsed = parseInt(slideNum, 10);
        if (!isNaN(parsed) && parsed >= 1 && parsed <= total) {
            broadcastSlideState(parsed - 1, -1);
        } else {
            alert("Número de diapositiva no válido.");
        }
    }
}

// Crear panel de notas flotante sobre el proyector (opcional, ayuda en pantallas únicas)
let projectorNotesOverlay = null;
function toggleProjectorNotes() {
    if (projectorNotesOverlay) {
        projectorNotesOverlay.remove();
        projectorNotesOverlay = null;
        return;
    }

    const slide = presentationData.slides[currentSlideIndex];
    if (!slide) return;

    projectorNotesOverlay = document.createElement('div');
    projectorNotesOverlay.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 380px;
        max-height: 250px;
        background: rgba(15, 23, 42, 0.95);
        border: 1px solid var(--accent-emerald);
        border-radius: 8px;
        padding: 15px;
        color: white;
        overflow-y: auto;
        z-index: 1000;
        backdrop-filter: blur(8px);
        box-shadow: 0 10px 25px rgba(0,0,0,0.5);
        font-size: 0.9rem;
    `;
    projectorNotesOverlay.innerHTML = `
        <h4 style="margin: 0 0 8px 0; color: var(--accent-emerald); border-bottom: 1px solid var(--border-color); padding-bottom: 5px;">NOTAS DEL EXPOSITOR (Overlay)</h4>
        <p style="margin: 0; font-style: italic;">${slide.notes.speech}</p>
    `;
    document.body.appendChild(projectorNotesOverlay);
}

// Controlador de Eventos de Teclado
window.addEventListener('keydown', (e) => {
    // Si la pantalla blanca/negra está activa, cualquier tecla la descarta
    const overlay = document.getElementById('blank-overlay');
    if (overlay && overlay.style.display === 'block') {
        if (e.key.toLowerCase() !== 'b' && e.key.toLowerCase() !== 'w') {
            overlay.className = 'blank-overlay';
            overlay.style.display = 'none';
            return;
        }
    }

    switch (e.key) {
        case 'ArrowRight':
        case 'Space':
        case ' ':
        case 'Enter':
            e.preventDefault();
            nextStep();
            break;
        case 'ArrowLeft':
        case 'Backspace':
            e.preventDefault();
            prevStep();
            break;
        case 'f':
        case 'F':
            e.preventDefault();
            toggleFullscreen();
            break;
        case 'b':
        case 'B':
            e.preventDefault();
            toggleBlankScreen('black');
            break;
        case 'w':
        case 'W':
            e.preventDefault();
            toggleBlankScreen('white');
            break;
        case 'g':
        case 'G':
            e.preventDefault();
            goToSlidePrompt();
            break;
        case 't':
        case 'T':
            e.preventDefault();
            toggleClock();
            break;
        case 'n':
        case 'N':
            e.preventDefault();
            toggleProjectorNotes();
            break;
    }
});

// Registrar clic en pantalla para avanzar diapositiva (excepto en código o botones)
document.addEventListener('click', (e) => {
    const isInteractive = e.target.closest('button, pre, code, a, svg, .mermaid, #zoom-modal');
    const overlay = document.getElementById('blank-overlay');
    
    if (overlay && overlay.style.display === 'block') {
        overlay.className = 'blank-overlay';
        overlay.style.display = 'none';
        return;
    }

    if (!isInteractive) {
        nextStep();
    }
});

// Carga Inicial
window.addEventListener('load', () => {
    renderCurrentSlide();
});