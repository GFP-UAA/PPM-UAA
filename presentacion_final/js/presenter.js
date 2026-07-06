// js/presenter.js
// Variables de control de tiempo
let masterStartTime = null;
let slideStartTime = null;
let masterTimerInterval = null;
let slideTimerInterval = null;

// Total de tiempo para la defensa: 20 minutos (1200 segundos)
const TOTAL_PRESENTATION_SECONDS = 1200;

// Inicialización de Mermaid para el panel de vista previa
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

// Función de renderizado llamada automáticamente por sync.js al recibir actualizaciones de estado
function renderCurrentSlide() {
    const slide = presentationData.slides[currentSlideIndex];
    const totalSlides = presentationData.slides.length;
    if (!slide) return;

    // 1. Renderizar diapositiva a escala en la vista previa del expositor
    const previewBody = document.getElementById('preview-body');
    previewBody.innerHTML = `
        <h1 id="slide-title">${slide.title}</h1>
        <h2 id="slide-subtitle">${slide.subtitle}</h2>
        <div id="slide-body">${slide.content}</div>
    `;

    // Resaltar sintaxis de código en la vista previa
    if (typeof Prism !== 'undefined') {
        Prism.highlightAllUnder(previewBody);
    }

    // Renderizar diagramas de Mermaid en la vista previa si corresponde
    if (slide.content.includes('class="mermaid"') || slide.content.includes('<div class="mermaid">')) {
        if (typeof mermaid !== 'undefined') {
            try {
                mermaid.run({
                    nodes: previewBody.querySelectorAll('.mermaid')
                });
            } catch (err) {
                console.error("Error al renderizar Mermaid en vista previa:", err);
            }
        }
    }

    // Actualizar indicador de fragmentos de la vista previa
    const fragments = previewBody.querySelectorAll('.fragment');
    const totalFrags = fragments.length;
    const currentFragDisplay = currentFragmentIndex === 999 ? totalFrags : currentFragmentIndex + 1;
    document.getElementById('preview-frag-counter').innerText = `Paso ${currentFragDisplay} / ${totalFrags}`;

    // Revelar secuencialmente en la vista previa
    fragments.forEach((frag, idx) => {
        if (currentFragmentIndex === 999 || idx <= currentFragmentIndex) {
            frag.classList.add('visible');
        } else {
            frag.classList.remove('visible');
        }
    });

    // 2. Información del Expositor y Barra de Estado
    const totalBlocks = 12;
    const filledBlocks = Math.round(((currentSlideIndex + 1) / totalSlides) * totalBlocks);
    const emptyBlocks = totalBlocks - filledBlocks;
    const pct = Math.round(((currentSlideIndex + 1) / totalSlides) * 100);
    const asciiProgress = '█'.repeat(filledBlocks) + '░'.repeat(emptyBlocks);
    document.getElementById('slide-counter').innerText = `Diapositiva ${currentSlideIndex + 1} de ${totalSlides} [${asciiProgress} ${pct}%]`;
    document.getElementById('current-presenter').innerText = slide.presenter;
    document.getElementById('next-presenter').innerText = slide.nextPresenter || 'Fin de Exposición';

    // Habilitar/Deshabilitar botones de navegación manual
    document.getElementById('btn-prev').disabled = currentSlideIndex === 0 && currentFragmentIndex <= -1;
    document.getElementById('btn-next').disabled = currentSlideIndex === totalSlides - 1 && currentFragmentIndex >= totalFrags - 1;

    // 3. Cargar Información Privada y Notas (Pestañas 1 y 2)
    document.getElementById('note-goal').innerText = slide.notes.goal;
    document.getElementById('note-speech').innerText = slide.notes.speech;

    // Cargar Cues/Tips
    const cuesList = document.getElementById('note-cues');
    cuesList.innerHTML = '';
    slide.notes.cues.forEach(cue => {
        const li = document.createElement('li');
        li.innerText = cue;
        cuesList.appendChild(li);
    });

    // Cargar Palabras Clave
    const keywordsContainer = document.getElementById('note-keywords');
    keywordsContainer.innerHTML = '';
    slide.notes.keywords.forEach(kw => {
        const span = document.createElement('span');
        span.className = 'keyword-tag';
        span.innerText = kw;
        keywordsContainer.appendChild(span);
    });

    // Cargar Consejos de Lenguaje Corporal
    const bodyLangContainer = document.getElementById('note-bodylanguage');
    bodyLangContainer.innerHTML = '';
    slide.notes.bodyLanguage.forEach(tip => {
        const li = document.createElement('li');
        li.innerText = tip;
        bodyLangContainer.appendChild(li);
    });

    // Cargar Notas a No Olvidar
    const dontForgetContainer = document.getElementById('note-dontforget');
    dontForgetContainer.innerHTML = '';
    slide.notes.dontForget.forEach(item => {
        const li = document.createElement('li');
        li.innerText = item;
        dontForgetContainer.appendChild(li);
    });

    // 4. Banco de Preguntas del Jurado (Pestaña 3)
    const questionsContainer = document.getElementById('questions-container');
    questionsContainer.innerHTML = '';
    const qCount = slide.notes.questions ? slide.notes.questions.length : 0;
    document.getElementById('questions-count').innerText = qCount;

    if (qCount > 0) {
        slide.notes.questions.forEach((q, idx) => {
            const item = document.createElement('div');
            item.className = 'question-item';
            item.innerHTML = `
                <div class="question-header" onclick="toggleQuestionAnswer(this)">
                    <span>Q: ${q.q}</span>
                    <span class="chevron">&#9662;</span>
                </div>
                <div class="question-answer" style="display: none;">
                    ${q.a}
                </div>
            `;
            questionsContainer.appendChild(item);
        });
    } else {
        questionsContainer.innerHTML = `
            <div style="color: var(--text-muted); text-align: center; padding: 2rem;">
                No hay preguntas específicas del banco de 30 asignadas a esta diapositiva introductoria/conclusión.
            </div>
        `;
    }

    // 5. Miniatura / Título de la Siguiente Diapositiva
    const nextSlideTitleEl = document.getElementById('next-slide-title');
    const nextSlideDescEl = document.getElementById('next-slide-desc');
    if (currentSlideIndex < totalSlides - 1) {
        const nextSlide = presentationData.slides[currentSlideIndex + 1];
        nextSlideTitleEl.innerText = `${nextSlide.id}. ${nextSlide.title}`;
        nextSlideDescEl.innerText = nextSlide.subtitle;
    } else {
        nextSlideTitleEl.innerText = 'Fin de la Presentación';
        nextSlideDescEl.innerText = 'Ronda final de preguntas y respuestas con el tribunal.';
    }

    // 6. Gestionar Temporizadores (Slide individual)
    resetSlideTimer(slide.recommendedTimeSeconds);
    
    // Iniciar temporizador maestro al arrancar la primera slide
    if (currentSlideIndex === 0 && !masterStartTime) {
        startMasterTimer();
    }
}

