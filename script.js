// Calificaciones en diferentes idiomas
const ratings = {
  'es': ["Básico", "Regular", "Correcto", "Bueno", "Excelente"],
  'ca': ["Bàsic", "Regular", "Correcte", "Bo", "Excel·lent"],
  'en': ["Basic", "Fair", "Good", "Very Good", "Excellent"]
};

// Traducciones
const translations = {
  'es': {
    'title': 'Selección de chatbots gratuitos',
    'assign_importance': 'Asignar importancia',
    'reset': '↺ Restaurar',
    'results': 'Resultados',
    'note': 'Nota: Esta calificación es subjetiva y puede variar según las necesidades específicas de cada usuario.',
    'question': '¿Qué IA me conviene? Comparativa de chatbots',
    'features': [
      "Con personalización de las respuestas",
      "Generación de imágenes",
      "Generación de video",
      "Intérprete de código",
      "Compartir públicamente conversaciones completas",
      "Subir documentos de texto",
      "Puede ver las imágenes de los PDF",
      "Cálculos matemáticos exactos mediante programación",
      "Con modo de razonamiento",
      "Con búsqueda profunda",
      "Con chat privado (incógnito)",
      "Creación de agentes (espacios de trabajo)",
      "Con canvas (lienzo)",
      "Conexión con otros servicios (Google Drive, Dropbox, etc.)",
      "Versión CLI (consola o terminal)",
      "Edad mínima de uso"
    ]
  },
  'ca': {
    'title': 'Selecció de chatbots gratuïts',
    'assign_importance': 'Assignar importància',
    'reset': '↺ Restaurar',
    'results': 'Resultats',
    'note': 'Nota: Aquesta qualificació és subjectiva i pot variar segons les necessitats específiques de cada usuari.',
    'question': 'Quina IA em convé? Comparativa de chatbots',
    'features': [
      "Amb personalització de les respostes",
      "Generació d'imatges",
      "Generació de vídeo",
      "Intèrpret de codi",
      "Compartir públicament converses completes",
      "Pujar documents de text",
      "Pot veure les imatges dels PDF",
      "Càlculs matemàtics exactes mitjançant programació",
      "Amb mode de raonament",
      "Amb cerca profunda",
      "Amb xat privat (incògnit)",
      "Creació d'agents (espais de treball)",
      "Amb canvas (llenç)",
      "Connexió amb altres serveis (Google Drive, Dropbox, etc.)",
      "Versió CLI (consola o terminal)",
      "Edat mínima d'ús"
    ]
  },
  'en': {
    'title': 'Free chatbots selection',
    'assign_importance': 'Assign importance',
    'reset': '↺ Reset',
    'results': 'Results',
    'note': 'Note: This rating is subjective and may vary according to each user\'s specific needs.',
    'question': 'Which AI suits me? Chatbot comparison',
    'features': [
      "With response customization",
      "Image generation",
      "Video generation",
      "Code interpreter",
      "Publicly share complete conversations",
      "Upload text documents",
      "Can view images in PDFs",
      "Exact mathematical calculations through programming",
      "With reasoning mode",
      "With deep search",
      "With private chat (incognito)",
      "Creation of agents (workspaces)",
      "With canvas",
      "Connection with other services (Google Drive, Dropbox, etc.)",
      "CLI version (console or terminal)",
      "Minimum age for use"
    ]
  }
};

// Etiquetas para los deslizadores (rango 0..4)
const sliderLabels = {
  'es': ["Sin importancia", "Baja", "Media", "Alta", "Obligatorio"],
  'ca': ["Sense importància", "Baixa", "Mitjana", "Alta", "Obligatori"],
  'en': ["Not important", "Low", "Medium", "High", "Required"]
};

// Etiquetas para el deslizador de edad (rango 0..1)
const ageSliderLabels = {
  'es': ["Indiferente", "Menores"],
  'ca': ["Indiferent", "Menors"],
  'en': ["Indifferent", "Minors"]
};

// IAs en el orden de la tabla actualizada según CSV 22/08/2025
const ias = [
  "Gemini",
  "Grok", 
  "ChatGPT",
  "Le Chat",
  "Perplexity",
  "Qwen",
  "Kimi",
  "Copilot",
  "Claude",
  "DeepSeek",
  "Phind",
  "Lumo"
];