// Alternar visibilidad de respuestas en el banco de preguntas
function toggleQuestionAnswer(headerEl) {
    const answerEl = headerEl.nextElementSibling;
    const chevron = headerEl.querySelector('.chevron');
    if (answerEl.style.display === 'none') {
        answerEl.style.display = 'block';
        chevron.innerHTML = '&#9652;'; // Chevron hacia arriba
    } else {
        answerEl.style.display = 'none';
        chevron.innerHTML = '&#9662;'; // Chevron hacia abajo
    }
}

// Alternar entre pestañas en el panel de notas
function switchTab(tabId) {
    // Apagar pestañas activas
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));

    // Activar pestaña seleccionada
    const targetPane = document.getElementById(tabId);
    if (targetPane) {
        targetPane.classList.add('active');
    }

    // Activar botón correspondiente
    const event = window.event;
    if (event && event.currentTarget) {
        event.currentTarget.classList.add('active');
    } else {
        // Fallback si se llama programáticamente
        const buttons = document.querySelectorAll('.tab-btn');
        if (tabId === 'tab-guion') buttons[0].classList.add('active');
        if (tabId === 'tab-lenguaje') buttons[1].classList.add('active');
        if (tabId === 'tab-preguntas') buttons[2].classList.add('active');
    }
}

// Cronómetro Maestro de la Defensa (20 Minutos)
function startMasterTimer() {
    masterStartTime = Date.now();
    masterTimerInterval = setInterval(() => {
        const elapsedSeconds = Math.floor((Date.now() - masterStartTime) / 1000);
        
        // Timer de avance (Elapsed)
        const elapsedMinutes = String(Math.floor(elapsedSeconds / 60)).padStart(2, '0');
        const elapsedSecs = String(elapsedSeconds % 60).padStart(2, '0');
        const mainTimerEl = document.getElementById('main-timer');
        mainTimerEl.innerText = `${elapsedMinutes}:${elapsedSecs}`;

        // Alerta en rojo si se exceden los 20 minutos reglamentarios
        if (elapsedSeconds > TOTAL_PRESENTATION_SECONDS) {
            mainTimerEl.style.color = '#EF4444';
        }

        // Timer de cuenta atrás (Remaining)
        const remainingSeconds = TOTAL_PRESENTATION_SECONDS - elapsedSeconds;
        const remainingEl = document.getElementById('remaining-timer');
        if (remainingSeconds >= 0) {
            const remainingMinutes = String(Math.floor(remainingSeconds / 60)).padStart(2, '0');
            const remainingSecs = String(remainingSeconds % 60).padStart(2, '0');
            remainingEl.innerText = `${remainingMinutes}:${remainingSecs}`;
            remainingEl.style.color = remainingSeconds < 120 ? '#EF4444' : 'var(--accent-emerald)'; // Alerta 2 mins antes
        } else {
            remainingEl.innerText = "00:00";
            remainingEl.style.color = '#EF4444';
        }
    }, 1000);
}