/*
  Índice de características actualizadas según CSV 22/08/2025:
  0: Con personalización de las respuestas (0 o 1)
  1: Generación de imágenes (0 o 1)
  2: Generación de video (0 o 1)
  3: Intérprete de código (0 o 1)
  4: Compartir públicamente conversaciones completas (0 o 1)
  5: Subir documentos de texto (0 o 1)
  6: Puede ver las imágenes de los PDF (0 o 1)
  7: Cálculos matemáticos exactos mediante programación (0 o 1)
  8: Con modo de razonamiento (0 o 1)
  9: Con búsqueda profunda (0 o 1)
  10: Con chat privado (incógnito) (0 o 1)
  11: Creación de agentes (espacios de trabajo) (0 o 1)
  12: Con canvas (lienzo) (0 o 1)
  13: Conexión con otros servicios (Google Drive, Dropbox, etc.) (0 o 1)
  14: Versión CLI (consola o terminal) (0 o 1)
  15: Edad mínima de uso
*/

const capabilities = {
  "Gemini":      [1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 14],
  "Grok":        [1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 13],
  "ChatGPT":     [1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 14],
  "Le Chat":     [0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 13],
  "Perplexity":  [1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 0, 13],
  "Qwen":        [0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 18],
  "Kimi":        [0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 14],
  "Copilot":     [0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 14],
  "Claude":      [1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 18],
  "DeepSeek":    [0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 14],
  "Phind":       [1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 14],
  "Lumo":        [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 13]
};

// Detecta el idioma inicial del navegador
let currentLang = navigator.language.substring(0,2);
if (!['es', 'ca', 'en'].includes(currentLang)) currentLang = 'es';

// Inicialmente, los 14 primeros deslizadores a 2 (Media) y el de edad a 0 (Indiferente)
let weights = Array(translations[currentLang].features.length).fill(2);
weights[translations[currentLang].features.length - 1] = 0;

// Devuelve true si alguna característica obligatoria falla
function failsMandatoryRequirement(iaCapabilities) {
  for (let i = 0; i < weights.length - 1; i++) {
    if (weights[i] === 4 && iaCapabilities[i] === 0) {
      return true;
    }
  }
  return false;
}

// Crea los sliders de cada característica
function createFeatureSliders() {
  const container = document.getElementById('features');
  if (!container) return;

  const featuresArr = translations[currentLang].features;
  container.innerHTML = featuresArr.map((feature, index) => {
    if (index < featuresArr.length - 1) {
      const label = sliderLabels[currentLang][2];
      return `
        <div class="feature-item">
          <div class="feature-header">
            <label class="feature-label">${feature}</label>
            <span class="weight-value" id="weight-${index}">${label}</span>
          </div>
          <input
            type="range"
            min="0"
            max="4"
            step="1"
            value="2"
            class="slider"
            id="slider-${index}"
            onInput="updateWeight(${index}, this.value)"
          >
        </div>
      `;
    } else {
      const label = ageSliderLabels[currentLang][0];
      return `
        <div class="feature-item">
          <div class="feature-header">
            <label class="feature-label">${feature}</label>
            <span class="weight-value" id="weight-${index}">${label}</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="1"
            value="0"
            class="slider"
            id="slider-${index}"
            onInput="updateWeight(${index}, this.value)"
          >
        </div>
      `;
    }
  }).join('');
}

// Actualiza las traducciones de elementos
function updateTranslations() {
  document.querySelectorAll('[data-translate]').forEach(el => {
    const key = el.dataset.translate;
    if (translations[currentLang][key]) {
      el.textContent = translations[currentLang][key];
    }
  });
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.remove('active');
    if (btn.textContent === currentLang.toUpperCase()) {
      btn.classList.add('active');
    }
  });
  const featureLabels = document.querySelectorAll('.feature-label');
  if (featureLabels.length > 0) {
    translations[currentLang].features.forEach((text, index) => {
      if (featureLabels[index]) featureLabels[index].textContent = text;
    });
  }
  const footerNote = document.querySelector('.footer div');
  const footerLink = document.querySelector('.footer a');
  if (footerNote) footerNote.textContent = translations[currentLang].note;
  if (footerLink) {
    footerLink.textContent = translations[currentLang].question;
    footerLink.href = "https://educacion.bilateria.org/que-ia-me-conviene-comparativa-de-chatbots";
  }
}

// Cambio de idioma
function changeLanguage(lang) {
  currentLang = lang;
  weights = Array(translations[currentLang].features.length).fill(2);
  weights[translations[currentLang].features.length - 1] = 0;
  updateTranslations();
  createFeatureSliders();
  updateScores();
}

// Función para obtener el color del slider basado en el valor
function getSliderColor(value) {
  const colors = {
    0: "#9ca3af", // Gris - Sin importancia
    1: "#10b981", // Verde - Baja
    2: "#3b82f6", // Azul - Media
    3: "#f59e0b", // Naranja - Alta
    4: "#ef4444"  // Rojo - Obligatorio
  };
  return colors[value];
}