// Cronómetro de la Diapositiva Activa (Tiempo Recomendado)
function resetSlideTimer(recommendedSeconds) {
    if (slideTimerInterval) {
        clearInterval(slideTimerInterval);
    }

    slideStartTime = Date.now();
    const slideTimerEl = document.getElementById('slide-timer');
    slideTimerEl.classList.remove('time-exceeded');
    slideTimerEl.style.color = 'var(--accent-blue)';

    const recMin = String(Math.floor(recommendedSeconds / 60)).padStart(2, '0');
    const recSec = String(recommendedSeconds % 60).padStart(2, '0');
    const recommendedText = `${recMin}:${recSec}`;

    slideTimerEl.innerText = `00:00 / ${recommendedText}`;

    slideTimerInterval = setInterval(() => {
        const elapsedSeconds = Math.floor((Date.now() - slideStartTime) / 1000);
        const mins = String(Math.floor(elapsedSeconds / 60)).padStart(2, '0');
        const secs = String(elapsedSeconds % 60).padStart(2, '0');

        slideTimerEl.innerText = `${mins}:${secs} / ${recommendedText}`;

        // Alerta si supera el límite recomendado de esta slide
        if (elapsedSeconds > recommendedSeconds) {
            slideTimerEl.classList.add('time-exceeded');
        }
    }, 1000);
}

// Navegación mediante botones en pantalla del presentador
document.getElementById('btn-next').addEventListener('click', () => {
    const slide = presentationData.slides[currentSlideIndex];
    const previewBody = document.getElementById('preview-body');
    const fragments = previewBody.querySelectorAll('.fragment');

    if (currentFragmentIndex < fragments.length - 1) {
        broadcastSlideState(currentSlideIndex, currentFragmentIndex + 1);
    } else {
        if (currentSlideIndex < presentationData.slides.length - 1) {
            broadcastSlideState(currentSlideIndex + 1, -1);
        }
    }
});

document.getElementById('btn-prev').addEventListener('click', () => {
    if (currentFragmentIndex >= 0) {
        broadcastSlideState(currentSlideIndex, currentFragmentIndex - 1);
    } else {
        if (currentSlideIndex > 0) {
            broadcastSlideState(currentSlideIndex - 1, 999);
        }
    }
});

// Registrar atajos de teclado en el presentador (se replica la lógica del proyector)
window.addEventListener('keydown', (e) => {
    const previewBody = document.getElementById('preview-body');
    const fragments = previewBody.querySelectorAll('.fragment');

    switch (e.key) {
        case 'ArrowRight':
        case 'Space':
        case ' ':
        case 'Enter':
            e.preventDefault();
            if (currentFragmentIndex < fragments.length - 1) {
                broadcastSlideState(currentSlideIndex, currentFragmentIndex + 1);
            } else {
                if (currentSlideIndex < presentationData.slides.length - 1) {
                    broadcastSlideState(currentSlideIndex + 1, -1);
                }
            }
            break;
        case 'ArrowLeft':
        case 'Backspace':
            e.preventDefault();
            if (currentFragmentIndex >= 0) {
                broadcastSlideState(currentSlideIndex, currentFragmentIndex - 1);
            } else {
                if (currentSlideIndex > 0) {
                    broadcastSlideState(currentSlideIndex - 1, 999);
                }
            }
            break;
        case 'g':
        case 'G':
            e.preventDefault();
            const total = presentationData.slides.length;
            const slideNum = prompt(`Ir a diapositiva (1 - ${total}):`, currentSlideIndex + 1);
            if (slideNum) {
                const parsed = parseInt(slideNum, 10);
                if (!isNaN(parsed) && parsed >= 1 && parsed <= total) {
                    broadcastSlideState(parsed - 1, -1);
                }
            }
            break;
    }
});

// Inicializar
window.addEventListener('load', () => {
    renderCurrentSlide();
});