// Actualiza el valor de un deslizador
function updateWeight(index, value) {
  let label;
  if (index < translations[currentLang].features.length - 1) {
    label = sliderLabels[currentLang][value];
  } else {
    label = ageSliderLabels[currentLang][value];
  }
  weights[index] = parseInt(value);
  document.getElementById(`weight-${index}`).textContent = label;

  const sliderEl = document.getElementById(`slider-${index}`);
  if (index < translations[currentLang].features.length - 1) {
    sliderEl.style.setProperty("--slider-thumb-color", getSliderColor(value));
  } else {
    sliderEl.style.setProperty("--slider-thumb-color", "#3b82f6");
  }
  updateScores();
}

// Restablece todos los deslizadores a sus valores por defecto
function resetWeights() {
  weights = Array(translations[currentLang].features.length).fill(2);
  weights[translations[currentLang].features.length - 1] = 0;
  const labelsForCurrentLang = sliderLabels[currentLang];
  const featuresArr = translations[currentLang].features;
  document.querySelectorAll('.slider').forEach((slider, index) => {
    if (index < featuresArr.length - 1) {
      slider.value = 2;
      document.getElementById(`weight-${index}`).textContent = labelsForCurrentLang[2];
      slider.style.setProperty("--slider-thumb-color", getSliderColor(2));
    } else {
      slider.value = 0;
      document.getElementById(`weight-${index}`).textContent = ageSliderLabels[currentLang][0];
      slider.style.setProperty("--slider-thumb-color", "#3b82f6");
    }
  });
  updateScores();
}

// Calcula el color de la puntuación en función del porcentaje
function getScoreColor(percentage) {
  if (percentage >= 80) return 'score-green';
  if (percentage >= 60) return 'score-blue';
  if (percentage >= 40) return 'score-yellow';
  if (percentage >= 20) return 'score-orange';
  return 'score-red';
}

// Calcula la puntuación total para cada IA
function updateScores() {
  const scores = ias.map(ia => {
    let baseScore = 0;
    for (let i = 0; i < weights.length - 1; i++) {
      baseScore += capabilities[ia][i] * weights[i];
    }
    if (failsMandatoryRequirement(capabilities[ia])) {
      return { ia, score: 0 };
    }
    let bonus;
    if (weights[weights.length - 1] === 0) {
      bonus = (capabilities[ia][15] < 18 ? 1 : 0);
    } else if (weights[weights.length - 1] === 1) {
      bonus = (capabilities[ia][15] < 18 ? 1 : null);
    }
    if (bonus === null) {
      baseScore = 0;
    } else {
      baseScore += bonus;
    }
    return { ia, score: Math.round(baseScore) };
  }).sort((a, b) => b.score - a.score);

  const container = document.getElementById('results');
  if (!container) return;

  container.innerHTML = scores.map(({ ia, score }, index) => {
    const maxPossibleScore = weights.reduce((sum, weight, i) => sum + (i < weights.length - 1 ? weight * 1 : 0), 0) + 1;
    const percentage = maxPossibleScore > 0 ? Math.round((score / maxPossibleScore) * 100) : 0;
    const colorClass = getScoreColor(percentage);
    
    // Determinar la calificación textual
    let ratingIndex, ratingClass;
    if (percentage >= 80) {
      ratingIndex = 4; // Excelente
      ratingClass = "rating-excellent";
    } else if (percentage >= 60) {
      ratingIndex = 3; // Bueno
      ratingClass = "rating-good";
    } else if (percentage >= 40) {
      ratingIndex = 2; // Correcto
      ratingClass = "rating-average";
    } else if (percentage >= 20) {
      ratingIndex = 1; // Regular
      ratingClass = "rating-fair";
    } else {
      ratingIndex = 0; // Básico
      ratingClass = "rating-poor";
    }
    const ratingText = ratings[currentLang][ratingIndex];
    
    return `
      <div class="result-item">
        <span class="rank">#${index + 1}</span>
        <span class="ia-name">${ia}</span>
        <div class="score-container">
          <div class="score-bar">
            <div class="score-fill score-fill-${colorClass.replace('score-', '')}" style="width: ${percentage}%"></div>
          </div>
          <div class="score-value">${percentage}%</div>
          <div class="score-rating ${ratingClass}">${ratingText}</div>
        </div>
      </div>
    `;
  }).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  updateTranslations();
  createFeatureSliders();
  updateScores();
});

// Hacer accesibles las funciones globalmente
window.resetWeights = resetWeights;
window.changeLanguage = changeLanguage;
window.updateWeight = updateWeight;